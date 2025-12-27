/**
 * Dashboard Page - Vista principal con métricas
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getMetricasResumen } from '@shared/api/adminApi'
import Card from '@shared/ui/Card/Card'
import './DashboardPage.css'

export default function DashboardPage() {
  const [metricas, setMetricas] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadMetricas()
  }, [])

  const loadMetricas = async () => {
    try {
      setLoading(true)
      const data = await getMetricasResumen()
      setMetricas(data)
      setError(null)
    } catch (err) {
      setError('Error al cargar métricas')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Cargando dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={loadMetricas}>Reintentar</button>
      </div>
    )
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted">Panel de administración de OpenBlind</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn-refresh" onClick={loadMetricas}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="metrics-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="metric-card metric-users">
            <div className="metric-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="metric-content">
              <p className="metric-label">Usuarios Activos</p>
              <h2 className="metric-value">{metricas?.usuarios?.activos?.toLocaleString()}</h2>
              <p className="metric-change positive">
                +{metricas?.usuarios?.nuevosEstaSemana} esta semana
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="metric-card metric-routes">
            <div className="metric-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="metric-content">
              <p className="metric-label">Rutas Generadas Hoy</p>
              <h2 className="metric-value">{metricas?.rutas?.hoy?.toLocaleString()}</h2>
              <p className="metric-change positive">
                {metricas?.rutas?.estaSemana?.toLocaleString()} esta semana
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="metric-card metric-incidents">
            <div className="metric-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="metric-content">
              <p className="metric-label">Incidencias Pendientes</p>
              <h2 className="metric-value">{metricas?.incidencias?.pendientes}</h2>
              <p className="metric-change negative">
                {metricas?.incidencias?.nuevasHoy} nuevas hoy
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="metric-card metric-total">
            <div className="metric-icon">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="metric-content">
              <p className="metric-label">Total Usuarios</p>
              <h2 className="metric-value">{metricas?.usuarios?.total?.toLocaleString()}</h2>
              <p className="metric-change positive">
                +{metricas?.usuarios?.nuevosHoy} hoy
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Uso de Módulos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card title="Uso de Módulos" subtitle="Porcentaje de uso de cada módulo de la aplicación">
          <div className="modules-grid">
            {metricas?.usoModulos && Object.entries(metricas.usoModulos).map(([modulo, datos], index) => (
              <div key={modulo} className="module-item">
                <div className="module-info">
                  <h4>{modulo.charAt(0).toUpperCase() + modulo.slice(1)}</h4>
                  <p className="text-muted">{datos.usuariosActivos} usuarios activos</p>
                </div>
                <div className="module-stats">
                  <span className="module-percentage">{datos.porcentajeUso}%</span>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${datos.porcentajeUso}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      style={{
                        backgroundColor: index === 0 ? 'var(--color-primary-500)' :
                                       index === 1 ? 'var(--color-success-500)' :
                                       index === 2 ? 'var(--color-warning-500)' :
                                       'var(--color-info-500)'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <div className="stats-row">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card title="Rutas">
            <div className="stat-item">
              <span className="stat-label">Total:</span>
              <span className="stat-value">{metricas?.rutas?.total?.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Completadas:</span>
              <span className="stat-value text-success">{metricas?.rutas?.rutasCompletadas?.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Canceladas:</span>
              <span className="stat-value text-error">{metricas?.rutas?.rutasCanceladas?.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Promedio diario:</span>
              <span className="stat-value">{metricas?.rutas?.promedioDiario?.toLocaleString()}</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card title="Incidencias">
            <div className="stat-item">
              <span className="stat-label">Total:</span>
              <span className="stat-value">{metricas?.incidencias?.total}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Resueltas:</span>
              <span className="stat-value text-success">{metricas?.incidencias?.resueltas}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">En Revisión:</span>
              <span className="stat-value text-warning">{metricas?.incidencias?.enRevision}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Resueltas hoy:</span>
              <span className="stat-value text-success">{metricas?.incidencias?.resolvidasHoy}</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card title="Usuarios">
            <div className="stat-item">
              <span className="stat-label">Total:</span>
              <span className="stat-value">{metricas?.usuarios?.total?.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Activos:</span>
              <span className="stat-value text-success">{metricas?.usuarios?.activos?.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Inactivos:</span>
              <span className="stat-value text-muted">{metricas?.usuarios?.inactivos?.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Bloqueados:</span>
              <span className="stat-value text-error">{metricas?.usuarios?.bloqueados}</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
