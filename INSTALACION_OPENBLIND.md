# 🚀 INSTALACIÓN Y EJECUCIÓN - OpenBlind

## ✅ BUENAS NOTICIAS: ¡LAS TABLAS SE CREAN AUTOMÁTICAMENTE!

**No necesitas ejecutar ningún script SQL manualmente.** Sequelize crea las tablas automáticamente cuando inicias el servidor.

---

## 📥 1. DESCARGAR TODO LOCALMENTE

### Opción A: Si ya tienes los repositorios clonados
```bash
# Backend
cd ruta/a/tu/estructura-hexagonal
git pull origin claude/age-restricted-accessibility-feature-zXOvx

# Frontend
cd ruta/a/tu/frontend-openblind
git pull origin main
```

### Opción B: Clonar desde cero
```bash
# Backend
git clone https://github.com/Padme2003/estructura-hexagonal.git
cd estructura-hexagonal
git checkout claude/age-restricted-accessibility-feature-zXOvx

# Frontend
git clone https://github.com/Padme2003/frontend-openblind.git
cd frontend-openblind
```

---

## ⚙️ 2. CONFIGURAR BASE DE DATOS

### Paso 1: Crear la base de datos (solo esto es manual)
```sql
CREATE DATABASE openblind_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Paso 2: Configurar el archivo `.env`
En la carpeta `estructura-hexagonal/`, crea/edita el archivo `.env`:

```env
# Base de Datos MySQL
MYSQLHOST=localhost
MYSQLUSER=tu_usuario
MYSQLPASSWORD=tu_contraseña
MYSQLDATABASE=openblind_db
MYSQLPORT=3306

# Puerto del servidor
PORT=8888

# Otras configuraciones
NODE_ENV=development
```

### Paso 3: ¡YA ESTÁ!
Cuando inicies el servidor, Sequelize creará automáticamente estas tablas:
- ✅ `lugares_favoritos`
- ✅ `contactos_emergencia`
- ✅ Todas las demás tablas del proyecto

---

## 🚀 3. EJECUTAR EL PROYECTO

### Terminal 1: Backend
```bash
cd estructura-hexagonal
npm install
npm start
```

**Deberías ver:**
```
✅ Conexión establecida con MySQL
✅ Modelos sincronizados con MySQL
🚀 Servidor ejecutándose en puerto 8888
```

### Terminal 2: Frontend
```bash
cd frontend-openblind
npm install
npm run dev
```

**Deberías ver:**
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Abre el navegador:
```
http://localhost:5173
```

---

## 🎯 4. VERIFICAR QUE TODO FUNCIONA

### 1. Backend (Verifica tablas creadas):
```sql
USE openblind_db;
SHOW TABLES;
```

Deberías ver:
- `lugares_favoritos` ✅
- `contactos_emergencia` ✅
- `clientes` ✅
- (y todas las demás)

### 2. Frontend (Verifica conexión):
1. Abre `http://localhost:5173`
2. Deberías ver la pantalla de bienvenida "OpenBlind"
3. Haz clic en el módulo "Lugares" o "Contactos"
4. Si ves "Tienes 0 lugares/contactos" = ✅ **Conexión exitosa**

---

## 🐛 SOLUCIÓN A PROBLEMAS COMUNES

### Problema 1: "Error al conectar a MySQL"
**Solución:**
```bash
# Verifica que MySQL esté corriendo
mysql -u root -p

# Verifica tus credenciales en el .env
```

### Problema 2: "Cannot find module..."
**Solución:**
```bash
# Borra node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Problema 3: Frontend dice "Network Error"
**Solución:**
- Verifica que el backend esté corriendo en puerto 8888
- Verifica en `frontend-openblind/src/App.jsx` línea 6:
  ```javascript
  const API_URL = 'http://localhost:8888';
  ```

### Problema 4: Tablas no se crean automáticamente
**Solución:**
Puedes forzar la creación editando `dataBase.orm.js` línea 60:
```javascript
// Cambia de:
const syncOptions = { alter: false };

// A:
const syncOptions = { force: true }; // ⚠️ CUIDADO: Borra datos existentes
```

**O crea las tablas manualmente:**
```sql
CREATE TABLE lugares_favoritos (
    idLugarFavorito INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT NOT NULL,
    nombreLugar VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),
    icono VARCHAR(50) DEFAULT 'place',
    createLugarFavorito DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateLugarFavorito DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idCliente) REFERENCES clientes(idClientes) ON DELETE CASCADE
);

