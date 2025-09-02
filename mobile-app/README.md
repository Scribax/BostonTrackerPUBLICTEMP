# 📱 Boston Tracker Mobile App

Aplicación móvil React Native para repartidores de BOSTON American Burgers. Permite tracking GPS en tiempo real, gestión de viajes y sincronización automática con el backend.

## 🚀 **Estado Actual**

✅ **APK funcional en producción**
- **Descarga**: http://185.144.157.163/apk/
- **Última versión**: BOSTON-Tracker-v20250902-0807-LOCATION-FIXED.apk
- **Conectividad**: ✅ HTTP y WebSocket funcionando
- **Permisos**: ✅ Ubicación completa habilitada

## 📱 **APK Disponible**

### 🏍️ **Versión Actual: LOCATION-FIXED**
```
Archivo: BOSTON-Tracker-v20250902-0807-LOCATION-FIXED.apk
URL: http://185.144.157.163/apk/BOSTON-Tracker-v20250902-0807-LOCATION-FIXED.apk
Tamaño: ~66MB
Estado: ✅ Completamente funcional
```

### ✅ **Problemas Resueltos**
- **HTTP bloqueado**: `usesCleartextTraffic="true"` habilitado
- **Foreground service**: Permisos completos para tracking en segundo plano
- **Conectividad**: CORS y rutas del backend corregidas
- **Login exitoso**: Franco (DEL001) conectándose correctamente

## 🔐 **Credenciales de Acceso**

### 👤 **Usuarios Disponibles**
```
# Franco (Usuario Principal)
ID Empleado: DEL001
Contraseña: 123456
Estado: ✅ Verificado y funcionando

# María González (Usuario Alternativo)  
ID Empleado: DEL002
Contraseña: delivery123
Estado: ✅ Disponible
```

## 🛠️ **Tecnologías**

### Core
- **React Native** - Framework móvil
- **Expo SDK** - Plataforma de desarrollo
- **TypeScript/JavaScript** - Lenguaje principal

### Comunicación
- **Axios** - Cliente HTTP para API calls
- **Socket.io Client** - WebSocket en tiempo real
- **AsyncStorage** - Persistencia local

### GPS y Ubicación
- **Expo Location** - Servicios de ubicación
- **Background Tasks** - Tracking en segundo plano
- **Foreground Service** - Servicios persistentes

### UI/UX
- **React Native Elements** - Componentes UI
- **React Navigation** - Navegación entre pantallas
- **React Native Vector Icons** - Iconografía

## 🏗️ **Arquitectura de la App**

```
src/
├── components/          # Componentes reutilizables
│   ├── LoginForm.jsx       # 🔐 Formulario de login
│   ├── TripControls.jsx    # 🎮 Controles de viaje
│   └── MetricsDisplay.jsx  # 📊 Métricas en tiempo real
├── screens/             # Pantallas principales  
│   ├── LoginScreen.jsx     # 🔑 Pantalla de acceso
│   ├── DashboardScreen.jsx # 📱 Dashboard principal
│   └── TripScreen.jsx      # 🗺️ Pantalla de viaje
├── services/            # Servicios de API
│   ├── apiService.js       # 🔌 Cliente HTTP
│   ├── socketService.js    # 📡 WebSocket
│   └── locationService.js  # 📍 GPS y tracking
├── config/              # Configuración
│   └── environment.js      # 🔧 URLs y settings
└── utils/               # Utilidades
    └── storage.js          # 💾 AsyncStorage helpers
```

## 📊 **Funcionalidades**

### 🔑 **Autenticación**
- **Login seguro** con ID de empleado
- **JWT tokens** para sesiones persistentes  
- **Logout automático** al cerrar app
- **Validación en tiempo real**

### 🗺️ **Tracking GPS**
- **Ubicación precisa** con alta frecuencia
- **Tracking en segundo plano** con foreground service
- **Cálculo de distancias** usando fórmula Haversine
- **Métricas en tiempo real**: velocidad, distancia, duración

### 🚗 **Gestión de Viajes**
- **Inicio/parada** con un toque
- **Estado persistente** entre cierres de app
- **Sincronización automática** con backend
- **Manejo de errores** y reconexión

### 📡 **Comunicación en Tiempo Real**
- **WebSocket** para notificaciones push
- **HTTP requests** para operaciones CRUD
- **Offline tolerance** con cola de requests
- **Reconexión automática**

## 🔧 **Configuración**

### 📍 **URLs del Backend**
```javascript
// src/config/environment.js
const config = {
  development: {
    API_URL: 'http://185.144.157.163:5000/api',
    SOCKET_URL: 'http://185.144.157.163:5000'
  },
  production: {
    API_URL: 'http://185.144.157.163:5000/api', 
    SOCKET_URL: 'http://185.144.157.163:5000'
  }
};
```

### 🔐 **Permisos Android**
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.INTERNET"/>

