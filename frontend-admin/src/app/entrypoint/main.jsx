/**
 * OpenBlind Admin - Frontend
 *
 * Punto de entrada de la aplicación React
 *
 * @author MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.jsx'
import '../styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
