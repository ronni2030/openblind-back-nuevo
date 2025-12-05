# 📘 EXPLICACIÓN DEL PROYECTO OPENBLIND (ESTRUCTURA ORIGINAL)

## 🎯 ¿QUÉ ES OPENBLIND?

Sistema backend para gestión de **transporte público urbano** con enfoque en **accesibilidad para personas con discapacidad visual**.

### Funcionalidades:
- 🚌 Gestión de rutas y estaciones de transporte
- 📍 Información en tiempo real
- 🔊 Guías de voz en múltiples idiomas
- 🏛️ Lugares turísticos accesibles
- ⭐ Sistema de calificaciones
- 👥 Gestión de usuarios, conductores y empresas

---

## 📁 ESTRUCTURA ORIGINAL DEL PROYECTO

```
src/
├── index.js                  → Punto de entrada
├── app.js                    → Configuración Express
├── keys.js                   → Credenciales BD
├── Database/                 → Conexiones a bases de datos
│   ├── dataBase.orm.js      → Sequelize (MySQL ORM)
│   ├── dataBase.sql.js      → MySQL2 (queries raw)
│   └── dataBaseMongose.js   → Mongoose (MongoDB)
├── models/                   → Modelos de datos
│   ├── sql/                 → 25 modelos MySQL
│   └── mongo/               → 10 modelos MongoDB
├── controller/               → Lógica de negocio
│   ├── auth.controller.js
│   ├── cliente.controller.js
│   ├── conductor.controller.js
│   ├── estacion.controller.js
│   ├── guiaVoz.controller.js
│   ├── horario.controller.js
│   ├── lugarTuristico.controller.js
│   ├── mensaje.controller.js
│   ├── ruta.controller.js
│   ├── transporte.controller.js
│   ├── usuario.controller.js
│   └── index.controller.js
├── router/                   → Rutas de la API
│   ├── auth.router.js
│   ├── cliente.router.js
│   ├── conductor.router.js
│   ├── estacion.router.js
│   ├── guiaVoz.router.js
│   ├── horario.router.js
│   ├── lugarTuristico.router.js
│   ├── mensaje.router.js
│   ├── ruta.router.js
│   ├── transporte.router.js
│   ├── usuario.router.js
│   └── index.router.js
└── lib/                      → Utilidades
    ├── auth.js              → Middleware autenticación
    ├── passport.js          → Configuración Passport
    └── encrypDates.js       → Cifrado de datos
```

**Patrón:** MVC (Model-View-Controller) sin la V (backend puro)

---

## 🗂️ EXPLICACIÓN ARCHIVO POR ARCHIVO

### 📄 **src/index.js** - INICIO DE LA APLICACIÓN

```javascript
const app = require('./app');

// Configurar puerto
app.set('port', process.env.PORT || 8888);

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});
```

**Función:** Arranca el servidor Express en puerto 8888.

---

### 📄 **src/app.js** - CONFIGURACIÓN EXPRESS

```javascript
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const winston = require('winston');

const app = express();

// ========== MIDDLEWARES DE SEGURIDAD ==========
app.use(helmet());              // Headers seguros
app.use(cors());               // CORS habilitado
app.use(express.json());       // Parse JSON
app.use(express.urlencoded({ extended: false }));

// ========== SESIONES ==========
app.use(session({
    secret: 'tu-secreto-super-seguro-12345',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));

// ========== PASSPORT ==========
app.use(passport.initialize());
app.use(passport.session());

// ========== RATE LIMITING ==========
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,    // 15 minutos
    max: 100                      // 100 peticiones por IP
});
app.use(limiter);

// ========== WINSTON LOGGER ==========
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console()
    ]
});
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// ========== RUTAS ==========
app.use('/auth', require('./router/auth.router'));
app.use('/cliente', require('./router/cliente.router'));
app.use('/conductor', require('./router/conductor.router'));
app.use('/estacion', require('./router/estacion.router'));
app.use('/guia-voz', require('./router/guiaVoz.router'));
app.use('/horario', require('./router/horario.router'));
app.use('/lugar', require('./router/lugarTuristico.router'));
app.use('/mensaje', require('./router/mensaje.router'));
app.use('/ruta', require('./router/ruta.router'));
app.use('/transporte', require('./router/transporte.router'));
app.use('/usuario', require('./router/usuario.router'));
app.use('/', require('./router/index.router'));

module.exports = app;
```

