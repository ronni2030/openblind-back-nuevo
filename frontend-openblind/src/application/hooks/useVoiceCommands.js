import { useState, useEffect, useCallback } from 'react';
import { speak } from '../utils/speechUtils';

const useVoiceCommands = (onCommand, autoStart = true) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [firstCommand, setFirstCommand] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech Recognition no disponible');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = 'es-ES';
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;

    recognitionInstance.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase();
      console.log('🎤 Comando:', command);

      // Si es el primer comando, activar audio con mensaje de bienvenida
      if (firstCommand) {
        try {
          speak('Comando escuchado');
          setFirstCommand(false);
        } catch (e) {
          console.log('Audio se activará');
        }
      }

      onCommand(command);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Error voz:', event.error);
      if (event.error !== 'no-speech') {
        setIsListening(false);
      }
    };

    recognitionInstance.onend = () => {
      if (isListening) {
        try {
          recognitionInstance.start();
        } catch (e) {
          console.error('Error reiniciando:', e);
        }
      }
    };

    setRecognition(recognitionInstance);

    // INICIAR AUTOMÁTICAMENTE si autoStart es true
    if (autoStart) {
      setTimeout(() => {
        try {
          recognitionInstance.start();
          setIsListening(true);
          console.log('✅ Comandos de voz ACTIVADOS automáticamente');
        } catch (e) {
          console.error('Error iniciando automáticamente:', e);
        }
      }, 500);
    }

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [autoStart]);

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        setIsListening(false);
        speak('Comandos de voz desactivados');
      } else {
        try {
          recognition.start();
          setIsListening(true);
          speak('Comandos de voz activados');
        } catch (e) {
          console.error('Error iniciando:', e);
        }
      }
    }
  };

  return { isListening, toggleListening };
};

export default useVoiceCommands;
