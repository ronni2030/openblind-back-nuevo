/**
 * Controlador de Métricas para Dashboard Admin
 *
 * Proporciona estadísticas y métricas del sistema:
 * - Usuarios activos
 * - Rutas generadas
 * - Incidencias reportadas/resueltas
 * - Uso de módulos
 *
 * NOTA: Actualmente usa datos de ejemplo (mock).
 * Cuando existan los modelos de Usuario, Ruta, Incidencia, etc.,
 * se debe reemplazar con queries reales a la base de datos.
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

const metricasController = {};

/**
 * GET /api/admin/metricas/resumen
 * Obtiene un resumen general con todas las métricas principales
 */
metricasController.getResumen = async (req, res) => {
    try {
        // TODO: Reemplazar con queries reales cuando existan los modelos
        const resumen = {
            usuarios: {
                total: 1247,
                activos: 892,
                nuevosHoy: 23,
                nuevosEstaSemana: 156,
                inactivos: 355,
                bloqueados: 12
            },
            rutas: {
                total: 8456,
                hoy: 342,
                estaSemana: 2134,
                promedioDiario: 305,
                rutasCompletadas: 7892,
                rutasCanceladas: 564
            },
            incidencias: {
                total: 234,
                pendientes: 45,
                enRevision: 32,
                resueltas: 145,
                descartadas: 12,
                nuevasHoy: 8,
                resolvidasHoy: 15
            },
            usoModulos: {
                navegacion: {
                    sesiones: 6234,
                    usuariosActivos: 678,
                    porcentajeUso: 76.2
                },
                tarjeta: {
                    sesiones: 892,
                    usuariosActivos: 445,
                    porcentajeUso: 50.1
                },
                contactos: {
                    sesiones: 1567,
                    usuariosActivos: 523,
                    porcentajeUso: 58.7
                },
                configuracion: {
                    sesiones: 2341,
                    usuariosActivos: 789,
                    porcentajeUso: 88.5
                }
            }
        };

        return res.status(200).json({
            success: true,
            message: 'Resumen de métricas obtenido exitosamente',
            data: resumen
        });
    } catch (error) {
        console.error('[Metricas] Error al obtener resumen:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener resumen de métricas',
            error: error.message
        });
    }
};

/**
 * GET /api/admin/metricas/usuarios
 * Obtiene métricas detalladas de usuarios
 */
metricasController.getUsuarios = async (req, res) => {
    try {
        // TODO: Query real a modelo Usuario cuando exista
        const metricas = {
            total: 1247,
            activos: 892,
            inactivos: 355,
            bloqueados: 12,
            nuevosHoy: 23,
            nuevosEstaSemana: 156,
            nuevosEsteMes: 487,
            porNivelDiscapacidad: {
                ceguera: 567,
                visionParcial: 423,
                ninguna: 257
            },
            porRangoEdad: {
                '18-25': 234,
                '26-35': 456,
                '36-45': 312,
                '46-60': 189,
                '60+': 56
            },
            ultimosRegistros: [
                { id: 1245, nombre: 'María González', fecha: '2025-12-26T10:30:00Z', estado: 'activo' },
                { id: 1246, nombre: 'Juan Pérez', fecha: '2025-12-26T09:15:00Z', estado: 'activo' },
                { id: 1247, nombre: 'Ana Martínez', fecha: '2025-12-26T08:45:00Z', estado: 'activo' }
            ]
        };

        return res.status(200).json({
            success: true,
            message: 'Métricas de usuarios obtenidas exitosamente',
            data: metricas
        });
    } catch (error) {
        console.error('[Metricas] Error al obtener métricas de usuarios:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener métricas de usuarios',
            error: error.message
        });
    }
};

/**
 * GET /api/admin/metricas/rutas
 * Obtiene métricas detalladas de rutas y navegación
 */
metricasController.getRutas = async (req, res) => {
    try {
        const { periodo = 'semana' } = req.query; // dia, semana, mes

        // TODO: Query real a modelo Ruta cuando exista
        const metricas = {
            total: 8456,
            completadas: 7892,
            canceladas: 564,
            promedioDuracion: 25.5, // minutos
            promedioDistancia: 3.2, // km
            porDia: [
                { fecha: '2025-12-20', rutas: 287 },
                { fecha: '2025-12-21', rutas: 312 },
                { fecha: '2025-12-22', rutas: 298 },
                { fecha: '2025-12-23', rutas: 345 },
                { fecha: '2025-12-24', rutas: 267 },
                { fecha: '2025-12-25', rutas: 183 },
                { fecha: '2025-12-26', rutas: 342 }
            ],
            zonasPopulares: [
                { zona: 'Centro', rutas: 2134 },
                { zona: 'Norte', rutas: 1876 },
                { zona: 'Sur', rutas: 1543 },
                { zona: 'Este', rutas: 1234 },
                { zona: 'Oeste', rutas: 1669 }
            ],
            horasPico: [
                { hora: '07:00-09:00', rutas: 1234 },
                { hora: '12:00-14:00', rutas: 987 },
                { hora: '17:00-19:00', rutas: 1567 }
            ]
        };

        return res.status(200).json({
            success: true,
            message: 'Métricas de rutas obtenidas exitosamente',
            data: metricas,
            periodo
        });
    } catch (error) {
        console.error('[Metricas] Error al obtener métricas de rutas:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener métricas de rutas',
            error: error.message
        });
    }
};

