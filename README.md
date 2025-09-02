# 🍔 Boston Tracker - Sistema de Seguimiento de Entregas

Sistema completo de seguimiento en tiempo real para deliveries de **BOSTON American Burgers**. Incluye dashboard web para administradores, API backend robusta y aplicación móvil para repartidores.

## 🌟 Características Principales

- ✅ **Dashboard Web**: Monitoreo en tiempo real de todos los deliveries
- ✅ **API Backend**: Sistema robusto con PostgreSQL y WebSocket
- ✅ **App Móvil**: Aplicación React Native para repartidores
- ✅ **Tracking GPS**: Seguimiento preciso con cálculos de distancia Haversine
- ✅ **Tiempo Real**: Comunicación WebSocket bidireccional
- ✅ **Métricas**: Velocidad, distancia, duración y análisis de rutas

## 🚀 Estado del Proyecto

### ✅ **Completamente Funcional**
- **Backend**: Node.js + Express + PostgreSQL + Socket.io
- **Frontend**: React + Vite + Leaflet Maps + Bootstrap
- **Mobile**: React Native + Expo con APK generado
- **Servidor**: Debian con Nginx configurado

### 🌐 **URLs en Producción**
- **Dashboard Admin**: http://185.144.157.163/
- **API Backend**: http://185.144.157.163:5000/api
- **Descarga APK**: http://185.144.157.163/apk/

## 📱 **APK Móvil Disponible**

### 🏍️ **Última Versión: LOCATION-FIXED**
```
Archivo: BOSTON-Tracker-v20250902-0807-LOCATION-FIXED.apk
URL: http://185.144.157.163/apk/BOSTON-Tracker-v20250902-0807-LOCATION-FIXED.apk
Tamaño: ~66MB
```

**Mejoras incluidas:**
- ✅ Conectividad HTTP habilitada (`usesCleartextTraffic="true"`)
- ✅ Permisos completos de ubicación y foreground service
- ✅ Ruta `/auth/logout` corregida en backend
- ✅ CORS optimizado para aplicaciones móviles

## 🔐 **Credenciales del Sistema**

### 👤 **Usuarios de Prueba**
```bash
# Delivery (App Móvil)
ID Empleado: DEL001
Contraseña: 123456
Usuario: Franco

# Delivery 2
ID Empleado: DEL002  
Contraseña: delivery123
Usuario: María González

# Administrador (Dashboard Web)
Email: admin@bostonburgers.com
Contraseña: password123
```

## 🏗️ **Arquitectura del Sistema**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   📱 App Móvil   │    │  🌐 Dashboard    │    │  🗄️ Backend API  │
│  React Native   │◄──►│    React Web    │◄──►│ Node.js + PG   │
│   (Delivery)    │    │    (Admin)      │    │   Socket.io    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  🗺️ Maps & GPS   │
                    │   Leaflet Web   │
                    │ Location Mobile │
                    └─────────────────┘
```

## 📂 **Estructura del Proyecto**

```
boston-tracker/
├── backend/                 # API Backend (Node.js + PostgreSQL)
│   ├── server-postgres.js   # Servidor principal
│   ├── controllers/         # Controladores de API
│   ├── routes/             # Definición de rutas
│   └── middleware/         # Middlewares de autenticación
├── frontend/               # Dashboard Web (React + Vite)
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── services/       # Servicios de API
│   │   └── pages/          # Páginas principales
│   └── build/              # Build de producción
├── mobile-app/             # App Móvil (React Native + Expo)
│   ├── src/
│   │   ├── components/     # Componentes móviles
│   │   ├── services/       # Servicios de conectividad
│   │   └── config/         # Configuración de entorno
│   └── android/            # Build Android
└── *.apk                   # APKs generados
```

## 🛠️ **Tecnologías Utilizadas**

### Backend
- **Node.js** con Express.js
- **PostgreSQL** con Sequelize ORM
- **Socket.io** para tiempo real
- **JWT** para autenticación
- **bcryptjs** para seguridad

### Frontend Dashboard
- **React 18** con Hooks
- **Vite** como bundler
- **Leaflet** para mapas interactivos
- **Bootstrap 5** para UI
- **Axios** para API calls

### App Móvil
- **React Native** con Expo
- **Expo Location** para GPS
- **AsyncStorage** para persistencia
- **Socket.io Client** para tiempo real
- **Android SDK** para builds

## 🔧 **Instalación y Configuración**

### 1. Clonar Repositorio
```bash
git clone https://github.com/Scribax/BostonTracker.git
cd BostonTracker
```

### 2. Backend Setup
```bash
cd backend
npm install
# Configurar PostgreSQL y variables de entorno
node server-postgres.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run build
# Configurar Nginx para servir build/
```

### 4. Mobile App Setup
```bash
cd mobile-app
npm install
npx expo prebuild
# Para APK: cd android && ./gradlew assembleRelease
```

## 🌐 **Configuración del Servidor**

### Nginx Configuration
```nginx
# Dashboard en puerto 80
server {
    listen 80;
    server_name 185.144.157.163;
    root /var/www/boston-tracker/frontend/build;
    index index.html;
}

# APK downloads
location /apk/ {
    alias /var/www/html/apk/;
    autoindex on;
}
```

### Backend Configuration
- **Puerto**: 5000
- **Host**: 0.0.0.0 (accesible externamente)
- **Base de datos**: PostgreSQL
- **WebSocket**: Socket.io habilitado

## 📊 **Funcionalidades**

### 🗺️ **Dashboard Admin**
- Mapa en tiempo real con marcadores de scooter 🛵
- Tracking de múltiples deliveries simultáneos
- Métricas en vivo (velocidad, distancia, duración)
- Gestión de usuarios y rutas históricas
- Alertas de desconexión automáticas

### 📱 **App Móvil**
- Login con ID de empleado
- Inicio/parada de viajes con un toque
- Tracking GPS preciso en segundo plano
- Sincronización automática con backend
- Métricas en tiempo real

### 🔌 **API Backend**
- Autenticación JWT segura
- Endpoints RESTful completos
- WebSocket para notificaciones push
- Cálculos de distancia Haversine precisos
- Rate limiting y logging detallado

## 🎯 **Próximos Pasos**

- [ ] Implementar notificaciones push
- [ ] Añadir modo offline para la app
- [ ] Dashboard de métricas históricas
- [ ] Integración con servicios de mapas premium
- [ ] Sistema de alertas automáticas

## 🤝 **Contribuir**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 **Desarrollo**

**Estado**: ✅ Producción  
**Último Update**: Septiembre 2025  
**Servidor**: Debian 12 en 185.144.157.163  

---

*Desarrollado para BOSTON American Burgers - Sistema de tracking profesional para optimizar entregas*
