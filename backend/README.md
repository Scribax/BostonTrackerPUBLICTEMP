# 🔧 Backend - BOSTON Tracker API

API REST con WebSockets para el sistema de tracking de deliverys.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Crear usuarios de prueba
node scripts/createUsers.js

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## 📋 Stack Tecnológico

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Base de Datos**: MongoDB con Mongoose
- **Tiempo Real**: Socket.io
- **Autenticación**: JWT (jsonwebtoken)
- **Seguridad**: bcryptjs, helmet, cors, rate-limiting
- **Ambiente**: dotenv

## 🗂️ Estructura de Archivos

```
backend/
├── controllers/
│   ├── authController.js      # Controladores de autenticación
│   └── deliveryController.js  # Controladores de deliveries
├── middleware/
│   └── auth.js               # Middleware de autenticación
├── models/
│   ├── User.js               # Modelo de usuarios
│   └── DeliveryTrip.js       # Modelo de viajes
├── routes/
│   ├── auth.js               # Rutas de autenticación
│   └── deliveries.js         # Rutas de deliveries
├── scripts/
│   └── createUsers.js        # Script para crear usuarios
├── utils/
│   └── generateToken.js      # Utilidad para JWT
├── server.js                 # Servidor principal
├── package.json
└── .env.example
```

## 🔧 Configuración

### Variables de Entorno (.env)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/boston-tracker
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
JWT_EXPIRE=7d
MAP_API_KEY=your-google-maps-api-key-here
```

### MongoDB

Asegúrate de tener MongoDB ejecutándose:

```bash
# Iniciar MongoDB (Linux/Mac)
sudo systemctl start mongod

# O usar Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 📚 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/me` | Usuario actual | Sí |
| POST | `/api/auth/logout` | Cerrar sesión | Sí |

### Deliveries

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/api/deliveries` | Lista deliverys activos | Sí | Admin |
| GET | `/api/deliveries/my-trip` | Viaje activo actual | Sí | Delivery |
| POST | `/api/deliveries/:id/start` | Iniciar viaje | Sí | Owner/Admin |
| POST | `/api/deliveries/:id/stop` | Detener viaje | Sí | Owner/Admin |
| POST | `/api/deliveries/:id/location` | Actualizar ubicación | Sí | Owner/Admin |
| GET | `/api/deliveries/:id/history` | Historial ubicaciones | Sí | Owner/Admin |

## 📡 WebSocket Events

### Cliente → Servidor
```javascript
socket.emit('join-admin'); // Unirse al room de admins
```

### Servidor → Cliente (Solo Admins)
```javascript
// Nueva ubicación de delivery
socket.on('locationUpdate', {
  tripId,
  deliveryId,
  deliveryName,
  currentLocation: { latitude, longitude, timestamp },
  mileage,
  duration
});

// Viaje iniciado
socket.on('tripStarted', {
  tripId,
  deliveryId,
  deliveryName,
  startTime,
  currentLocation
});

// Viaje completado
socket.on('tripCompleted', {
  tripId,
  deliveryId,
  deliveryName,
  endTime,
  totalMileage,
  duration
});
```

## 👥 Usuarios de Prueba

El script `createUsers.js` crea:

### Admin
- **Email**: admin@bostonburgers.com
- **Password**: password123

### Deliverys
- **ID**: DEL001, **Password**: delivery123 (Juan Pérez)
- **ID**: DEL002, **Password**: delivery123 (María González)  
- **ID**: DEL003, **Password**: delivery123 (Carlos Rodríguez)

```bash
node scripts/createUsers.js
```

## 🔒 Seguridad

### Implementado
- ✅ **JWT Authentication**: Tokens con expiración
- ✅ **Password Hashing**: bcrypt con salt rounds
- ✅ **Rate Limiting**: 100 requests/15min por IP
- ✅ **CORS**: Configurado para orígenes permitidos
- ✅ **Helmet**: Headers de seguridad
- ✅ **Input Validation**: Mongoose schemas
- ✅ **Authorization**: Middleware de roles y ownership

### Headers de Seguridad
```javascript
// Aplicados automáticamente por Helmet
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

## 📊 Modelos de Datos

### User Schema
```javascript
{
  name: String,
  email: String,          // Solo para admins
  employeeId: String,     // Solo para deliverys  
  password: String,       // Hasheado con bcrypt
  role: 'admin' | 'delivery',
  isActive: Boolean,
  lastLogin: Date
}
```

### DeliveryTrip Schema
```javascript
{
  deliveryId: ObjectId,
  deliveryName: String,
  startTime: Date,
  endTime: Date,
  status: 'active' | 'completed' | 'paused',
  locations: [{
    latitude: Number,
    longitude: Number, 
    timestamp: Date,
    accuracy: Number
  }],
  mileage: Number,
  currentLocation: {
    latitude: Number,
    longitude: Number,
    timestamp: Date
  }
}
```

## 🧮 Cálculo de Distancias

Utiliza la **fórmula Haversine** para calcular distancias precisas:

```javascript
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distancia en km
}
```

## 🐛 Debug y Logs

### Logs del Servidor
```bash
# Ver logs en tiempo real
npm run dev

# Logs específicos
DEBUG=socket.io* npm run dev  # Solo Socket.io
DEBUG=mongoose* npm run dev   # Solo MongoDB
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

Respuesta:
```json
{
  "status": "OK",
  "message": "Boston Tracker API funcionando",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🚀 Despliegue

### Desarrollo
```bash
npm run dev  # Usa nodemon para auto-reload
```

### Producción
```bash
npm start    # Servidor básico
# O mejor con PM2:
pm2 start server.js --name="boston-tracker-api"
pm2 logs boston-tracker-api
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📈 Escalabilidad

### Para más de 50 deliverys:
1. **Load Balancing**: nginx + múltiples instancias
2. **Database Scaling**: MongoDB replica sets
3. **Redis**: Para sesiones y cache de Socket.io
4. **Clustering**: Node.js cluster module

### Configuración con Redis:
```javascript
const redis = require('redis');
const client = redis.createClient();

io.adapter(require('socket.io-redis')({
  host: 'localhost',
  port: 6379
}));
```

## ⚠️ Notas Importantes

1. **Cambiar JWT_SECRET en producción**
2. **Usar HTTPS en producción**
3. **Configurar CORS para dominio específico**
4. **Implementar backup de MongoDB**
5. **Monitoreo con Winston/Morgan**
6. **Variables sensibles en variables de entorno**

## 🧪 Testing

```bash
# Ejecutar tests (cuando se implementen)
npm test

# Test de conexión
curl -X GET http://localhost:5000/api/health

# Test de login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bostonburgers.com","password":"password123"}'
```
