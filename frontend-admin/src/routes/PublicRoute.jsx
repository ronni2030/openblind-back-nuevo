/**
 * Public Route Component
 * @description Ruta pública accesible sin autenticación
 */

import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../core/providers/AuthProvider';

const PublicRoute = ({ children, redirectIfAuthenticated = false }) => {
  const { isAuthenticated, loading } = useAuthContext();

  // Mientras carga, mostrar spinner o nada
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si está autenticado y se debe redirigir, ir al dashboard
  if (isAuthenticated && redirectIfAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Mostrar el componente público
  return children;
};

export default PublicRoute;
