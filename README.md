# 🍔 Boston Tracker - Sistema de Seguimiento de Entregas

Sistema completo de seguimiento en tiempo real para deliveries de **BOSTON American Burgers**. Incluye dashboard web para administradores, API backend robusta y aplicación móvil para repartidores.

## 🌟 Características Principales

- 📱 **App móvil React Native** para repartidores con tracking GPS
- 🌐 **Dashboard web React** para administradores  
- 🗄️ **API REST robusta** con Node.js y PostgreSQL
- 🔄 **Comunicación en tiempo real** con Socket.io
- 🗺️ **Mapas interactivos** con Leaflet y OpenStreetMap
- 📊 **Analytics y reportes** de deliveries

## 🌐 URLs del Sistema

- **🌐 Dashboard Web:** http://185.144.157.163/
- **📄 Contratos y Términos:** http://185.144.157.163/contratos/
- **📱 Descarga APK:** http://185.144.157.163/apk/boston-tracker-latest.apk
- **🔌 API Backend:** http://185.144.157.163:3001/

## 📂 Estructura del Proyecto

```
boston-tracker/
├── 📱 apk/           # Archivos APK para descarga
│   ├── boston-tracker-latest.apk
│   └── README.txt
├── 🖥️  backend/       # API y servidor Node.js
│   ├── src/
│   ├── package.json
│   └── README.md
├── 📄 contratos/     # Página de términos y contratos
│   └── index.html
├── 📚 docs/          # Documentación del proyecto
│   ├── ANEXO_INVENTARIO_TECNICO.md
│   ├── CHECKLIST_TRANSFERENCIA.md
│   ├── CONTRATO_VENTA_BOSTON_TRACKER.md
│   └── MEJORAS_IMPLEMENTADAS.md
├── 🌐 frontend/      # Dashboard web React
│   ├── src/
│   ├── build/
│   ├── package.json
│   └── README.md
├── 📱 mobile-app/    # Aplicación móvil React Native
│   ├── src/
│   ├── android/
│   ├── package.json
│   └── README.md
├── ⚙️  scripts/      # Scripts de utilidad
└── 📋 README.md      # Este archivo
```

## 🚀 Inicio Rápido

### 1. Clonar el repositorio
```bash
git clone https://github.com/Scribax/BostonTracker.git
cd BostonTracker
```

### 2. Configurar Backend
```bash
cd backend
cp .env.example .env
# Configurar variables de entorno
npm install
npm run dev
```

### 3. Configurar Frontend
```bash
cd frontend
npm install
npm run build
# O para desarrollo: npm run dev
```

### 4. Configurar App Móvil
```bash
cd mobile-app
npm install
# Para Android:
npx expo run:android
```

## 🔧 Tecnologías Utilizadas

### Backend
- **Node.js** con Express
- **PostgreSQL** como base de datos
- **Socket.io** para tiempo real
- **JWT** para autenticación
- **Sequelize** ORM

### Frontend
- **React** con Vite
- **Leaflet** para mapas
- **Socket.io-client** para tiempo real
- **Material-UI** para componentes

### Mobile App
- **React Native** con Expo
- **Expo Location** para GPS
- **AsyncStorage** para datos locales
- **React Navigation** para navegación

## 📱 Instalación de la App

### Opción 1: Descarga Directa
Descarga el APK desde: http://185.144.157.163/apk/boston-tracker-latest.apk

### Opción 2: Build desde código
```bash
cd mobile-app
npm install
npx expo build:android
```

## 🔐 Configuración de Producción

### Variables de Entorno
Copia `.env.template` a `.env` y configura:
```bash
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/boston_tracker

# JWT
JWT_SECRET=tu_secret_super_seguro

# URLs
FRONTEND_URL=http://185.144.157.163
API_URL=http://185.144.157.163:3001
```

### Nginx
La configuración de Nginx está optimizada para servir:
- Frontend en `/`
- Contratos en `/contratos/`
- Descargas APK en `/apk/`
- API proxy en `/api`

## 📊 Estado del Proyecto

- ✅ **Backend:** API completa y funcional
- ✅ **Frontend:** Dashboard responsive y operativo
- ✅ **Mobile App:** APK compilado con permisos de ubicación
- ✅ **Base de datos:** PostgreSQL configurada
- ✅ **Deployment:** Nginx configurado y funcionando
- ✅ **Documentación:** Completa y actualizada

## 🐛 Problemas Resueltos

- ✅ HTTP habilitado en producción para Android
- ✅ Permisos de ubicación configurados correctamente
- ✅ Tracking en background optimizado
- ✅ CORS configurado para todas las rutas
- ✅ Iconos y assets de la app configurados
- ✅ Página de contratos y términos implementada

## 📞 Soporte

- **📧 Email:** soporte@bostontracker.com
- **🐛 Issues:** [GitHub Issues](https://github.com/Scribax/BostonTracker/issues)
- **📚 Documentación:** Ver directorio `docs/`

## 📄 Licencia

Proyecto propietario de BOSTON American Burgers.

---

**Última actualización:** $(date '+%d/%m/%Y %H:%M')  
**Versión:** v1.0.0  
**Estado:** ✅ Producción
