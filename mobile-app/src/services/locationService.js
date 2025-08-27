import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Alert, Linking } from 'react-native';
import Constants from 'expo-constants';
import apiService from './apiService';
import tripMetricsService from './tripMetricsService';

// Nombre de la tarea en background
const BACKGROUND_LOCATION_TASK = 'background-location';

// Configuración desde variables de entorno
const CONFIG = {
  TRACKING_INTERVAL: parseInt(Constants.expoConfig?.extra?.EXPO_PUBLIC_TRACKING_INTERVAL) || 1000, // 1 segundo por defecto
  HIGH_FREQUENCY_MODE: Constants.expoConfig?.extra?.EXPO_PUBLIC_HIGH_FREQUENCY_MODE === 'true' || false,
  MIN_DISTANCE_FILTER: parseInt(Constants.expoConfig?.extra?.EXPO_PUBLIC_MIN_DISTANCE_FILTER) || 2, // 2 metros
  DEBUG_MODE: Constants.expoConfig?.extra?.EXPO_PUBLIC_DEBUG_MODE === 'true' || false,
  BATCH_SIZE: 5, // Enviar en lotes de 5 ubicaciones
  MAX_BATCH_INTERVAL: 5000, // Máximo 5 segundos entre envíos
  // Deshabilita el endpoint legacy /location para evitar sumar kilometraje en el backend
  USE_LEGACY_LOCATION_API: (Constants.expoConfig?.extra?.EXPO_PUBLIC_USE_LEGACY_LOCATION_API || 'false') === 'true',
};

// Buffer para almacenar ubicaciones cuando no hay conexión
let locationBuffer = [];
let lastSentLocation = null;
let batchTimeout = null;

class LocationService {
  constructor() {
    this.isInitialized = false;
    this.currentUserId = null;
    this.lastKnownLocation = null;
    this.isTrackingActive = false;
  }

  // Inicializar servicio
  async initialize() {
    try {
      if (this.isInitialized) return true;

      // Definir tarea en background
      TaskManager.defineTask(BACKGROUND_LOCATION_TASK, ({ data, error }) => {
        if (error) {
          console.error('Error en background location task:', error);
          return;
        }

        if (data) {
          const { locations } = data;
          if (locations && locations.length > 0) {
            const location = locations[0];
            this.handleBackgroundLocation(location);
          }
        }
      });

      this.isInitialized = true;
      console.log('✅ LocationService inicializado');
      return true;

    } catch (error) {
      console.error('Error inicializando LocationService:', error);
      return false;
    }
  }