**Función:** Configura todo Express (middlewares, rutas, seguridad).

---

### 📄 **src/keys.js** - CREDENCIALES

```javascript
module.exports = {
    // MySQL
    MYSQLHOST: '31.97.42.126',
    MYSQLUSER: 'linkear',
    MYSQLPASSWORD: '0987021692@Rj',
    MYSQLDATABASE: 'openblind',
    MYSQLPORT: '3306',

    // MongoDB
    MONGODB_URI: 'mongodb://linkear:0987021692%40Rj@31.97.42.126:27017/openblind',

    // Sesiones
    SECRET_SESSION: 'tu-secreto-super-seguro-12345'
};
```

**Función:** Centraliza todas las credenciales y configuraciones.

---

## 🗄️ DATABASE/ - CONEXIONES A BASES DE DATOS

### 📄 **Database/dataBase.orm.js** - SEQUELIZE (MySQL ORM)

```javascript
const { Sequelize } = require('sequelize');
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT } = require('../keys');

// ========== CREAR CONEXIÓN ==========
const sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
    host: MYSQLHOST,
    port: MYSQLPORT,
    dialect: 'mysql',
    pool: {
        max: 20,     // 20 conexiones máximo
        min: 5,      // 5 mínimo
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

// ========== AUTENTICAR ==========
sequelize.authenticate()
    .then(() => console.log('✅ MySQL conectado'))
    .catch(err => console.error('❌ Error MySQL:', err));

// ========== IMPORTAR MODELOS ==========
const usuario = require('../models/sql/usuario')(sequelize, Sequelize);
const rol = require('../models/sql/rol')(sequelize, Sequelize);
const transporte = require('../models/sql/transporte')(sequelize, Sequelize);
const estacion = require('../models/sql/estacion')(sequelize, Sequelize);
// ... (25 modelos en total)

// ========== RELACIONES ==========
// Usuario - Rol (N:M)
usuario.hasMany(detalleRol);
detalleRol.belongsTo(usuario);
rol.hasMany(detalleRol);
detalleRol.belongsTo(rol);

// Transporte
categoriaTransporte.hasMany(transporte);
transporte.belongsTo(categoriaTransporte);
empresaTransporte.hasMany(transporte);
transporte.belongsTo(empresaTransporte);
conductor.hasMany(transporte);
transporte.belongsTo(conductor);

// Rutas y Estaciones (N:M)
ruta.hasMany(rutaEstacion);
rutaEstacion.belongsTo(ruta);
estacion.hasMany(rutaEstacion);
rutaEstacion.belongsTo(estacion);

// ... (80+ relaciones en total)

// ========== SINCRONIZAR ==========
sequelize.sync({ alter: true })
    .then(() => console.log('✅ Modelos sincronizados'))
    .catch(err => console.error('❌ Error sync:', err));

// ========== EXPORTAR ==========
module.exports = {
    usuario,
    rol,
    transporte,
    estacion,
    ruta,
    // ... todos los modelos
    sequelize
};
```

**Función:**
- Conecta a MySQL usando Sequelize (ORM)
- Define 25 modelos SQL
- Configura 80+ relaciones entre tablas
- Sincroniza esquemas automáticamente

---

### 📄 **Database/dataBase.sql.js** - MYSQL2 (Queries Raw)

```javascript
const { createPool } = require('mysql2');
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT } = require('../keys');

// ========== CREAR POOL ==========
const pool = createPool({
    host: MYSQLHOST,
    port: MYSQLPORT,
    user: MYSQLUSER,
    password: MYSQLPASSWORD,
    database: MYSQLDATABASE,
    connectionLimit: 20
});

// ========== VERIFICAR CONEXIÓN ==========
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error MySQL pool:', err.message);
    } else {
        connection.release();
        console.log('✅ Pool MySQL conectado');
    }
});

module.exports = pool;
```

**Función:**
- Pool de conexiones MySQL nativo
- Para queries SQL directas (sin ORM)
- Usado cuando necesitas queries complejas o optimizadas

