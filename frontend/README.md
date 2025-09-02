# 🌐 Boston Tracker Dashboard

Dashboard web interactivo para administradores del sistema de seguimiento de deliveries de BOSTON American Burgers. Desarrollado con React, Vite y Leaflet para monitoreo en tiempo real.

## 🚀 **Estado Actual**

✅ **Completamente funcional en producción**
- **URL**: http://185.144.157.163/
- **Servidor**: Nginx sirviendo build optimizado
- **Mapa**: Leaflet con OpenStreetMap
- **WebSocket**: Comunicación en tiempo real

## 🎯 **Características Principales**

### 🗺️ **Mapa Interactivo**
- **Vista en tiempo real** de todos los deliveries activos
- **Marcadores personalizados** con icono de scooter 🛵
- **Auto-seguimiento** o navegación libre
- **Rutas dinámicas** con historial de trayectos
- **Controles intuitivos** para zoom y centrado

### 📊 **Panel de Información**
- **Métricas en vivo**: velocidad, distancia, duración
- **Estado de deliveries**: activo/inactivo
- **Información detallada** por delivery
- **Historial de ubicaciones**
- **Alertas de desconexión**

### 👥 **Gestión de Usuarios**
- **CRUD completo** de usuarios
- **Roles diferenciados**: admin/delivery
- **Estados de cuenta** activo/inactivo
- **Información de viajes activos**

## 🏗️ **Arquitectura de Componentes**

```
src/
├── components/          # Componentes reutilizables
│   ├── MapComponent.jsx     # 🗺️ Mapa principal con Leaflet
│   ├── DeliveryTable.jsx    # 📊 Tabla de deliveries
│   └── UserManagement.jsx   # 👥 Gestión de usuarios
├── pages/               # Páginas principales
│   ├── Dashboard.jsx        # 📈 Dashboard principal
│   ├── Login.jsx           # 🔐 Página de login
│   └── Users.jsx           # 👤 Gestión de usuarios
├── services/            # Servicios de API
│   ├── api.js              # 🔌 Cliente Axios
│   ├── deliveryService.js  # 🚚 API de deliveries
│   └── authService.js      # 🔐 API de autenticación
└── App.jsx             # 🏠 Aplicación principal
```

## 🛠️ **Tecnologías Utilizadas**

### Core
- **React 18** - Framework principal
- **Vite** - Build tool y dev server
- **React Router** - Navegación SPA

### UI/UX
- **Bootstrap 5** - Framework CSS
- **React Bootstrap** - Componentes React
- **Bootstrap Icons** - Iconografía
- **React Hot Toast** - Notificaciones

### Mapas y Geo
- **Leaflet** - Librería de mapas
- **React Leaflet** - Componentes React para Leaflet
- **OpenStreetMap** - Tiles de mapas gratuitos

### Estado y Comunicación
- **Socket.io Client** - WebSocket en tiempo real
- **Axios** - Cliente HTTP
- **date-fns** - Manipulación de fechas

## 🗺️ **MapComponent - Funcionalidades**

### 🎯 **Marcadores Inteligentes**
```jsx
// Icono personalizado con estado
const createDeliveryIcon = (isSelected = false) => {
  const color = isSelected ? '#28a745' : '#dc3545';
  return new L.DivIcon({
    html: `<div style="background-color: ${color};">
             <i class="bi bi-scooter"></i>
           </div>`,
    className: "delivery-marker-custom"
  });
};
```

### 🎮 **Modos de Navegación**
- **Auto-seguimiento**: Centra automáticamente en deliveries
- **Navegación libre**: Control manual del usuario
- **Vista múltiple**: Ajusta para mostrar todos los deliveries

### 📍 **Controles del Mapa**
```jsx
// Controles en tiempo real
- Botón Auto/Libre
- Toggle de rutas
- Centrar en deliveries  
- Reset vista inicial
- Indicador de modo actual
```

## 🔌 **Integración WebSocket**

### 📡 **Eventos en Tiempo Real**
```javascript
// Conexión automática al backend
const socket = io('http://185.144.157.163:5000');

// Eventos recibidos
socket.on('locationUpdate', updateDeliveryLocation);
socket.on('tripStarted', addNewDelivery);
socket.on('tripCompleted', removeDelivery);
socket.on('realTimeMetricsUpdate', updateMetrics);
```