/**
 * GET /api/admin/metricas/incidencias
 * Obtiene métricas detalladas de incidencias
 */
metricasController.getIncidencias = async (req, res) => {
    try {
        // TODO: Query real a modelo Incidencia cuando exista
        const metricas = {
            total: 234,
            pendientes: 45,
            enRevision: 32,
            resueltas: 145,
            descartadas: 12,
            nuevasHoy: 8,
            resolvidasHoy: 15,
            tiempoPromedioResolucion: 48, // horas
            porTipo: {
                obstaculo: 89,
                seguridad: 67,
                accesibilidad: 45,
                otro: 33
            },
            porZona: {
                'Centro': 56,
                'Norte': 48,
                'Sur': 42,
                'Este': 38,
                'Oeste': 50
            },
            tendenciaSemanal: [
                { dia: 'Lun', reportadas: 12, resueltas: 15 },
                { dia: 'Mar', reportadas: 8, resueltas: 10 },
                { dia: 'Mie', reportadas: 14, resueltas: 12 },
                { dia: 'Jue', reportadas: 10, resueltas: 18 },
                { dia: 'Vie', reportadas: 8, resueltas: 15 },
                { dia: 'Sab', reportadas: 5, resueltas: 8 },
                { dia: 'Dom', reportadas: 3, resueltas: 6 }
            ]
        };

        return res.status(200).json({
            success: true,
            message: 'Métricas de incidencias obtenidas exitosamente',
            data: metricas
        });
    } catch (error) {
        console.error('[Metricas] Error al obtener métricas de incidencias:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener métricas de incidencias',
            error: error.message
        });
    }
};

/**
 * GET /api/admin/metricas/uso-modulos
 * Obtiene estadísticas de uso de módulos de la aplicación
 */
metricasController.getUsoModulos = async (req, res) => {
    try {
        // TODO: Implementar tracking real cuando existan los modelos
        const metricas = {
            navegacion: {
                sesiones: 6234,
                usuariosUnicos: 678,
                porcentajeUso: 76.2,
                tiempoPromedio: 18.5, // minutos
                funcionesMasUsadas: [
                    { funcion: 'Iniciar Ruta', usos: 4567 },
                    { funcion: 'Buscar Destino', usos: 3892 },
                    { funcion: 'Guardar Favorito', usos: 2341 }
                ]
            },
            tarjeta: {
                sesiones: 892,
                usuariosUnicos: 445,
                porcentajeUso: 50.1,
                tiempoPromedio: 3.2, // minutos
                funcionesMasUsadas: [
                    { funcion: 'Ver Tarjeta', usos: 678 },
                    { funcion: 'Editar Info', usos: 234 },
                    { funcion: 'Compartir QR', usos: 189 }
                ]
            },
            contactos: {
                sesiones: 1567,
                usuariosUnicos: 523,
                porcentajeUso: 58.7,
                tiempoPromedio: 5.8, // minutos
                funcionesMasUsadas: [
                    { funcion: 'Agregar Contacto', usos: 789 },
                    { funcion: 'Llamar Emergencia', usos: 456 },
                    { funcion: 'Editar Contacto', usos: 234 }
                ]
            },
            configuracion: {
                sesiones: 2341,
                usuariosUnicos: 789,
                porcentajeUso: 88.5,
                tiempoPromedio: 7.3, // minutos
                ajustesMasModificados: [
                    { ajuste: 'Tamaño Fuente', modificaciones: 1234 },
                    { ajuste: 'Velocidad Voz', modificaciones: 987 },
                    { ajuste: 'Volumen Voz', modificaciones: 876 }
                ]
            },
            tendenciaSemanal: {
                navegacion: [287, 312, 298, 345, 267, 183, 342],
                tarjeta: [45, 52, 48, 61, 38, 27, 49],
                contactos: [89, 95, 87, 102, 76, 54, 88],
                configuracion: [134, 145, 138, 156, 122, 89, 141]
            }
        };

        return res.status(200).json({
            success: true,
            message: 'Métricas de uso de módulos obtenidas exitosamente',
            data: metricas
        });
    } catch (error) {
        console.error('[Metricas] Error al obtener métricas de uso:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener métricas de uso de módulos',
            error: error.message
        });
    }
};

module.exports = metricasController;