**Ejemplo de uso en controller:**
```javascript
const sql = require('../Database/dataBase.sql');

// Query directa
const [rows] = await sql.promise().query(
    'SELECT * FROM transportes WHERE estadoTransporte = ?',
    ['activo']
);
```

---

### 📄 **Database/dataBaseMongose.js** - MONGOOSE (MongoDB)

```javascript
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../keys');

// ========== CONECTAR A MONGODB ==========
mongoose.connect(MONGODB_URI, {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000
})
.then(() => {
    console.log('✅ MongoDB conectado');
    console.log('📊 Base de datos:', mongoose.connection.name);
})
.catch(err => {
    console.error('❌ Error MongoDB:', err.message);
    process.exit(1);
});

// ========== EVENTOS ==========
mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose conectado');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Error Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️  Mongoose desconectado');
});

// ========== IMPORTAR MODELOS ==========
const pageModel = require('../models/mongo/page');
const clienteModel = require('../models/mongo/cliente');
const conductorModel = require('../models/mongo/conductor');
// ... (10 modelos MongoDB)

// ========== EXPORTAR ==========
module.exports = {
    pageModel,
    clienteModel,
    conductorModel,
    estacionModel,
    guiaVozModel,
    lugarTuristicoModel,
    mensajeModel,
    rutaModel,
    transporteModel,
    calificacionModel
};
```

**Función:**
- Conecta a MongoDB usando Mongoose
- Importa 10 modelos NoSQL
- Maneja eventos de conexión

---

## 📦 MODELS/ - MODELOS DE DATOS

### 📂 **models/sql/** - 25 MODELOS MYSQL

#### Ejemplo: **models/sql/usuario.js**
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
        passwordUser: type.STRING,    // Hash bcrypt
        direccionUser: type.STRING,
        phoneUser: type.STRING,
        estadoUser: type.STRING,
        profilePicture: type.STRING
    }, {
        timestamps: false,
        Comment: 'Tabla Usuarios'
    });
};

module.exports = usuario;
```

#### **Lista completa de modelos SQL (25):**
1. **usuario.js** - Usuarios del sistema
2. **rol.js** - Roles (admin, conductor, cliente)
3. **detalleRol.js** - Relación usuario-rol
4. **page.js** - Permisos de páginas
5. **categoriaTransporte.js** - Tipos de transporte
6. **transporte.js** - Vehículos (buses, taxis)
7. **empresaTransporte.js** - Empresas operadoras
8. **conductor.js** - Conductores registrados
9. **estacion.js** - Paradas/estaciones
10. **categoriaEstacion.js** - Tipos de estaciones
11. **ruta.js** - Rutas de transporte
12. **rutaEstacion.js** - Relación ruta-estacion (N:M)
13. **horario.js** - Horarios de rutas
14. **metodoIngreso.js** - Formas de acceso (rampa, ascensor)
15. **estacionMetodo.js** - Métodos por estación (N:M)
16. **categoriaLugar.js** - Tipos de lugares turísticos
17. **lugarTuristico.js** - Puntos de interés
18. **tipoMensaje.js** - Categorías de mensajes
19. **mensaje.js** - Notificaciones del sistema
20. **guiaVoz.js** - Guías de audio
21. **idioma.js** - Idiomas disponibles
22. **calificacion.js** - Valoraciones de usuarios
23. **tarifa.js** - Precios de rutas/lugares
24. **cliente.js** - Información de clientes
25. **detalleRol.js** - Usuario-Rol (N:M)

---

### 📂 **models/mongo/** - 10 MODELOS MONGODB

#### Ejemplo: **models/mongo/cliente.js**
```javascript
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    direccionCliente: String,
    telefonoCliente: String,
    emailCliente: String,
    tipoCliente: String,
    idClienteSql: String    // Relación con MySQL
});

