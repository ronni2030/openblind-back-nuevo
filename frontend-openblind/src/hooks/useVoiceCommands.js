// ============================================================
// CUSTOM HOOK: useVoiceCommands (AUTOMÁTICO + FIX NETWORK ERROR)
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';

const useVoiceCommands = (onCommand, autoStart = true) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [firstCommand, setFirstCommand] = useState(true);

  // 👉 useRef evita recrear la instancia (CLAVE)
  const recognitionRef = useRef(null);

  // ============================================================
  // INICIALIZACIÓN
  // ============================================================
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Web Speech API no soportada');
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    const recognition = new SpeechRecognition();

    recognition.continuous = true;  // ✅ Escucha continua
    recognition.interimResults = false;
    recognition.lang = 'es-ES';
    recognition.maxAlternatives = 1;

    // ---- RESULTADO ----
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const speechResult = event.results[last][0].transcript.toLowerCase();

      console.log('🎤 Comando detectado:', speechResult);
      setTranscript(speechResult);

      // Si es el primer comando, activar audio con mensaje de bienvenida
      if (firstCommand) {
        try {
          speak('Comando escuchado');
          setFirstCommand(false);
        } catch (e) {
          console.log('Audio se activará con interacción');
        }
      }

      processCommand(speechResult);
    };

    // ---- CUANDO TERMINA ----
    recognition.onend = () => {
      // Reiniciar automáticamente si estaba escuchando
      if (isListening) {
        try {
          recognition.start();
          console.log('🔄 Reconocimiento reiniciado automáticamente');
        } catch (e) {
          console.error('Error reiniciando:', e);
          setIsListening(false);
        }
      } else {
        setIsListening(false);
      }
    };

    // ---- ERRORES (FIX NETWORK) ----
    recognition.onerror = (event) => {
      console.error('🎤 Speech error:', event.error);
      setIsListening(false);

      if (event.error === 'network') {
        speak('Error de conexión con el servicio de voz. Intenta de nuevo.');
      }

      if (event.error === 'not-allowed') {
        alert('Permite el acceso al micrófono en el navegador');
      }
    };

    recognitionRef.current = recognition;

    // ✅ INICIAR AUTOMÁTICAMENTE si autoStart es true
    if (autoStart) {
      setTimeout(() => {
        try {
          recognition.start();
          setIsListening(true);
          console.log('✅ Comandos de voz ACTIVADOS automáticamente');
          speak('Bienvenido a OpenBlind. Los comandos de voz están activos.');
        } catch (e) {
          console.error('Error iniciando automáticamente:', e);
        }
      }, 1000); // 1 segundo de delay para dar tiempo al navegador
    }

    return () => {
      recognition.abort();
    };
  }, [autoStart]);

  // ============================================================
  // PROCESAR COMANDOS
  // ============================================================
  const processCommand = (command) => {
    console.log('🎤 Comando:', command);

    const commands = {
      'inicio': 'dashboard',
      'volver': 'dashboard',
      'menu principal': 'dashboard',

      'lugares': 'lugares',
      'lugares favoritos': 'lugares',

      'contactos': 'contactos',

      'rutas': 'rutas',

      'ubicación': 'ubicacion',
      'dónde estoy': 'ubicacion',

      'ayuda': 'help',
      'comandos': 'help'
    };

    for (const [key, action] of Object.entries(commands)) {
      if (command.includes(key)) {
        onCommand?.(action);
        speak(`Abriendo ${action}`);
        return;
      }
    }

    speak('Comando no reconocido. Di ayuda para conocer los comandos.');
  };

  // ============================================================
  // TEXT TO SPEECH
  // ============================================================
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  // ============================================================
  // INICIAR ESCUCHA (PROTEGIDO)
  // ============================================================
  const startListening = useCallback(() => {
    const recognition = recognitionRef.current;

    if (!recognition || !isSupported || isListening) return;

    try {
      setTranscript('');
      setIsListening(true);
      recognition.start();
      speak('Escuchando');
    } catch (err) {
      console.error('Error startListening:', err);
      setIsListening(false);
    }
  }, [isListening, isSupported]);

  // ============================================================
  // DETENER ESCUCHA
  // ============================================================
  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    speak
  };
};

export default useVoiceCommands;
