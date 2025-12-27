/**
 * Configuración de Navegación - Preferencias globales
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getConfiguracionGlobal, updateField, resetConfiguracion } from '@shared/api/adminApi'
import Card from '@shared/ui/Card/Card'
import Button from '@shared/ui/Button/Button'
import './ConfigPage.css'

export default function ConfigNavegacionPage() {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      setLoading(true)
      const data = await getConfiguracionGlobal()
      setConfig(data)
    } catch (error) {
      console.error('Error al cargar configuración:', error)
      showMessage('Error al cargar configuración', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = async (field, value) => {
    try {
      setSaving(true)
      const updated = await updateField(field, value, 'admin')
      setConfig(updated)
      showMessage('Configuración actualizada', 'success')
    } catch (error) {
      console.error('Error al actualizar:', error)
      showMessage('Error al actualizar configuración', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = async () => {
    if (!confirm('¿Estás seguro de resetear a valores por defecto?')) return

    try {
      setSaving(true)
      const updated = await resetConfiguracion('admin')
      setConfig(updated)
      showMessage('Configuración reseteada a valores por defecto', 'success')
    } catch (error) {
      console.error('Error al resetear:', error)
      showMessage('Error al resetear configuración', 'error')
    } finally {
      setSaving(false)
    }
  }

  const showMessage = (text, type) => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3000)
  }

  if (loading) {
    return <div className="config-loading">Cargando configuración...</div>
  }

  if (!config) {
    return <div className="config-error">Error al cargar configuración</div>
  }

  return (
    <div className="config-page">
      {/* Header */}
      <div className="config-header">
        <div>
          <h1>Configuración de Navegación</h1>
          <p className="text-muted">Preferencias globales para rutas y navegación</p>
        </div>
        <Button variant="outline" onClick={handleReset} disabled={saving}>
          Resetear a Defaults
        </Button>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          className={`config-message ${message.type}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {message.text}
        </motion.div>
      )}

      {/* Longitud Máxima */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card title="Longitud Máxima de Ruta" subtitle={`Máximo: ${config.longitudMaxima} kilómetros`}>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={config.longitudMaxima}
              onChange={(e) => handleChange('longitudMaxima', parseInt(e.target.value))}
              disabled={saving}
              className="slider"
            />
            <div className="slider-labels">
              <span>1 km (Mínimo)</span>
              <span>25 km</span>
              <span>50 km (Máximo)</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Parada Segura */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card title="Criterio de Paradas Seguras" subtitle="Sugerir paradas seguras durante navegación">
          <div className="toggle-container">
            <label className="toggle">
              <input
                type="checkbox"
                checked={config.paradaSegura}
                onChange={(e) => handleChange('paradaSegura', e.target.checked)}
                disabled={saving}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-label">
              {config.paradaSegura ? 'Activado' : 'Desactivado'}
            </span>
          </div>
          <p className="text-muted" style={{ marginTop: 'var(--spacing-3)', marginBottom: 0 }}>
            Cuando está activado, el sistema sugerirá lugares seguros para descansar durante rutas largas.
          </p>
        </Card>
      </motion.div>

      {/* Frecuencia de Instrucciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card title="Frecuencia de Instrucciones" subtitle="Frecuencia de instrucciones de navegación por defecto">
          <div className="config-options">
            {['baja', 'media', 'alta'].map(freq => (
              <button
                key={freq}
                className={`option-btn ${config.frecuenciaInstrucciones === freq ? 'active' : ''}`}
                onClick={() => handleChange('frecuenciaInstrucciones', freq)}
                disabled={saving}
              >
                <span className="option-label">
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </span>
                {config.frecuenciaInstrucciones === freq && (
                  <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Tipo de Instrucción */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card title="Tipo de Instrucción" subtitle="Instrucciones por metro o por tiempo">
          <div className="config-options">
            {[
              { value: 'distancia', label: 'Por Distancia', desc: '"En 50 metros gire a la derecha"' },
              { value: 'tiempo', label: 'Por Tiempo', desc: '"En 30 segundos gire a la derecha"' }
            ].map(tipo => (
              <button
                key={tipo.value}
                className={`option-btn ${config.tipoInstruccion === tipo.value ? 'active' : ''}`}
                onClick={() => handleChange('tipoInstruccion', tipo.value)}
                disabled={saving}
                style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-2)' }}
              >
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="option-label">{tipo.label}</span>
                  {config.tipoInstruccion === tipo.value && (
                    <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                  {tipo.desc}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Alerta de Desvío */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card title="Alerta de Desvío" subtitle="Alertar cuando el usuario se desvía de la ruta">
          <div className="toggle-container">
            <label className="toggle">
              <input
                type="checkbox"
                checked={config.alertaDesvio}
                onChange={(e) => handleChange('alertaDesvio', e.target.checked)}
                disabled={saving}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-label">
              {config.alertaDesvio ? 'Activado' : 'Desactivado'}
            </span>
          </div>
        </Card>
      </motion.div>

      {/* Alerta de Obstáculo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card title="Alerta de Obstáculo" subtitle="Alertar sobre obstáculos en el camino">
          <div className="toggle-container">
            <label className="toggle">
              <input
                type="checkbox"
                checked={config.alertaObstaculo}
                onChange={(e) => handleChange('alertaObstaculo', e.target.checked)}
                disabled={saving}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-label">
              {config.alertaObstaculo ? 'Activado' : 'Desactivado'}
            </span>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
