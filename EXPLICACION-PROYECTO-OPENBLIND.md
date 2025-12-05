# 📘 EXPLICACIÓN COMPLETA DEL BACKEND OPENBLIND

## 🎯 ¿QUÉ ES OPENBLIND?

**OpenBlind** es un sistema backend para gestión de transporte público urbano enfocado en accesibilidad para personas con discapacidad visual.

### Funcionalidades Principales:
- Gestión de rutas y estaciones de transporte
- Información en tiempo real para usuarios
- Guías de voz en múltiples idiomas
- Lugares turísticos con información accesible
- Sistema de calificaciones
- Gestión de usuarios, conductores y empresas

---

## 🏗️ ARQUITECTURA HEXAGONAL (ACTUAL)

```
src/
├── domain/              → Entidades de negocio (lo que existe)
├── application/         → Casos de uso (lógica de negocio)
├── infrastructure/      → Adaptadores técnicos
└── shared/             → Utilidades compartidas
```

---

## 📁 ESTRUCTURA DETALLADA DEL PROYECTO

### 1️⃣ **src/index.js** - PUNTO DE ENTRADA
```javascript
// Archivo principal que inicia el servidor
const app = require('./infrastructure/config/app');
const port = app.get('port');
app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});
```
**Función:** Arranca el servidor Express en el puerto 8888.

---

### 2️⃣ **infrastructure/config/** - CONFIGURACIÓN

#### **app.js** - Configuración de Express
```javascript
- Configuración de Express
- Middlewares de seguridad (Helmet, CORS, CSRF)
- Sesiones con express-session
- Rate limiting (límite de peticiones)
- Protección HPP (HTTP Parameter Pollution)
- Winston Logger (logs en archivos)
- Todas las rutas de la API
```

**Middlewares importantes:**
- `helmet()`: Seguridad HTTP headers
- `cors()`: Control de acceso entre dominios
- `express.json()`: Parseo de JSON
- `session()`: Manejo de sesiones
- `rateLimit()`: Máximo 100 peticiones/15min por IP
- `hpp()`: Previene ataques de parámetros HTTP

#### **keys.js** - Credenciales y Configuración
```javascript
MYSQLHOST = '31.97.42.126'
MYSQLUSER = 'linkear'
MYSQLPASSWORD = '0987021692@Rj'
MYSQLDATABASE = 'openblind'
MONGODB_URI = 'mongodb://linkear:0987021692%40Rj@31.97.42.126:27017/openblind'
SECRET_SESSION = 'tu-secreto-super-seguro-12345'
```

---

### 3️⃣ **infrastructure/database/** - BASES DE DATOS

#### **dataBase.orm.js** - Sequelize (MySQL ORM)
```javascript
- Conexión a MySQL con Sequelize
- Definición de 25 modelos SQL
- ~80 relaciones entre tablas (hasMany, belongsTo)
- Sincronización automática de esquemas
- Pool de 20 conexiones máximo
```

**Modelos SQL principales:**
1. **Usuarios y Autenticación:**
   - `usuario`: Usuarios del sistema
   - `rol`: Roles (admin, conductor, cliente)
   - `detalleRol`: Relación usuario-rol (N:M)
   - `page`: Permisos de páginas

2. **Transporte:**
   - `transporte`: Vehículos (buses, taxis)
   - `categoriaTransporte`: Tipos de transporte
   - `empresaTransporte`: Empresas operadoras
   - `conductor`: Conductores registrados

3. **Rutas y Estaciones:**
   - `ruta`: Rutas de transporte
   - `estacion`: Paradas/estaciones
   - `rutaEstacion`: Relación ruta-estacion (N:M)
   - `horario`: Horarios de cada ruta
   - `categoriaEstacion`: Tipos de estaciones

4. **Accesibilidad:**
   - `metodoIngreso`: Formas de acceso (rampa, ascensor)
   - `estacionMetodo`: Métodos por estación (N:M)

5. **Lugares Turísticos:**
   - `lugarTuristico`: Puntos de interés
   - `categoriaLugar`: Tipos de lugares
   - `guiaVoz`: Guías de audio
   - `idioma`: Idiomas disponibles

