# 🏗️ ARQUITECTURA HEXAGONAL - GUÍA COMPLETA

## 📋 ÍNDICE
1. [¿Qué es la Arquitectura Hexagonal?](#qué-es)
2. [Estructura del Proyecto](#estructura)
3. [Explicación de Cada Carpeta](#carpetas)
4. [Flujo de Datos](#flujo)
5. [Archivos Clave Explicados](#archivos)

---

## 🎯 ¿QUÉ ES LA ARQUITECTURA HEXAGONAL? {#qué-es}

La **Arquitectura Hexagonal** (también llamada **"Ports and Adapters"**) es un patrón de diseño creado por **Alistair Cockburn**.

### Conceptos Principales:

```
┌─────────────────────────────────────────┐
│       ADAPTADORES EXTERNOS              │
│   (Web, APIs, Bases de Datos)          │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │     PUERTOS (Interfaces)          │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │    DOMINIO (Core)           │  │  │
│  │  │  Lógica de Negocio Pura    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### Las 3 Capas Principales:

1. **DOMINIO (Centro del Hexágono)**
   - Contiene la lógica de negocio PURA
   - NO depende de nada externo (bases de datos, frameworks, etc.)
   - Define ENTIDADES y REGLAS del negocio

2. **PUERTOS (Interfaces)**
   - Definen CÓMO se puede interactuar con el dominio
   - Son contratos/interfaces
   - Ejemplos: RepositoryInterface, ServiceInterface

3. **ADAPTADORES (Periferia)**
   - Implementaciones CONCRETAS de los puertos
   - Se conectan con tecnologías específicas
   - Ejemplos: MySQL, MongoDB, Express, REST API

### Ventajas:

✅ **Independencia**: El dominio no depende de tecnologías externas
✅ **Testeable**: Fácil de probar porque la lógica está aislada
✅ **Mantenible**: Cambios en tecnología no afectan el dominio
✅ **Escalable**: Puedes cambiar adaptadores sin tocar el core

---

## 📁 ESTRUCTURA DEL PROYECTO {#estructura}

```
src/
├── 🎯 domain/                      # CAPA DE DOMINIO (Core)
│   ├── entities/                   # Entidades del negocio
│   └── repositories/               # Interfaces de repositorios (Puertos)
│
├── 💼 application/                 # CAPA DE APLICACIÓN
│   └── use-cases/                  # Casos de uso del negocio
│
├── 🔌 infrastructure/              # CAPA DE INFRAESTRUCTURA (Adaptadores)
│   ├── config/                     # Configuración de la aplicación
│   │   ├── app.js                  # Configuración Express
│   │   └── keys.js                 # Variables de entorno/configuración
│   │
│   ├── database/                   # Adaptadores de Base de Datos
│   │   ├── dataBase.sql.js         # Conexión MySQL
│   │   ├── dataBase.orm.js         # ORM Sequelize
│   │   ├── dataBaseMongose.js      # Conexión MongoDB
│   │   ├── sql/                    # Queries SQL específicas
│   │   └── mongodb/                # Queries MongoDB específicas
│   │
│   └── web/                        # Adaptador Web (HTTP)
│       ├── controllers/            # Controladores HTTP
│       ├── routes/                 # Rutas/Endpoints API
│       └── middlewares/            # Middlewares (auth, validación)
│
└── 🛠️ shared/                      # CÓDIGO COMPARTIDO
    └── utils/                      # Utilidades (encriptación, etc.)

# Archivos heredados (estructura anterior - aún funcionales)
├── Database/                       # ⚠️ ANTIGUA: Conexiones a BD
├── controller/                     # ⚠️ ANTIGUA: Controladores
├── router/                         # ⚠️ ANTIGUA: Rutas
├── models/                         # ⚠️ ANTIGUA: Modelos
├── lib/                           # ⚠️ ANTIGUA: Librerías
├── index.js                       # ⚠️ ANTIGUA: Punto de entrada
└── index-hexagonal.js             # ✅ NUEVA: Punto de entrada hexagonal
```

---

## 📂 EXPLICACIÓN DE CADA CARPETA {#carpetas}

### 🎯 1. `domain/` - DOMINIO (El Corazón)

**Propósito**: Contiene la lógica de negocio PURA, independiente de tecnologías.

#### `domain/entities/`
**¿Qué es?**: Las entidades del negocio (modelos de datos)

**¿Qué contiene?**:
- Modelos SQL (Sequelize): `usuario.js`, `cliente.js`, `transporte.js`, etc.
- Modelos MongoDB (Mongoose): `page.js`, `calificacion.js`, etc.

**Ejemplo de archivo** (`usuario.js`):
```javascript
// Define la estructura de un Usuario
module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        idUser: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameUsers: type.STRING,
        emailUser: type.STRING,
        // ... más campos
    });
};
```

**¿Por qué está aquí?**: Las entidades representan los conceptos fundamentales del negocio.

#### `domain/repositories/`
**¿Qué es?**: Interfaces (contratos) para acceder a datos

**¿Qué contiene?**: VACÍO por ahora (aquí irían interfaces como `IClienteRepository`)

**Ejemplo futuro**:
```javascript
// IClienteRepository.js
class IClienteRepository {
    async findAll() { throw new Error("Not implemented"); }
    async findById(id) { throw new Error("Not implemented"); }
    async create(data) { throw new Error("Not implemented"); }
}
```

---

### 💼 2. `application/` - APLICACIÓN

**Propósito**: Orquesta la lógica del dominio (casos de uso del negocio)

#### `application/use-cases/`
**¿Qué es?**: Los casos de uso (acciones que puede hacer el usuario)

**¿Qué contiene?**: VACÍO por ahora

**Ejemplo futuro** (`CrearClienteUseCase.js`):
```javascript
class CrearClienteUseCase {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    async execute(data) {
        // 1. Validar datos
        // 2. Aplicar reglas de negocio
        // 3. Guardar usando el repositorio
        return await this.clienteRepository.create(data);
    }
}
```

---

### 🔌 3. `infrastructure/` - INFRAESTRUCTURA (Adaptadores)

**Propósito**: Conecta el dominio con tecnologías concretas (bases de datos, web, etc.)

#### `infrastructure/config/`
**¿Qué contiene?**:
- `app.js`: Configuración de Express (middleware, rutas, seguridad)
- `keys.js`: Credenciales de bases de datos

**`app.js` explicado línea por línea**:
```javascript
// Líneas 1-21: Importación de módulos
require('dotenv').config();          // Cargar variables de entorno
const express = require('express');  // Framework web

// Líneas 24-25: Importar configuración local
const { MYSQLHOST, MYSQLUSER... } = require('./keys');  // Credenciales BD
require('../web/middlewares/passport');                 // Autenticación

// Línea 28: Crear app Express
const app = express();

// Línea 31: Configurar puerto
app.set('port', process.env.PORT || 8888);

// Líneas 34-39: CORS (permitir peticiones de otros dominios)
app.use(cors({...}));

// Líneas 50-76: Sistema de LOGS (Winston)
// Registra todas las peticiones y errores en archivos

// Líneas 99-107: Protección contra sobrecarga
// Si el servidor está ocupado, rechaza peticiones

// Líneas 109-184: SEGURIDAD
app.use(helmet());              // Headers de seguridad
app.use(hpp());                 // Prevenir ataques HTTP Parameter Pollution
const limiter = rateLimit({...}); // Limitar peticiones (anti fuerza bruta)
app.use(cookieParser(...));     // Cookies seguras
app.use(session({...}));        // Sesiones con MySQL

// Líneas 210-216: Subida de archivos
app.use(fileUpload({...}));

// Líneas 222-223: Passport (autenticación)
app.use(passport.initialize());
app.use(passport.session());

// Líneas 226-247: Helpers para respuestas JSON
res.apiResponse(data, status);  // Respuesta exitosa
res.apiError(message, status);  // Respuesta de error

// Líneas 251-269: RUTAS DE LA API
app.use('/auth', require('../web/routes/auth.router'));
app.use('/conductor', require('../web/routes/conductor.router'));
// ... más rutas

// Líneas 282-306: MANEJO DE ERRORES
// Captura errores y devuelve JSON con el error

// Línea 315: Exportar app
module.exports = app;
```

**`keys.js` explicado**:
```javascript
// Configuración de conexión a MySQL
const MYSQLHOST = '31.97.42.126';      // Servidor MySQL
const MYSQLUSER = 'linkear';           // Usuario
const MYSQLPASSWORD = '0987021692@Rj'; // Contraseña
const MYSQLDATABASE = 'openblind';     // Base de datos
const MYSQLPORT = '3306';              // Puerto

// URI de MongoDB
const MONGODB_URI = 'mongodb://linkear:0987021692%40Rj@31.97.42.126:27017/openblind';

// Exportar para usar en otros archivos
module.exports = { MYSQLHOST, MYSQLUSER, ... };
```

#### `infrastructure/database/`
**¿Qué es?**: Implementaciones concretas de acceso a datos

**Archivos**:

1. **`dataBase.sql.js`**: Pool de conexiones MySQL
```javascript
const { createPool } = require("mysql2");
const pool = createPool({
    user: MYSQLUSER,
    password: MYSQLPASSWORD,
    host: MYSQLHOST,
    // ...
});
// Crea un pool (conjunto) de conexiones reutilizables a MySQL
```

2. **`dataBase.orm.js`**: ORM Sequelize (mapea objetos a SQL)
```javascript
const sequelize = new Sequelize(...);  // Crear instancia Sequelize
sequelize.authenticate();              // Verificar conexión
sequelize.sync();                      // Sincronizar modelos con BD

// Importar y configurar TODOS los modelos
const usuario = usuarioModel(sequelize, Sequelize);
const cliente = clienteModel(sequelize, Sequelize);
// ... más modelos

// Definir RELACIONES entre modelos
usuario.hasMany(detalleRol);          // Un usuario tiene muchos roles
detalleRol.belongsTo(usuario);        // Un rol pertenece a un usuario

// Exportar modelos para usar en controladores
module.exports = { usuario, cliente, ... };
```

3. **`dataBaseMongose.js`**: Conexión y modelos MongoDB
```javascript
const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect(MONGODB_URI, {...});
    console.log('MongoDB conectado');
};
connectDB();  // Conectar al iniciar

// Exportar modelos MongoDB
const clienteModel = require('../../domain/entities/cliente');
module.exports = { clienteModel, ... };
```

#### `infrastructure/web/`

##### `infrastructure/web/controllers/`
**¿Qué son?**: Controladores HTTP (manejan peticiones del cliente)

**Ejemplo** (`cliente.controller.js` explicado):
```javascript
// Línea 1: Crear objeto vacío para exportar
const clienteCtl = {};

// Líneas 2-5: Importar dependencias
const orm = require('../../database/dataBase.orm');          // ORM Sequelize
const sql = require('../../database/dataBase.sql');          // Pool MySQL
const mongo = require('../../database/dataBaseMongose');     // MongoDB
const { cifrarDatos, descifrarDatos } = require('../../../shared/utils/encrypDates');

// Líneas 8-15: Función helper para descifrar datos de forma segura
const descifrarSeguro = (dato) => {
    try {
        return dato ? descifrarDatos(dato) : '';
    } catch (error) {
        console.error('Error al descifrar:', error);
        return '';
    }
};

// Líneas 18-50: MOSTRAR TODOS LOS CLIENTES
clienteCtl.mostrarClientes = async (req, res) => {
    try {
        // 1. Obtener clientes activos de MySQL
        const [listaClientes] = await sql.promise().query(
            'SELECT * FROM clientes WHERE stadoCliente = "activo"'
        );

        // 2. Para cada cliente, obtener datos adicionales de MongoDB
        const clientesCompletos = await Promise.all(
            listaClientes.map(async (cliente) => {
                // 2a. Buscar datos en MongoDB por ID de SQL
                const clienteMongo = await mongo.clienteModel.findOne({
                    idClienteSql: cliente.idClientes
                });

                // 2b. Combinar datos SQL + MongoDB y descifrar
                return {
                    ...cliente,  // Datos de SQL
                    cedulaCliente: descifrarSeguro(cliente.cedulaCliente),
                    nombreCliente: descifrarSeguro(cliente.nombreCliente),
                    detallesMongo: clienteMongo ? {
                        direccionCliente: descifrarSeguro(clienteMongo.direccionCliente),
                        // ... más campos
                    } : null
                };
            })
        );

        // 3. Devolver JSON con los clientes
        return res.json(clientesCompletos);
    } catch (error) {
        // 4. Si hay error, devolver mensaje de error
        return res.status(500).json({
            message: 'Error al obtener los clientes',
            error: error.message
        });
    }
};

// Líneas 53-96: CREAR NUEVO CLIENTE
clienteCtl.crearCliente = async (req, res) => {
    try {
        // 1. Extraer datos del cuerpo de la petición
        const { cedulaCliente, nombreCliente, usernameCliente, passwordCliente,
                direccionCliente, telefonoCliente, emailCliente, tipoCliente } = req.body;

        // 2. Validar que existan campos obligatorios
        if (!cedulaCliente || !nombreCliente || !usernameCliente || !passwordCliente) {
            return res.status(400).json({ message: 'Datos básicos obligatorios' });
        }

        // 3. Crear cliente en MySQL (usando ORM) con datos ENCRIPTADOS
        const nuevoCliente = await orm.cliente.create({
            cedulaCliente: cifrarDatos(cedulaCliente),       // Encriptar cédula
            nombreCliente: cifrarDatos(nombreCliente),       // Encriptar nombre
            usernameCliente: cifrarDatos(usernameCliente),   // Encriptar username
            passwordCliente: cifrarDatos(passwordCliente),   // Encriptar contraseña
            stadoCliente: 'activo',
            createCliente: new Date().toLocaleString(),
        });

        // 4. Si hay datos adicionales, guardarlos en MongoDB
        if (direccionCliente || telefonoCliente || emailCliente) {
            await mongo.clienteModel.create({
                direccionCliente: cifrarDatos(direccionCliente || ''),
                telefonoCliente: cifrarDatos(telefonoCliente || ''),
                emailCliente: cifrarDatos(emailCliente || ''),
                tipoCliente: tipoCliente || 'Regular',
                idClienteSql: nuevoCliente.idClientes  // Vincular con SQL
            });
        }

        // 5. Devolver respuesta exitosa
        return res.status(201).json({
            message: 'Cliente creado exitosamente',
            idCliente: nuevoCliente.idClientes
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear el cliente',
            error: error.message
        });
    }
};

// Líneas 99-147: ACTUALIZAR CLIENTE
clienteCtl.actualizarCliente = async (req, res) => {
    try {
        // 1. Obtener ID del cliente desde la URL
        const { id } = req.params;

        // 2. Obtener nuevos datos del cuerpo
        const { cedulaCliente, nombreCliente, usernameCliente,
                direccionCliente, telefonoCliente, emailCliente } = req.body;

        // 3. Validar
        if (!cedulaCliente || !nombreCliente || !usernameCliente) {
            return res.status(400).json({ message: 'Datos básicos obligatorios' });
        }

        // 4. Actualizar en MySQL usando query SQL directo
        await sql.promise().query(
            `UPDATE clientes SET
                cedulaCliente = ?,
                nombreCliente = ?,
                usernameCliente = ?,
                updateCliente = ?
             WHERE idClientes = ?`,
            [
                cifrarDatos(cedulaCliente),  // Datos encriptados
                cifrarDatos(nombreCliente),
                cifrarDatos(usernameCliente),
                new Date().toLocaleString(),
                id
            ]
        );

        // 5. Actualizar datos adicionales en MongoDB
        if (direccionCliente || telefonoCliente || emailCliente) {
            await mongo.clienteModel.updateOne(
                { idClienteSql: id },  // Buscar por ID de SQL
                {
                    $set: {  // Operador MongoDB para actualizar
                        direccionCliente: cifrarDatos(direccionCliente || ''),
                        telefonoCliente: cifrarDatos(telefonoCliente || ''),
                        emailCliente: cifrarDatos(emailCliente || ''),
                    }
                }
            );
        }

        return res.json({ message: 'Cliente actualizado exitosamente' });

    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar',
            error: error.message
        });
    }
};

