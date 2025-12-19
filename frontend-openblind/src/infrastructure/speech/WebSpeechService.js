import { ISpeechService } from '../../domain/interfaces/ISpeechService.js';

/**
 * Implementación del servicio de voz usando Web Speech API
 * Adapter que conecta con SpeechRecognition y SpeechSynthesis del navegador
 */
export class WebSpeechService extends ISpeechService {
  constructor() {
    super();
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.isListening = false;
  }

  /**
   * Iniciar reconocimiento de voz
   * @param {Function} onResult - Callback cuando se detecta un comando
   * @param {Function} onError - Callback de error
   * @returns {void}
   */
  startListening(onResult, onError) {
    if (!this.isSupported()) {
      onError(new Error('Web Speech API no soportada en este navegador'));
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    this.recognition.lang = 'es-ES';
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.isListening = true;
      console.log('🎤 Escuchando...');
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('🗣️ Comando detectado:', transcript);
      onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      console.error('❌ Error de reconocimiento:', event.error);
      this.isListening = false;
      onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      console.log('🎤 Reconocimiento finalizado');
    };

    this.recognition.start();
  }

  /**
   * Detener reconocimiento de voz
   * @returns {void}
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * Reproducir texto con síntesis de voz
   * @param {string} text - Texto a reproducir
   * @param {Object} options - Opciones de voz (rate, pitch, volume)
   * @returns {Promise<void>}
   */
  async speak(text, options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.isSupported()) {
        reject(new Error('Web Speech API no soportada'));
        return;
      }

      // Cancelar cualquier síntesis en curso
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;

      utterance.onend = () => {
        console.log('🔊 Síntesis completada');
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('❌ Error de síntesis:', event.error);
        reject(event.error);
      };

      this.synthesis.speak(utterance);
    });
  }

  /**
   * Detener síntesis de voz
   * @returns {void}
   */
  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * Verificar si el navegador soporta Web Speech API
   * @returns {boolean}
   */
  isSupported() {
    return 'SpeechRecognition' in window ||
           'webkitSpeechRecognition' in window;
  }

  /**
   * Verificar si está escuchando
   * @returns {boolean}
   */
  getIsListening() {
    return this.isListening;
  }
}
