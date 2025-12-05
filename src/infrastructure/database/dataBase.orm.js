const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../config/keys");

let sequelize;

// ==================== CONFIGURACIÓN SEQUELIZE ====================
// Usar URI de conexión si está disponible
if (MYSQL_URI && MYSQL_URI.trim() !== '') {
    sequelize = new Sequelize(MYSQL_URI, {
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
            connectTimeout: 60000, // 60 segundos
        },
        pool: {
            max: 20,
            min: 5,
            acquire: 60000,
            idle: 10000
        },
        logging: false,
        retry: {
            max: 3
        }
    });
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
            connectTimeout: 60000,
        },
        pool: {
            max: 20,
            min: 5,
            acquire: 60000,
            idle: 10000
        },
        logging: false,
        retry: {
            max: 3
        }
    });
}

// ==================== AUTENTICACIÓN ====================
sequelize.authenticate()
    .then(() => {
        console.log("✅ Conexión establecida con MySQL");
    })
    .catch((err) => {
        console.error("❌ No se pudo conectar a MySQL:", err.message);
    });

// ==================== SINCRONIZACIÓN ====================
// alter: false para no modificar tablas existentes automáticamente
const syncOptions = { alter: false };

sequelize.sync(syncOptions)
    .then(() => {
        console.log('✅ Modelos sincronizados con MySQL');
    })
    .catch((error) => {
        console.error('❌ Error al sincronizar modelos:', error.message);
    });

// ==================== IMPORTAR MODELOS ====================
const usuarioModel = require('../../domain/entities/sql/usuario');
const rolModel = require('../../domain/entities/sql/rol');
const detalleRolModel = require('../../domain/entities/sql/detalleRol');
const pageModel = require('../../domain/entities/sql/page');
const categoriaTransporteModel = require('../../domain/entities/sql/categoriaTransporte');
const transporteModel = require('../../domain/entities/sql/transporte');
const empresaTransporteModel = require('../../domain/entities/sql/empresaTransporte');
const conductorModel = require('../../domain/entities/sql/conductor');
const estacionModel = require('../../domain/entities/sql/estacion');
const categoriaEstacionModel = require('../../domain/entities/sql/categoriaEstacion');
const rutaModel = require('../../domain/entities/sql/ruta');
const rutaEstacionModel = require('../../domain/entities/sql/rutaEstacion');
const horarioModel = require('../../domain/entities/sql/horario');
const metodoIngresoModel = require('../../domain/entities/sql/metodoIngreso');
const estacionMetodoModel = require('../../domain/entities/sql/estacionMetodo');
const categoriaLugarModel = require('../../domain/entities/sql/categoriaLugar');
const lugarTuristicoModel = require('../../domain/entities/sql/lugarTuristico');
const tipoMensajeModel = require('../../domain/entities/sql/tipoMensaje');
const mensajeModel = require('../../domain/entities/sql/mensaje');
const guiaVozModel = require('../../domain/entities/sql/guiaVoz');
const idiomaModel = require('../../domain/entities/sql/idioma');
const calificacionModel = require('../../domain/entities/sql/calificacion');
const tarifaModel = require('../../domain/entities/sql/tarifa');
const clienteModel = require('../../domain/entities/sql/cliente');

// ==================== INSTANCIAR MODELOS ====================
const usuario = usuarioModel(sequelize, Sequelize);
const rol = rolModel(sequelize, Sequelize);
const detalleRol = detalleRolModel(sequelize, Sequelize);
const page = pageModel(sequelize, Sequelize);
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

// ==================== RELACIONES (FOREIGN KEYS) ====================

// RELACIONES USUARIO-ROL
usuario.hasMany(detalleRol, { foreignKey: 'idUser', onDelete: 'CASCADE' });
detalleRol.belongsTo(usuario, { foreignKey: 'idUser' });

rol.hasMany(detalleRol, { foreignKey: 'idRol', onDelete: 'CASCADE' });
detalleRol.belongsTo(rol, { foreignKey: 'idRol' });

// RELACIONES USUARIO-PAGE
usuario.hasMany(page, { foreignKey: 'idUser', onDelete: 'SET NULL' });
page.belongsTo(usuario, { foreignKey: 'idUser' });

