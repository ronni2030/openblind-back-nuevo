/**
 * Aplicación Express - OpenBlind Admin Backend
 *
 * Configuración de middleware y rutas
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const app = express();

// ═══════════════════════════════════════════════════
// MIDDLEWARE DE SEGURIDAD
// ═══════════════════════════════════════════════════

// Helmet: Headers de seguridad
app.use(helmet());

// CORS: Permitir peticiones desde frontend
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Compresión de respuestas
app.use(compression());

// ═══════════════════════════════════════════════════
// MIDDLEWARE DE PARSEO
// ═══════════════════════════════════════════════════

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ═══════════════════════════════════════════════════
// LOGGING
// ═══════════════════════════════════════════════════

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// ═══════════════════════════════════════════════════
// RUTA DE SALUD (HEALTH CHECK)
// ═══════════════════════════════════════════════════

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'OpenBlind Admin API funcionando correctamente',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// ═══════════════════════════════════════════════════
// RUTAS DE LA API
// ═══════════════════════════════════════════════════

const adminRouter = require('./infrastructure/http/router/admin.router');
app.use('/api/admin', adminRouter);

// ═══════════════════════════════════════════════════
// MANEJO DE ERRORES
// ═══════════════════════════════════════════════════

// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        path: req.path
    });
});

// Error handler global
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

module.exports = app;