// Líneas 150-167: ELIMINAR CLIENTE (soft delete)
clienteCtl.eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;

        // No elimina realmente, solo cambia estado a "inactivo"
        await sql.promise().query(
            `UPDATE clientes SET
                stadoCliente = 'inactivo',
                updateCliente = ?
             WHERE idClientes = ?`,
            [new Date().toLocaleString(), id]
        );

        return res.json({ message: 'Cliente desactivado exitosamente' });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al desactivar',
            error: error.message
        });
    }
};

// Línea 169: Exportar todas las funciones
module.exports = clienteCtl;
```

##### `infrastructure/web/routes/`
**¿Qué son?**: Definen las rutas/endpoints de la API

**Ejemplo** (`auth.router.js` explicado):
```javascript
// Líneas 1-5: Importaciones
const express = require('express');
const router = express.Router();                          // Crear router
const { body } = require('express-validator');            // Validación
const { register, login, logout, getProfile } = require('../controllers/auth.controller');
const isLoggedIn = require('../middlewares/auth');        // Middleware autenticación

// Líneas 8-14: Validaciones para registro
const registerValidation = [
    body('nameUsers').notEmpty().withMessage('Nombre requerido'),
    body('emailUser').isEmail().withMessage('Email válido requerido'),
    body('userName').notEmpty().withMessage('Username requerido'),
    body('passwordUser').isLength({ min: 6 }).withMessage('Contraseña mínimo 6 caracteres'),
    body('phoneUser').optional().isMobilePhone().withMessage('Teléfono válido')
];

