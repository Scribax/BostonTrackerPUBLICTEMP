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

## 📊 **NUEVA FUNCIONALIDAD: Historial de Viajes Completados**

### 🆕 Características Agregadas (Sept 2, 2025)

#### 📋 **Gestión de Historial de Viajes**
- **Nueva pestaña** "Historial de Viajes" en el dashboard administrativo
- **Visualización completa** de todos los viajes completados con métricas detalladas
- **Estadísticas agregadas** por delivery: kilómetros totales, horas trabajadas, velocidad promedio
- **Búsqueda y filtrado** por nombre de delivery o ID de empleado
- **Ordenamiento** por cualquier columna (fecha, duración, distancia, velocidad)
- **Paginación** para manejar grandes volúmenes de datos
- **Eliminación controlada** de viajes del historial (solo administradores)

#### 🔍 **Información Detallada por Viaje**
- **Métricas completas:** distancia, duración, velocidad promedio/máxima
- **Ubicaciones:** puntos GPS de inicio y final con coordenadas precisas
- **Timestamps:** fechas y horas exactas de inicio y finalización
- **Rutas:** número total de puntos GPS registrados durante el viaje
- **Métricas en tiempo real:** datos de velocidad y tracking si están disponibles

#### 🗑️ **Gestión de Datos**
- **Eliminación segura:** confirmación requerida antes de eliminar
- **Protección de datos:** no se pueden eliminar viajes activos
- **Cascade delete:** elimina automáticamente las ubicaciones asociadas
- **Logs de auditoría:** registro de todas las eliminaciones

#### 🎯 **Endpoints API Nuevos**
```bash
GET  /api/trips/history     # Obtener historial paginado de viajes
GET  /api/trips/:id         # Obtener detalles de un viaje específico  
DELETE /api/trips/:id       # Eliminar viaje del historial (solo admin)
```

#### 💡 **Casos de Uso**
- **Análisis de rendimiento** de deliveries individuales
- **Reportes gerenciales** de productividad y eficiencia
- **Auditoría de rutas** y tiempos de entrega
- **Gestión de espacio** eliminando datos históricos innecesarios
- **Métricas de negocio** para optimización operativa

#### 🔧 **Detalles Técnicos**
- **Componente:** `TripHistory.jsx` con Bootstrap y React hooks
- **Servicio:** `tripService.js` para comunicación con API
- **Paginación:** 20 registros por página por defecto
- **Filtros:** búsqueda en tiempo real sin necesidad de botones
- **UI/UX:** modales para detalles y confirmaciones de eliminación

---


## 📱 **NUEVA FUNCIONALIDAD: Envío de APK via WhatsApp**

### 🆕 Características Agregadas (Sept 2, 2025 - 16:35)

#### 📲 **Gestión de APK desde Dashboard Admin**
- **Nueva pestaña "Gestión APK"** en el dashboard administrativo
- **Envío directo via WhatsApp** a deliveries registrados o números personalizados
- **Información completa del APK** (tamaño, versión, características)
- **Enlaces de descarga** con opción de copiar URL
- **Mensajes predefinidos** con instrucciones completas de instalación

#### 🚀 **Funcionalidades Implementadas:**

1. **📋 Información del APK:**
   - Nombre del archivo y tamaño (69.1 MB)
   - Versión actual (1.0.1)
   - Fecha de build y compatibilidad
   - Lista de características principales
   - Última fecha de modificación

2. **📱 Envío via WhatsApp:**
   - **Selección de delivery** desde lista de usuarios registrados
   - **Número personalizado** para nuevos deliveries
   - **Mensaje personalizable** o uso de plantilla predeterminada
   - **Vista previa** del mensaje antes de enviar
   - **Apertura automática** de WhatsApp Web/App

3. **👥 Lista de Deliveries:**
   - **Envío rápido** con un click a deliveries con teléfono registrado
   - **Estado visual** de deliveries activos/inactivos
   - **Formato de números** argentinos (+54 9 XXX XXX-XXXX)
   - **Validación automática** de teléfonos disponibles

#### 🔧 **Implementación Técnica:**

**Backend (2 nuevos endpoints):**
- `POST /api/apk/send-whatsapp` - Generar enlace de WhatsApp
- `GET /api/apk/info` - Información del APK

**Frontend (nuevos componentes):**
- `APKManager.jsx` - Componente principal de gestión
- `apkService.js` - Servicio de comunicación con API
- Integración en `Dashboard.jsx` como cuarta pestaña

#### 📲 **Mensaje Predeterminado:**
```
🍔 BOSTON American Burgers - App Delivery

¡Hola [Nombre]! 👋

Te envío la aplicación oficial de BOSTON Tracker para que puedas comenzar a trabajar como delivery.

📱 Descarga la app aquí:
http://185.144.157.163/apk/boston-tracker-latest.apk

📋 Instrucciones:
1️⃣ Descarga el archivo APK
2️⃣ Permite instalación de "Fuentes desconocidas"
3️⃣ Instala la aplicación
4️⃣ Usa tus credenciales de empleado para login

🚀 ¡Listo para comenzar!

Cualquier duda, no dudes en contactarme.

---
BOSTON American Burgers 🍔
```

#### 🌍 **Flujo de Uso:**

1. **Admin accede** a "Gestión APK" en dashboard
2. **Selecciona delivery** o ingresa número personalizado
3. **Personaliza mensaje** (opcional)
4. **Click "Enviar via WhatsApp"** → abre WhatsApp con mensaje listo
5. **Admin envía** el mensaje con un click
6. **Delivery recibe** enlace y puede descargar APK inmediatamente

#### 🔒 **Seguridad y Validaciones:**
- ✅ Solo administradores pueden acceder
- ✅ Validación de números de teléfono
- ✅ Sanitización de inputs
- ✅ Logs de auditoría en backend
- ✅ Protección contra spam

---

