const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../config/keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI, {
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4', // Soporte para caracteres especiales
        },
        pool: {
            max: 20, // Número máximo de conexiones
            min: 5,  // Número mínimo de conexiones
            acquire: 30000, // Tiempo máximo en ms para obtener una conexión
            idle: 10000 // Tiempo máximo en ms que una conexión puede estar inactiva
        },
        logging: false // Desactiva el logging para mejorar el rendimiento
    });
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4', // Soporte para caracteres especiales
        },
        pool: {
            max: 20, // Número máximo de conexiones
            min: 5,  // Número mínimo de conexiones
            acquire: 30000, // Tiempo máximo en ms para obtener una conexión
            idle: 10000 // Tiempo máximo en ms que una conexión puede estar inactiva
        },
        logging: false // Desactiva el logging para mejorar el rendimiento
    });
}

// Autenticar y sincronizar
sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

// Sincronización de la base de datos
const syncOptions = process.env.NODE_ENV === 'development' ? { force: true } : { alter: true };

sequelize.sync(syncOptions)
    .then(() => {
        console.log('Base de Datos sincronizadas');
    })
    .catch((error) => {
        console.error('Error al sincronizar la Base de Datos:', error);
    });

//extracionModelos
const usuarioModel = require('../../domain/entities/usuario')
const rolModel = require('../../domain/entities/rol')
const detalleRolModel = require('../../domain/entities/detalleRol')
const pageModel = require('../../domain/entities/page')
const categoriaTransporteModel = require('../../domain/entities/categoriaTransporte');
const transporteModel = require('../../domain/entities/transporte');
const empresaTransporteModel = require('../../domain/entities/empresaTransporte');
const conductorModel = require('../../domain/entities/conductor');
const estacionModel = require('../../domain/entities/estacion');
const categoriaEstacionModel = require('../../domain/entities/categoriaEstacion');
const rutaModel = require('../../domain/entities/ruta');
const rutaEstacionModel = require('../../domain/entities/rutaEstacion');
const horarioModel = require('../../domain/entities/horario');
const metodoIngresoModel = require('../../domain/entities/metodoIngreso');
const estacionMetodoModel = require('../../domain/entities/estacionMetodo');
const categoriaLugarModel = require('../../domain/entities/categoriaLugar');
const lugarTuristicoModel = require('../../domain/entities/lugarTuristico');
const tipoMensajeModel = require('../../domain/entities/tipoMensaje');
const mensajeModel = require('../../domain/entities/mensaje');
const guiaVozModel = require('../../domain/entities/guiaVoz');
const idiomaModel = require('../../domain/entities/idioma');
const calificacionModel = require('../../domain/entities/calificacion');
const tarifaModel = require('../../domain/entities/tarifa');
const clienteModel = require('../../domain/entities/cliente');

//intaciar los modelos a sincronizar
const usuario = usuarioModel(sequelize, Sequelize)
const rol = rolModel(sequelize, Sequelize)
const detalleRol = detalleRolModel(sequelize, Sequelize)
const page = pageModel(sequelize, Sequelize)
const categoriaTransporte = categoriaTransporteModel(sequelize, Sequelize);
const transporte = transporteModel(sequelize, Sequelize);
const empresaTransporte = empresaTransporteModel(sequelize, Sequelize);
const conductor = conductorModel(sequelize, Sequelize);
const estacion = estacionModel(sequelize, Sequelize);
const categoriaEstacion = categoriaEstacionModel(sequelize, Sequelize);
const ruta = rutaModel(sequelize, Sequelize);
const rutaEstacion = rutaEstacionModel(sequelize, Sequelize);
const horario = horarioModel(sequelize, Sequelize);
const metodoIngreso = metodoIngresoModel(sequelize, Sequelize);
const estacionMetodo = estacionMetodoModel(sequelize, Sequelize);
const categoriaLugar = categoriaLugarModel(sequelize, Sequelize);
const lugarTuristico = lugarTuristicoModel(sequelize, Sequelize);
const tipoMensaje = tipoMensajeModel(sequelize, Sequelize);
const mensaje = mensajeModel(sequelize, Sequelize);
const guiaVoz = guiaVozModel(sequelize, Sequelize);
const idioma = idiomaModel(sequelize, Sequelize);
const calificacion = calificacionModel(sequelize, Sequelize);
const tarifa = tarifaModel(sequelize, Sequelize);
const cliente = clienteModel(sequelize, Sequelize);

