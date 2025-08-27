# 📱 App Móvil - BOSTON Tracker (Deliverys)

App móvil construida con React Native + Expo para los repartidores (deliverys) de BOSTON American Burgers.

## 🎯 Objetivo

- Mostrar solo el kilometraje acumulado del viaje actual
- Iniciar/Detener viaje
- Enviar ubicación cada 10 segundos en background
- No mostrar mapas ni indicar rastreo

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo
npm start

# Abrir en Android
npm run android

# Abrir en iOS
npm run ios
```

## 🔧 Configuración

### API Base URL

Edita `src/services/apiService.js` y modifica la IP local para desarrollo:

```js
const API_BASE_URL = __DEV__ 
  ? 'http://TU-IP-LOCAL:5000/api' // Cambia TU-IP-LOCAL por tu IP
  : 'https://api.bostonburgers.com/api';
```

- Para obtener tu IP local: `ifconfig` (Linux/Mac) o `ipconfig` (Windows)
- Asegúrate que el teléfono y la PC estén en la misma red WiFi

## 📱 Permisos Requeridos

### Android
- ACCESS_FINE_LOCATION
- ACCESS_COARSE_LOCATION
- ACCESS_BACKGROUND_LOCATION

### iOS
- NSLocationWhenInUseUsageDescription
- NSLocationAlwaysUsageDescription
- Background Modes: Location updates

Estos permisos ya están configurados en `app.json`.

## 🔒 Privacidad

- La app solo muestra el kilometraje acumulado (texto)
- No muestra mapas
- No muestra notificaciones de rastreo
- Explica el uso de ubicación como “para calcular distancias precisas”

## 🔄 Frecuencia de Actualización

- Cada 10 segundos se envía la ubicación al backend
- La distancia se calcula con la fórmula Haversine
- Se ignoran movimientos menores a 5 metros para evitar ruido

## 👤 Login de Prueba

- ID: DEL001
- Password: delivery123

## 🧪 Troubleshooting

1. No conecta al backend
   - Cambia la IP en `apiService.js`
   - Verifica que el backend esté corriendo en el puerto 5000

2. No actualiza el kilometraje
   - Asegúrate de estar en exterior o con buena señal GPS
   - Verifica que los permisos de ubicación están otorgados (siempre)

3. No funciona en segundo plano
   - En Android, verifica que la app tenga permiso “Siempre”
   - Revisa que no esté optimizada por batería (desactivar optimización)

## 🧱 Estructura

```
mobile-app/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   └── HomeScreen.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── LocationContext.js
│   └── services/
│       ├── apiService.js
│       └── locationService.js
├── App.js
└── app.json
```

## 📦 Build

```bash
# Android APK/AAB
eas build -p android

# iOS IPA (requiere cuenta Apple)
eas build -p ios
```

## 📄 Notas

- La app depende del backend y la base de datos
- Usa HTTPS en producción
- Cambia el JWT_SECRET en el backend para producción