// Líneas 16-19: Validaciones para login
const loginValidation = [
    body('username').notEmpty().withMessage('Username requerido'),
    body('password').notEmpty().withMessage('Contraseña requerida')
];

// Líneas 22-25: DEFINIR RUTAS
router.post('/register', registerValidation, register);    // POST /auth/register
router.post('/login', loginValidation, login);             // POST /auth/login
router.post('/logout', isLoggedIn, logout);                // POST /auth/logout (requiere auth)
router.get('/profile', isLoggedIn, getProfile);            // GET /auth/profile (requiere auth)

// Línea 27: Exportar router
module.exports = router;
```

##### `infrastructure/web/middlewares/`
**¿Qué son?**: Funciones que se ejecutan ANTES de los controladores

**Archivos**:

1. **`auth.js`**: Verifica si el usuario está autenticado
```javascript
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {  // Verificar si hay sesión
        return next();             // Continuar
    }
    return res.status(401).json({ message: 'No autenticado' });
};
```

2. **`passport.js`**: Estrategias de autenticación (cómo verificar usuarios)
```javascript
// Líneas 1-8: Importaciones
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { cifrarDatos, descifrarDatos } = require('../../../shared/utils/encrypDates');
const orm = require('../../database/dataBase.orm');
const sql = require('../../database/dataBase.sql');
const mongo = require('../../database/dataBaseMongose');

