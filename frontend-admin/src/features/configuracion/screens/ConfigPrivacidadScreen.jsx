/**
 * Configuración de Privacidad
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

import { useState, useEffect } from 'react';
import { Card, Button } from '@shared/components';
import { getConfiguracionGlobal, updateConfiguracionGlobal } from '@services/api';
import './ConfigScreen.css';

export default function ConfigPrivacidadScreen() {
  const [config, setConfig] = useState({
    retencionUbicacion: 30,
    trackingBackground: false,
    compartirUbicacion: true,
    guardarHistorial: true,
    permitirAnonimo: false,
  });

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
    }
  };

  const handleSave = async () => {
    try {
      await updateConfiguracionGlobal(config);
      alert('Configuración guardada');
    } catch (error) {
      alert('Error al guardar');
    }
  };

  return (
    <div className="config-screen">
      <div className="page-header">
        <div>
          <h1>Configuración de Privacidad</h1>
          <p>Políticas de privacidad y manejo de datos</p>
        </div>
        <Button variant="primary" onClick={handleSave}>💾 Guardar</Button>
      </div>

      <Card>
        <div className="config-section">
          <h3>Ubicación y Rastreo</h3>

          <div className="config-item">
            <label>Retención de historial de ubicaciones</label>
            <select className="input" value={config.retencionUbicacion} onChange={(e) => setConfig({ ...config, retencionUbicacion: parseInt(e.target.value) })}>
              <option value="7">7 días</option>
              <option value="14">14 días</option>
              <option value="30">30 días</option>
              <option value="90">90 días</option>
            </select>
          </div>

          <div className="config-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={config.trackingBackground} onChange={(e) => setConfig({ ...config, trackingBackground: e.target.checked })} />
              <span>Permitir tracking en segundo plano</span>
            </label>
          </div>

          <div className="config-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={config.compartirUbicacion} onChange={(e) => setConfig({ ...config, compartirUbicacion: e.target.checked })} />
              <span>Permitir compartir ubicación con contactos</span>
            </label>
          </div>
        </div>

        <div className="config-section">
          <h3>Historial y Datos</h3>

          <div className="config-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={config.guardarHistorial} onChange={(e) => setConfig({ ...config, guardarHistorial: e.target.checked })} />
              <span>Guardar historial de rutas y ubicaciones</span>
            </label>
          </div>

          <div className="config-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={config.permitirAnonimo} onChange={(e) => setConfig({ ...config, permitirAnonimo: e.target.checked })} />
              <span>Permitir modo anónimo (no guardar datos)</span>
            </label>
          </div>
        </div>
      </Card>
    </div>
  );
}
