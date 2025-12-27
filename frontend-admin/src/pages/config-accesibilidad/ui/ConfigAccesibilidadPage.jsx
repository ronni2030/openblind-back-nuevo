/**
 * Configuración de Accesibilidad - Valores por defecto globales
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getConfiguracionGlobal, updateField, resetConfiguracion } from '@shared/api/adminApi'
import Card from '@shared/ui/Card/Card'
import Button from '@shared/ui/Button/Button'
import './ConfigPage.css'

export default function ConfigAccesibilidadPage() {
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
          <h1>Configuración de Accesibilidad</h1>
          <p className="text-muted">Valores por defecto que heredan todos los usuarios nuevos</p>
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

      {/* Tamaño de Fuente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card title="Tamaño de Fuente" subtitle="Tamaño de fuente por defecto para nuevos usuarios">
          <div className="config-options">
            {['small', 'medium', 'large', 'extra-large'].map(size => (
              <button
                key={size}
                className={`option-btn ${config.tamanoFuente === size ? 'active' : ''}`}
                onClick={() => handleChange('tamanoFuente', size)}
                disabled={saving}
              >
                <span className="option-label">
                  {size === 'small' && 'Pequeña'}
                  {size === 'medium' && 'Mediana'}
                  {size === 'large' && 'Grande'}
                  {size === 'extra-large' && 'Extra Grande'}
                </span>
                {config.tamanoFuente === size && (
                  <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Tema de Contraste */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card title="Tema de Contraste" subtitle="Tema visual por defecto">
          <div className="config-options">
            {['normal', 'alto-contraste'].map(tema => (
              <button
                key={tema}
                className={`option-btn ${config.temaContraste === tema ? 'active' : ''}`}
                onClick={() => handleChange('temaContraste', tema)}
                disabled={saving}
              >
                <span className="option-label">
                  {tema === 'normal' ? 'Normal' : 'Alto Contraste'}
                </span>
                {config.temaContraste === tema && (
                  <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Idioma */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card title="Idioma" subtitle="Idioma por defecto de la aplicación">
          <div className="config-options">
            {[{ value: 'es', label: 'Español' }, { value: 'en', label: 'English' }].map(idioma => (
              <button
                key={idioma.value}
                className={`option-btn ${config.idioma === idioma.value ? 'active' : ''}`}
                onClick={() => handleChange('idioma', idioma.value)}
                disabled={saving}
              >
                <span className="option-label">{idioma.label}</span>
                {config.idioma === idioma.value && (
                  <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Velocidad de Voz */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card title="Velocidad de Voz" subtitle={`Velocidad de síntesis de voz: ${config.velocidadVoz}x`}>
          <div className="slider-container">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={config.velocidadVoz}
              onChange={(e) => handleChange('velocidadVoz', parseFloat(e.target.value))}
              disabled={saving}
              className="slider"
            />
            <div className="slider-labels">
              <span>0.5x (Lento)</span>
              <span>1.0x (Normal)</span>
              <span>2.0x (Rápido)</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Volumen de Voz */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card title="Volumen de Voz" subtitle={`Volumen de síntesis de voz: ${config.volumenVoz}%`}>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={config.volumenVoz}
              onChange={(e) => handleChange('volumenVoz', parseInt(e.target.value))}
              disabled={saving}
              className="slider"
            />
            <div className="slider-labels">
              <span>0% (Mudo)</span>
              <span>50%</span>
              <span>100% (Máximo)</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Feedback Háptico */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card title="Feedback Háptico" subtitle="Vibraciones al interactuar con la app">
          <div className="toggle-container">
            <label className="toggle">
              <input
                type="checkbox"
                checked={config.feedbackHaptico}
                onChange={(e) => handleChange('feedbackHaptico', e.target.checked)}
                disabled={saving}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-label">
              {config.feedbackHaptico ? 'Activado' : 'Desactivado'}
            </span>
          </div>
        </Card>
      </motion.div>

      {/* Nivel de Detalle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card title="Nivel de Detalle" subtitle="Nivel de detalle en instrucciones de voz">
          <div className="config-options">
            {['basico', 'completo', 'experto'].map(nivel => (
              <button
                key={nivel}
                className={`option-btn ${config.nivelDetalle === nivel ? 'active' : ''}`}
                onClick={() => handleChange('nivelDetalle', nivel)}
                disabled={saving}
              >
                <span className="option-label">
                  {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
                </span>
                {config.nivelDetalle === nivel && (
                  <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