// Líneas 14-21: Helper para descifrar
const descifrarSeguro = (dato) => {
    try {
        return dato ? descifrarDatos(dato) : '';
    } catch (error) {
        console.error('Error al descifrar:', error);
        return '';
    }
};

// Líneas 73-99: Función para buscar usuario
const buscarUsuarioPorCredenciales = async (identifier) => {
    try {
        // 1. Obtener TODOS los usuarios activos
        const [users] = await sql.promise().query(
            'SELECT * FROM users WHERE stateUser = "active"'
        );

        // 2. Comparar uno por uno (necesario porque están encriptados)
        for (const user of users) {
            try {
                const userNameDescifrado = descifrarSeguro(user.userName);
                const emailDescifrado = descifrarSeguro(user.emailUser);

                // 3. Comparar con el identificador proporcionado
                if (userNameDescifrado === identifier || emailDescifrado === identifier) {
                    return user;  // Usuario encontrado
                }
            } catch (error) {
                continue;  // Continuar con siguiente usuario si falla
            }
        }
        return null;  // No se encontró
    } catch (error) {
        console.error('Error en búsqueda:', error);
        return null;
    }
};

// Líneas 102-157: ESTRATEGIA DE REGISTRO
passport.use(
    'local.Signup',
    new LocalStrategy(
        {
            usernameField: 'userName',
            passwordField: 'passwordUser',
            passReqToCallback: true,  // Pasar req a la función
        },
        async (req, userName, passwordUser, done) => {
            try {
                const { nameUsers, phoneUser, emailUser } = req.body;

                // 1. Verificar si ya existe
                const existingUser = await buscarUsuarioPorCredenciales(userName);
                const existingEmail = await buscarUsuarioPorCredenciales(emailUser);

                if (existingUser) {
                    return done(null, false, { message: 'Usuario ya existe' });
                }
                if (existingEmail) {
                    return done(null, false, { message: 'Email ya registrado' });
                }

                // 2. Encriptar contraseña con bcrypt
                const hashedPassword = await bcrypt.hash(passwordUser, 10);

                // 3. Crear usuario con datos cifrados
                const newUser = await orm.usuario.create({
                    nameUsers: cifrarDatos(nameUsers),
                    phoneUser: cifrarDatos(phoneUser || ''),
                    emailUser: cifrarDatos(emailUser),
                    userName: cifrarDatos(userName),
                    passwordUser: hashedPassword,
                    stateUser: 'active',
                    createUser: new Date().toLocaleString()
                });

                // 4. Preparar objeto para sesión (SIN cifrar)
                const userForSession = {
                    idUser: newUser.idUser,
                    nameUsers: nameUsers,
                    emailUser: emailUser,
                    userName: userName,
                    stateUser: 'active'
                };

                return done(null, userForSession, { message: 'Registrado exitosamente' });

            } catch (error) {
                console.error('Error en registro:', error);
                return done(error);
            }
        }
    )
);

