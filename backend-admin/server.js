/**
 * OpenBlind Admin - Backend Server
 *
 * Backend del Panel de Administración con Arquitectura Hexagonal
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 * @version 1.0.0
 */

require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/infrastructure/database/connection');

const PORT = process.env.PORT || 8889;
const HOST = process.env.HOST || 'localhost';

/**
 * Inicializar servidor
 */
const startServer = async () => {
    try {
        // Verificar conexión a base de datos
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL establecida correctamente');

        // Sincronizar modelos (solo en desarrollo)
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: false });
            console.log('✅ Modelos sincronizados con la base de datos');
        }

        // Iniciar servidor
        app.listen(PORT, HOST, () => {
            console.log('');
            console.log('═══════════════════════════════════════════════════');
            console.log('   🎯 OPENBLIND ADMIN BACKEND');
            console.log('═══════════════════════════════════════════════════');
            console.log(`   🚀 Servidor corriendo en http://${HOST}:${PORT}`);
            console.log(`   📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
            console.log(`   💾 Base de datos: ${process.env.DB_NAME || 'openblind_admin'}`);
            console.log('═══════════════════════════════════════════════════');
            console.log('');
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Manejar cierre graceful
process.on('SIGTERM', async () => {
    console.log('⚠️  SIGTERM recibido. Cerrando servidor...');
    await sequelize.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('\n⚠️  SIGINT recibido. Cerrando servidor...');
    await sequelize.close();
    process.exit(0);
});

// Iniciar servidor
startServer();
