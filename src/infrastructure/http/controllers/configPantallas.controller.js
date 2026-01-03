// src/infrastructure/http/controllers/configPantallas.controller.js
'use strict';

// Importar conexión a Sequelize - CORREGIDO
const sequelize = require('../../../domain/config/database');

class ConfigPantallasController {
  constructor() {
    // Obtener modelo desde la conexión existente
    this.ConfigPantallas = null;
    
    // Inicializar cuando esté disponible
    this.init();
  }
  
  async init() {
    try {
      // Verificar si sequelize está disponible - CORREGIDO
      if (sequelize) {
        // Registrar modelo
        const configPantallasModel = require('../../../domain/models/sql/configPantallas');
        this.ConfigPantallas = configPantallasModel(sequelize); // <- SOLO sequelize, no sequelize.sequelize
        
        // Sincronizar solo este modelo
        await this.ConfigPantallas.sync({ alter: true });
        console.log('✅ Modelo ConfigPantallas sincronizado');
        
        // Crear configuración inicial si no existe
        const configExists = await this.ConfigPantallas.findOne();
        if (!configExists) {
          await this.ConfigPantallas.create({});
          console.log('✅ Configuración inicial creada en SQL');
        }
      }
    } catch (error) {
      console.error('❌ Error al inicializar ConfigPantallas:', error);
    }
  }