// Líneas 160-203: ESTRATEGIA DE LOGIN
passport.use(
    'local.Signin',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                // 1. Buscar usuario
                const user = await buscarUsuarioPorCredenciales(username);

                if (!user) {
                    return done(null, false, { message: "Usuario no existe" });
                }

                // 2. Verificar contraseña con bcrypt
                const isValidPassword = await bcrypt.compare(password, user.passwordUser);

                if (!isValidPassword) {
                    return done(null, false, { message: "Contraseña incorrecta" });
                }

                // 3. Preparar usuario para sesión (descifrado)
                const userForSession = {
                    idUser: user.idUser,
                    nameUsers: descifrarSeguro(user.nameUsers),
                    phoneUser: descifrarSeguro(user.phoneUser),
                    emailUser: descifrarSeguro(user.emailUser),
                    userName: descifrarSeguro(user.userName),
                    stateUser: user.stateUser,
                    createUser: user.createUser
                };

                return done(null, userForSession, { message: `Bienvenido ${userForSession.nameUsers}` });

            } catch (error) {
                console.error('Error en login:', error);
                return done(error);
            }
        }
    )
);

// Líneas 206-209: Serialización (guardar en sesión)
passport.serializeUser((user, done) => {
    done(null, user.idUser);  // Solo guardar ID
});

