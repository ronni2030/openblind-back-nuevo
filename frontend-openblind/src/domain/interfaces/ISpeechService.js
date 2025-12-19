/**
 * Interface/Port: Servicio de Voz
 * Define el contrato para servicios de síntesis y reconocimiento de voz
 */
export class ISpeechService {
  /**
   * Iniciar reconocimiento de voz
   * @param {Function} onResult - Callback cuando se detecta un comando
   * @param {Function} onError - Callback de error
   * @returns {void}
   */
  startListening(onResult, onError) {
    throw new Error('Método startListening() debe ser implementado');
  }

  /**
   * Detener reconocimiento de voz
   * @returns {void}
   */
  stopListening() {
    throw new Error('Método stopListening() debe ser implementado');
  }

  /**
   * Reproducir texto con síntesis de voz
   * @param {string} text - Texto a reproducir
   * @param {Object} options - Opciones de voz (rate, pitch, volume)
   * @returns {Promise<void>}
   */
  async speak(text, options = {}) {
    throw new Error('Método speak() debe ser implementado');
  }

  /**
   * Detener síntesis de voz
   * @returns {void}
   */
  stopSpeaking() {
    throw new Error('Método stopSpeaking() debe ser implementado');
  }

  /**
   * Verificar si el navegador soporta Web Speech API
   * @returns {boolean}
   */
  isSupported() {
    throw new Error('Método isSupported() debe ser implementado');
  }
}
