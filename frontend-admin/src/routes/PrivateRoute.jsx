/**
 * Private Route Component
 * @description Ruta que requiere autenticación
 */

import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../core/providers/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();

  // Mientras carga, mostrar spinner o nada
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar el componente
  return children;
};

export default PrivateRoute;