// Líneas 212-241: Deserialización (recuperar de sesión)
passport.deserializeUser(async (idUser, done) => {
    try {
        // 1. Buscar usuario por ID
        const [users] = await sql.promise().query(
            'SELECT * FROM users WHERE idUser = ? AND stateUser = "active"',
            [idUser]
        );

        if (users.length === 0) {
            return done(null, false);
        }

        const user = users[0];

        // 2. Preparar con datos descifrados
        const userForSession = {
            idUser: user.idUser,
            nameUsers: descifrarSeguro(user.nameUsers),
            phoneUser: descifrarSeguro(user.phoneUser),
            emailUser: descifrarSeguro(user.emailUser),
            userName: descifrarSeguro(user.userName),
            stateUser: user.stateUser,
            createUser: user.createUser
        };

        done(null, userForSession);
    } catch (error) {
        console.error('Error en deserialización:', error);
        done(error);
    }
});

// Línea 399: Exportar passport configurado
module.exports = passport;
```

---

### 🛠️ 4. `shared/` - CÓDIGO COMPARTIDO

#### `shared/utils/`
**¿Qué es?**: Utilidades usadas en toda la aplicación

**Archivo**: `encrypDates.js` (encriptación de datos sensibles)
```javascript
const CryptoJS = require('crypto-js');

