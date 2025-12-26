import { useState, useEffect, useCallback } from 'react';
import { speak } from '../utils/speechUtils';
import { Capacitor } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

const useVoiceCommands = (onCommand, autoStart = true) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [firstCommand, setFirstCommand] = useState(true);
  const isNative = Capacitor.isNativePlatform(); // true si es Android/iOS, false si es web

  useEffect(() => {
    const initVoiceRecognition = async () => {
      if (isNative) {
        // ═══════════════════════════════════════════════════
        // MODO NATIVO (Android/iOS) - Usar plugin de Capacitor
        // ═══════════════════════════════════════════════════

        try {
          // 1. Verificar disponibilidad
          const available = await SpeechRecognition.available();
          if (!available) {
            console.warn('Reconocimiento de voz no disponible en este dispositivo');
            return;
          }

          // 2. Pedir permisos
          const permissions = await SpeechRecognition.requestPermissions();
          if (permissions.speechRecognition !== 'granted') {
            console.warn('Permiso de reconocimiento de voz denegado');
            return;
          }

          console.log('✅ Plugin nativo de voz listo');

          // 3. Configurar listener para resultados
          SpeechRecognition.addListener('partialResults', (data) => {
            if (data.matches && data.matches.length > 0) {
              const command = data.matches[0].toLowerCase();
              console.log('🎤 Comando (nativo):', command);

              if (firstCommand) {
                speak('Comando escuchado');
                setFirstCommand(false);
              }

              onCommand(command);
            }
          });

          // 4. Auto-iniciar si está habilitado
          if (autoStart) {
            setTimeout(async () => {
              try {
                await SpeechRecognition.start({
                  language: 'es-ES',
                  maxResults: 1,
                  prompt: 'Di un comando',
                  partialResults: true,
                  popup: false // No mostrar popup de Android
                });
                setIsListening(true);
                console.log('✅ Reconocimiento nativo ACTIVADO');
              } catch (e) {
                console.error('Error iniciando reconocimiento nativo:', e);
              }
            }, 500);
          }

          // Marcar que está configurado
          setRecognition('native');
        } catch (error) {
          console.error('Error configurando reconocimiento nativo:', error);
        }

      } else {
        // ═══════════════════════════════════════════════════
        // MODO WEB (Navegador) - Usar Web Speech API
        // ═══════════════════════════════════════════════════

        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
          console.warn('Speech Recognition no disponible en este navegador');
          return;
        }

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognitionAPI();
        recognitionInstance.lang = 'es-ES';
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = false;

        recognitionInstance.onresult = (event) => {
          const last = event.results.length - 1;
          const command = event.results[last][0].transcript.toLowerCase();
          console.log('🎤 Comando (web):', command);

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

        // Auto-iniciar si está habilitado
        if (autoStart) {
          setTimeout(() => {
            try {
              recognitionInstance.start();
              setIsListening(true);
              console.log('✅ Comandos de voz ACTIVADOS (web)');
            } catch (e) {
              console.error('Error iniciando web speech:', e);
            }
          }, 500);
        }
      }
    };

    initVoiceRecognition();

    // Cleanup
    return () => {
      if (isNative) {
        SpeechRecognition.stop();
        SpeechRecognition.removeAllListeners();
      } else if (recognition && recognition !== 'native') {
        recognition.stop();
      }
    };
  }, [autoStart, isNative]);

  const toggleListening = useCallback(async () => {
    if (isNative) {
      // ═══════════════════════════════════════════════════
      // TOGGLE NATIVO (Android/iOS)
      // ═══════════════════════════════════════════════════

      if (isListening) {
        await SpeechRecognition.stop();
        setIsListening(false);
        speak('Comandos de voz desactivados');
      } else {
        try {
          await SpeechRecognition.start({
            language: 'es-ES',
            maxResults: 1,
            prompt: 'Di un comando',
            partialResults: true,
            popup: false
          });
          setIsListening(true);
          speak('Comandos de voz activados');
        } catch (e) {
          console.error('Error iniciando reconocimiento nativo:', e);
        }
      }
    } else {
      // ═══════════════════════════════════════════════════
      // TOGGLE WEB (Navegador)
      // ═══════════════════════════════════════════════════

      if (recognition && recognition !== 'native') {
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
            console.error('Error iniciando web speech:', e);
          }
        }
      }
    }
  }, [recognition, isListening, isNative]);

  return { isListening, toggleListening, isNative };
};

export default useVoiceCommands;
