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
categoriaTransporte.hasMany(transporte, {
    foreignKey: { name: 'idCatTransporte', allowNull: true },
    onDelete: 'SET NULL'
});
transporte.belongsTo(categoriaTransporte, {
    foreignKey: { name: 'idCatTransporte', allowNull: true }
});

empresaTransporte.hasMany(transporte, {
    foreignKey: { name: 'idEmpresa', allowNull: true },
    onDelete: 'SET NULL'
});
transporte.belongsTo(empresaTransporte, {
    foreignKey: { name: 'idEmpresa', allowNull: true }
});

conductor.hasMany(transporte, {
    foreignKey: { name: 'idConductor', allowNull: true },
    onDelete: 'SET NULL'
});
transporte.belongsTo(conductor, {
    foreignKey: { name: 'idConductor', allowNull: true }
});

ruta.hasMany(transporte, {
    foreignKey: { name: 'idRuta', allowNull: true },
    onDelete: 'SET NULL'
});
transporte.belongsTo(ruta, {
    foreignKey: { name: 'idRuta', allowNull: true }
});

// RELACIONES ESTACION
categoriaEstacion.hasMany(estacion, {
    foreignKey: { name: 'idCatEstacion', allowNull: true },
    onDelete: 'SET NULL'
});
estacion.belongsTo(categoriaEstacion, {
    foreignKey: { name: 'idCatEstacion', allowNull: true }
});

// RELACIONES RUTA-ESTACION (N:M)
ruta.hasMany(rutaEstacion, {
    foreignKey: { name: 'idRuta', allowNull: false },
    onDelete: 'CASCADE'
});
rutaEstacion.belongsTo(ruta, {
    foreignKey: { name: 'idRuta', allowNull: false }
});

estacion.hasMany(rutaEstacion, {
    foreignKey: { name: 'idEstacion', allowNull: false },
    onDelete: 'CASCADE'
});
rutaEstacion.belongsTo(estacion, {
    foreignKey: { name: 'idEstacion', allowNull: false }
});

// RELACIONES HORARIOS
ruta.hasMany(horario, {
    foreignKey: { name: 'idRuta', allowNull: false },
    onDelete: 'CASCADE'
});
horario.belongsTo(ruta, {
    foreignKey: { name: 'idRuta', allowNull: false }
});

estacion.hasMany(horario, {
    foreignKey: { name: 'idEstacion', allowNull: false },
    onDelete: 'CASCADE'
});
horario.belongsTo(estacion, {
    foreignKey: { name: 'idEstacion', allowNull: false }
});

// RELACIONES METODOS INGRESO-ESTACION (N:M)
estacion.hasMany(estacionMetodo, {
    foreignKey: { name: 'idEstacion', allowNull: false },
    onDelete: 'CASCADE'
});
estacionMetodo.belongsTo(estacion, {
    foreignKey: { name: 'idEstacion', allowNull: false }
});

metodoIngreso.hasMany(estacionMetodo, {
    foreignKey: { name: 'idMetodo', allowNull: false },
    onDelete: 'CASCADE'
});
estacionMetodo.belongsTo(metodoIngreso, {
    foreignKey: { name: 'idMetodo', allowNull: false }
});

// RELACIONES LUGARES TURISTICOS
categoriaLugar.hasMany(lugarTuristico, {
    foreignKey: { name: 'idCatLugar', allowNull: true },
    onDelete: 'SET NULL'
});
lugarTuristico.belongsTo(categoriaLugar, {
    foreignKey: { name: 'idCatLugar', allowNull: true }
});

estacion.hasMany(lugarTuristico, {
    foreignKey: { name: 'idEstacion', allowNull: true },
    onDelete: 'SET NULL'
});
lugarTuristico.belongsTo(estacion, {
    foreignKey: { name: 'idEstacion', allowNull: true }
});

usuario.hasMany(lugarTuristico, {
    foreignKey: { name: 'idUser', allowNull: true },
    onDelete: 'SET NULL'
});
lugarTuristico.belongsTo(usuario, {
    foreignKey: { name: 'idUser', allowNull: true }
});

// RELACIONES MENSAJES
tipoMensaje.hasMany(mensaje, {
    foreignKey: { name: 'idTipoMensaje', allowNull: true },
    onDelete: 'SET NULL'
});
mensaje.belongsTo(tipoMensaje, {
    foreignKey: { name: 'idTipoMensaje', allowNull: true }
});

