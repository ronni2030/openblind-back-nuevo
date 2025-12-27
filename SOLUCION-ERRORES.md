# 🔧 SOLUCIÓN DE ERRORES - Backend

## ❌ Error: "Cannot find module '../../domain/models/sql/configuracion'"

### **Causa del error:**
Los archivos nuevos que creé (modelos admin y controladores) NO están en tu sistema Windows todavía. Solo están en el repositorio de Git.

---

## ✅ SOLUCIÓN RÁPIDA

### **Paso 1: Descargar los cambios**

```bash
# En la terminal de tu proyecto
git pull origin claude/age-restricted-accessibility-feature-zXOvx
```

Esto descargará TODOS los archivos nuevos:
- ✅ `src/domain/models/sql/admin/incidencia.js`
- ✅ `src/domain/models/sql/admin/ticketSoporte.js`
- ✅ `src/infrastructure/http/controllers/admin/incidencias.controller.js`
- ✅ `src/infrastructure/http/controllers/admin/soporte.controller.js`
- ✅ `frontend-admin/src/features/` (todas las nuevas screens)
- ✅ `frontend-admin/src/shared/components/` (componentes compartidos)
- ✅ `frontend-admin/src/services/api.js` (cliente HTTP)

---

### **Paso 2: Verificar que los archivos existan**

```bash
# Verificar modelos admin
ls src/domain/models/sql/admin/

# Deberías ver:
# incidencia.js
# ticketSoporte.js
```

```bash
# Verificar controladores admin
ls src/infrastructure/http/controllers/admin/

# Deberías ver:
# configuracionGlobal.controller.js
# incidencias.controller.js
# metricas.controller.js
# soporte.controller.js
```

---

### **Paso 3: Intentar arrancar el backend de nuevo**

```bash
npm run dev
```

---

## 🔍 SI AÚN HAY ERRORES

### **Error: "Cannot find module '../../../config/database'"**

**Solución:** Verifica que existe `src/domain/config/database.js`

```bash
# Verificar que existe
ls src/domain/config/

# Debería mostrar: database.js
```

Si NO existe, créalo con este contenido:

```javascript
/**
 * Exporta la conexión de Sequelize para los modelos SQL
 */
const { sequelize } = require('../../infrastructure/database/connection/dataBase.orm');
module.exports = sequelize;
```

---

### **Error: MySQL connection refused**

```
❌ No se pudo conectar a MySQL: connect ECONNREFUSED 127.0.0.1:3306
```

**Solución:**

#### Opción A: Iniciar MySQL

**Windows:**
```bash
# Si tienes XAMPP
# Abrir XAMPP Control Panel → Start MySQL

# Si tienes MySQL instalado como servicio
net start MySQL80
```

**Linux/Mac:**
```bash
sudo service mysql start
```

#### Opción B: Verificar variables de entorno

Asegúrate de que tienes configuradas las variables de entorno:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_contraseña
DB_NAME=openblind
DB_PORT=3306
```

---

## 📋 CHECKLIST DE VERIFICACIÓN

Antes de correr `npm run dev`, verifica:

- [ ] ✅ Hiciste `git pull` para descargar los nuevos archivos
- [ ] ✅ Existe `src/domain/config/database.js`
- [ ] ✅ Existe `src/domain/models/sql/admin/` con 2 archivos
- [ ] ✅ Existe `src/infrastructure/http/controllers/admin/` con 4 archivos
- [ ] ✅ MySQL está corriendo
- [ ] ✅ Las variables de entorno están configuradas

---

## 🚀 ORDEN DE EJECUCIÓN CORRECTO

### **1. Backend (Terminal 1)**

```bash
# Asegurarse de estar en la raíz del proyecto
cd C:\Users\user\Desktop\openblind\estructura-hexagonal

# Iniciar el backend
npm run dev
```

**Esperar a ver:**
```
✅ Servidor corriendo en http://localhost:8888
✅ MySQL conectado correctamente
```

### **2. Frontend (Terminal 2)**

```bash
# Ir a la carpeta frontend-admin
cd C:\Users\user\Desktop\openblind\estructura-hexagonal\frontend-admin

# Instalar dependencias (solo la primera vez)
npm install

# Iniciar el frontend
npm run dev
```

**Esperar a ver:**
```
➜  Local:   http://localhost:5174/
```

### **3. Abrir el navegador**

Ir a: **http://localhost:5174**

---

## 🔎 ARCHIVOS CRÍTICOS QUE DEBEN EXISTIR

### **Backend:**

```
src/
├── domain/
│   ├── config/
│   │   └── database.js                    ← CRÍTICO
│   └── models/sql/
│       ├── configuracion.js               ← CRÍTICO
│       ├── configuracionGlobal.js         ← CRÍTICO
│       └── admin/
│           ├── incidencia.js              ← NUEVO
│           └── ticketSoporte.js           ← NUEVO
│
└── infrastructure/
    └── http/
        ├── controllers/
        │   ├── configuracion.controller.js
        │   └── admin/
        │       ├── configuracionGlobal.controller.js
        │       ├── metricas.controller.js
        │       ├── incidencias.controller.js    ← NUEVO
        │       └── soporte.controller.js        ← NUEVO
        └── router/
            ├── configuracion.router.js
            └── admin.router.js
```

### **Frontend:**

```
frontend-admin/src/
├── app/
│   ├── App.jsx                            ← NUEVO
│   ├── entrypoint/main.jsx
│   └── styles/index.css
│
├── features/                              ← NUEVO
│   ├── dashboard/screens/
│   ├── incidencias/screens/
│   ├── soporte/screens/
│   └── configuracion/screens/
│
├── shared/                                ← NUEVO
│   └── components/
│       ├── Card.jsx
│       ├── Button.jsx
│       ├── Badge.jsx
│       └── Layout.jsx
│
└── services/                              ← NUEVO
    └── api.js
```

---

## 💡 COMANDOS ÚTILES PARA DEBUGGING

### **Ver qué archivos faltan:**

```bash
# Backend
git status

# Si dice "Your branch is behind 'origin/...'", ejecuta:
git pull
```

### **Verificar estructura de carpetas:**

```bash
# Windows PowerShell
tree src/domain/models/sql /F
tree src/infrastructure/http/controllers /F

# CMD
tree src\domain\models\sql /F
tree src\infrastructure\http\controllers /F
```

### **Probar que los modelos se cargan:**

```bash
node -e "const i = require('./src/domain/models/sql/admin/incidencia'); console.log('OK:', i.name);"
```

---

## 📞 SI NADA FUNCIONA

### **Solución nuclear (último recurso):**

```bash
# 1. Eliminar node_modules
rm -rf node_modules
rm package-lock.json

# 2. Limpiar caché de npm
npm cache clean --force

# 3. Reinstalar todo
npm install

# 4. Intentar de nuevo
npm run dev
```

---

## ✅ RESUMEN

**El problema principal es que los archivos nuevos NO están en tu sistema.**

**Solución:**
```bash
git pull origin claude/age-restricted-accessibility-feature-zXOvx
npm run dev
```

Si ves errores de MySQL, asegúrate de que MySQL esté corriendo.

---

**Preparado por:** Claude Code
**Fecha:** 2025-12-27