  // Manejar ubicación en background
  async handleBackgroundLocation(location) {
    try {
      if (!this.currentUserId || !this.isTrackingActive) return;

      console.log('📍 Background location update:', {
        lat: location.coords.latitude.toFixed(6),
        lng: location.coords.longitude.toFixed(6),
        accuracy: location.coords.accuracy?.toFixed(1) + 'm'
      });

      // Procesar ubicación en el servicio de métricas para kilometraje real
      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        altitude: location.coords.altitude,
        heading: location.coords.heading,
        speed: location.coords.speed,
        timestamp: location.timestamp
      };

      // Procesar métricas de viaje
      if (tripMetricsService.hasActiveTrip()) {
        const metricsResult = await tripMetricsService.processLocation(locationData);
        if (metricsResult.success && CONFIG.DEBUG_MODE) {
          const metrics = metricsResult.metrics;
          if (metrics) {
            console.log('📊 Métricas actualizadas:', {
              distance: metrics.totalDistanceM + 'm',
              speed: metrics.currentSpeed + ' km/h',
              avgSpeed: metrics.averageSpeed + ' km/h'
            });
          }
        }
      }

      // Enviar ubicación al servidor (solo si se habilita explícitamente el modo legacy)
      if (CONFIG.USE_LEGACY_LOCATION_API) {
        const result = await apiService.updateLocation(this.currentUserId, {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy
        });

        if (!result.success) {
          console.warn('Error enviando ubicación al servidor:', result.error);
        }
      } else if (CONFIG.DEBUG_MODE) {
        console.log('⏭️ Envío a /location deshabilitado (usando solo métricas en tiempo real)');
      }

      // Actualizar última ubicación conocida
      this.lastKnownLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        timestamp: new Date(location.timestamp)
      };

    } catch (error) {
      console.error('Error manejando ubicación en background:', error);
    }
  }

  // Solicitar permisos de ubicación
  async requestPermissions() {
    try {
      // Verificar si ya tenemos permisos
      const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
      
      let finalStatus = existingStatus;

      // Si no tenemos permisos, solicitarlos
      if (existingStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      // Si no se concedieron permisos de primer plano
      if (finalStatus !== 'granted') {
        return {
          success: false,
          error: 'Se requieren permisos de ubicación para funcionar correctamente'
        };
      }

      // Solicitar permisos de background
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      
      if (backgroundStatus !== 'granted') {
        console.warn('Permisos de background no concedidos');
        // No fallar aquí, ya que algunos features pueden funcionar sin background
      }

      console.log('✅ Permisos de ubicación concedidos');
      return { success: true };

    } catch (error) {
      console.error('Error solicitando permisos:', error);
      return {
        success: false,
        error: 'Error obteniendo permisos de ubicación'
      };
    }
  }

  // Obtener ubicación actual
  async getCurrentPosition() {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 10000, // 10 segundos
        timeout: 15000, // 15 segundos timeout
      });

      const result = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        timestamp: new Date(location.timestamp)
      };

      this.lastKnownLocation = result;
      
      return {
        success: true,
        data: result
      };

    } catch (error) {
      console.error('Error obteniendo ubicación actual:', error);
      
      // Si falla, intentar con última ubicación conocida
      if (this.lastKnownLocation) {
        console.warn('Usando última ubicación conocida');
        return {
          success: true,
          data: this.lastKnownLocation
        };
      }

      return {
        success: false,
        error: 'No se pudo obtener la ubicación actual'
      };
    }
  }

  // Iniciar tracking de alta frecuencia
  async startHighFrequencyTracking(userId) {
    try {
      if (!userId) {
        throw new Error('UserId es requerido para iniciar tracking');
      }

      // Verificar permisos primero
      const permissionsResult = await this.requestPermissions();
      if (!permissionsResult.success) {
        throw new Error(permissionsResult.error);
      }

      this.currentUserId = userId;
      this.isTrackingActive = true;
      
      // Limpiar buffer anterior
      locationBuffer = [];
      lastSentLocation = null;
      
      if (CONFIG.DEBUG_MODE) {
        console.log('🚀 Iniciando tracking de ALTA FRECUENCIA:', {
          interval: CONFIG.TRACKING_INTERVAL + 'ms',
          minDistance: CONFIG.MIN_DISTANCE_FILTER + 'm',
          batchSize: CONFIG.BATCH_SIZE
        });
      }

      // Configuración optimizada para alta frecuencia
      const trackingConfig = {
        accuracy: Location.Accuracy.BestForNavigation, // Máxima precisión
        timeInterval: CONFIG.TRACKING_INTERVAL, // 1 segundo o configurado
        distanceInterval: CONFIG.MIN_DISTANCE_FILTER, // 2 metros mínimo
        deferredUpdatesInterval: CONFIG.TRACKING_INTERVAL,
        foregroundService: {
          notificationTitle: 'BOSTON Tracker 🍔',
          notificationBody: '📍 Tracking preciso activo - ' + (CONFIG.TRACKING_INTERVAL/1000) + 's',
          notificationColor: '#dc3545',
        },
      };

      await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, trackingConfig);
      
      // Iniciar tracking de foreground también para máxima frecuencia
      if (CONFIG.HIGH_FREQUENCY_MODE) {
        this.startForegroundTracking(userId);
      }

      console.log('✅ Tracking de ALTA FRECUENCIA iniciado');
      return { success: true };

    } catch (error) {
      console.error('Error iniciando tracking de alta frecuencia:', error);
      this.isTrackingActive = false;
      this.currentUserId = null;
      
      return {
        success: false,
        error: error.message || 'Error iniciando tracking de alta frecuencia'
      };
    }
  }
  
  // Tracking adicional en foreground para máxima frecuencia
  startForegroundTracking(userId) {
    if (this.foregroundInterval) {
      clearInterval(this.foregroundInterval);
    }
    
    this.foregroundInterval = setInterval(async () => {
      if (!this.isTrackingActive) {
        clearInterval(this.foregroundInterval);
        return;
      }
      
      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          maximumAge: 500, // Máximo 500ms de antigüedad
          timeout: 2000, // Timeout rápido
        });
        
        await this.processHighFrequencyLocation(location, userId);
        
      } catch (error) {
        if (CONFIG.DEBUG_MODE) {
          console.warn('Error en foreground tracking:', error.message);
        }
      }
    }, CONFIG.TRACKING_INTERVAL);
  }
  
  // Procesar ubicación de alta frecuencia con filtros inteligentes
  async processHighFrequencyLocation(location, userId) {
    const newLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
      timestamp: new Date(location.timestamp)
    };
    
    // Filtrar por precisión (solo usar ubicaciones ultra-precisas)
    if (newLocation.accuracy > 15) { // Más de 15 metros de error, ignorar (ultra-estricto anti-deriva)
      if (CONFIG.DEBUG_MODE) {
        console.warn('🚨 Ubicación ignorada por baja precisión:', newLocation.accuracy + 'm');
      }
      return;
    }
    
    // Filtrar por movimiento mínimo
    if (lastSentLocation) {
      const distance = this.calculateDistance(
        lastSentLocation.latitude,
        lastSentLocation.longitude,
        newLocation.latitude,
        newLocation.longitude
      );
      
      // Si se movió menos del filtro mínimo, ignorar
      if (distance * 1000 < CONFIG.MIN_DISTANCE_FILTER) {
        if (CONFIG.DEBUG_MODE) {
          console.log('🔄 Movimiento mínimo ignorado:', Math.round(distance * 1000) + 'm');
        }
        return;
      }
    }
    
    // Procesar métricas también en foreground para mantener consistencia
    if (tripMetricsService.hasActiveTrip()) {
      try {
        await tripMetricsService.processLocation(newLocation);
      } catch (e) {
        if (CONFIG.DEBUG_MODE) console.warn('Error procesando métricas en foreground:', e?.message || e);
      }
    }

    if (CONFIG.USE_LEGACY_LOCATION_API) {
      // Añadir al buffer solo en modo legacy
      locationBuffer.push(newLocation);
      
      if (CONFIG.DEBUG_MODE) {
        console.log('📍 Nueva ubicación bufferizada:', {
          lat: newLocation.latitude.toFixed(6),
          lng: newLocation.longitude.toFixed(6),
          accuracy: newLocation.accuracy.toFixed(1) + 'm',
          buffer: locationBuffer.length + '/' + CONFIG.BATCH_SIZE
        });
      }
      
      // Enviar cuando el buffer esté lleno o haya pasado el tiempo máximo
      if (locationBuffer.length >= CONFIG.BATCH_SIZE) {
        await this.sendLocationBatch(userId);
      } else if (!batchTimeout) {
        batchTimeout = setTimeout(() => {
          this.sendLocationBatch(userId);
        }, CONFIG.MAX_BATCH_INTERVAL);
      }
    }
    
    // Actualizar última ubicación conocida (siempre)
    this.lastKnownLocation = newLocation;
    lastSentLocation = newLocation;
  }
  
  // Enviar lote de ubicaciones al servidor
  async sendLocationBatch(userId) {
    if (locationBuffer.length === 0) return;
    
    // Limpiar timeout si existe
    if (batchTimeout) {
      clearTimeout(batchTimeout);
      batchTimeout = null;
    }
    
    const batch = [...locationBuffer];
    locationBuffer = []; // Limpiar buffer
    
    try {
      if (!CONFIG.USE_LEGACY_LOCATION_API) {
        if (CONFIG.DEBUG_MODE) console.log('⏭️ Modo legacy deshabilitado: no se envía lote a /location');
        return;
      }
      if (CONFIG.DEBUG_MODE) {
        console.log('🚀 Enviando lote de', batch.length, 'ubicaciones');
      }
      
      // Enviar la última ubicación del lote (la más reciente)
      const latestLocation = batch[batch.length - 1];
      
      const result = await apiService.updateLocation(userId, {
        latitude: latestLocation.latitude,
        longitude: latestLocation.longitude,
        accuracy: latestLocation.accuracy
      });
      
      if (result.success) {
        if (CONFIG.DEBUG_MODE) {
          console.log('✅ Lote enviado exitosamente. Respuesta:', result.data);
        }
      } else {
        console.warn('⚠️ Error enviando lote al servidor:', result.error);
        // Re-agregar al buffer si falla (con límite para evitar acumulación infinita)
        if (locationBuffer.length < CONFIG.BATCH_SIZE * 3) {
          locationBuffer.unshift(...batch.slice(-2)); // Solo re-agregar las 2 últimas
        }
      }
      
    } catch (error) {
      console.error('🚨 Error crítico enviando lote:', error);
      // Re-agregar ubicación más reciente en caso de error
      if (locationBuffer.length < CONFIG.BATCH_SIZE * 2) {
        locationBuffer.unshift(batch[batch.length - 1]);
      }
    }
  }

  // Iniciar tracking de ubicación (método legacy, ahora usa alta frecuencia)
  async startLocationTracking(userId) {
    return await this.startHighFrequencyTracking(userId);
  }

  // Detener tracking de ubicación
  async stopLocationTracking() {
    try {
      // Detener foreground tracking si está activo
      if (this.foregroundInterval) {
        clearInterval(this.foregroundInterval);
        this.foregroundInterval = null;
        if (CONFIG.DEBUG_MODE) {
          console.log('✅ Foreground tracking detenido');
        }
      }
      
      // Limpiar batch timeout si existe
      if (batchTimeout) {
        clearTimeout(batchTimeout);
        batchTimeout = null;
      }
      
      // Enviar último lote si hay ubicaciones pendientes
      if (locationBuffer.length > 0 && this.currentUserId) {
        await this.sendLocationBatch(this.currentUserId);
      }
      
      // Limpiar buffers
      locationBuffer = [];
      lastSentLocation = null;
      
      // Verificar si TaskManager.isTaskRunningAsync existe
      let isRunning = true; // Asumir que está corriendo por seguridad
      
      try {
        if (TaskManager.isTaskRunningAsync && typeof TaskManager.isTaskRunningAsync === 'function') {
          isRunning = await TaskManager.isTaskRunningAsync(BACKGROUND_LOCATION_TASK);
        }
      } catch (taskError) {
        console.warn('Error verificando estado de tarea, procedera a detener:', taskError);
      }
      
      // Intentar detener updates en background
      try {
        await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
        console.log('✅ Background tracking detenido');
      } catch (stopError) {
        console.warn('Error deteniendo updates de ubicación:', stopError);
      }

      this.isTrackingActive = false;
      this.currentUserId = null;
      this.lastKnownLocation = null;
      
      if (CONFIG.DEBUG_MODE) {
        console.log('✅ Tracking de ALTA FRECUENCIA completamente detenido');
      }

      return { success: true };

    } catch (error) {
      console.error('Error deteniendo tracking:', error);
      return {
        success: false,
        error: 'Error deteniendo tracking de ubicación'
      };
    }
  }

  // Calcular distancia entre dos puntos usando fórmula Haversine
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 1000) / 1000; // Redondear a 3 decimales
  }

  // Convertir grados a radianes
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Obtener estado del tracking
  isTracking() {
    return this.isTrackingActive;
  }

  // Obtener última ubicación conocida
  getLastKnownLocation() {
    return this.lastKnownLocation;
  }

  // Abrir configuración de la app
  openSettings() {
    Linking.openSettings();
  }

  // Manejar cuando la app va a background
  onAppBackground() {
    console.log('📱 App va a background - tracking continúa');
    // El tracking en background ya está configurado, no necesitamos hacer nada
  }

  // Manejar cuando la app vuelve a foreground
  onAppForeground() {
    console.log('📱 App vuelve a foreground');
    // Verificar estado del tracking si es necesario
    this.checkTrackingStatus();
  }

  // Verificar estado del tracking
  async checkTrackingStatus() {
    try {
      let isRunning = false;
      
      // Verificar si la función existe antes de usarla
      if (TaskManager.isTaskRunningAsync && typeof TaskManager.isTaskRunningAsync === 'function') {
        try {
          isRunning = await TaskManager.isTaskRunningAsync(BACKGROUND_LOCATION_TASK);
        } catch (taskError) {
          console.warn('Error verificando si tarea está corriendo:', taskError);
          // Asumir que no está corriendo si hay error
          isRunning = false;
        }
      }
      
      if (this.isTrackingActive && !isRunning) {
        console.warn('⚠️ Tracking debería estar activo pero no está corriendo');
        // Intentar reiniciar si es necesario
        if (this.currentUserId) {
          await this.startLocationTracking(this.currentUserId);
        }
      }
    } catch (error) {
      console.error('Error verificando estado del tracking:', error);
    }
  }

  // Limpiar recursos
  cleanup() {
    this.stopLocationTracking();
    this.isInitialized = false;
    this.currentUserId = null;
    this.lastKnownLocation = null;
    this.isTrackingActive = false;
  }
}

// Crear instancia singleton
const locationService = new LocationService();

export default locationService;
