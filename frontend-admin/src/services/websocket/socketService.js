/**
 * WebSocket Service
 * @description Servicio para comunicación en tiempo real
 */

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = {};
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  /**
   * Conecta al servidor WebSocket
   * @param {string} url - URL del servidor WebSocket
   */
  connect(url) {
    try {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log('✅ WebSocket conectado');
        this.reconnectAttempts = 0;
        this.emit('connected');
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.emit('message', data);

        // Emitir evento específico si existe un tipo
        if (data.type) {
          this.emit(data.type, data.payload);
        }
      };

      this.socket.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        this.emit('error', error);
      };

      this.socket.onclose = () => {
        console.log('🔴 WebSocket desconectado');
        this.emit('disconnected');
        this.attemptReconnect(url);
      };
    } catch (error) {
      console.error('Error al conectar WebSocket:', error);
    }
  }

  /**
   * Intenta reconectar al servidor
   * @param {string} url - URL del servidor
   */
  attemptReconnect(url) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Reintentando conexión (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

      setTimeout(() => {
        this.connect(url);
      }, 2000 * this.reconnectAttempts); // Backoff exponencial
    } else {
      console.error('❌ Máximo de intentos de reconexión alcanzado');
    }
  }

  /**
   * Envía un mensaje al servidor
   * @param {string} type - Tipo de mensaje
   * @param {any} payload - Datos a enviar
   */
  send(type, payload) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    } else {
      console.error('❌ WebSocket no está conectado');
    }
  }

  /**
   * Escucha eventos del WebSocket
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Función a ejecutar
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Deja de escuchar un evento
   * @param {string} event - Nombre del evento
   * @param {Function} callback - Función a remover
   */
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    }
  }

  /**
   * Emite un evento a los listeners
   * @param {string} event - Nombre del evento
   * @param {any} data - Datos del evento
   */
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }

  /**
   * Desconecta del servidor WebSocket
   */
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.listeners = {};
    }
  }
}

// Singleton
const socketService = new SocketService();

export default socketService;