6. **Comunicación:**
   - `mensaje`: Notificaciones del sistema
   - `tipoMensaje`: Categorías de mensajes

7. **Evaluación:**
   - `calificacion`: Valoraciones de usuarios
   - `tarifa`: Precios de rutas/lugares
   - `cliente`: Información de clientes

#### **dataBase.sql.js** - MySQL2 Pool (Queries Raw)
```javascript
- Pool de conexiones MySQL nativo
- Para queries SQL directas (sin ORM)
- 20 conexiones máximo
- Timeout de 60 segundos
- Manejo de errores detallado
```

#### **dataBaseMongose.js** - MongoDB (NoSQL)
```javascript
- Conexión a MongoDB con Mongoose
- 10 modelos NoSQL (datos complementarios)
- Pool: 5-20 conexiones
- Retry automático de lecturas/escrituras
- Heartbeat cada 10 segundos
```

**Modelos MongoDB:**
- `page`: Datos adicionales de páginas
- `calificacion`: Detalles de calificaciones
- `cliente`: Info sensible de clientes
- `conductor`: Datos extras conductores
- `estacion`: Información complementaria
- `guiaVoz`: Archivos de audio (rutas)
- `lugarTuristico`: Datos turísticos extra
- `mensaje`: Contenido de mensajes
- `ruta`: Información adicional rutas
- `transporte`: Datos técnicos vehículos

**¿Por qué SQL + MongoDB?**
- **MySQL**: Datos estructurados, relaciones, transacciones
- **MongoDB**: Datos flexibles, archivos, información variable

---

### 4️⃣ **domain/entities/** - MODELOS DE DATOS

#### **sql/** - 25 Modelos Sequelize

**Ejemplo: usuario.js**
```javascript
const usuario = (sequelize, type) => {
    return sequelize.define('users', {
        idUser: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameUsers: type.STRING,
        emailUser: type.STRING,
        userName: type.STRING,
        passwordUser: type.STRING,  // Hasheado con bcrypt
        direccionUser: type.STRING,
        phoneUser: type.STRING,
        estadoUser: type.STRING,
        profilePicture: type.STRING
    })
}
```

**Todos los modelos SQL:**
1. usuario
2. rol
3. detalleRol
4. page
5. categoriaTransporte
6. transporte
7. empresaTransporte
8. conductor
9. estacion
10. categoriaEstacion
11. ruta
12. rutaEstacion
13. horario
14. metodoIngreso
15. estacionMetodo
16. categoriaLugar
17. lugarTuristico
18. tipoMensaje
19. mensaje
20. guiaVoz
21. idioma
22. calificacion
23. tarifa
24. cliente
25. detalleRol

#### **mongodb/** - 10 Modelos Mongoose

**Ejemplo: cliente.js**
```javascript
const clienteSchema = new mongoose.Schema({
    direccionCliente: String,
    telefonoCliente: String,
    emailCliente: String,
    tipoCliente: String,
    idClienteSql: String,  // Relación con SQL
})
const cliente = mongoose.model('clientes', clienteSchema)
```

---

### 5️⃣ **infrastructure/web/controllers/** - LÓGICA DE NEGOCIO

#### **Estructura de un Controller:**
```javascript
const nombreCtl = {};

nombreCtl.metodo1 = async (req, res) => {
    try {
        // Lógica aquí
        return res.json(resultado);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = nombreCtl;
```

#### **Controllers Principales:**

**1. auth.controller.js** - Autenticación
```javascript
- signUp: Registro de usuarios
- login: Inicio de sesión (Passport local)
- logout: Cierre de sesión
- forgotPassword: Recuperación de contraseña
- resetPassword: Cambio de contraseña
```
**Seguridad:**
- Passwords hasheados con `bcrypt`
- Sesiones con `express-session`
- Estrategia local de `Passport.js`