const cliente = mongoose.model('clientes', clienteSchema);
module.exports = cliente;
```

#### **Lista completa modelos MongoDB (10):**
1. **page.js** - Datos adicionales de páginas
2. **calificacion.js** - Detalles de calificaciones
3. **cliente.js** - Info sensible de clientes
4. **conductor.js** - Datos extras conductores
5. **estacion.js** - Info complementaria estaciones
6. **guiaVoz.js** - Archivos de audio (rutas)
7. **lugarTuristico.js** - Datos turísticos extra
8. **mensaje.js** - Contenido de mensajes
9. **ruta.js** - Info adicional de rutas
10. **trasporte.js** - Datos técnicos vehículos

---

## 🎮 CONTROLLER/ - LÓGICA DE NEGOCIO

### 📄 **controller/cliente.controller.js** - EJEMPLO COMPLETO

```javascript
const clienteCtl = {};
const orm = require('../Database/dataBase.orm');
const sql = require('../Database/dataBase.sql');
const mongo = require('../Database/dataBaseMongose');
const { cifrarDatos, descifrarDatos } = require('../lib/encrypDates');

// ========== MOSTRAR CLIENTES ==========
clienteCtl.mostrarClientes = async (req, res) => {
    try {
        // 1. Obtener de MySQL
        const [listaClientes] = await sql.promise().query(
            'SELECT * FROM clientes WHERE estadoCliente = "activo"'
        );

        // 2. Enriquecer con MongoDB
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
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener clientes',
            error: error.message
        });
    }
};

// ========== CREAR CLIENTE ==========
clienteCtl.crearCliente = async (req, res) => {
    try {
        const { nombre, cedula, email, direccion, telefono } = req.body;

        // 1. Guardar en MySQL
        const [result] = await sql.promise().query(
            'INSERT INTO clientes (nombreCliente, cedulaCliente, emailCliente, estadoCliente) VALUES (?, ?, ?, ?)',
            [nombre, cifrarDatos(cedula), email, 'activo']
        );

        // 2. Guardar en MongoDB
        const clienteMongo = new mongo.clienteModel({
            direccionCliente: direccion,
            telefonoCliente: telefono,
            emailCliente: email,
            idClienteSql: result.insertId
        });
        await clienteMongo.save();

        return res.status(201).json({
            message: 'Cliente creado',
            id: result.insertId
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear cliente',
            error: error.message
        });
    }
};