// RELACIONES TRANSPORTE
categoriaTransporte.hasMany(transporte, { foreignKey: 'categoriaTransporteIdCatTransporte', onDelete: 'SET NULL' });
transporte.belongsTo(categoriaTransporte, { foreignKey: 'categoriaTransporteIdCatTransporte' });

empresaTransporte.hasMany(transporte, { foreignKey: 'empresaTransporteIdEmpresaTransporte', onDelete: 'SET NULL' });
transporte.belongsTo(empresaTransporte, { foreignKey: 'empresaTransporteIdEmpresaTransporte' });

conductor.hasMany(transporte, { foreignKey: 'conductorIdConductor', onDelete: 'SET NULL' });
transporte.belongsTo(conductor, { foreignKey: 'conductorIdConductor' });

ruta.hasMany(transporte, { foreignKey: 'rutaIdRuta', onDelete: 'SET NULL' });
transporte.belongsTo(ruta, { foreignKey: 'rutaIdRuta' });

// RELACIONES ESTACION
categoriaEstacion.hasMany(estacion, { foreignKey: 'categoriaEstacionIdCategoriaEstacion', onDelete: 'SET NULL' });
estacion.belongsTo(categoriaEstacion, { foreignKey: 'categoriaEstacionIdCategoriaEstacion' });

// RELACIONES RUTA-ESTACION (N:M)
ruta.hasMany(rutaEstacion, { foreignKey: 'rutaIdRuta', onDelete: 'CASCADE' });
rutaEstacion.belongsTo(ruta, { foreignKey: 'rutaIdRuta' });

estacion.hasMany(rutaEstacion, { foreignKey: 'estacionIdEstacion', onDelete: 'CASCADE' });
rutaEstacion.belongsTo(estacion, { foreignKey: 'estacionIdEstacion' });

// RELACIONES HORARIOS
ruta.hasMany(horario, { foreignKey: 'rutaIdRuta', onDelete: 'CASCADE' });
horario.belongsTo(ruta, { foreignKey: 'rutaIdRuta' });

estacion.hasMany(horario, { foreignKey: 'estacionIdEstacion', onDelete: 'CASCADE' });
horario.belongsTo(estacion, { foreignKey: 'estacionIdEstacion' });

// RELACIONES METODOS INGRESO-ESTACION (N:M)
estacion.hasMany(estacionMetodo, { foreignKey: 'estacionIdEstacion', onDelete: 'CASCADE' });
estacionMetodo.belongsTo(estacion, { foreignKey: 'estacionIdEstacion' });

metodoIngreso.hasMany(estacionMetodo, { foreignKey: 'metodoIngresoIdMetodoIngreso', onDelete: 'CASCADE' });
estacionMetodo.belongsTo(metodoIngreso, { foreignKey: 'metodoIngresoIdMetodoIngreso' });

// RELACIONES LUGARES TURISTICOS
categoriaLugar.hasMany(lugarTuristico, { foreignKey: 'categoriaLugarIdCatLugar', onDelete: 'SET NULL' });
lugarTuristico.belongsTo(categoriaLugar, { foreignKey: 'categoriaLugarIdCatLugar' });

estacion.hasMany(lugarTuristico, { foreignKey: 'estacionIdEstacion', onDelete: 'SET NULL' });
lugarTuristico.belongsTo(estacion, { foreignKey: 'estacionIdEstacion' });

usuario.hasMany(lugarTuristico, { foreignKey: 'idUser', onDelete: 'SET NULL' });
lugarTuristico.belongsTo(usuario, { foreignKey: 'idUser' });

// RELACIONES MENSAJES
tipoMensaje.hasMany(mensaje, { foreignKey: 'tipoMensajeIdTipoMensaje', onDelete: 'SET NULL' });
mensaje.belongsTo(tipoMensaje, { foreignKey: 'tipoMensajeIdTipoMensaje' });

usuario.hasMany(mensaje, { foreignKey: 'idUser', onDelete: 'CASCADE' });
mensaje.belongsTo(usuario, { foreignKey: 'idUser' });