**2. cliente.controller.js** - Gestión de Clientes
```javascript
mostrarClientes: async (req, res) => {
    // 1. Obtener clientes de MySQL
    const [listaClientes] = await sql.promise().query(
        'SELECT * FROM clientes WHERE estadoCliente = "activo"'
    );

    // 2. Enriquecer con datos de MongoDB
    const clientesCompletos = await Promise.all(
        listaClientes.map(async (cliente) => {
            const clienteMongo = await mongo.clienteModel.findOne({
                idClienteSql: cliente.idClientes
            });
            return {
                ...cliente,
                cedulaCliente: descifrarDatos(cliente.cedulaCliente),
                direccionCliente: clienteMongo?.direccionCliente,
                telefonoCliente: clienteMongo?.telefonoCliente
            };
        })
    );

    return res.json(clientesCompletos);
}
```
**Patrón híbrido SQL + MongoDB**

**3. conductor.controller.js** - Conductores
```javascript
- mostrarConductores: Lista todos
- crearConductor: Registra nuevo (SQL + MongoDB)
- actualizarConductor: Edita datos
- eliminarConductor: Baja lógica
```

**4. estacion.controller.js** - Estaciones
```javascript
- mostrarEstaciones: Lista con categorías
- crearEstacion: Nueva estación con métodos de acceso
- actualizarEstacion: Actualiza datos
- eliminarEstacion: Baja lógica
- obtenerMetodosIngreso: Métodos de accesibilidad
```

**5. guiaVoz.controller.js** - Guías de Audio
```javascript
- mostrarGuiasVoz: Lista todas las guías
- crearGuiaVoz: Sube archivo de audio
- obtenerGuiaPorIdioma: Filtra por idioma
- reproducirGuia: Streaming de audio
```
**Uso:** Accesibilidad para personas con discapacidad visual

**6. horario.controller.js** - Horarios
```javascript
- obtenerHorariosRuta: Horarios de una ruta específica
- crearHorario: Nuevo horario
- actualizarHorario: Modifica horario
- eliminarHorario: Elimina horario
```

**7. lugarTuristico.controller.js** - Lugares Turísticos
```javascript
- mostrarLugares: Lista con guías de voz
- crearLugar: Nuevo punto turístico
- obtenerLugarPorEstacion: Lugares cercanos a estación
- calificarLugar: Usuario califica lugar
```

**8. mensaje.controller.js** - Notificaciones
```javascript
- enviarMensaje: Crea notificación
- obtenerMensajes: Lista mensajes de usuario
- marcarLeido: Marca como leído
- eliminarMensaje: Borra mensaje
```

**9. ruta.controller.js** - Rutas de Transporte
```javascript
- mostrarRutas: Lista todas con estaciones
- crearRuta: Nueva ruta con estaciones
- obtenerRutaDetalle: Ruta con horarios y tarifas
- calcularTarifa: Calcula precio según distancia
```

**10. transporte.controller.js** - Vehículos
```javascript
- mostrarTransportes: Lista vehículos por empresa
- crearTransporte: Registra vehículo
- asignarConductor: Asigna conductor a vehículo
- obtenerDisponibles: Vehículos disponibles
- calificarTransporte: Usuario califica servicio
```

**11. usuario.controller.js** - Usuarios
```javascript
- mostrarUsuarios: Lista usuarios con roles
- crearUsuario: Registro con rol
- actualizarPerfil: Edita datos de usuario
- cambiarPassword: Cambia contraseña
- subirFotoPerfil: Actualiza imagen
```

**12. index.controller.js** - Dashboard/Inicio
```javascript
- obtenerEstadisticas: Resumen del sistema
- obtenerActividad: Actividad reciente
- buscarGlobal: Búsqueda en todo el sistema
```

---

### 6️⃣ **infrastructure/web/routes/** - RUTAS API

#### **Estructura de una Ruta:**
```javascript
const express = require('express');
const router = express.Router();
const controller = require('../controllers/nombre.controller');
const { isAuthenticated } = require('../middlewares/auth');

// Rutas públicas
router.get('/public', controller.metodoPublico);

// Rutas protegidas
router.get('/private', isAuthenticated, controller.metodoPrivado);

module.exports = router;
```