## 📊 **Servicios de API**

### 🚚 **DeliveryService**
```javascript
// Obtener deliveries activos
getActiveDeliveries()

// Historial de rutas
getDeliveryHistory(deliveryId, options)

// Control de viajes
startTrip(deliveryId, location)
stopTrip(deliveryId)
```

### 🔐 **AuthService**
```javascript
// Autenticación
login(credentials)
logout()
getCurrentUser()

// Gestión de usuarios
getUsers()
createUser(userData)
updateUser(id, userData)
deleteUser(id)
```

## 🎨 **Temas y Estilos**

### 🎯 **Variables CSS Principales**
```css
:root {
  --bs-primary: #dc3545;      /* Rojo Boston */
  --bs-success: #28a745;      /* Verde activo */
  --delivery-marker: #dc3545; /* Color marcadores */
}
```

### 🛵 **Marcadores Personalizados**
```css
.delivery-marker-custom {
  background: transparent !important;
  border: none !important;
}
/* Scooter en círculo colorido */
```

## 🔧 **Configuración**

### Variables de Entorno
```bash
# API Backend
VITE_API_URL=http://185.144.157.163:5000/api
VITE_SOCKET_URL=http://185.144.157.163:5000

# Mapas
VITE_MAP_DEFAULT_CENTER_LAT=-34.6037
VITE_MAP_DEFAULT_CENTER_LNG=-58.3816  
VITE_MAP_DEFAULT_ZOOM=12
```

### 🏗️ **Build de Producción**
```bash
# Instalación
npm install

# Desarrollo
npm run dev

# Build optimizado
npm run build

# Preview del build
npm run preview
```

## 📱 **Responsive Design**

### 📐 **Breakpoints**
- **Mobile**: < 768px - Controles compactos
- **Tablet**: 768px - 1024px - Layout adaptado  
- **Desktop**: > 1024px - Experiencia completa

### 🎯 **Optimizaciones Móviles**
- Controles de mapa redimensionados
- Popups adaptables
- Touch-friendly interface

## 🧪 **Testing y Debugging**

### 🔍 **Herramientas de Debug**
- **React DevTools** - Componentes
- **Network Tab** - API calls
- **Console** - Socket.io events
- **Leaflet Inspector** - Mapa

### ✅ **Testing Manual**
```bash
# Verificar build
npm run build && npm run preview

# Test de conectividad
curl http://185.144.157.163/
```

## 🚨 **Problemas Resueltos**

- ✅ **Icono de moto**: Cambiado de truck a scooter
- ✅ **Marcadores duplicados**: CSS personalizado
- ✅ **WebSocket reconexión**: Manejo automático
- ✅ **Responsive**: Adaptado para móviles

## 🔮 **Funcionalidades Avanzadas**

### 🎯 **Auto-seguimiento Inteligente**
```javascript
// Centra automáticamente basado en deliveries activos
- 1 delivery → Zoom específico
- Múltiples → Fit bounds
- Sin deliveries → Vista por defecto
```

### 📊 **Métricas en Tiempo Real**
- Velocidad actual y promedio
- Distancia recorrida con Haversine
- Duración de viaje activa
- Estado de conexión del delivery

### 🗺️ **Rutas Dinámicas**
- Carga lazy de historial de ubicaciones
- Colores diferenciados por delivery
- Toggle show/hide global
- Polylines optimizadas

## 📁 **Archivos Clave**

- `src/components/MapComponent.jsx` - Mapa principal
- `src/services/deliveryService.js` - API de deliveries
- `src/pages/Dashboard.jsx` - Vista principal
- `build/` - Archivos de producción servidos por Nginx

## 🔮 **Próximas Mejoras**

- [ ] Dark mode toggle
- [ ] Filtros avanzados de deliveries
- [ ] Métricas históricas con gráficos
- [ ] Exportar datos en CSV/PDF
- [ ] Notificaciones push del navegador

---

**Estado**: ✅ Producción | **Puerto**: 80 (Nginx) | **Framework**: React + Vite