// RELACIONES GUIAS DE VOZ
mensaje.hasMany(guiaVoz, { foreignKey: 'mensajeIdMensaje', onDelete: 'CASCADE' });
guiaVoz.belongsTo(mensaje, { foreignKey: 'mensajeIdMensaje' });

idioma.hasMany(guiaVoz, { foreignKey: 'idiomaIdIdioma', onDelete: 'SET NULL' });
guiaVoz.belongsTo(idioma, { foreignKey: 'idiomaIdIdioma' });

lugarTuristico.hasMany(guiaVoz, { foreignKey: 'lugarTuristicoIdLugar', onDelete: 'CASCADE' });
guiaVoz.belongsTo(lugarTuristico, { foreignKey: 'lugarTuristicoIdLugar' });

usuario.hasMany(guiaVoz, { foreignKey: 'idUser', onDelete: 'SET NULL' });
guiaVoz.belongsTo(usuario, { foreignKey: 'idUser' });

// RELACIONES CALIFICACIONES
usuario.hasMany(calificacion, { foreignKey: 'idUser', onDelete: 'CASCADE' });
calificacion.belongsTo(usuario, { foreignKey: 'idUser' });

transporte.hasMany(calificacion, { foreignKey: 'transporteIdTransporte', onDelete: 'CASCADE' });
calificacion.belongsTo(transporte, { foreignKey: 'transporteIdTransporte' });

conductor.hasMany(calificacion, { foreignKey: 'conductorIdConductor', onDelete: 'CASCADE' });
calificacion.belongsTo(conductor, { foreignKey: 'conductorIdConductor' });

ruta.hasMany(calificacion, { foreignKey: 'rutaIdRuta', onDelete: 'CASCADE' });
calificacion.belongsTo(ruta, { foreignKey: 'rutaIdRuta' });

estacion.hasMany(calificacion, { foreignKey: 'estacionIdEstacion', onDelete: 'CASCADE' });
calificacion.belongsTo(estacion, { foreignKey: 'estacionIdEstacion' });

lugarTuristico.hasMany(calificacion, { foreignKey: 'lugarTuristicoIdLugar', onDelete: 'CASCADE' });
calificacion.belongsTo(lugarTuristico, { foreignKey: 'lugarTuristicoIdLugar' });

guiaVoz.hasMany(calificacion, { foreignKey: 'guiaVozIdGuia', onDelete: 'CASCADE' });
calificacion.belongsTo(guiaVoz, { foreignKey: 'guiaVozIdGuia' });

// RELACIONES TARIFAS
ruta.hasMany(tarifa, { foreignKey: 'rutaIdRuta', onDelete: 'CASCADE' });
tarifa.belongsTo(ruta, { foreignKey: 'rutaIdRuta' });

transporte.hasMany(tarifa, { foreignKey: 'transporteIdTransporte', onDelete: 'CASCADE' });
tarifa.belongsTo(transporte, { foreignKey: 'transporteIdTransporte' });

lugarTuristico.hasMany(tarifa, { foreignKey: 'lugarTuristicoIdLugar', onDelete: 'CASCADE' });
tarifa.belongsTo(lugarTuristico, { foreignKey: 'lugarTuristicoIdLugar' });

// RELACIONES ADICIONALES
usuario.hasMany(conductor, { foreignKey: 'idUser', onDelete: 'SET NULL' });
conductor.belongsTo(usuario, { foreignKey: 'idUser' });

// ==================== EXPORTAR MODELOS ====================
module.exports = {
  // Autenticación y permisos
  usuario,
  rol,
  detalleRol,
  page,

  // Transporte
  categoriaTransporte,
  transporte,
  empresaTransporte,
  conductor,

  // Estaciones
  estacion,
  categoriaEstacion,
  metodoIngreso,
  estacionMetodo,

  // Rutas
  ruta,
  rutaEstacion,
  horario,

  // Lugares
  categoriaLugar,
  lugarTuristico,

  // Comunicación
  tipoMensaje,
  mensaje,
  guiaVoz,
  idioma,

  // Evaluación
  calificacion,
  tarifa,
  cliente,

  // Instancia de Sequelize (para queries directas)
  sequelize
};
