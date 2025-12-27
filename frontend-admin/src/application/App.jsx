/**
 * OpenBlind Admin - Aplicación Principal
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@widgets/Layout/Layout'
import DashboardPage from '@pages/DashboardPage'
import ConfigAccesibilidadPage from '@pages/ConfigAccesibilidadPage'
import ConfigNavegacionPage from '@pages/ConfigNavegacionPage'
import ConfigPrivacidadPage from '@pages/ConfigPrivacidadPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="configuracion">
            <Route path="accesibilidad" element={<ConfigAccesibilidadPage />} />
            <Route path="navegacion" element={<ConfigNavegacionPage />} />
            <Route path="privacidad" element={<ConfigPrivacidadPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
