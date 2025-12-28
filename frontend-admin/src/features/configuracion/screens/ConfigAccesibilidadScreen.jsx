/**
 * Configuración de Accesibilidad - Valores por defecto para nuevos usuarios
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

import { useState, useEffect } from 'react';
import { Card, Button, Toast } from '@shared/components';
import { getConfiguracionGlobal, updateConfiguracionGlobal } from '@services/api';
import './ConfigScreen.css';

export default function ConfigAccesibilidadScreen() {
  const [config, setConfig] = useState({
    tamanoFuente: 'medium',
    temaContraste: 'normal',
    idioma: 'es',
    velocidadVoz: 1.0,
    volumenVoz: 80,
    feedbackHaptico: true,
    nivelDetalle: 'completo',
  });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await getConfiguracionGlobal();
      if (response.success) {
        setConfig({ ...config, ...response.data });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateConfiguracionGlobal(config);
      if (response.success) {
        setToast({ message: 'Configuración guardada correctamente en MySQL', type: 'success' });
        // Recargar config para obtener datos actualizados del servidor
        await loadConfig();
      } else {
        setToast({ message: 'Error: ' + (response.message || 'No se pudo guardar'), type: 'error' });
      }
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      setToast({ message: 'Error de conexión con el servidor (puerto 8888)', type: 'error' });
    }
  };

  return (
    <div className="config-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-header">
        <div>
          <h1>Configuración de Accesibilidad</h1>
          <p>Valores por defecto que heredarán los nuevos usuarios</p>
        </div>
        <Button variant="primary" onClick={handleSave}>
          💾 Guardar Cambios
        </Button>
      </div>

      <Card>
        <div className="config-section">
          <h3>Apariencia</h3>

          <div className="config-item">
            <label>Tamaño de fuente</label>
            <select className="input" value={config.tamanoFuente} onChange={(e) => setConfig({ ...config, tamanoFuente: e.target.value })}>
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Grande</option>
              <option value="extra-large">Extra Grande</option>
            </select>
          </div>

          <div className="config-item">
            <label>Tema de contraste</label>
            <select className="input" value={config.temaContraste} onChange={(e) => setConfig({ ...config, temaContraste: e.target.value })}>
              <option value="normal">Normal</option>
              <option value="alto-contraste">Alto Contraste</option>
            </select>
          </div>

          <div className="config-item">
            <label>Idioma</label>
            <select className="input" value={config.idioma} onChange={(e) => setConfig({ ...config, idioma: e.target.value })}>
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div className="config-section">
          <h3>Síntesis de Voz</h3>

          <div className="config-item">
            <label>Velocidad de voz ({config.velocidadVoz}x)</label>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={config.velocidadVoz}
              onChange={(e) => setConfig({ ...config, velocidadVoz: parseFloat(e.target.value) })}
              className="slider"
            />
          </div>

          <div className="config-item">
            <label>Volumen ({config.volumenVoz}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={config.volumenVoz}
              onChange={(e) => setConfig({ ...config, volumenVoz: parseInt(e.target.value) })}
              className="slider"
            />
          </div>

          <div className="config-item">
            <label>Nivel de detalle</label>
            <select className="input" value={config.nivelDetalle} onChange={(e) => setConfig({ ...config, nivelDetalle: e.target.value })}>
              <option value="basico">Básico</option>
              <option value="completo">Completo</option>
              <option value="experto">Experto</option>
            </select>
          </div>

          <div className="config-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={config.feedbackHaptico}
                onChange={(e) => setConfig({ ...config, feedbackHaptico: e.target.checked })}
              />
              <span>Activar feedback háptico (vibraciones)</span>
            </label>
          </div>
        </div>
      </Card>
    </div>
  );
}
