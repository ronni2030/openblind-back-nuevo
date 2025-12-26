# 🎤 Voice Mic Panel Widget

## Descripción

Widget del panel central de control de voz para OpenBlind. Proporciona un botón flotante persistente que permite activar/desactivar el reconocimiento de voz en cualquier vista de la aplicación.

## Componentes

### VoiceCentralButton

Botón flotante centralizado con animación de pulso que indica cuando la app está escuchando comandos de voz.

**Props:**
- `isListening` (boolean): Estado del reconocimiento de voz
- `onToggle` (function): Callback para activar/desactivar escucha

**Características:**
- ✅ Animación de pulso cuando está escuchando
- ✅ Feedback háptico (vibración) al presionar
- ✅ Feedback de voz confirmando estado
- ✅ Icono dinámico (mic / graphic_eq)

## Uso

```javascript
import { VoiceCentralButton } from 'widgets/voice-mic-panel';
import useVoiceCommands from 'application/hooks/useVoiceCommands';

export const MyView = () => {
  const handleCommand = (command) => {
    console.log('Comando recibido:', command);
  };

  const { isListening, toggleListening } = useVoiceCommands(handleCommand);

  return (
    <div>
      {/* ... contenido ... */}
      <VoiceCentralButton isListening={isListening} onToggle={toggleListening} />
    </div>
  );
};
```

## Estilos

El widget usa las clases CSS:
- `.voice-central`: Contenedor fijo en la parte inferior
- `.voice-pulse-btn`: Botón con animación de pulso
- `.listening`: Clase activa cuando está escuchando

## Dependencias

- `application/utils/speechUtils` - Para la síntesis de voz
- `navigator.vibrate` - Para feedback háptico
- CSS de `features/configuracion/styles.css` (temporalmente)

## Arquitectura FSD

```
widgets/voice-mic-panel/
├── ui/
│   └── VoiceCentralButton.jsx  ← Componente UI del widget
├── model/                      ← (futuro) Estado del widget
├── api/                        ← (futuro) API calls si necesario
├── lib/                        ← (futuro) Lógica de negocio
├── index.js                    ← Exportaciones públicas
└── README.md                   ← Este archivo
```

## Roadmap

- [ ] Mover estilos a `widgets/voice-mic-panel/ui/styles.css`
- [ ] Agregar estado global del widget en `model/`
- [ ] Implementar persistencia de preferencias de voz
- [ ] Agregar indicador visual de volumen de entrada
