// src/domain/models/sql/configPantallas.js
'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ConfigPantallas = sequelize.define('ConfigPantallas', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    // Configuración de Navegación (de ConfigNavegacionScreen)
    longitudMaxima: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    paradaSegura: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    frecuenciaInstrucciones: {
      type: DataTypes.STRING,
      defaultValue: 'media'
    },
    tipoInstruccion: {
      type: DataTypes.STRING,
      defaultValue: 'distancia'
    },
    alertaDesvio: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    alertaObstaculo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    
    // Configuración de Tarjeta ID (de IDCardConfigScreen)
    idCardConfig: {
      type: DataTypes.JSON,
      defaultValue: {
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
      }
    },
    
    // Configuración de Notificaciones (de NotificationsConfigScreen)
    notificationsConfig: {
      type: DataTypes.JSON,
      defaultValue: {
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
      }
    },
    
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'config_pantallas',
    timestamps: true
  });

  return ConfigPantallas;
};