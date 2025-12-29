/**
 * UI Slice
 * @description Estado de interfaz de usuario (loaders, modals, etc.)
 */

export const uiSlice = {
  // Estado inicial
  initialState: {
    loading: false,
    sidebarOpen: true,
    modalOpen: false,
    modalContent: null,
    theme: 'light',
  },

  // Acciones
  actions: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalContent = null;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
};

export default uiSlice;