// Clave secreta para encriptar (debería estar en .env)
const secretKey = 'mi-clave-super-secreta-123';

// FUNCIÓN PARA CIFRAR
const cifrarDatos = (dato) => {
    if (!dato) return '';
    // Usar AES (Advanced Encryption Standard)
    return CryptoJS.AES.encrypt(dato.toString(), secretKey).toString();
};

// FUNCIÓN PARA DESCIFRAR
const descifrarDatos = (datoCifrado) => {
    if (!datoCifrado) return '';
    // Descifrar y convertir a string
    const bytes = CryptoJS.AES.decrypt(datoCifrado, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

// Exportar funciones
module.exports = {
    cifrarDatos,
    descifrarDatos
};
```

---

## 🔄 FLUJO DE DATOS {#flujo}

### Ejemplo: Crear un Cliente

```
1. CLIENTE (Frontend/Postman)
   │
   │ POST /clientes
   │ Body: { nombre: "Juan", cedula: "12345" }
   │
   ↓
2. INFRASTRUCTURE/WEB/ROUTES
   │ auth.router.js
   │ → Valida datos
   │ → Verifica autenticación
   │
   ↓
3. INFRASTRUCTURE/WEB/CONTROLLERS
   │ cliente.controller.js
   │ → clienteCtl.crearCliente()
   │ → Extrae datos del req.body
   │ → Cifra datos sensibles
   │
   ↓
4. INFRASTRUCTURE/DATABASE
   │ dataBase.orm.js
   │ → orm.cliente.create(...)
   │ → Inserta en MySQL
   │
   ↓
5. DOMAIN/ENTITIES
   │ cliente.js (modelo)
   │ → Define estructura de tabla
   │
   ↓
6. BASE DE DATOS (MySQL/MongoDB)
   │ → Guarda registro
   │
   ↓
7. RESPUESTA
   │ 201 Created
   │ { message: "Cliente creado", idCliente: 123 }
```

### Ejemplo: Obtener Clientes

```
1. PETICIÓN
   │ GET /clientes
   │
   ↓
2. ROUTE → CONTROLLER
   │ cliente.controller.js::mostrarClientes()
   │
   ↓
3. CONSULTA SQL
   │ sql.promise().query('SELECT * FROM clientes...')
   │
   ↓
4. CONSULTA MONGODB (para datos adicionales)
   │ mongo.clienteModel.findOne(...)
   │
   ↓
5. DESCIFRAR DATOS
   │ descifrarSeguro(cliente.nombre)
   │
   ↓
6. RESPUESTA JSON
   │ [
   │   { id: 1, nombre: "Juan", email: "juan@..." },
   │   { id: 2, nombre: "María", email: "maria@..." }
   │ ]
```

---

## 📄 ARCHIVOS CLAVE EXPLICADOS {#archivos}

### Punto de Entrada

#### `index.js` (ANTIGUO - aún funcional)
```javascript
const app = require('./app');  // Importar app desde src/app.js

const port = app.get('port');
app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});
```

#### `index-hexagonal.js` (NUEVO - arquitectura hexagonal)
```javascript
const app = require('./infrastructure/config/app');  // Nueva ruta

const port = app.get('port');
app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});
```

---

## 🚀 CÓMO EJECUTAR EL PROYECTO

### Opción 1: Estructura Antigua (compatible)
```bash
npm start
# o
npm run dev
```

### Opción 2: Estructura Hexagonal (nueva)
```bash
# Modificar package.json:
"scripts": {
  "dev": "nodemon src/index-hexagonal.js",
  "start": "node src/index-hexagonal.js"
}

