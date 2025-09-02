# 🗄️ Boston Tracker Backend

API backend robusta para el sistema de seguimiento de deliveries de BOSTON American Burgers. Desarrollada con Node.js, Express, PostgreSQL y Socket.io para comunicación en tiempo real.

## 🚀 **Estado Actual**

✅ **Completamente funcional en producción**
- **Servidor**: 185.144.157.163:5000
- **Base de datos**: PostgreSQL activa
- **WebSocket**: Socket.io operativo
- **Autenticación**: JWT implementada

## 🏗️ **Arquitectura**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   📱 Mobile App  │    │  🌐 Dashboard    │    │  🗄️ PostgreSQL  │
│  HTTP + Socket  │◄──►│  HTTP + Socket  │◄──►│   Database     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  🔌 Socket.io    │
                    │  Real-time API  │
                    └─────────────────┘
```

## 📊 **Base de Datos (PostgreSQL)**

### Modelos Principales

#### 🧑‍💼 **User**
```sql
- id (UUID, PK)
- name (STRING)
- email (STRING, unique, nullable)
- employeeId (STRING, unique, nullable)
- password (STRING, hashed)
- role (ENUM: 'admin', 'delivery')
- phone (STRING, nullable)
- isActive (BOOLEAN, default: true)
```

#### 🚗 **Trip**
```sql
- id (UUID, PK)
- deliveryId (UUID, FK → User.id)
- startTime (DATE)
- endTime (DATE, nullable)
- status (ENUM: 'active', 'completed')
- mileage (FLOAT, km)
- duration (INTEGER, minutes)
- averageSpeed (FLOAT, km/h)
- realTimeMetrics (TEXT, JSON)
```

#### 📍 **Location**
```sql
- id (UUID, PK)
- tripId (UUID, FK → Trip.id)
- latitude (DOUBLE)
- longitude (DOUBLE)
- accuracy (FLOAT, nullable)
- timestamp (DATE)
```

## 🔌 **API Endpoints**

### 🔐 **Autenticación**
```http
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### 👥 **Gestión de Usuarios (Admin)**
```http
GET    /api/auth/users
POST   /api/auth/users
PUT    /api/auth/users/:id
DELETE /api/auth/users/:id
```

### 🚚 **Deliveries y Tracking**
```http
GET  /api/deliveries           # Obtener deliveries activos (admin)
GET  /api/deliveries/my-trip   # Mi viaje activo (delivery)
POST /api/deliveries/:id/start # Iniciar viaje
POST /api/deliveries/:id/stop  # Detener viaje
POST /api/deliveries/:id/location    # Actualizar ubicación
POST /api/deliveries/:id/metrics     # Actualizar métricas en tiempo real
```

### 🏥 **Sistema**
```http
GET /api/health                # Health check
```

## 📡 **WebSocket Events**

### 📨 **Eventos Emitidos por el Servidor**
```javascript
// Para Admins
'tripStarted'           // Nuevo viaje iniciado
'tripCompleted'         // Viaje completado
'locationUpdate'        // Actualización de ubicación
'realTimeMetricsUpdate' // Métricas en tiempo real

// Para Deliveries
'tripStatusChanged'     // Cambio de estado del viaje
```

### 📩 **Eventos Recibidos del Cliente**
```javascript
'join-admin'           // Admin se une al room
'join-delivery'        // Delivery se une a su room específico
```

## 🔧 **Configuración**

### Variables de Entorno
```bash
# Base de datos
DB_NAME=boston_tracker
DB_USER=boston_user
DB_PASSWORD=boston123
DB_HOST=localhost
DB_PORT=5432

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# Servidor
PORT=5000
NODE_ENV=production
```

### 🛡️ **Seguridad Implementada**

- **Helmet.js**: Headers de seguridad
- **CORS**: Configurado para orígenes específicos
- **Rate Limiting**: 200 requests/minuto (300 para ubicaciones)
- **JWT Authentication**: Tokens seguros
- **bcryptjs**: Passwords hasheadas
- **Input Validation**: Validación de datos

## 🧮 **Algoritmos de Cálculo**

### 📏 **Distancia Haversine**
```javascript
// Fórmula precisa para calcular distancias GPS
function calculateHaversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371.0; // Radio terrestre en km
  // Implementación matemática precisa
}
```

### 🎯 **Filtrado de Ruido GPS**
```javascript
// Filtrar ubicaciones erróneas
function filterGPSNoise(locations, minDistanceMeters = 5) {
  // Solo incluir movimientos > 5 metros
}
```

## 🚀 **Instalación**

### 1. Dependencias
```bash
npm install
```

### 2. Base de Datos
```bash
# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Crear base de datos
sudo -u postgres createdb boston_tracker
sudo -u postgres createuser boston_user
```

### 3. Ejecutar
```bash
# Desarrollo
npm run dev

# Producción
node server-postgres.js
```

## 📊 **Logging y Monitoreo**

### 🔍 **Logs Detallados**
- Todas las requests HTTP con headers y body
- Errores de autenticación y autorización
- Conexiones y desconexiones de WebSocket
- Métricas de tracking en tiempo real

### 📈 **Rate Limiting**
- **General**: 200 requests/minuto
- **Ubicaciones**: 300 requests/minuto (tracking frecuente)
- **Headers**: RateLimit-* información

## 🔌 **WebSocket Rooms**

### 👔 **Admins Room**
```javascript
socket.join('admins');
// Recibe: tripStarted, tripCompleted, locationUpdate, realTimeMetricsUpdate
```

### 🚚 **Delivery Rooms**
```javascript
socket.join(`delivery-${deliveryId}`);
// Recibe: tripStatusChanged específico para el delivery
```

## 🧪 **Testing**

### Health Check
```bash
curl http://185.144.157.163:5000/api/health
```

### Login Test
```bash
curl -X POST http://185.144.157.163:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"employeeId":"DEL001","password":"123456"}'
```

## 🚨 **Problemas Resueltos**

- ✅ **Ruta logout faltante**: Agregada `/api/auth/logout`
- ✅ **CORS para mobile**: `origin: true` para apps móviles
- ✅ **Rate limiting optimizado**: Frecuencia alta para tracking
- ✅ **Logging detallado**: Debug completo de requests

## 📁 **Archivos Principales**

- `server-postgres.js` - Servidor principal con todas las rutas
- `controllers/authController.js` - Lógica de autenticación
- `routes/auth.js` - Definición de rutas (no usado actualmente)
- `middleware/auth.js` - Middleware de protección JWT

## 🔮 **Próximas Mejoras**

- [ ] Separar rutas en archivos individuales
- [ ] Implementar rate limiting por usuario
- [ ] Añadir logs persistentes en archivos
- [ ] Métricas de rendimiento del servidor
- [ ] API versioning

---

**Estado**: ✅ Producción | **Puerto**: 5000 | **DB**: PostgreSQL
