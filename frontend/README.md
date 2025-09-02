# 🌐 Boston Tracker Dashboard

Dashboard web interactivo para administradores del sistema de seguimiento de deliveries de BOSTON American Burgers. Desarrollado con React, Vite y Leaflet para monitoreo en tiempo real.

## 🚀 **Estado Actual**

✅ **Dashboard completamente funcional** con todas las características  
✅ **Mapas interactivos** con tracking en tiempo real  
✅ **WebSockets** para actualizaciones automáticas  
✅ **Interfaz responsive** optimizada para móvil y desktop  
✅ **Build de producción** servido por Nginx  

## 🌐 **URLs del Frontend**

- **🌐 Dashboard Principal:** http://185.144.157.163/
- **📊 Analytics:** http://185.144.157.163/analytics
- **👥 Gestión de Usuarios:** http://185.144.157.163/users
- **🚚 Gestión de Viajes:** http://185.144.157.163/trips
- **⚙️ Configuración:** http://185.144.157.163/settings

## 🔧 **Tecnologías**

- **React 18** - Framework de UI
- **Vite** - Build tool y dev server
- **Leaflet** - Mapas interactivos
- **OpenStreetMap** - Tiles de mapas
- **Socket.io-client** - WebSockets en tiempo real
- **Material-UI (MUI)** - Componentes de UI
- **React Router** - Navegación SPA
- **Axios** - Cliente HTTP
- **Chart.js** - Gráficos y analytics

## 📂 **Estructura del Frontend**

```
frontend/
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── Map/         # Componentes de mapa
│   │   ├── Dashboard/   # Dashboard principal
│   │   ├── Users/       # Gestión de usuarios
│   │   └── Trips/       # Gestión de viajes
│   ├── pages/           # Páginas principales
│   ├── services/        # Servicios API
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utilidades
│   ├── styles/          # Estilos globales
│   └── assets/          # Imágenes y recursos
├── public/              # Archivos públicos
├── build/               # Build de producción
├── package.json         # Dependencias y scripts
├── vite.config.js       # Configuración de Vite
└── README.md           # Este archivo
```

## 🚀 **Instalación y Configuración**

### 1. Instalar dependencias
```bash
cd frontend
npm install
```

### 2. Configurar variables de entorno
```bash
# Crear archivo .env
echo "VITE_API_URL=http://185.144.157.163:3001" > .env
echo "VITE_SOCKET_URL=http://185.144.157.163:3001" >> .env
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
# Disponible en http://localhost:5173
```

### 4. Build para producción
```bash
npm run build
# Los archivos se generan en build/
```

### 5. Preview del build
```bash
npm run preview
```

## 🎨 **Características de la UI**

### Dashboard Principal
- 🗺️ **Mapa en tiempo real** con posiciones de repartidores
- 📊 **Métricas de delivery** (activos, completados, pendientes)
- 📈 **Gráficos de performance** y estadísticas
- 🔔 **Notificaciones** en tiempo real

### Gestión de Viajes
- ➕ **Crear nuevos viajes** con rutas optimizadas
- 📍 **Tracking en vivo** de cada delivery
- ✅ **Estado de viajes** (pendiente, en curso, completado)
- 📋 **Historial** de deliveries

### Gestión de Usuarios
- 👥 **Lista de repartidores** activos
- 📊 **Estadísticas por usuario** (viajes, distancia, tiempo)
- ⚙️ **Configuración** de permisos y roles

### Analytics
- 📈 **Métricas de rendimiento** diarias, semanales, mensuales
- 🗺️ **Rutas más utilizadas** y optimización
- ⏱️ **Tiempos promedio** de entrega
- 💰 **Reportes de eficiencia**

## 🔧 **Scripts Disponibles**

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run preview    # Preview del build
npm run lint       # Linting con ESLint
npm run format     # Formatear código con Prettier
npm test           # Ejecutar tests
```

## 📱 **Responsive Design**

- ✅ **Desktop:** Optimizado para pantallas grandes
- ✅ **Tablet:** Layout adaptativo para tablets
- ✅ **Mobile:** Interfaz touch-friendly para móviles
- ✅ **PWA Ready:** Preparado para Progressive Web App

## 🌐 **Integración con Backend**

```javascript
// Configuración de API
const API_BASE_URL = 'http://185.144.157.163:3001'
const SOCKET_URL = 'http://185.144.157.163:3001'

// WebSocket connection
import io from 'socket.io-client'
const socket = io(SOCKET_URL)
```

## 🔐 **Autenticación**

- **JWT Tokens** para autenticación
- **Refresh tokens** para sesiones extendidas
- **Role-based access** (admin, dispatcher, viewer)
- **Session management** con localStorage

## 📊 **Features del Dashboard**

### Mapa Principal
- 🗺️ Mapa de Boston con OpenStreetMap
- 📍 Marcadores de repartidores en tiempo real
- 🛣️ Rutas de delivery visualizadas
- 🔄 Actualización automática cada 5 segundos

### Panel de Control
- 📊 Widgets de métricas principales
- 🚨 Alertas y notificaciones
- 📋 Lista de viajes activos
- ⚡ Acciones rápidas

## 🎯 **Optimizaciones**

- ✅ **Code splitting** para carga rápida
- ✅ **Lazy loading** de componentes
- ✅ **Memoización** de componentes pesados
- ✅ **Bundle size** optimizado < 1MB
- ✅ **Cache strategies** para assets estáticos

## 🧪 **Testing**

```bash
# Tests unitarios
npm test

# Tests de integración
npm run test:integration

# Tests E2E
npm run test:e2e
```

---

**Última actualización:** $(date '+%d/%m/%Y %H:%M')  
**URL:** http://185.144.157.163/  
**Estado:** ✅ Producción
