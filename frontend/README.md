# 🌐 Frontend - BOSTON Tracker Dashboard

Dashboard web para administradores del sistema de tracking de deliverys.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📋 Stack Tecnológico

- **Framework**: React 18 + Vite
- **UI Library**: Bootstrap 5 + React Bootstrap
- **Mapa**: Mapbox GL JS + react-map-gl
- **Estado**: React Context API
- **HTTP Client**: Axios
- **Tiempo Real**: Socket.io-client
- **Router**: React Router DOM v6
- **Notificaciones**: react-hot-toast
- **Fechas**: date-fns
- **Icons**: Bootstrap Icons

## 🗂️ Estructura de Archivos

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx        # Componente principal
│   │   ├── Login.jsx           # Pantalla de login
│   │   ├── MapComponent.jsx    # Mapa con Mapbox
│   │   └── DeliveryList.jsx    # Lista de deliverys
│   ├── context/
│   │   └── AuthContext.jsx     # Contexto de autenticación
│   ├── services/
│   │   ├── api.js              # Cliente HTTP
│   │   ├── socket.js           # Cliente WebSocket
│   │   └── deliveryService.js  # Servicios de deliverys
│   ├── styles/
│   │   └── index.css           # Estilos personalizados
│   └── App.jsx                 # App principal
├── index.html
├── vite.config.js
└── package.json
```

## 🔧 Configuración

### Variables de Entorno (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_MAPBOX_TOKEN=your-mapbox-access-token-here
```

### Obtener Token de Mapbox

