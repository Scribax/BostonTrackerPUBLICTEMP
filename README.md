# 🍔 BOSTON Tracker - Sistema de Deliverys

Sistema completo de tracking de deliverys en tiempo real con dashboard web y aplicación móvil para **BOSTON American Burgers**.

## 🚀 Características Principales

- 📱 **App Móvil**: Android nativa con GPS en tiempo real
- 🗺️ **Dashboard Web**: Mapa interactivo con tracking en vivo  
- 📡 **Tiempo Real**: WebSocket para actualizaciones instantáneas
- 🔐 **Autenticación**: Sistema seguro para admin y deliverys
- 📊 **Analíticas**: Métricas de rendimiento y rutas
- 📦 **Base de Datos**: SQLite integrada, sin configuración externa

## 🏗️ Arquitectura del Sistema

```
Boston Tracker/
├── backend/          # API Node.js + Express
│   ├── routes/        # Rutas de la API
│   ├── controllers/   # Lógica de negocio
│   ├── models/        # Modelos de datos
│   └── middleware/    # Autenticación y CORS
│
├── frontend/         # Dashboard React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── public/
│
├── mobile-app/      # App React Native (Expo)
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   └── services/
│   └── assets/
│
└── scripts/         # Scripts de utilidad
    ├── install.sh     # Instalación automática
    ├── build-apk.sh   # Compilar APK
    ├── setup.sh       # Configuración inicial
    └── quick-build.sh # Build rápido
```

## ⚡ Instalación Rápida

### Opción 1: Script Automático (Recomendado)
```bash
./scripts/install.sh
```

### Opción 2: Instalación Manual
```bash
# Backend
cd backend
npm install
npm start

# Frontend (nueva terminal)
cd ../frontend  
npm install
npm start

# Mobile App
cd ../mobile-app
npm install
npx expo start
```

## 📱 Compilar APK

```bash
./scripts/build-apk.sh
```

El script:
1. Detecta tu IP automáticamente
2. Configura la app móvil
3. Compila APK con Expo EAS Build
4. Te proporciona el link de descarga

## 🎮 Cómo Usar

### 1. Dashboard Web
- **URL**: http://localhost:3000
- **Admin**: `admin@bostonburgers.com` / `password123`
- **Funciones**: Ver mapa, asignar pedidos, tracking en vivo

### 2. App Móvil
- **Usuarios**: `DEL001`, `DEL002`, `DEL003`
- **Contraseña**: `delivery123`
- **Funciones**: GPS, cambiar estado, notificaciones

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `./scripts/install.sh` | Instalación completa automática |
| `./scripts/build-apk.sh` | Compilar APK Android |
| `./scripts/setup.sh` | Configuración inicial del proyecto |
| `./scripts/quick-build.sh` | Build rápido para desarrollo |
| `./scripts/sign-apk.sh` | Firmar APK para distribución |

## 🌐 Configuración de Red

### Puertos Utilizados
- **3000**: Frontend (Dashboard)
- **5000**: Backend (API)

### Para Uso Externo
1. Configurar port forwarding en router (puerto 5000)
2. La app móvil detectará automáticamente la IP

## 📊 Estado del Proyecto

- ✅ **Backend**: Completado y funcional
- ✅ **Frontend**: Dashboard completo con mapa
- ✅ **Mobile App**: GPS tracking y estados
- ✅ **Autenticación**: Sistema seguro implementado
- ✅ **Base de Datos**: SQLite configurada
- ✅ **Scripts**: Instalación automática
- ✅ **APK Build**: Compilación automática
- ✅ **Paquete Cliente**: Sistema plug & play listo

## 🚚 Funcionalidades

### Dashboard Web
- 🗺️ **Mapa en tiempo real** con ubicación de deliverys
- 📈 **Métricas** de rendimiento y estadísticas
- 📋 **Gestión de pedidos** y asignaciones
- 📱 **Notificaciones** en tiempo real

### App Móvil
- 📍 **GPS tracking** preciso y continuo
- 🔄 **Cambio de estados**: Disponible, En camino, Entregado
- 📲 **Notificaciones push** para nuevos pedidos
- 🗺️ **Navegación** integrada

## 📝 Archivos de Configuración

- `.env.template` - Plantilla de variables de entorno
- `package.json` - Configuración de dependencias del proyecto

## 📞 Soporte

Sistema desarrollado específicamente para **BOSTON American Burgers**.  
Para soporte técnico, contactar al administrador del sistema.

---

**🍔 BOSTON Tracker v1.0.0 - Sistema profesional listo para producción**