#### **Rutas Disponibles:**

**1. auth.router.js** - `/auth`
```javascript
POST   /auth/signup          → Registro
POST   /auth/login           → Login
GET    /auth/logout          → Logout
POST   /auth/forgot-password → Recuperar contraseña
POST   /auth/reset-password  → Cambiar contraseña
```

**2. cliente.router.js** - `/cliente`
```javascript
GET    /cliente              → Lista clientes
POST   /cliente              → Crear cliente
PUT    /cliente/:id          → Actualizar cliente
DELETE /cliente/:id          → Eliminar cliente
```

**3. conductor.router.js** - `/conductor`
```javascript
GET    /conductor            → Lista conductores
POST   /conductor            → Crear conductor
PUT    /conductor/:id        → Actualizar
DELETE /conductor/:id        → Eliminar
GET    /conductor/:id/viajes → Historial
```

**4. estacion.router.js** - `/estacion`
```javascript
GET    /estacion             → Lista estaciones
POST   /estacion             → Crear estación
PUT    /estacion/:id         → Actualizar
DELETE /estacion/:id         → Eliminar
GET    /estacion/:id/rutas   → Rutas que pasan
```

**5. guiaVoz.router.js** - `/guia-voz`
```javascript
GET    /guia-voz             → Lista guías
POST   /guia-voz             → Subir guía
GET    /guia-voz/:id/audio   → Reproducir audio
GET    /guia-voz/idioma/:id  → Por idioma
```

**6. horario.router.js** - `/horario`
```javascript
GET    /horario/ruta/:id     → Horarios de ruta
POST   /horario              → Crear horario
PUT    /horario/:id          → Actualizar
DELETE /horario/:id          → Eliminar
```

**7. lugarTuristico.router.js** - `/lugar`
```javascript
GET    /lugar                → Lista lugares
POST   /lugar                → Crear lugar
GET    /lugar/:id            → Detalle lugar
POST   /lugar/:id/calificar  → Calificar
```

**8. mensaje.router.js** - `/mensaje`
```javascript
GET    /mensaje              → Mensajes usuario
POST   /mensaje              → Enviar mensaje
PUT    /mensaje/:id/leido    → Marcar leído
DELETE /mensaje/:id          → Eliminar
```

**9. ruta.router.js** - `/ruta`
```javascript
GET    /ruta                 → Lista rutas
POST   /ruta                 → Crear ruta
GET    /ruta/:id             → Detalle ruta
GET    /ruta/:id/tarifa      → Calcular tarifa
```

**10. transporte.router.js** - `/transporte`
```javascript
GET    /transporte           → Lista transportes
POST   /transporte           → Crear transporte
PUT    /transporte/:id       → Actualizar
GET    /transporte/disponibles → Disponibles
POST   /transporte/:id/calificar → Calificar
```

**11. usuario.router.js** - `/usuario`
```javascript
GET    /usuario              → Lista usuarios
POST   /usuario              → Crear usuario
PUT    /usuario/:id          → Actualizar
POST   /usuario/foto         → Subir foto
PUT    /usuario/password     → Cambiar password
```

**12. index.router.js** - `/`
```javascript
GET    /                     → Dashboard
GET    /estadisticas         → Estadísticas
GET    /buscar               → Búsqueda global
```

---

### 7️⃣ **infrastructure/web/middlewares/** - MIDDLEWARES

#### **auth.js** - Autenticación
```javascript
// Verifica si usuario está autenticado
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'No autenticado' });
};

// Verifica rol específico
const hasRole = (role) => (req, res, next) => {
    if (req.user.role === role) {
        return next();
    }
    res.status(403).json({ message: 'Sin permisos' });
};
```

