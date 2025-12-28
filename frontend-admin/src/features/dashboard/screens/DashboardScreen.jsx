/**
 * Dashboard Screen - Métricas y estadísticas del panel de administración
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 * @author MALDONADO DELGADO DAVID ALEJANDRO (N°5)
 */

import { useState, useEffect } from 'react';
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
      // Mock data para desarrollo - Dashboard completo de todo el admin
      setMetrics({
        // Angelo - Gestión de Usuarios
        totalUsuarios: 1247,
        usuariosActivos: 1089,
        usuariosNuevosHoy: 23,
        usuariosBloqueados: 12,

        // Angelo - Gestión de Lugares y Zonas
        lugaresFavoritos: 3421,
        zonasSeguras: 156,
        puntosCriticos: 89,

        // Oscar - Contactos y Emergencia
        contactosEmergencia: 2847,

        // Oscar - Navegación y Geolocalización
        rutasPorDia: 342,
        rutasTotales: 15678,
        rutasCompletadas: 14892,

        // David - Incidencias
        incidenciasReportadas: 45,
        incidenciasResueltas: 38,
        incidenciasPendientes: 7,

        // David - Soporte
        ticketsPendientes: 12,
        ticketsEnProceso: 8,
        ticketsResueltos: 234,

        // Uso de módulos (todos)
        usoModulos: {
          'Navegación': 856,
          'Lugares Favoritos': 623,
          'Contactos': 445,
          'Tarjeta ID': 378,
          'Configuración': 312,
          'Soporte': 189,
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

      {/* Métricas Principales - Resumen General */}
      <div className="metrics-grid">
        <MetricCard
          title="Usuarios Activos"
          value={metrics?.usuariosActivos || 0}
          icon="👥"
          color="primary"
          subtitle={`Total: ${metrics?.totalUsuarios || 0}`}
        />
        <MetricCard
          title="Rutas/Día"
          value={metrics?.rutasPorDia || 0}
          icon="🗺️"
          color="success"
          subtitle={`${metrics?.rutasCompletadas || 0} completadas`}
        />
        <MetricCard
          title="Incidencias"
          value={metrics?.incidenciasPendientes || 0}
          icon="⚠️"
          color="warning"
          subtitle={`${metrics?.incidenciasResueltas || 0} resueltas`}
        />
        <MetricCard
          title="Tickets Soporte"
          value={metrics?.ticketsPendientes || 0}
          icon="🎫"
          color="info"
          subtitle={`${metrics?.ticketsEnProceso || 0} en proceso`}
        />
      </div>

      {/* Sección Angelo - Gestión de Usuarios y Lugares */}
      <div className="dashboard-section">
        <h2 className="section-title">👤 Gestión de Usuarios y Lugares (Angelo Vera)</h2>
        <div className="metrics-grid-small">
          <MetricCardSmall
            title="Total Usuarios"
            value={metrics?.totalUsuarios || 0}
            subtitle={`${metrics?.usuariosNuevosHoy || 0} nuevos hoy`}
          />
          <MetricCardSmall
            title="Lugares Favoritos"
            value={metrics?.lugaresFavoritos || 0}
            subtitle="Guardados por usuarios"
          />
          <MetricCardSmall
            title="Zonas Seguras"
            value={metrics?.zonasSeguras || 0}
            subtitle="Configuradas"
          />
          <MetricCardSmall
            title="Puntos Críticos"
            value={metrics?.puntosCriticos || 0}
            subtitle="Marcados"
          />
        </div>
      </div>

      {/* Sección Oscar - Contactos y Navegación */}
      <div className="dashboard-section">
        <h2 className="section-title">📍 Contactos y Navegación (Oscar Soria)</h2>
        <div className="metrics-grid-small">
          <MetricCardSmall
            title="Contactos Emergencia"
            value={metrics?.contactosEmergencia || 0}
            subtitle="Registrados"
          />
          <MetricCardSmall
            title="Rutas Totales"
            value={metrics?.rutasTotales || 0}
            subtitle={`${metrics?.rutasCompletadas || 0} completadas`}
          />
          <MetricCardSmall
            title="Rutas por Día"
            value={metrics?.rutasPorDia || 0}
            subtitle="Promedio"
          />
        </div>
      </div>

      {/* Sección David - Incidencias y Soporte */}
      <div className="dashboard-section">
        <h2 className="section-title">🛠️ Incidencias y Soporte (David Maldonado)</h2>
        <div className="metrics-grid-small">
          <MetricCardSmall
            title="Incidencias Pendientes"
            value={metrics?.incidenciasPendientes || 0}
            subtitle={`${metrics?.incidenciasResueltas || 0} resueltas`}
          />
          <MetricCardSmall
            title="Tickets Pendientes"
            value={metrics?.ticketsPendientes || 0}
            subtitle={`${metrics?.ticketsResueltos || 0} resueltos`}
          />
          <MetricCardSmall
            title="En Proceso"
            value={metrics?.ticketsEnProceso || 0}
            subtitle="Tickets activos"
          />
        </div>
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
    <div className={`metric-card metric-card--${color}`}>
      <div className="metric-icon">{icon}</div>
      <div className="metric-content">
        <p className="metric-title">{title}</p>
        <h2 className="metric-value">{value}</h2>
        {subtitle && <p className="metric-subtitle">{subtitle}</p>}
        {trend && <span className="metric-trend">{trend}</span>}
      </div>
    </div>
  );
}

function MetricCardSmall({ title, value, subtitle }) {
  return (
    <div className="metric-card-small">
      <h3 className="metric-small-title">{title}</h3>
      <p className="metric-small-value">{value}</p>
      {subtitle && <p className="metric-small-subtitle">{subtitle}</p>}
    </div>
  );
}
