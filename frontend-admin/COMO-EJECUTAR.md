# 🚀 Cómo Ejecutar el Proyecto

## OpenBlind Admin Panel - Guía de Inicio

**Autor:** MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)

---

## 📋 Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- ✅ **Node.js** (v18 o superior)
- ✅ **MySQL** (v5.7 o superior) o **MariaDB**
- ✅ **npm** o **yarn**

---

## 🔧 Configuración Inicial

### **1. Iniciar el Servidor MySQL**

#### En Windows:
```bash
# Opción 1: Servicio de Windows
net start MySQL

# Opción 2: XAMPP
# Abrir XAMPP Control Panel → Start MySQL
```

#### En Linux/Mac:
```bash
# MySQL
sudo service mysql start

# O MariaDB
sudo service mariadb start

# O usando systemctl
sudo systemctl start mysql
```

#### Verificar que MySQL está corriendo:
```bash
# Conectar a MySQL
mysql -u root -p

# Si conecta correctamente, está funcionando
```

---

### **2. Crear la Base de Datos**

```sql
-- Conectar a MySQL
mysql -u root -p

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS openblind CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Salir
EXIT;
```

---

### **3. Configurar las Credenciales de Base de Datos**

El backend busca las credenciales en las **variables de entorno del sistema**.

⚠️ **IMPORTANTE:** No usamos archivos `.env` porque están prohibidos.

#### Opción A: Variables de Entorno del Sistema (Recomendado)

**En Windows (PowerShell como Administrador):**
```powershell
[System.Environment]::SetEnvironmentVariable('DB_HOST', 'localhost', 'User')
[System.Environment]::SetEnvironmentVariable('DB_USER', 'root', 'User')
[System.Environment]::SetEnvironmentVariable('DB_PASS', 'tu_contraseña_mysql', 'User')
[System.Environment]::SetEnvironmentVariable('DB_NAME', 'openblind', 'User')
[System.Environment]::SetEnvironmentVariable('DB_PORT', '3306', 'User')
```

**En Linux/Mac (añadir a ~/.bashrc o ~/.zshrc):**
```bash
export DB_HOST=localhost
export DB_USER=root
export DB_PASS=tu_contraseña_mysql
export DB_NAME=openblind
export DB_PORT=3306
```

Luego ejecuta: `source ~/.bashrc` o `source ~/.zshrc`

#### Opción B: Variables Temporales (Solo para esta sesión)

**Windows (CMD):**
```cmd
set DB_HOST=localhost
set DB_USER=root
set DB_PASS=tu_contraseña_mysql
set DB_NAME=openblind
set DB_PORT=3306
```

**Linux/Mac:**
```bash
export DB_HOST=localhost
export DB_USER=root
export DB_PASS=tu_contraseña_mysql
export DB_NAME=openblind
export DB_PORT=3306
```

---

## 🏃‍♀️ Ejecutar el Proyecto

### **Backend (Puerto 8888)**

```bash
# 1. Ir a la carpeta raíz del proyecto
cd estructura-hexagonal

# 2. Instalar dependencias (solo la primera vez)
npm install

# 3. Iniciar el servidor
npm start

# O en modo desarrollo con auto-reload:
npm run dev
```

**Salida esperada:**
```
✅ Servidor corriendo en http://localhost:8888
✅ MySQL conectado correctamente
✅ Modelos sincronizados
```

**Endpoints disponibles:**
- `http://localhost:8888/api/admin/configuracion` - Configuración global
- `http://localhost:8888/api/admin/metricas/resumen` - Dashboard metrics

---

### **Frontend (Puerto 5174)**

```bash
# 1. Abrir OTRA terminal (no cerrar la del backend)

# 2. Ir a la carpeta frontend-admin
cd estructura-hexagonal/frontend-admin

# 3. Instalar dependencias (solo la primera vez)
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

**Salida esperada:**
```
  VITE v6.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