#### **passport.js** - Configuración Passport
```javascript
// Estrategia local (usuario/contraseña)
passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'passwordUser'
}, async (username, password, done) => {
    // Buscar usuario
    const user = await Usuario.findOne({ where: { userName: username }});
    if (!user) return done(null, false);

    // Verificar password
    const match = await bcrypt.compare(password, user.passwordUser);
    if (!match) return done(null, false);

    return done(null, user);
}));

// Serializar/deserializar usuario en sesión
passport.serializeUser((user, done) => {
    done(null, user.idUser);
});

passport.deserializeUser(async (id, done) => {
    const user = await Usuario.findByPk(id);
    done(null, user);
});
```

---

### 8️⃣ **shared/utils/** - UTILIDADES

#### **encrypDates.js** - Cifrado de Datos
```javascript
const CryptoJS = require('crypto-js');
const secretKey = 'mi-clave-super-secreta-123';

// Cifrar datos sensibles
const cifrarDatos = (dato) => {
    if (!dato) return '';
    return CryptoJS.AES.encrypt(dato.toString(), secretKey).toString();
};

// Descifrar datos
const descifrarDatos = (datoCifrado) => {
    if (!datoCifrado) return '';
    const bytes = CryptoJS.AES.decrypt(datoCifrado, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { cifrarDatos, descifrarDatos };
```

**Uso:** Cifrar cédulas, números de teléfono, emails sensibles antes de guardar en BD.

---

## 🔐 SEGURIDAD IMPLEMENTADA

### 1. Autenticación y Autorización
- **Passport.js**: Estrategia local
- **bcrypt**: Hash de contraseñas (10 rounds)
- **express-session**: Sesiones seguras
- Middleware `isAuthenticated`: Protege rutas

### 2. Protección de Datos
- **CryptoJS AES**: Cifrado de datos sensibles
- Variables de entorno para credenciales
- Sanitización de inputs

### 3. Seguridad HTTP
- **Helmet**: Headers de seguridad
- **CORS**: Control de origen cruzado
- **CSRF**: Tokens anti-falsificación
- **HPP**: Protección contra parámetros duplicados
- **Rate Limiting**: 100 peticiones/15min

### 4. Logging y Monitoreo
- **Winston**: Logs en archivos
- `combined.log`: Todas las peticiones
- `error.log`: Solo errores
- Formato con timestamps

---

## 🗄️ ESQUEMA DE BASE DE DATOS

### Relaciones Principales:

```
USUARIOS
├─ detalleRol (N:M con ROL)
├─ mensajes (1:N)
├─ guiasVoz (1:N)
├─ calificaciones (1:N)
└─ conductores (1:N)

TRANSPORTE
├─ categoriaTransporte (N:1)
├─ empresaTransporte (N:1)
├─ conductor (N:1)
├─ ruta (N:1)
├─ calificaciones (1:N)
└─ tarifas (1:N)

RUTAS
├─ rutaEstacion (N:M con ESTACIONES)
├─ horarios (1:N)
├─ transportes (1:N)
├─ calificaciones (1:N)
└─ tarifas (1:N)

ESTACIONES
├─ categoriaEstacion (N:1)
├─ rutaEstacion (N:M con RUTAS)
├─ estacionMetodo (N:M con METODOS_INGRESO)
├─ horarios (1:N)
├─ lugaresTuristicos (1:N)
└─ calificaciones (1:N)

LUGARES_TURISTICOS
├─ categoriaLugar (N:1)
├─ estacion (N:1)
├─ usuario (N:1)
├─ guiasVoz (1:N)
├─ calificaciones (1:N)
└─ tarifas (1:N)

MENSAJES
├─ tipoMensaje (N:1)
├─ usuario (N:1)
└─ guiasVoz (1:N)

GUIAS_VOZ
├─ mensaje (N:1)
├─ idioma (N:1)
├─ lugarTuristico (N:1)
├─ usuario (N:1)
└─ calificaciones (1:N)
```

---

## 🔄 FLUJO DE UNA PETICIÓN TÍPICA

### Ejemplo: Usuario busca rutas desde una estación

