const tarjetaMedica = (sequelize, type) => {
    return sequelize.define('tarjetaMedicas', {
        idTarjeta: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userIdUser: { // Clave foránea al usuario
            type: type.INTEGER,
            allowNull: false
        },
        nombresCompletos: {
            type: type.STRING,
            allowNull: false
        },
        tipoSangre: {
            type: type.STRING,
            allowNull: false
        },
        alergias: {
            type: type.STRING, // Puede ser texto largo si tiene muchas alergias
            allowNull: true
        },
        createTarjeta: {
            type: type.STRING, // Guardaremos como string dado el patrón del proyecto existente
            defaultValue: type.NOW
        },
        updateTarjeta: {
            type: type.STRING
        }
    }, {
        timestamps: false, // Manejo manual de fechas como string según estándar del proyecto
        tableName: 'tarjetaMedicas'
    });
}

module.exports = tarjetaMedica;
