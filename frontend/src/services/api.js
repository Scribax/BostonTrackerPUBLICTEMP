import axios from 'axios';
import toast from 'react-hot-toast';

// Configuración dinámica que se adapta a cualquier IP
const getApiUrl = () => {
  // Si hay una variable de entorno, usarla
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Si no, usar la IP actual del navegador
  const hostname = window.location.hostname;
  return `http://${hostname}:5000/api`;
};

// Configuración base de axios
const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    const token = localStorage.getItem('bostonToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token añadido al request');
    } else {
      console.warn('⚠️ No hay token disponible');
    }
    
    if (config.data) {
      console.log('📎 Request data:', config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('💥 Error en request interceptor:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    if (response.data) {
      console.log('📦 Response data:', response.data);
    }
    return response;
  },
  (error) => {
    console.error('💥 API Error:', error);
    console.error('🔄 Error config:', error.config);
    console.error('📋 Error response:', error.response?.data);
    console.error('🔢 Status code:', error.response?.status);
    
    // Manejar errores de autenticación
    if (error.response?.status === 401) {
      console.warn('🔒 Error de autenticación, redirigiendo al login');
      localStorage.removeItem('bostonToken');
      window.location.href = '/login';
      toast.error('Sesión expirada. Por favor inicia sesión nuevamente.');
    } 
    
    // Manejar errores de servidor
    else if (error.response?.status >= 500) {
      console.error('😱 Error del servidor:', error.response.status);
      toast.error('Error del servidor. Por favor intenta más tarde.');
    }
    
    // Manejar errores de red
    else if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      console.error('🌐 Error de red:', error.message);
      toast.error('Error de conexión. Verifica tu internet.');
    }
    
    // Manejar timeout
    else if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Timeout en la petición');
      toast.error('La petición ha tardado demasiado. Intenta de nuevo.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
