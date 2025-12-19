import { useState, useEffect, useRef } from 'react';

/**
 * Hook personalizado para manejar síntesis y reconocimiento de voz
 * @param {ISpeechService} speechService - Servicio de voz
 */
export const useSpeech = (speechService) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const serviceRef = useRef(speechService);

  useEffect(() => {
    serviceRef.current = speechService;
  }, [speechService]);

  /**
   * Iniciar escucha de comandos
   * @param {Function} onCommand - Callback cuando se detecta comando
   */
  const startListening = (onCommand) => {
    const service = serviceRef.current;

    service.startListening(
      (transcript) => {
        setIsListening(false);
        if (onCommand) {
          onCommand(transcript);
        }
      },
      (error) => {
        console.error('Error de reconocimiento:', error);
        setIsListening(false);
      }
    );

    setIsListening(true);
  };

  /**
   * Detener escucha
   */
  const stopListening = () => {
    serviceRef.current.stopListening();
    setIsListening(false);
  };

  /**
   * Hablar un texto
   * @param {string} text - Texto a reproducir
   */
  const speak = async (text) => {
    setIsSpeaking(true);
    try {
      await serviceRef.current.speak(text);
    } finally {
      setIsSpeaking(false);
    }
  };

  /**
   * Detener síntesis
   */
  const stopSpeaking = () => {
    serviceRef.current.stopSpeaking();
    setIsSpeaking(false);
  };

  return {
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  };
};
