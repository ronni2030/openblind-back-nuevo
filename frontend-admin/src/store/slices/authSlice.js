/**
 * Auth Slice
 * @description Estado de autenticación (si se usa Redux/Zustand)
 */

// Placeholder para Redux Toolkit o Zustand
// Este archivo se implementará cuando se decida usar Redux/Zustand

export const authSlice = {
  // Estado inicial
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },

  // Acciones (si se usa Redux)
  actions: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
};

export default authSlice;
