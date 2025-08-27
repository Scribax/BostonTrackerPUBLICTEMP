import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import apiService from '../services/apiService';
import { useAuth } from './AuthContext';
import { useLocation } from './LocationContext';

// Importación condicional de socketService
let socketService = null;
try {
  socketService = require('../services/socketService').default;
} catch (error) {
  console.warn('Socket.io no disponible en ConnectivityContext:', error.message);
  // Crear mock de socketService para evitar errores
  socketService = {
    emit: () => {},
    isSocketConnected: () => false
  };
}

const ConnectivityContext = createContext();

export const useConnectivity = () => {
  const context = useContext(ConnectivityContext);
  if (!context) {
    throw new Error('useConnectivity debe usarse dentro de ConnectivityProvider');
  }
  return context;
};

export const ConnectivityProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true); // Optimistic start
  const [isChecking, setIsChecking] = useState(true);
  const [lastCheckTime, setLastCheckTime] = useState(null);
  const checkIntervalRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const lastErrorTime = useRef(null);

  // Configuración de intervalos
  const CHECK_INTERVAL_ONLINE = 15000;  // 15 segundos cuando está online (más frecuente)
  const CHECK_INTERVAL_OFFLINE = 3000;  // 3 segundos cuando está offline (más agresivo)
  const INITIAL_RETRY_DELAY = 1000;     // 1 segundo para el primer reintento

  // Función para verificar conectividad
  const checkConnectivity = async () => {
    try {
      console.log('🔍 Verificando conectividad con el backend...');
      
      // Usar el endpoint de health check del backend
      const result = await apiService.healthCheck();
      
      if (result.success) {
        console.log('✅ Backend disponible');
        if (!isOnline) {
          console.log('🎉 Conectividad restaurada!');
        }
        setIsOnline(true);
        setLastCheckTime(new Date());
        return true;
      } else {
        throw new Error('Health check failed');
      }
    } catch (error) {
      console.warn('❌ Backend no disponible:', error.message);
      setIsOnline(false);
      setLastCheckTime(new Date());
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  // Función para iniciar verificación periódica
  const startPeriodicCheck = () => {
    // Limpiar intervalo anterior si existe
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }

    const interval = isOnline ? CHECK_INTERVAL_ONLINE : CHECK_INTERVAL_OFFLINE;
    
    checkIntervalRef.current = setInterval(() => {
      checkConnectivity();
    }, interval);
  };

  // Función para verificación manual (pull-to-refresh)
  const forceCheck = async () => {
    setIsChecking(true);
    return await checkConnectivity();
  };

  // Efecto inicial y manejo de cambios de estado
  useEffect(() => {
    // Verificación inicial
    const initialCheck = async () => {
      setIsChecking(true);
      await checkConnectivity();
      startPeriodicCheck();
    };

    initialCheck();

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []); // Solo en mount

  // Efecto para reiniciar el intervalo cuando cambia el estado online/offline
  useEffect(() => {
    if (!isChecking) { // Solo reiniciar si no estamos en verificación inicial
      startPeriodicCheck();
    }

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [isOnline]); // Cuando cambia isOnline

  // Agregar retry automático más agresivo cuando está offline
  useEffect(() => {
    if (!isOnline && !isChecking) {
      // Retry más frecuente cuando está offline
      const retryCheck = () => {
        retryTimeoutRef.current = setTimeout(async () => {
          console.log('🔄 Reintentando conexión...');
          await checkConnectivity();
          if (!isOnline) {
            retryCheck(); // Continuar reintentando
          }
        }, INITIAL_RETRY_DELAY);
      };
      
      retryCheck();
    }

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [isOnline, isChecking]);

  const contextValue = {
    isOnline,
    isChecking,
    lastCheckTime,
    forceCheck,
    checkConnectivity
  };

  return (
    <ConnectivityContext.Provider value={contextValue}>
      {children}
    </ConnectivityContext.Provider>
  );
};

export default ConnectivityContext;