//relaciones o foreingKeys

usuario.hasMany(detalleRol)
detalleRol.belongsTo(usuario)

rol.hasMany(detalleRol)
detalleRol.belongsTo(rol)

usuario.hasMany(page)
page.belongsTo(usuario)

// RELACIONES TRANSPORTE
categoriaTransporte.hasMany(transporte);
transporte.belongsTo(categoriaTransporte);

empresaTransporte.hasMany(transporte);
transporte.belongsTo(empresaTransporte);

conductor.hasMany(transporte);
transporte.belongsTo(conductor);

// RELACIONES ESTACION
categoriaEstacion.hasMany(estacion);
estacion.belongsTo(categoriaEstacion);

// RELACIONES RUTA-TRANSPORTE
ruta.hasMany(transporte);
transporte.belongsTo(ruta);

// RELACIONES RUTA-ESTACION (N:M)
ruta.hasMany(rutaEstacion);
rutaEstacion.belongsTo(ruta);
estacion.hasMany(rutaEstacion);
rutaEstacion.belongsTo(estacion);

// RELACIONES HORARIOS
ruta.hasMany(horario);
horario.belongsTo(ruta);

estacion.hasMany(horario);
horario.belongsTo(estacion);

// RELACIONES METODOS INGRESO-ESTACION (N:M)
estacion.hasMany(estacionMetodo);
estacionMetodo.belongsTo(estacion);
metodoIngreso.hasMany(estacionMetodo);
estacionMetodo.belongsTo(metodoIngreso);

// RELACIONES LUGARES TURISTICOS
categoriaLugar.hasMany(lugarTuristico);
lugarTuristico.belongsTo(categoriaLugar);

estacion.hasMany(lugarTuristico);
lugarTuristico.belongsTo(estacion);

// RELACIONES MENSAJES
tipoMensaje.hasMany(mensaje);
mensaje.belongsTo(tipoMensaje);

usuario.hasMany(mensaje);
mensaje.belongsTo(usuario);

// RELACIONES GUIAS DE VOZ
mensaje.hasMany(guiaVoz);
guiaVoz.belongsTo(mensaje);

idioma.hasMany(guiaVoz);
guiaVoz.belongsTo(idioma);

lugarTuristico.hasMany(guiaVoz);
guiaVoz.belongsTo(lugarTuristico);

usuario.hasMany(guiaVoz);
guiaVoz.belongsTo(usuario);

// RELACIONES CALIFICACIONES
usuario.hasMany(calificacion);
calificacion.belongsTo(usuario);

transporte.hasMany(calificacion);
calificacion.belongsTo(transporte);

conductor.hasMany(calificacion);
calificacion.belongsTo(conductor);

ruta.hasMany(calificacion);
calificacion.belongsTo(ruta);

estacion.hasMany(calificacion);
calificacion.belongsTo(estacion);

lugarTuristico.hasMany(calificacion);
calificacion.belongsTo(lugarTuristico);

guiaVoz.hasMany(calificacion);
calificacion.belongsTo(guiaVoz);

// RELACIONES TARIFAS
ruta.hasMany(tarifa);
tarifa.belongsTo(ruta);

transporte.hasMany(tarifa);
tarifa.belongsTo(transporte);

lugarTuristico.hasMany(tarifa);
tarifa.belongsTo(lugarTuristico);

// RELACIONES ADICIONALES
usuario.hasMany(lugarTuristico); // Usuario que registra el lugar
lugarTuristico.belongsTo(usuario);

usuario.hasMany(conductor); // Usuario que registra el conductor
conductor.belongsTo(usuario);

// Exportar el objeto sequelize
module.exports = {
  usuario,
  rol,
  detalleRol,
  page,
  // Modelos de transporte
    categoriaTransporte,
    transporte,
    empresaTransporte,
    conductor,
    
    // Modelos de estaciones
    estacion,
    categoriaEstacion,
    metodoIngreso,
    estacionMetodo,
    
    // Modelos de rutas
    ruta,
    rutaEstacion,
    horario,
    
    // Modelos de lugares
    categoriaLugar,
    lugarTuristico,
    
    // Modelos de comunicación
    tipoMensaje,
    mensaje,
    guiaVoz,
    idioma,
    
    // Modelos de evaluación
    calificacion,
    tarifa,
    cliente,
};