  // GET /api/config/pantallas
  getConfiguracion = async (req, res) => {
    try {
      if (!this.ConfigPantallas) {
        await this.init();
      }
      
      let config = await this.ConfigPantallas.findOne();
      
      if (!config) {
        config = await this.ConfigPantallas.create({});
      }
      
      res.json({
        success: true,
        data: {
          // Configuración de navegación
          longitudMaxima: config.longitudMaxima,
          paradaSegura: config.paradaSegura,
          frecuenciaInstrucciones: config.frecuenciaInstrucciones,
          tipoInstruccion: config.tipoInstruccion,
          alertaDesvio: config.alertaDesvio,
          alertaObstaculo: config.alertaObstaculo,
          
          // Configuraciones anidadas
          idCardConfig: config.idCardConfig,
          notificationsConfig: config.notificationsConfig
        }
      });
    } catch (error) {
      console.error('Error GET /api/config/pantallas:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener configuración'
      });
    }
  };

  // PUT /api/config/pantallas
  updateConfiguracion = async (req, res) => {
    try {
      if (!this.ConfigPantallas) {
        await this.init();
      }
      
      const {
        longitudMaxima,
        paradaSegura,
        frecuenciaInstrucciones,
        tipoInstruccion,
        alertaDesvio,
        alertaObstaculo,
        idCardConfig,
        notificationsConfig
      } = req.body;

      let config = await this.ConfigPantallas.findOne();
      
      if (!config) {
        config = await this.ConfigPantallas.create({});
      }

      // Actualizar solo los campos proporcionados
      const updateData = {};
      
      if (longitudMaxima !== undefined) updateData.longitudMaxima = longitudMaxima;
      if (paradaSegura !== undefined) updateData.paradaSegura = paradaSegura;
      if (frecuenciaInstrucciones !== undefined) updateData.frecuenciaInstrucciones = frecuenciaInstrucciones;
      if (tipoInstruccion !== undefined) updateData.tipoInstruccion = tipoInstruccion;
      if (alertaDesvio !== undefined) updateData.alertaDesvio = alertaDesvio;
      if (alertaObstaculo !== undefined) updateData.alertaObstaculo = alertaObstaculo;
      
      if (idCardConfig !== undefined) {
        updateData.idCardConfig = {
          ...config.idCardConfig,
          ...idCardConfig
        };
      }
      
      if (notificationsConfig !== undefined) {
        updateData.notificationsConfig = {
          ...config.notificationsConfig,
          ...notificationsConfig
        };
      }

      await config.update(updateData);

      res.json({
        success: true,
        message: 'Configuración guardada correctamente en MySQL',
        data: config
      });
    } catch (error) {
      console.error('Error PUT /api/config/pantallas:', error);
      res.status(500).json({
        success: false,
        message: 'Error de conexión: No se pudo conectar con el servidor en http://localhost:8888'
      });
    }
  };

  // PATCH /api/config/pantallas/field
  updateConfigField = async (req, res) => {
    try {
      if (!this.ConfigPantallas) {
        await this.init();
      }
      
      const { field, value } = req.body;
      
      if (!field) {
        return res.status(400).json({
          success: false,
          message: 'El campo "field" es requerido'
        });
      }

      let config = await this.ConfigPantallas.findOne();
      
      if (!config) {
        config = await this.ConfigPantallas.create({});
      }

      // Actualizar campo
      await config.update({ [field]: value });

      res.json({
        success: true,
        message: `Campo "${field}" actualizado`,
        data: config
      });
    } catch (error) {
      console.error('Error PATCH /api/config/pantallas/field:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar campo'
      });
    }
  };

  // POST /api/config/pantallas/reset
  resetConfiguracion = async (req, res) => {
    try {
      if (!this.ConfigPantallas) {
        await this.init();
      }
      
      const { tipo = 'todo' } = req.body;
      
      let config = await this.ConfigPantallas.findOne();
      
      if (!config) {
        config = await this.ConfigPantallas.create({});
      }

      // Resetear según tipo
      const resetValues = {};
      
      if (tipo === 'navegacion' || tipo === 'todo') {
        resetValues.longitudMaxima = 10;
        resetValues.paradaSegura = true;
        resetValues.frecuenciaInstrucciones = 'media';
        resetValues.tipoInstruccion = 'distancia';
        resetValues.alertaDesvio = true;
        resetValues.alertaObstaculo = true;
      }
      
      if (tipo === 'idCard' || tipo === 'todo') {
        resetValues.idCardConfig = {
          nombreCompleto: { visible: true, obligatorio: true, orden: 1 },
          email: { visible: true, obligatorio: true, orden: 2 },
          telefono: { visible: true, obligatorio: false, orden: 3 },
          direccion: { visible: true, obligatorio: false, orden: 4 },
          tipoSangre: { visible: false, obligatorio: false, orden: 5 },
          qrIncluirFoto: false,
          qrContactosEmergencia: true,
          qrInfoMedica: false,
          qrTipoSangre: false,
          qrAlergias: false,
          qrDiasExpiracion: 30
        };
      }
      
      if (tipo === 'notificaciones' || tipo === 'todo') {
        resetValues.notificationsConfig = {
          pushNotifications: {
            enabled: true,
            route_start: true,
            route_end: true,
            safety_alert: true,
            support_message: true,
            emergency: true
          },
          emailNotifications: {
            enabled: false,
            route_start: false,
            route_end: false,
            safety_alert: false,
            support_message: true,
            emergency: true
          },
          smsNotifications: {
            enabled: false,
            route_start: false,
            route_end: false,
            safety_alert: false,
            support_message: false,
            emergency: true
          },
          templateRouteStart: {
            subject: "Inicio de Ruta - OpenBlind",
            body: "Hola {{userName}}, has iniciado tu ruta hacia {{destination}}.",
            enabled: true
          },
          templateRouteEnd: {
            subject: "Ruta Finalizada - OpenBlind",
            body: "Hola {{userName}}, has finalizado tu ruta exitosamente.",
            enabled: true
          },
          templateSafetyAlert: {
            subject: "Alerta de Seguridad - OpenBlind",
            body: "Alerta: Se ha detectado una situación de riesgo en {{location}}.",
            enabled: true
          },
          templateSupportMessage: {
            subject: "Mensaje de Soporte - OpenBlind",
            body: "Hola {{userName}}, hemos recibido tu mensaje. Te responderemos pronto.",
            enabled: true
          },
          templateEmergency: {
            subject: "EMERGENCIA - OpenBlind",
            body: "EMERGENCIA: {{userName}} ha activado una alerta de emergencia en {{location}}.",
            enabled: true
          },
          legalText: "Este mensaje fue enviado por OpenBlind. Para dejar de recibir notificaciones, actualiza tus preferencias en la aplicación."
        };
      }

      await config.update(resetValues);

      res.json({
        success: true,
        message: `Configuración ${tipo} reseteada`,
        data: config
      });
    } catch (error) {
      console.error('Error POST /api/config/pantallas/reset:', error);
      res.status(500).json({
        success: false,
        message: 'Error al resetear configuración'
      });
    }
  };
}

module.exports = new ConfigPantallasController();