# Luego ejecutar:
npm run dev
```

---

## 📊 COMPARACIÓN: ANTES vs AHORA

### ANTES (Estructura Tradicional)
```
src/
├── Database/          # Conexiones BD
├── controller/        # Controladores
├── router/            # Rutas
├── models/            # Modelos
└── lib/               # Utilidades
```

**Problema**: Todo mezclado, difícil de mantener

### AHORA (Arquitectura Hexagonal)
```
src/
├── domain/            # ❤️ Lógica de negocio
├── application/       # 💼 Casos de uso
├── infrastructure/    # 🔌 Tecnología (DB, Web)
└── shared/            # 🛠️ Compartido
```

**Ventaja**: Separación clara de responsabilidades

---

## 🎓 CONCEPTOS PARA LA REUNIÓN

### ¿Qué es la Arquitectura Hexagonal?
"Es un patrón que separa la lógica de negocio (dominio) de las tecnologías externas (bases de datos, APIs). El dominio está en el centro y no depende de nada más."

### ¿Por qué usarla?
"Facilita el testing, mantenimiento y escalabilidad. Podemos cambiar de MySQL a PostgreSQL sin tocar la lógica de negocio."

### ¿Qué cambiamos?
"Reorganizamos el código en capas: dominio (entidades), infraestructura (adaptadores de BD y web), y compartido (utilidades). El código sigue siendo el mismo, solo está mejor organizado."

### ¿Qué hace cada capa?

1. **DOMAIN**: Define las entidades del negocio (Usuario, Cliente, Transporte)
2. **INFRASTRUCTURE**: Se conecta con MySQL, MongoDB, y maneja HTTP
3. **SHARED**: Funciones reutilizables como encriptación

### Ventajas del proyecto actual
- ✅ Código más organizado
- ✅ Fácil de testear
- ✅ Escalable (podemos agregar nuevas BDs sin problemas)
- ✅ Mantenible (cambios en BD no afectan lógica)

---

## 🔑 GLOSARIO

- **Entidad**: Objeto del negocio (Usuario, Cliente, Transporte)
- **Puerto**: Interface que define CÓMO hablar con el dominio
- **Adaptador**: Implementación concreta (MySQL, MongoDB, Express)
- **ORM**: Object-Relational Mapping (mapea objetos a tablas SQL)
- **Middleware**: Función que se ejecuta entre la petición y el controlador
- **Serialización**: Convertir objeto a formato almacenable (sesión)
- **Deserialización**: Recuperar objeto desde almacenamiento

---

## 📞 PREGUNTAS FRECUENTES

**P: ¿Cambió la lógica del código?**
R: NO. Solo reorganizamos archivos. La lógica es idéntica.

**P: ¿Funciona el proyecto ahora?**
R: Sí, ambas estructuras (antigua y nueva) funcionan.

**P: ¿Qué archivo ejecuto?**
R: `index-hexagonal.js` para la nueva estructura, `index.js` para la antigua.

**P: ¿Dónde están los modelos ahora?**
R: En `domain/entities/` (antes en `models/`)

**P: ¿Dónde están los controladores?**
R: En `infrastructure/web/controllers/` (antes en `controller/`)

**P: ¿Qué pasa con las carpetas antiguas?**
R: Siguen ahí para compatibilidad. Podemos eliminarlas después de validar.

---

## ✅ CHECKLIST PARA LA REUNIÓN

- [ ] Explicar qué es arquitectura hexagonal (3 capas)
- [ ] Mostrar estructura de carpetas nueva
- [ ] Explicar qué hace cada carpeta
- [ ] Demostrar un flujo completo (GET /clientes)
- [ ] Explicar ventajas (testeable, mantenible, escalable)
- [ ] Mostrar que el código funciona igual

---

**Fecha**: 2025-12-04
**Versión**: 1.0
**Autor**: Equipo de Desarrollo