CREATE TABLE contactos_emergencia (
    idContactoEmergencia INT AUTO_INCREMENT PRIMARY KEY,
    idCliente INT NOT NULL,
    nombreContacto VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    relacion VARCHAR(50),
    prioridad INT DEFAULT 1,
    createContactoEmergencia DATETIME DEFAULT CURRENT_TIMESTAMP,
    updateContactoEmergencia DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idCliente) REFERENCES clientes(idClientes) ON DELETE CASCADE
);
```

---

## 🎤 5. PROBAR COMANDOS DE VOZ

**IMPORTANTE:** Los comandos de voz solo funcionan en **Chrome** o **Edge** (no en Firefox).

### Pasos:
1. Abre la aplicación en Chrome
2. Presiona el botón "COMANDO DE VOZ"
3. Permite el acceso al micrófono cuando lo pida
4. Di uno de estos comandos:
   - `"lugares"` → Abre Lugares Favoritos
   - `"contactos"` → Abre Contactos
   - `"nuevo"` → Crear nuevo (en cualquier vista)
   - `"volver"` → Regresar al dashboard

---

## 📊 6. INSERTAR DATOS DE PRUEBA

### Crear un cliente de prueba:
```sql
USE openblind_db;

INSERT INTO clientes (cedulaCliente, nombreCliente, usernameCliente, passwordCliente, stadoCliente, createCliente)
VALUES ('1234567890', 'Juan Pérez', 'juan', '123456', 'activo', NOW());
```

### Crear lugares de prueba:
```sql
INSERT INTO lugares_favoritos (idCliente, nombreLugar, direccion, icono)
VALUES
(1, 'Casa', 'Av. República E7-123', 'home'),
(1, 'Trabajo', 'Centro Financiero Torre A', 'business'),
(1, 'Parque', 'Parque La Carolina', 'park');
```

### Crear contactos de prueba:
```sql
INSERT INTO contactos_emergencia (idCliente, nombreContacto, telefono, prioridad)
VALUES
(1, 'Mamá', '0991234567', 1),
(1, 'Papá', '0987654321', 2),
(1, 'Hermana', '0999876543', 3);
```

---

## 📁 7. ESTRUCTURA DEL PROYECTO

```
estructura-hexagonal/
├── src/
│   ├── domain/
│   │   └── models/sql/
│   │       ├── lugarFavorito.js ✨ NUEVO
│   │       └── contactoEmergencia.js ✨ NUEVO
│   ├── infrastructure/
│   │   ├── http/
│   │   │   ├── controllers/
│   │   │   │   ├── lugarFavorito.controller.js ✨ NUEVO
│   │   │   │   └── contactoEmergencia.controller.js ✨ NUEVO
│   │   │   └── router/
│   │   │       ├── lugarFavorito.router.js ✨ NUEVO
│   │   │       └── contactoEmergencia.router.js ✨ NUEVO
│   │   └── database/
│   │       └── connection/
│   │           └── dataBase.orm.js (modificado)
├── app.js (modificado)
└── .env (crear este archivo)

frontend-openblind/
├── src/
│   ├── App.jsx ✨ MODIFICADO
│   └── index.css ✨ MODIFICADO
└── package.json
```

---

## ✅ CHECKLIST DE INSTALACIÓN

- [ ] Base de datos MySQL creada
- [ ] Archivo `.env` configurado
- [ ] `npm install` ejecutado en backend
- [ ] `npm install` ejecutado en frontend
- [ ] Backend corriendo en puerto 8888
- [ ] Frontend corriendo en puerto 5173
- [ ] Tablas creadas automáticamente (verificado con SHOW TABLES)
- [ ] Cliente de prueba insertado
- [ ] Frontend se conecta al backend (no hay errores en consola)
- [ ] Comandos de voz funcionando (Chrome/Edge)

---

## 🎓 PARA LA ENTREGA

### Demostración en vivo:
1. Mostrar dashboard
2. Crear un lugar por táctil
3. Crear un contacto por voz
4. Llamar a un contacto por voz
5. Listar lugares por voz
6. Editar/eliminar por táctil

### Explicar:
- ✅ 2 CRUDs completos funcionales
- ✅ Conexión backend-frontend sin datos quemados
- ✅ Comandos de voz integrados
- ✅ Paleta accesible (morados/púrpuras)
- ✅ Tablas creadas automáticamente por Sequelize

---

## 📞 SOPORTE

Si tienes problemas:
1. Verifica que MySQL esté corriendo
2. Revisa el archivo `.env`
3. Mira los logs de la consola (backend y frontend)
4. Verifica que las tablas existan con `SHOW TABLES`

**¡El proyecto está 100% funcional!** 🚀
