/**
 * App Routes Component
 * @description Componente principal de rutas de la aplicación
 */

import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { routes } from './routes.config';

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        {routes.map((route, index) => {
          const Component = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                route.private ? (
                  <PrivateRoute>
                    <Component />
                  </PrivateRoute>
                ) : (
                  <PublicRoute redirectIfAuthenticated={route.redirectIfAuthenticated}>
                    <Component />
                  </PublicRoute>
                )
              }
            />
          );
        })}

        {/* Ruta 404 */}
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