<!-- CRÍTICO: Habilitar HTTP en producción -->
<application android:usesCleartextTraffic="true">
```

## 🏗️ **Proceso de Build**

### 🔧 **Desarrollo con Expo**
```bash
# Instalación
npm install

# Desarrollo con Expo Go
npx expo start

# Preview en túnel
npx expo start --tunnel
```

### 📦 **Build APK (Producción)**
```bash
# Prebuild para Android
npx expo prebuild --platform android

# Clean build
cd android
./gradlew clean
./gradlew assembleRelease

# APK generado en:
# android/app/build/outputs/apk/release/app-release.apk
```

### 🚀 **Deploy al Servidor**
```bash
# Copiar APK con timestamp
cp app-release.apk /var/www/boston-tracker/BOSTON-Tracker-v$(date +%Y%m%d-%H%M).apk

# Subir a servidor web
cp *.apk /var/www/html/apk/
```

## 📍 **Servicios de Ubicación**

### 🎯 **LocationService**
```javascript
// Inicialización precisa
await Location.requestForegroundPermissionsAsync();
await Location.requestBackgroundPermissionsAsync();

// Tracking de alta frecuencia
const location = await Location.getCurrentPositionAsync({
  accuracy: Location.Accuracy.BestForNavigation,
  maximumAge: 1000,
  timeout: 5000,
});
```

### ⏱️ **Frecuencia de Updates**
- **Ubicación**: Cada 3 segundos durante viaje
- **Métricas**: Cada 5 segundos  
- **Health check**: Cada 20 segundos
- **Reconexión**: Automática en caso de error

## 📊 **Métricas Calculadas**

### 🧮 **Algoritmos Implementados**
```javascript
// Distancia Haversine (precisión GPS)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio terrestre en km
  // Implementación matemática precisa
}

// Velocidad en tiempo real
currentSpeed = distance / timeElapsed * 3.6; // km/h

// Velocidad promedio
averageSpeed = totalDistance / totalTime;
```

## 🔌 **Integración con Backend**

### 📡 **API Endpoints Utilizados**
```javascript
// Autenticación
POST /api/auth/login
GET  /api/auth/me  
POST /api/auth/logout

// Viajes
GET  /api/deliveries/my-trip
POST /api/deliveries/:id/start
POST /api/deliveries/:id/stop
POST /api/deliveries/:id/location
POST /api/deliveries/:id/metrics

// Health
GET /api/health
```

### 🔄 **WebSocket Events**
```javascript
// Eventos recibidos del servidor
socket.on('tripStatusChanged', handleTripStatus);
socket.on('forceStop', handleForceStop);

// Eventos enviados al servidor  
socket.emit('join-delivery', deliveryId);
```

## 🚨 **Problemas Resueltos**

### ❌ **Conectividad (Solucionado)**
```
Problema: "SERVICIO NO DISPONIBLE"
Causa: Android bloquea HTTP en APK de producción
Solución: android:usesCleartextTraffic="true"
Estado: ✅ Resuelto
```

### ❌ **Permisos de Ubicación (Solucionado)**
```
Problema: "Foreground service permissions not found"
Causa: Faltaban permisos FOREGROUND_SERVICE_LOCATION
Solución: Permisos agregados al AndroidManifest
Estado: ✅ Resuelto
```

### ❌ **Ruta Logout (Solucionado)**
```
Problema: Error 404 en logout
Causa: Ruta no implementada en backend
Solución: Agregada ruta /api/auth/logout
Estado: ✅ Resuelto
```

## 📂 **Archivos Críticos**

- `android/app/src/main/AndroidManifest.xml` - Permisos Android
- `src/config/environment.js` - URLs de backend
- `src/services/apiService.js` - Cliente HTTP principal
- `src/services/locationService.js` - GPS y tracking
- `android/app/build/outputs/apk/release/` - APKs generados

## 🔮 **Próximas Mejoras**

- [ ] Notificaciones push nativas
- [ ] Modo offline con sincronización
- [ ] Optimización de batería
- [ ] Métricas de rendimiento de red
- [ ] Alertas de velocidad
- [ ] Historial local de viajes

## 🧪 **Testing y Debug**

### 📱 **Testing con Expo Go**
```bash
# Código QR para testing
npx expo start --tunnel

# Ver logs en tiempo real
# Conectar dispositivo con Expo Go app
```

### 🔍 **Debug de Conectividad**
```javascript
// Test manual de API
curl -X POST http://185.144.157.163:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"employeeId":"DEL001","password":"123456"}'
```

## 📋 **Instrucciones de Instalación**

### Para Repartidores
1. **Descargar APK**: http://185.144.157.163/apk/
2. **Habilitar**: "Instalar apps de origen desconocido"
3. **Instalar**: BOSTON-Tracker-v20250902-0807-LOCATION-FIXED.apk
4. **Permisos**: Aceptar todos los permisos de ubicación
5. **Login**: Usar ID DEL001 con contraseña 123456

---

**Estado**: ✅ Producción | **Plataforma**: Android | **Framework**: React Native + Expo
