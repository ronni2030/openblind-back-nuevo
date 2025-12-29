/**
 * OpenBlind Admin - Aplicación Principal
 * Estructura Modular Funcional (Feature-Sliced Design Simplificado)
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 * @author MALDONADO DELGADO DAVID ALEJANDRO (N°5)
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@shared/components'

// Modules - Screens
import DashboardScreen from '@modules/dashboard/screens/DashboardScreen'
import IncidenciasScreen from '@modules/incidencias/screens/IncidenciasScreen'
import SoporteScreen from '@modules/soporte/screens/SoporteScreen'
import ConfigAccesibilidadScreen from '@modules/configuracion/screens/ConfigAccesibilidadScreen'
import ConfigNavegacionScreen from '@modules/configuracion/screens/ConfigNavegacionScreen'
import ConfigPrivacidadScreen from '@modules/configuracion/screens/ConfigPrivacidadScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard - Josselyn + David */}
          <Route path="dashboard" element={<DashboardScreen />} />

          {/* Gestión - David Maldonado */}
          <Route path="incidencias" element={<IncidenciasScreen />} />
          <Route path="soporte" element={<SoporteScreen />} />

          {/* Configuración Global - Josselyn Moposita */}
          <Route path="configuracion">
            <Route path="accesibilidad" element={<ConfigAccesibilidadScreen />} />
            <Route path="navegacion" element={<ConfigNavegacionScreen />} />
            <Route path="privacidad" element={<ConfigPrivacidadScreen />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