// ========== ACTUALIZAR CLIENTE ==========
clienteCtl.actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, telefono } = req.body;

        // 1. Actualizar MySQL
        await sql.promise().query(
            'UPDATE clientes SET nombreCliente = ? WHERE idClientes = ?',
            [nombre, id]
        );

        // 2. Actualizar MongoDB
        await mongo.clienteModel.updateOne(
            { idClienteSql: id },
            { direccionCliente: direccion, telefonoCliente: telefono }
        );

        return res.json({ message: 'Cliente actualizado' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// ========== ELIMINAR CLIENTE (BAJA LÓGICA) ==========
clienteCtl.eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;

        await sql.promise().query(
            'UPDATE clientes SET estadoCliente = "inactivo" WHERE idClientes = ?',
            [id]
        );

        return res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = clienteCtl;
```

**Patrón usado:**
- **SQL** para datos estructurados (nombre, estado)
- **MongoDB** para datos flexibles (dirección, teléfono)
- **Cifrado** para datos sensibles (cédula)

---

### 📄 **Lista de Controllers (12):**

1. **auth.controller.js** - Autenticación
   - `signUp`: Registro
   - `login`: Inicio sesión
   - `logout`: Cerrar sesión
   - `forgotPassword`: Recuperar contraseña
   - `resetPassword`: Cambiar contraseña

2. **cliente.controller.js** - Clientes
   - `mostrarClientes`: Lista
   - `crearCliente`: Crear
   - `actualizarCliente`: Actualizar
   - `eliminarCliente`: Eliminar

3. **conductor.controller.js** - Conductores
   - `mostrarConductores`: Lista
   - `crearConductor`: Crear
   - `actualizarConductor`: Actualizar
   - `eliminarConductor`: Eliminar
   - `obtenerViajes`: Historial

4. **estacion.controller.js** - Estaciones
   - `mostrarEstaciones`: Lista
   - `crearEstacion`: Crear
   - `actualizarEstacion`: Actualizar
   - `obtenerMetodosIngreso`: Accesibilidad

5. **guiaVoz.controller.js** - Guías de Audio
   - `mostrarGuias`: Lista
   - `crearGuia`: Subir audio
   - `obtenerPorIdioma`: Filtrar
   - `reproducir`: Streaming

6. **horario.controller.js** - Horarios
   - `obtenerHorarios`: Lista
   - `crearHorario`: Crear
   - `actualizarHorario`: Actualizar
   - `eliminarHorario`: Eliminar

7. **lugarTuristico.controller.js** - Lugares
   - `mostrarLugares`: Lista
   - `crearLugar`: Crear
   - `obtenerPorEstacion`: Cercanos
   - `calificar`: Valorar

8. **mensaje.controller.js** - Mensajes
   - `enviarMensaje`: Crear notificación
   - `obtenerMensajes`: Lista
   - `marcarLeido`: Marcar leído
   - `eliminarMensaje`: Eliminar

9. **ruta.controller.js** - Rutas
   - `mostrarRutas`: Lista con estaciones
   - `crearRuta`: Crear con estaciones
   - `obtenerDetalle`: Ruta completa
   - `calcularTarifa`: Calcular precio

10. **transporte.controller.js** - Vehículos
    - `mostrarTransportes`: Lista
    - `crearTransporte`: Crear
    - `asignarConductor`: Asignar
    - `obtenerDisponibles`: Disponibles
    - `calificar`: Valorar

11. **usuario.controller.js** - Usuarios
    - `mostrarUsuarios`: Lista
    - `crearUsuario`: Crear con rol
    - `actualizarPerfil`: Actualizar
    - `cambiarPassword`: Cambiar contraseña
    - `subirFoto`: Subir foto perfil

12. **index.controller.js** - Dashboard
    - `obtenerEstadisticas`: Resumen
    - `obtenerActividad`: Actividad reciente
    - `buscarGlobal`: Búsqueda

---

## 🛣️ ROUTER/ - RUTAS DE LA API

### 📄 **router/cliente.router.js** - EJEMPLO

```javascript
const express = require('express');
const router = express.Router();
const clienteCtl = require('../controller/cliente.controller');
const { isAuthenticated } = require('../lib/auth');

// Rutas públicas
router.get('/', clienteCtl.mostrarClientes);

// Rutas protegidas
router.post('/', isAuthenticated, clienteCtl.crearCliente);
router.put('/:id', isAuthenticated, clienteCtl.actualizarCliente);
router.delete('/:id', isAuthenticated, clienteCtl.eliminarCliente);

module.exports = router;
```

### 📋 **Lista completa de rutas:**

| Ruta | Endpoint | Métodos | Función |
|------|----------|---------|---------|
| **auth.router.js** | `/auth` | POST | Autenticación |
| **cliente.router.js** | `/cliente` | GET, POST, PUT, DELETE | Gestión clientes |
| **conductor.router.js** | `/conductor` | GET, POST, PUT, DELETE | Gestión conductores |
| **estacion.router.js** | `/estacion` | GET, POST, PUT, DELETE | Gestión estaciones |
| **guiaVoz.router.js** | `/guia-voz` | GET, POST, DELETE | Guías de audio |
| **horario.router.js** | `/horario` | GET, POST, PUT, DELETE | Gestión horarios |
| **lugarTuristico.router.js** | `/lugar` | GET, POST, PUT, DELETE | Lugares turísticos |
| **mensaje.router.js** | `/mensaje` | GET, POST, PUT, DELETE | Notificaciones |
| **ruta.router.js** | `/ruta` | GET, POST, PUT, DELETE | Gestión rutas |
| **transporte.router.js** | `/transporte` | GET, POST, PUT, DELETE | Gestión vehículos |
| **usuario.router.js** | `/usuario` | GET, POST, PUT, DELETE | Gestión usuarios |
| **index.router.js** | `/` | GET | Dashboard |

---

## 🔧 LIB/ - UTILIDADES

### 📄 **lib/auth.js** - Middleware Autenticación

```javascript
// Verificar si usuario está autenticado
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'No autenticado' });
};

// Verificar rol específico
const hasRole = (role) => (req, res, next) => {
    if (req.user && req.user.role === role) {
        return next();
    }
    res.status(403).json({ message: 'Sin permisos' });
};

module.exports = { isAuthenticated, hasRole };
```

---

### 📄 **lib/passport.js** - Configuración Passport

```javascript
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const orm = require('../Database/dataBase.orm');

