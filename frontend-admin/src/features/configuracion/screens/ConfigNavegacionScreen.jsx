/**
 * Configuración de Navegación
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

import { useState, useEffect } from 'react';
import { Card, Button } from '@shared/components';
import { getConfiguracionGlobal, updateConfiguracionGlobal } from '@services/api';
import './ConfigScreen.css';

export default function ConfigNavegacionScreen() {
  const [config, setConfig] = useState({
    longitudMaxima: 10,
    paradaSegura: true,
    frecuenciaInstrucciones: 'media',
    tipoInstruccion: 'distancia',
    alertaDesvio: true,
    alertaObstaculo: true,
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
      const response = await updateConfiguracionGlobal(config);
      if (response.success) {
        alert('✅ Configuración guardada correctamente en la base de datos');
        // Recargar config para obtener datos actualizados del servidor
        await loadConfig();
      } else {
        alert('❌ Error: ' + (response.message || 'No se pudo guardar la configuración'));
      }
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      alert('❌ Error de conexión: No se pudo conectar con el servidor en http://localhost:8888');
    }
  };

  return (
    <div className="config-screen">
      <div className="page-header">
        <div>
          <h1>Configuración de Navegación</h1>
          <p>Parámetros de navegación y generación de rutas</p>
        </div>
        <Button variant="primary" onClick={handleSave}>💾 Guardar</Button>
      </div>

      <Card>
        <div className="config-section">
          <h3>Rutas</h3>

          <div className="config-item">
            <label>Longitud máxima de ruta ({config.longitudMaxima} km)</label>
            <input type="range" min="1" max="50" value={config.longitudMaxima} onChange={(e) => setConfig({ ...config, longitudMaxima: parseInt(e.target.value) })} className="slider" />
          </div>

          <div className="config-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={config.paradaSegura} onChange={(e) => setConfig({ ...config, paradaSegura: e.target.checked })} />
              <span>Sugerir paradas seguras durante navegación</span>
            </label>
          </div>
        </div>

        <div className="config-section">
          <h3>Instrucciones</h3>

          <div className="config-item">
            <label>Frecuencia de instrucciones</label>
            <select className="input" value={config.frecuenciaInstrucciones} onChange={(e) => setConfig({ ...config, frecuenciaInstrucciones: e.target.value })}>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="config-item">
            <label>Tipo de instrucción</label>
            <select className="input" value={config.tipoInstruccion} onChange={(e) => setConfig({ ...config, tipoInstruccion: e.target.value })}>
              <option value="distancia">Por distancia</option>
              <option value="tiempo">Por tiempo</option>
            </select>
          </div>

          <div className="config-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={config.alertaDesvio} onChange={(e) => setConfig({ ...config, alertaDesvio: e.target.checked })} />
              <span>Alertar cuando el usuario se desvía</span>
            </label>
          </div>

          <div className="config-item">
            <label className="checkbox-label">
              <input type="checkbox" checked={config.alertaObstaculo} onChange={(e) => setConfig({ ...config, alertaObstaculo: e.target.checked })} />
              <span>Alertar sobre obstáculos</span>
            </label>
          </div>
        </div>
      </Card>
    </div>
  );
}