```
1. CLIENTE
   ↓
   GET /ruta?estacionOrigen=1

2. SERVIDOR (app.js)
   ↓
   - Middlewares de seguridad (Helmet, CORS)
   - Winston registra la petición
   - Rate limiter verifica límite
   ↓

3. ROUTER (ruta.router.js)
   ↓
   - Encuentra la ruta GET /ruta
   - Verifica autenticación (isAuthenticated)
   ↓

4. CONTROLLER (ruta.controller.js)
   ↓
   - Valida parámetros (estacionOrigen)
   - Query a MySQL con Sequelize:
     * Busca rutas que pasan por estación
     * Incluye relaciones (estaciones, horarios, tarifas)
   - Enriquece con datos de MongoDB:
     * Información adicional de cada ruta
   - Descifra datos sensibles (si hay)
   ↓

5. RESPONSE
   ↓
   res.json({
       rutas: [
           {
               idRuta: 1,
               nombreRuta: "Ruta Norte",
               estaciones: [...],
               horarios: [...],
               tarifaBase: 0.50
           }
       ]
   })
```

---

## 📊 TECNOLOGÍAS UTILIZADAS

### Backend:
- **Node.js** v22.21.1
- **Express.js** v4.21.1
- **Sequelize** v6.37.5 (ORM MySQL)
- **Mongoose** v7.8.3 (ODM MongoDB)
- **MySQL2** v3.11.5 (Cliente MySQL)

### Seguridad:
- **Passport.js** v0.7.0 (Autenticación)
- **bcrypt** v5.1.1 (Hash passwords)
- **Helmet** v8.0.0 (Headers HTTP)
- **express-rate-limit** v7.4.1 (Rate limiting)
- **csurf** v1.11.0 (CSRF protection)
- **hpp** v0.2.3 (HTTP Parameter Pollution)

### Utilidades:
- **Winston** v3.17.0 (Logging)
- **CryptoJS** v4.2.0 (Cifrado)
- **dotenv** v16.4.7 (Variables entorno)
- **multer** v1.4.5 (Upload archivos)

### Sesiones:
- **express-session** v1.18.1
- **express-mysql-session** v3.0.3

---

## 🚀 COMANDOS PRINCIPALES

```bash
# Instalar dependencias
npm install

# Desarrollo (con nodemon)
npm run dev

# Producción
npm start

# Variables de entorno
cp .env.example .env
# Editar .env con credenciales
```

---

## 📝 CONSIDERACIONES IMPORTANTES

### Patrón Híbrido SQL + MongoDB:
**¿Por qué usar ambas?**
1. **MySQL (SQL):**
   - Datos relacionales estructurados
   - Integridad referencial (foreign keys)
   - Transacciones ACID
   - Consultas complejas con JOINs

2. **MongoDB (NoSQL):**
   - Datos flexibles/variables
   - Documentos grandes (guías de voz)
   - Información complementaria
   - Escalabilidad horizontal

### Datos Sensibles:
- **Cifrados**: Cédulas, teléfonos, emails
- **Hasheados**: Contraseñas (bcrypt)
- **En MongoDB**: Información sensible variable

### Accesibilidad:
- **Guías de voz** en múltiples idiomas
- **Métodos de ingreso** a estaciones (rampas, ascensores)
- **Notificaciones** para usuarios con discapacidad visual

---

## 🎯 CONCLUSIÓN

**OpenBlind** es un sistema robusto para gestión de transporte público con enfoque en **accesibilidad**.

### Características destacadas:
✅ Arquitectura hexagonal bien estructurada
✅ Doble base de datos (SQL + NoSQL)
✅ Alta seguridad (autenticación, cifrado, rate limiting)
✅ Logging completo con Winston
✅ API RESTful completa
✅ Enfoque en accesibilidad (guías de voz, info en tiempo real)

### Tecnologías modernas:
✅ Node.js + Express
✅ Sequelize + Mongoose
✅ Passport.js + bcrypt
✅ Middlewares de seguridad profesionales

---

## 📞 INFORMACIÓN ADICIONAL

**Servidor:** 31.97.42.126
**Puerto API:** 8888
**Puerto MySQL:** 3306
**Puerto MongoDB:** 27017

**Base de datos:** openblind
**Usuario BD:** linkear
