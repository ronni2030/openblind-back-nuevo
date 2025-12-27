/**
 * Layout Principal - Sidebar + Contenido
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

import { Outlet, NavLink } from 'react-router-dom'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#9333ea"/>
                <ellipse cx="12" cy="12" rx="6" ry="4" fill="white"/>
                <circle cx="12" cy="12" r="2" fill="#9333ea"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>OpenBlind</h1>
              <p>Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <p className="nav-section-title">Principal</p>
            <NavLink to="/dashboard" className="nav-item">
              <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Dashboard</span>
            </NavLink>
          </div>

          <div className="nav-section">
            <p className="nav-section-title">Gestión (David Maldonado)</p>
            <NavLink to="/incidencias" className="nav-item">
              <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Incidencias</span>
            </NavLink>

            <NavLink to="/soporte" className="nav-item">
              <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Soporte</span>
            </NavLink>
          </div>

          <div className="nav-section">
            <p className="nav-section-title">Configuración Global</p>

            <NavLink to="/configuracion/accesibilidad" className="nav-item">
              <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Accesibilidad</span>
            </NavLink>

            <NavLink to="/configuracion/navegacion" className="nav-item">
              <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Navegación</span>
            </NavLink>

            <NavLink to="/configuracion/privacidad" className="nav-item">
              <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Privacidad</span>
            </NavLink>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">A</div>
            <div className="admin-details">
              <p className="admin-name">Administrador</p>
              <p className="admin-role">Josselyn Moposita</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="main-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