usuario.hasMany(mensaje, {
    foreignKey: { name: 'idUser', allowNull: false },
    onDelete: 'CASCADE'
});
mensaje.belongsTo(usuario, {
    foreignKey: { name: 'idUser', allowNull: false }
});

// RELACIONES GUIAS DE VOZ
mensaje.hasMany(guiaVoz, {
    foreignKey: { name: 'idMensaje', allowNull: false },
    onDelete: 'CASCADE'
});
guiaVoz.belongsTo(mensaje, {
    foreignKey: { name: 'idMensaje', allowNull: false }
});

idioma.hasMany(guiaVoz, {
    foreignKey: { name: 'idIdioma', allowNull: true },
    onDelete: 'SET NULL'
});
guiaVoz.belongsTo(idioma, {
    foreignKey: { name: 'idIdioma', allowNull: true }
});

lugarTuristico.hasMany(guiaVoz, {
    foreignKey: { name: 'idLugar', allowNull: false },
    onDelete: 'CASCADE'
});
guiaVoz.belongsTo(lugarTuristico, {
    foreignKey: { name: 'idLugar', allowNull: false }
});

usuario.hasMany(guiaVoz, {
    foreignKey: { name: 'idUser', allowNull: true },
    onDelete: 'SET NULL'
});
guiaVoz.belongsTo(usuario, {
    foreignKey: { name: 'idUser', allowNull: true }
});

// RELACIONES CALIFICACIONES
usuario.hasMany(calificacion, {
    foreignKey: { name: 'idUser', allowNull: false },
    onDelete: 'CASCADE'
});
calificacion.belongsTo(usuario, {
    foreignKey: { name: 'idUser', allowNull: false }
});

transporte.hasMany(calificacion, {
    foreignKey: { name: 'idTransporte', allowNull: true },
    onDelete: 'CASCADE'
});
calificacion.belongsTo(transporte, {
    foreignKey: { name: 'idTransporte', allowNull: true }
});

conductor.hasMany(calificacion, {
    foreignKey: { name: 'idConductor', allowNull: true },
    onDelete: 'CASCADE'
});
calificacion.belongsTo(conductor, {
    foreignKey: { name: 'idConductor', allowNull: true }
});

ruta.hasMany(calificacion, {
    foreignKey: { name: 'idRuta', allowNull: true },
    onDelete: 'CASCADE'
});
calificacion.belongsTo(ruta, {
    foreignKey: { name: 'idRuta', allowNull: true }
});

estacion.hasMany(calificacion, {
    foreignKey: { name: 'idEstacion', allowNull: true },
    onDelete: 'CASCADE'
});
calificacion.belongsTo(estacion, {
    foreignKey: { name: 'idEstacion', allowNull: true }
});

lugarTuristico.hasMany(calificacion, {
    foreignKey: { name: 'idLugar', allowNull: true },
    onDelete: 'CASCADE'
});
calificacion.belongsTo(lugarTuristico, {
    foreignKey: { name: 'idLugar', allowNull: true }
});

guiaVoz.hasMany(calificacion, {
    foreignKey: { name: 'idGuia', allowNull: true },
    onDelete: 'CASCADE'
});
calificacion.belongsTo(guiaVoz, {
    foreignKey: { name: 'idGuia', allowNull: true }
});

// RELACIONES TARIFAS
ruta.hasMany(tarifa, {
    foreignKey: { name: 'idRuta', allowNull: true },
    onDelete: 'CASCADE'
});
tarifa.belongsTo(ruta, {
    foreignKey: { name: 'idRuta', allowNull: true }
});

transporte.hasMany(tarifa, {
    foreignKey: { name: 'idTransporte', allowNull: true },
    onDelete: 'CASCADE'
});
tarifa.belongsTo(transporte, {
    foreignKey: { name: 'idTransporte', allowNull: true }
});

lugarTuristico.hasMany(tarifa, {
    foreignKey: { name: 'idLugar', allowNull: true },
    onDelete: 'CASCADE'
});
tarifa.belongsTo(lugarTuristico, {
    foreignKey: { name: 'idLugar', allowNull: true }
});

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
