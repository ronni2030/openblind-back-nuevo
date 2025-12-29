/**
 * Notifications Slice
 * @description Estado de notificaciones (toasts, alertas)
 */

export const notificationsSlice = {
  // Estado inicial
  initialState: {
    notifications: [],
  },

  // Acciones
  actions: {
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notif) => notif.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
};

export default notificationsSlice;
