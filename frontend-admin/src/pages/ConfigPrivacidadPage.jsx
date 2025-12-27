/**
 * Configuración de Privacidad y Geolocalización - Políticas globales
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getConfiguracionGlobal, updateField, resetConfiguracion } from '@shared/api/adminApi'
import Card from '@shared/ui/Card/Card'
import Button from '@shared/ui/Button/Button'
import './ConfigPage.css'

export default function ConfigPrivacidadPage() {
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
          <h1>Configuración de Privacidad</h1>
          <p className="text-muted">Políticas globales de retención de datos y geolocalización</p>
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

      {/* Política de Retención de Ubicaciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card title="Política de Retención de Ubicaciones" subtitle="Cuántos días guardar historial de ubicaciones">
          <div className="config-options">
            {[
              { value: 7, label: '7 días' },
              { value: 14, label: '14 días' },
              { value: 30, label: '30 días' },
              { value: 90, label: '90 días' }
            ].map(opcion => (
              <button
                key={opcion.value}
                className={`option-btn ${config.retencionUbicacion === opcion.value ? 'active' : ''}`}
                onClick={() => handleChange('retencionUbicacion', opcion.value)}
                disabled={saving}
              >
                <span className="option-label">{opcion.label}</span>
                {config.retencionUbicacion === opcion.value && (
                  <svg className="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
          <p className="text-muted" style={{ marginTop: 'var(--spacing-4)', marginBottom: 0 }}>
            Las ubicaciones más antiguas que este periodo serán eliminadas automáticamente.
            Esta es una política fija que los usuarios NO pueden modificar.
          </p>
        </Card>
      </motion.div>

      {/* Tracking en Background */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card title="Tracking en Segundo Plano" subtitle="Permitir GPS cuando la app está en segundo plano">
          <div className="toggle-container">
            <label className="toggle">
              <input
                type="checkbox"
                checked={config.trackingBackground}
                onChange={(e) => handleChange('trackingBackground', e.target.checked)}
                disabled={saving}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-label">
              {config.trackingBackground ? 'Permitido por defecto' : 'No permitido por defecto'}
            </span>
          </div>
          <p className="text-muted" style={{ marginTop: 'var(--spacing-3)', marginBottom: 0 }}>
            Los usuarios pueden modificar esta configuración individualmente desde la app.
          </p>
        </Card>
      </motion.div>

      {/* Compartir Ubicación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card title="Compartir Ubicación" subtitle="Permitir compartir ubicación con contactos de emergencia">
          <div className="toggle-container">
            <label className="toggle">
              <input
                type="checkbox"
                checked={config.compartirUbicacion}
                onChange={(e) => handleChange('compartirUbicacion', e.target.checked)}
                disabled={saving}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-label">
              {config.compartirUbicacion ? 'Permitido por defecto' : 'No permitido por defecto'}
            </span>
          </div>
          <p className="text-muted" style={{ marginTop: 'var(--spacing-3)', marginBottom: 0 }}>
            Permite que los usuarios compartan su ubicación en tiempo real con contactos de emergencia configurados.
          </p>
        </Card>
      </motion.div>

      {/* Guardar Historial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card title="Guardar Historial de Rutas" subtitle="Mantener registro de rutas y ubicaciones pasadas">
          <div className="toggle-container">
            <label className="toggle">
              <input
                type="checkbox"
                checked={config.guardarHistorial}
                onChange={(e) => handleChange('guardarHistorial', e.target.checked)}
                disabled={saving}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-label">
              {config.guardarHistorial ? 'Activado por defecto' : 'Desactivado por defecto'}
            </span>
          </div>
          <p className="text-muted" style={{ marginTop: 'var(--spacing-3)', marginBottom: 0 }}>
            Si está desactivado, las rutas se eliminan inmediatamente después de completarse.
            Respeta la política de retención configurada arriba.
          </p>
        </Card>
      </motion.div>

      {/* Modo Anónimo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card title="Modo Anónimo Disponible" subtitle="Permitir que usuarios activen modo anónimo">
          <div className="toggle-container">
            <label className="toggle">
              <input
                type="checkbox"
                checked={config.permitirAnonimo}
                onChange={(e) => handleChange('permitirAnonimo', e.target.checked)}
                disabled={saving}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-label">
              {config.permitirAnonimo ? 'Disponible' : 'No disponible'}
            </span>
          </div>
          <p className="text-muted" style={{ marginTop: 'var(--spacing-3)', marginBottom: 0 }}>
            En modo anónimo, no se guardan datos personales ni historial de ubicaciones.
            Esta es una política fija que los usuarios NO pueden modificar.
          </p>
        </Card>
      </motion.div>

      {/* Información Adicional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card title="Información sobre Privacidad">
          <div style={{ padding: 'var(--spacing-4)', background: 'var(--color-info-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-info-500)' }}>
            <h4 style={{ margin: '0 0 var(--spacing-3) 0', color: 'var(--color-info-700)' }}>
              Políticas Fijas vs Modificables
            </h4>
            <ul style={{ margin: 0, paddingLeft: 'var(--spacing-5)', color: 'var(--color-text-secondary)' }}>
              <li style={{ marginBottom: 'var(--spacing-2)' }}>
                <strong>Políticas Fijas:</strong> Retención de ubicaciones, Modo Anónimo
                <br />
                <span style={{ fontSize: 'var(--font-size-sm)' }}>
                  Los usuarios NO pueden modificar estas configuraciones.
                </span>
              </li>
              <li style={{ marginBottom: 'var(--spacing-2)' }}>
                <strong>Políticas Modificables:</strong> Tracking, Compartir Ubicación, Guardar Historial
                <br />
                <span style={{ fontSize: 'var(--font-size-sm)' }}>
                  Los usuarios PUEDEN modificar estas configuraciones desde la app.
                </span>
              </li>
              <li>
                <strong>Cumplimiento Legal:</strong> Todas las políticas cumplen con GDPR y regulaciones locales.
              </li>
            </ul>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