1. Crear cuenta en [mapbox.com](https://mapbox.com)
2. Ir a **Account** → **Access tokens**
3. Crear un nuevo token o usar el default
4. Agregar el token a `.env`

## 🎨 Diseño y UI

### Colores del Sistema
```css
:root {
  --boston-red: #dc3545;      /* Color principal */
  --boston-blue: #0d6efd;     /* Color secundario */
  --boston-dark: #212529;     /* Texto oscuro */
  --boston-gray: #6c757d;     /* Texto secundario */
  --boston-light: #f8f9fa;    /* Fondo claro */
  --boston-white: #ffffff;    /* Fondo blanco */
}
```

### Componentes UI Principales

#### Login
- Formulario centrado con gradiente de fondo
- Validación en tiempo real
- Botón demo para credenciales de prueba
- Diseño responsive

#### Dashboard
- Navbar superior con info del usuario
- Mapa a pantalla completa (lado izquierdo)
- Sidebar de deliverys (lado derecho)
- Indicadores de estado en tiempo real

#### Mapa
- Marcadores rojos para deliverys activos
- Popups con información detallada
- Rutas trazadas automáticamente
- Auto-zoom para mostrar todos los deliverys

## 🗺️ Funcionalidades del Mapa

### Marcadores
```javascript
// Cada delivery aparece como un marcador rojo
<Marker
  longitude={delivery.longitude}
  latitude={delivery.latitude}
  onClick={() => handleMarkerClick(delivery)}
>
  <div className="delivery-marker" />
</Marker>
```

### Rutas
- Se cargan automáticamente al hacer clic en un marcador
- Utilizan el historial de ubicaciones del delivery
- Líneas azules por defecto, rojas cuando están seleccionadas

### Popups
- Muestran información en tiempo real
- Kilometraje, duración, velocidad promedio
- ID del empleado y estado del viaje

## 📡 Tiempo Real con Socket.io

### Conexión
```javascript
import socketService from '../services/socket';

// En Dashboard.jsx
useEffect(() => {
  if (token && user?.role === 'admin') {
    socketService.connect(token);
  }
}, [token, user]);
```

### Eventos Soportados

#### locationUpdate
```javascript
// Se ejecuta cada 10 segundos cuando un delivery envía su ubicación
socketService.onLocationUpdate((data) => {
  console.log('Nueva ubicación:', data);
  // Actualizar estado de deliverys
});
```

#### tripStarted
```javascript
// Cuando un delivery inicia un viaje
socketService.onTripStarted((data) => {
  toast.success(`${data.deliveryName} ha iniciado un viaje`);
});
```

#### tripCompleted
```javascript  
// Cuando un delivery termina un viaje
socketService.onTripCompleted((data) => {
  toast.success(`${data.deliveryName} completó su viaje`);
});
```

## 🔐 Autenticación

### Context Pattern
```javascript
// AuthContext.jsx
const { user, isAuthenticated, login, logout } = useAuth();

// Login
const result = await login({
  email: 'admin@bostonburgers.com',
  password: 'password123'
});
```

### Protección de Rutas
```javascript
// Solo admins pueden acceder
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
```

## 📱 Responsive Design

### Breakpoints
```css
/* Desktop */
@media (min-width: 992px) {
  .dashboard-main {
    flex-direction: row;
  }
  
  .map-container { flex: 1; }
  .deliveries-sidebar { width: 400px; }
}

/* Mobile */
@media (max-width: 991px) {
  .dashboard-main {
    flex-direction: column;
  }
  
  .deliveries-sidebar {
    width: 100%;
    height: 300px;
  }
}
```

### Adaptaciones Móviles
- Sidebar se convierte en panel inferior
- Mapas con controles táctiles optimizados
- Cards de deliverys más compactas
- Navegación simplificada

## 🧪 Testing y Debug

### Datos de Prueba

#### Login Admin
```javascript
{
  email: 'admin@bostonburgers.com',
  password: 'password123'
}
```

#### Simular Deliverys Activos
```bash
# En backend, crear viajes de prueba
node scripts/createUsers.js
```

### Debug del Mapa
Si el mapa no aparece:

1. **Verificar token de Mapbox**
```javascript
// En MapComponent.jsx
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
if (!MAPBOX_TOKEN) {
  console.error('Token de Mapbox no configurado');
}
```

2. **Verificar CORS**
```javascript
// En backend server.js  
app.use(cors({
  origin: "http://localhost:3000", // Frontend URL
  credentials: true
}));
```

### Debug de Socket.io
```javascript
// En console del navegador
socket.connected // true si está conectado
socket.id       // ID de la conexión
```

## 🚀 Build y Despliegue

### Desarrollo
```bash
npm run dev
# Servidor en http://localhost:3000
```

### Producción
```bash
# Construir
npm run build

# Preview (opcional)
npm run preview

# El build estará en /build
```

### Variables de Producción
```env
VITE_API_URL=https://api.tudominio.com/api
VITE_SOCKET_URL=https://api.tudominio.com
VITE_MAPBOX_TOKEN=pk.real-production-token
```

### Servir con Nginx
```nginx
server {
    listen 80;
    server_name tracker.bostonburgers.com;
    
    root /var/www/boston-tracker/build;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🎯 Características Especiales

### Auto-refresh de Datos
```javascript
// Recargar deliverys cada 30 segundos como backup
useEffect(() => {
  const interval = setInterval(loadDeliveries, 30000);
  return () => clearInterval(interval);
}, []);
```

### Notificaciones Toast
```javascript
import toast from 'react-hot-toast';

// Éxito
toast.success('¡Delivery conectado!');

// Error  
toast.error('Error de conexión');

// Loading
toast.loading('Cargando...');
```

### Manejo de Estados de Carga
```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

if (loading) return <Spinner />;
if (error) return <Alert variant="danger">{error}</Alert>;
```

## 📊 Métricas Mostradas

### Por Delivery
- **Kilometraje**: Total recorrido en el viaje actual
- **Duración**: Tiempo desde el inicio del viaje  
- **Velocidad**: Promedio calculado (km/h)
- **Última ubicación**: Coordenadas y timestamp
- **Estado**: Activo, pausado, completado

### Globales
- **Total deliverys activos**: Número actual
- **Kilometraje total**: Suma de todos los viajes
- **Tiempo activo**: Suma de duraciones

## ⚠️ Notas Importantes

1. **Solo para administradores** - Deliverys no pueden acceder
2. **Token de Mapbox obligatorio** - Obtener en mapbox.com
3. **HTTPS en producción** - Para geolocalización y seguridad
4. **Timeout de socket** - Se reconecta automáticamente
5. **Cache del navegador** - Limpiar si hay problemas de actualización

## 🐛 Troubleshooting Común

| Problema | Solución |
|----------|----------|
| Mapa no carga | Verificar token Mapbox en .env |
| Socket.io no conecta | Verificar URL del backend y CORS |
| Login no funciona | Verificar API URL y que backend esté corriendo |
| Datos no actualizan | Verificar conexión a internet y console errors |
| Build falla | Verificar todas las variables de entorno |
