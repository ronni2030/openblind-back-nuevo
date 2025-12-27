/**
 * Dashboard Screen - Métricas y estadísticas del panel de administración
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 * @author MALDONADO DELGADO DAVID ALEJANDRO (N°5)
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@shared/components';
import { getMetricsResumen } from '@services/api';
import './DashboardScreen.css';

export default function DashboardScreen() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const response = await getMetricsResumen();
      if (response.success) {
        setMetrics(response.data);
      }
    } catch (error) {
      console.error('Error cargando métricas:', error);
      // Mock data para desarrollo
      setMetrics({
        usuariosActivos: 1247,
        rutasPorDia: 342,
        incidenciasReportadas: 45,
        incidenciasResueltas: 38,
        ticketsPendientes: 12,
        usoModulos: {
          'Navegación': 856,
          'Lugares Favoritos': 623,
          'Contactos': 445,
          'Configuración': 312,
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Admin</h1>
          <p className="dashboard-subtitle">
            Panel de administración de OpenBlind - Vista general del sistema
          </p>
        </div>
        <button className="btn-refresh" onClick={loadMetrics}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualizar
        </button>
      </div>

      {/* Métricas Principales */}
      <div className="metrics-grid">
        <MetricCard
          title="Usuarios Activos"
          value={metrics?.usuariosActivos || 0}
          icon="👥"
          color="primary"
          trend="+12%"
        />
        <MetricCard
          title="Rutas/Día"
          value={metrics?.rutasPorDia || 0}
          icon="🗺️"
          color="success"
          trend="+8%"
        />
        <MetricCard
          title="Incidencias"
          value={`${metrics?.incidenciasResueltas || 0}/${metrics?.incidenciasReportadas || 0}`}
          icon="⚠️"
          color="warning"
          subtitle="Resueltas / Reportadas"
        />
        <MetricCard
          title="Tickets Soporte"
          value={metrics?.ticketsPendientes || 0}
          icon="🎫"
          color="info"
          subtitle="Pendientes"
        />
      </div>

      {/* Uso de Módulos */}
      <Card title="Uso de Módulos" className="modules-card">
        <div className="modules-grid">
          {metrics?.usoModulos && Object.entries(metrics.usoModulos).map(([module, count]) => (
            <div key={module} className="module-item">
              <div className="module-name">{module}</div>
              <div className="module-bar">
                <div
                  className="module-bar-fill"
                  style={{ width: `${(count / 1000) * 100}%` }}
                />
              </div>
              <div className="module-count">{count} usos</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, icon, color, trend, subtitle }) {
  return (
    <motion.div
      className={`metric-card metric-card--${color}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <p className="metric-title">{title}</p>
        <h2 className="metric-value">{value}</h2>
        {subtitle && <p className="metric-subtitle">{subtitle}</p>}
        {trend && <span className="metric-trend">{trend}</span>}
      </div>
    </motion.div>
  );
}