// Estrategia local
passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'passwordUser'
}, async (username, password, done) => {
    try {
        // Buscar usuario
        const user = await orm.usuario.findOne({
            where: { userName: username }
        });

        if (!user) {
            return done(null, false, { message: 'Usuario no existe' });
        }

        // Verificar password
        const match = await bcrypt.compare(password, user.passwordUser);
        if (!match) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Serializar
passport.serializeUser((user, done) => {
    done(null, user.idUser);
});

// Deserializar
passport.deserializeUser(async (id, done) => {
    try {
        const user = await orm.usuario.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
```

---

### 📄 **lib/encrypDates.js** - Cifrado de Datos

```javascript
const CryptoJS = require('crypto-js');
const secretKey = 'mi-clave-super-secreta-123';

// Cifrar
const cifrarDatos = (dato) => {
    if (!dato) return '';
    return CryptoJS.AES.encrypt(dato.toString(), secretKey).toString();
};

// Descifrar
const descifrarDatos = (datoCifrado) => {
    if (!datoCifrado) return '';
    const bytes = CryptoJS.AES.decrypt(datoCifrado, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { cifrarDatos, descifrarDatos };
```

**Uso:** Cifrar cédulas, teléfonos, emails antes de guardar en BD.

---

## 🔄 FLUJO DE UNA PETICIÓN

### Ejemplo: Usuario busca rutas

```
1. CLIENTE
   ↓
   GET http://localhost:8888/ruta?estacion=1

2. EXPRESS (app.js)
   ↓
   - Helmet (seguridad headers)
   - CORS (permite origen)
   - Winston registra petición
   - Rate limiter verifica (100/15min)
   ↓

3. ROUTER (router/ruta.router.js)
   ↓
   - Encuentra ruta: GET /ruta
   - Middleware: isAuthenticated()
   - Si autenticado → continúa
   - Si no → 401 Unauthorized
   ↓

4. CONTROLLER (controller/ruta.controller.js)
   ↓
   - Valida parámetros (estacion)
   - Query MySQL (Sequelize):
     SELECT * FROM rutas
     WHERE idRuta IN (
         SELECT rutaIdRuta FROM rutasEstaciones
         WHERE estacionIdEstacion = 1
     )
   - Incluye relaciones (JOIN):
     * estaciones
     * horarios
     * tarifas
   - Enriquece con MongoDB:
     * Información adicional de cada ruta
   - Descifra datos sensibles (si hay)
   ↓

5. RESPUESTA
   ↓
   res.json({
       rutas: [
           {
               idRuta: 1,
               nombreRuta: "Ruta Norte",
               codigoRuta: "RN-001",
               estadoRuta: "activo",
               estaciones: [...],
               horarios: [...],
               tarifaBase: 0.50
           }
       ]
   })
```

---

## 🗄️ DIAGRAMA DE BASE DE DATOS

### Relaciones Principales:

```
USUARIOS (MySQL)
├─ detalleRol → ROL (N:M)
├─ mensajes (1:N)
├─ guiasVoz (1:N)
├─ calificaciones (1:N)
└─ conductores (1:N)

TRANSPORTE (MySQL)
├─ categoriaTransporte (N:1)
├─ empresaTransporte (N:1)
├─ conductor (N:1)
├─ ruta (N:1)
└─ transporteMongoDB (1:1)

RUTAS (MySQL)
├─ rutaEstacion → ESTACIONES (N:M)
├─ horarios (1:N)
├─ transportes (1:N)
├─ tarifas (1:N)
└─ rutaMongoDB (1:1)

ESTACIONES (MySQL)
├─ categoriaEstacion (N:1)
├─ rutaEstacion → RUTAS (N:M)
├─ estacionMetodo → METODOS (N:M)
├─ horarios (1:N)
├─ lugaresTuristicos (1:N)
└─ estacionMongoDB (1:1)

LUGARES_TURISTICOS (MySQL)
├─ categoriaLugar (N:1)
├─ estacion (N:1)
├─ guiasVoz (1:N)
├─ calificaciones (1:N)
└─ lugarMongoDB (1:1)

GUIAS_VOZ (MySQL)
├─ mensaje (N:1)
├─ idioma (N:1)
├─ lugarTuristico (N:1)
├─ usuario (N:1)
└─ guiaMongoDB (archivos audio)

MONGODB (Complementario)
├─ cliente (datos sensibles)
├─ conductor (info extra)
├─ transporte (datos técnicos)
├─ estacion (info complementaria)
├─ ruta (info adicional)
├─ lugarTuristico (datos turísticos)
├─ mensaje (contenido)
├─ guiaVoz (archivos)
├─ calificacion (detalles)
└─ page (permisos)
```

---

## 💡 DECISIONES DE DISEÑO

### ¿Por qué SQL + MongoDB?

| MySQL (SQL) | MongoDB (NoSQL) |
|-------------|-----------------|
| Datos estructurados | Datos flexibles |
| Relaciones complejas | Documentos grandes |
| Integridad referencial | Escalabilidad horizontal |
| Transacciones ACID | Performance en lecturas |
| Consultas JOIN | Esquema dinámico |

**Ejemplo:**
- **MySQL**: Usuario (id, nombre, email, password)
- **MongoDB**: Usuario (dirección completa, preferencias variables, historial)

### Patrón Híbrido:
1. Guardar datos críticos en MySQL
2. Enriquecer con datos complementarios de MongoDB
3. Unir ambos en el controller antes de responder

---

## 🔐 SEGURIDAD IMPLEMENTADA

### 1. Autenticación
- **Passport.js** con estrategia local
- **bcrypt** para hash de contraseñas (10 rounds)
- **express-session** para sesiones
- Middleware `isAuthenticated` protege rutas

### 2. Datos Sensibles
- **CryptoJS AES** cifra cédulas, teléfonos
- Passwords hasheados, NUNCA en texto plano
- Variables sensibles en `keys.js` (fuera de git)

### 3. HTTP
- **Helmet**: Headers seguros
- **CORS**: Control de orígenes
- **Rate Limiting**: 100 peticiones/15min
- **HPP**: Protección parámetros HTTP

### 4. Logging
- **Winston**: Logs en archivos
- `combined.log`: Todas las peticiones
- `error.log`: Solo errores

---

## 📊 TECNOLOGÍAS USADAS

### Backend:
- **Node.js** v22.21.1
- **Express.js** v4.21.1
- **Sequelize** v6.37.5 (ORM MySQL)
- **Mongoose** v7.8.3 (ODM MongoDB)
- **MySQL2** v3.11.5

### Seguridad:
- **Passport.js** v0.7.0
- **bcrypt** v5.1.1
- **Helmet** v8.0.0
- **express-rate-limit** v7.4.1
- **csurf** v1.11.0
- **hpp** v0.2.3

### Utilidades:
- **Winston** v3.17.0 (Logging)
- **CryptoJS** v4.2.0 (Cifrado)
- **dotenv** v16.4.7
- **multer** v1.4.5 (Upload)

---

## 🚀 COMANDOS

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Producción
npm start
```

---

## 📝 RESUMEN

**OpenBlind** es un backend robusto para transporte público accesible.

### Estructura:
✅ MVC tradicional (sin View)
✅ Doble BD (MySQL + MongoDB)
✅ 25 modelos SQL + 10 MongoDB
✅ 12 controllers con lógica híbrida
✅ 12 routers con API REST
✅ Seguridad completa (Passport, bcrypt, Helmet)

### Características:
✅ Autenticación con Passport + sesiones
✅ Cifrado de datos sensibles (CryptoJS)
✅ Rate limiting (100/15min)
✅ Logging con Winston
✅ Accesibilidad (guías de voz, múltiples idiomas)

---

## 🎯 PARA LA PRESENTACIÓN

**Puntos clave a mencionar:**

1. **Sistema híbrido SQL + NoSQL**
   - MySQL para relaciones complejas
   - MongoDB para flexibilidad

2. **Enfoque en accesibilidad**
   - Guías de voz
   - Múltiples idiomas
   - Info en tiempo real

3. **Seguridad robusta**
   - Autenticación Passport
   - Cifrado de datos
   - Rate limiting

4. **Arquitectura MVC clara**
   - Modelos (25 SQL + 10 Mongo)
   - Controllers (12)
   - Rutas (12)

5. **Patrón híbrido en controllers**
   - Consulta SQL
   - Enriquece con MongoDB
   - Responde JSON unificado
