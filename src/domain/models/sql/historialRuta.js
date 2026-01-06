const ruta = (sequelize, type) => {
    return sequelize.define('rutas', {
        idRuta: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userIdUser: {
            type: type.INTEGER,
            allowNull: false
        },
        origen: {
            type: type.STRING,
            allowNull: false
        },
        destino: {
            type: type.STRING,
            allowNull: false
        },
        fecha: {
            type: type.STRING, // Guardamos fecha como string para coincidir con el formato del frontend
            allowNull: false
        },
        esFavorita: {
            type: type.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
        tableName: 'historial_rutas' // ✅ Cambio de nombre para evitar conflicto con tabla existente
    });
}

module.exports = ruta;