```

---

## 🌐 Acceder a la Aplicación

Una vez que ambos servidores estén corriendo:

1. **Abrir navegador**
2. **Ir a:** http://localhost:5174
3. **Deberías ver:** Panel de administración de OpenBlind

---

## 🔍 Verificar que Todo Funciona

### **1. Verificar Backend**

```bash
# En otra terminal:
curl http://localhost:8888/api/admin/metricas/resumen
```

**Respuesta esperada (JSON):**
```json
{
  "success": true,
  "data": {
    "usuariosActivos": 1234,
    "rutasPorDia": 567,
    ...
  }
}
```

### **2. Verificar Frontend**

- ✅ Abre http://localhost:5174
- ✅ Deberías ver el Dashboard con las 4 tarjetas de métricas
- ✅ El sidebar debe mostrar las 4 páginas:
  - Dashboard
  - Configuración - Accesibilidad
  - Configuración - Navegación
  - Configuración - Privacidad

---

## ❌ Solución de Problemas

### **Error: "Cannot connect to MySQL"**

**Causa:** MySQL no está ejecutándose

**Solución:**
```bash
# Iniciar MySQL
sudo service mysql start  # Linux/Mac
net start MySQL           # Windows
```

---

### **Error: "Access denied for user 'root'@'localhost'"**

**Causa:** Credenciales incorrectas

**Solución:**
1. Verifica las variables de entorno (`echo %DB_USER%` en Windows, `echo $DB_USER` en Linux)
2. Verifica que puedes conectar manualmente: `mysql -u root -p`
3. Reconfigura las variables de entorno con la contraseña correcta

---

### **Error: "Unknown database 'openblind'"**

**Causa:** Base de datos no creada

**Solución:**
```sql
-- Conectar a MySQL
mysql -u root -p

-- Crear BD
CREATE DATABASE openblind;
```

---

### **Error: "Port 8888 already in use"**

**Causa:** Ya hay un proceso usando el puerto

**Solución Windows:**
```cmd
# Ver qué proceso usa el puerto
netstat -ano | findstr :8888

# Matar el proceso (usar el PID del comando anterior)
taskkill /PID <PID> /F
```

**Solución Linux/Mac:**
```bash
# Ver qué proceso usa el puerto
lsof -i :8888

# Matar el proceso
kill -9 <PID>
```

---

### **Frontend no carga (página en blanco)**

**Solución:**
1. Abre la consola del navegador (F12)
2. Verifica errores en la pestaña "Console"
3. Si dice "Failed to fetch", el backend no está corriendo
4. Si dice "Module not found", ejecuta `npm install` de nuevo

---

## 📁 Estructura del Proyecto

```
estructura-hexagonal/
├── index.js                    # ⭐ Backend: Punto de entrada
├── app.js                      # Backend: Express app
├── src/
│   ├── domain/                 # Modelos y lógica de negocio
│   │   ├── models/sql/         # Modelos Sequelize
│   │   └── config/database.js  # Conexión DB (bridg)
│   ├── infrastructure/
│   │   ├── database/           # Configuración de BD
│   │   └── http/               # Controllers y routes
│   └── ...
│
└── frontend-admin/             # ⭐ Frontend React
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── app/                # FSD: Capa App
        ├── shared/             # FSD: Componentes base
        ├── pages/              # FSD: Páginas
        └── widgets/            # FSD: Widgets
```

---

## 🎯 Para la Exposición del Lunes

### **Demo en Vivo**

1. ✅ Tener MySQL corriendo ANTES de la presentación
2. ✅ Tener backend corriendo (puerto 8888)
3. ✅ Tener frontend corriendo (puerto 5174)
4. ✅ Preparar el navegador en http://localhost:5174

### **Puntos Clave para Explicar**

1. **Arquitectura FSD Completa (7 capas)**
   - app/, shared/, entities/, features/, widgets/, pages/, processes/
   - Public API Pattern con `index.js`
   - Direccionalidad de imports

2. **Dashboard con Métricas Reales**
   - 4 tarjetas: Usuarios, Rutas, Incidentes, Uso de módulos
   - Endpoints REST conectados al backend

3. **Configuración Global (3 secciones)**
   - Accesibilidad: Fuente, tema, idioma, voz
   - Navegación: Longitud, paradas, frecuencia
   - Privacidad: Retención, tracking, historial

4. **Conexión Backend**
   - Arquitectura hexagonal (backend)
   - FSD canónico (frontend)
   - API REST en localhost:8888

---

## 📚 Documentación Adicional

- `ESTRUCTURA-FSD.md` - Explicación completa de FSD
- `COMPARACION-FSD.md` - Análisis vs repo de referencia
- `CHECKLIST-COMPLETO.md` - Validación de requisitos

---

**¡Listo para la exposición! 🎓**

Si tienes problemas, revisa la sección "Solución de Problemas" o pregunta en el grupo.

**Éxito en la presentación del lunes!** 💪
