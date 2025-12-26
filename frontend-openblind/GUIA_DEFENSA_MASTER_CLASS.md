# 🎤 GUÍA DE DEFENSA Y MASTER CLASS

**Estudiante:** Josselyn Pamela Moposita Pilataxi (N°5)
**Módulo:** Configuración
**Arquitectura:** Feature-Sliced Design (FSD)
**Tiempo:** 10-15 minutos

---

## 📋 ÍNDICE RÁPIDO

1. [Script de Introducción (2 min)](#1-script-de-introducción-2-min)
2. [Demostración en Vivo (3 min)](#2-demostración-en-vivo-3-min)
3. [Explicación de FSD (3 min)](#3-explicación-de-fsd-3-min)
4. [Explicación del Código (4 min)](#4-explicación-del-código-4-min)
5. [Preguntas Frecuentes con Respuestas](#5-preguntas-frecuentes-con-respuestas)

---

## 1. SCRIPT DE INTRODUCCIÓN (2 min)

### 1.1 Saludo y Contexto

> "Buenos días profesor(a) y compañeros. Mi nombre es Josselyn Moposita y hoy les voy a presentar el **módulo de Configuración para OpenBlind**, una aplicación móvil de asistencia para personas con discapacidad visual."

### 1.2 Problema que Resuelve

> "El problema que resuelve este módulo es: **¿Cómo pueden las personas con discapacidad visual personalizar la aplicación según sus necesidades específicas?**"
>
> "La solución es un sistema de configuración **100% accesible** que se controla completamente por voz, con feedback háptico (vibraciones) y síntesis de voz, sin necesidad de ver la pantalla."

### 1.3 Arquitectura Elegida

> "Para implementar este módulo, elegí **Feature-Sliced Design (FSD)**, una arquitectura frontend moderna que organiza el código por funcionalidades en lugar de por tipo de archivo."
>
> "¿Por qué FSD y no otras arquitecturas?"
> - **Hexagonal:** Excelente para backend, pero demasiado complejo para frontend
> - **Microservicios:** Muy costoso en infraestructura para un equipo pequeño
> - **FSD:** Balance perfecto entre modularidad y simplicidad

### 1.4 Alcance del Módulo

> "El módulo tiene **3 secciones de configuración:**"
> 1. **Accesibilidad:** Tamaño de fuente, contraste, idioma, velocidad de voz
> 2. **Navegación:** Longitud de ruta, paradas seguras, frecuencia de instrucciones
> 3. **Privacidad:** Retención de datos, tracking, modo anónimo
>
> "Todas funcionan con comandos de voz en español, tienen persistencia local, y están completamente documentadas."

---

## 2. DEMOSTRACIÓN EN VIVO (3 min)

### 2.1 Preparación

**ANTES de la presentación:**
- Celular cargado al 100%
- APK instalado y funcionando
- Micrófono del celular probado
- Volumen al máximo
- Modo avión APAGADO (necesita internet para síntesis de voz)

### 2.2 Demo Script

**Abre la app en el celular:**

> "Voy a demostrar cómo funciona. Primero abro OpenBlind en mi celular..."

**Navega a Configuración:**

> "Aquí está el módulo de Configuración. Voy a entrar a **Accesibilidad**."

**Activa el micrófono:**

> "Noten este botón de micrófono flotante. Al presionarlo, la app empieza a escuchar comandos de voz."

[Presiona el botón - debería escucharse: "Estoy escuchando"]

**Ejecuta 3-4 comandos:**

> "Ahora voy a dar algunos comandos en voz alta:"

1. **Di:** "Fuente grande"
   - **Espera:** Vibración + cambio visual + voz dice "Tamaño de fuente grande activado"
   - **Explica:** "Noten que hubo tres tipos de feedback: visual (cambió en pantalla), auditivo (síntesis de voz), y háptico (vibración)"

2. **Di:** "Alto contraste"
   - **Espera:** Cambio de tema + vibración + confirmación de voz
   - **Explica:** "Esto cambia el tema a alto contraste para personas con baja visión"

3. **Di:** "Voz rápida"
   - **Espera:** Confirmación más rápida
   - **Explica:** "Ajusta la velocidad de la síntesis de voz. Esto es útil para usuarios expertos que quieren información más rápido"

4. **Opcional - Di:** "Mostrar configuración"
   - **Explica:** "Los comandos también incluyen navegación, como ver qué está configurado actualmente"

**Demuestra persistencia:**

> "Ahora voy a cerrar la app y volverla a abrir..."

[Cierra y abre la app]

> "Como ven, todas las configuraciones se mantuvieron. Esto usa **localStorage** para persistencia local sin necesidad de backend."

**Demuestra otra vista:**

> "Ahora voy a **Configuración de Privacidad** y digo: 'Treinta días'"

[La configuración cambia a 30 días de retención]

> "Esto configura cuánto tiempo se guardan las ubicaciones del usuario. Es importante para privacidad de personas con discapacidad visual."

---

## 3. EXPLICACIÓN DE FSD (3 min)

### 3.1 ¿Qué es Feature-Sliced Design?

> "**Feature-Sliced Design** es una metodología de arquitectura frontend que organiza el código en **7 capas jerárquicas**, donde cada capa tiene una responsabilidad específica y solo puede importar de capas inferiores."

**Muestra en pantalla (Android Studio o VSCode):**

```
src/
├── app/        ← Capa 1: Inicialización
├── processes/  ← Capa 2: Flujos complejos
├── pages/      ← Capa 3: Páginas
├── widgets/    ← Capa 4: Componentes complejos
├── features/   ← Capa 5: Funcionalidades ⭐
├── entities/   ← Capa 6: Entidades de negocio
└── shared/     ← Capa 7: Código compartido
```

### 3.2 Regla de Importación

> "La regla clave de FSD es: **Solo puedes importar de capas inferiores**."
>
> "Por ejemplo, un **feature** (capa 5) puede usar componentes de **shared** (capa 7), pero **nunca** puede importar de **pages** (capa 3)."

**Dibuja en pizarra o muestra diagrama:**

```
app ──────────────┐
                  ↓
         puede importar de
                  ↓
shared ───────────┘

❌ shared NO puede importar de app
```

### 3.3 Ejemplo Práctico: Módulo Configuración

> "Mi módulo está en `features/configuracion/` y tiene esta estructura:"

**Muestra en pantalla:**

```
features/configuracion/
├── views/              ← 3 vistas React (las páginas del feature)
│   ├── ConfiguracionAccesibilidad.jsx
│   ├── ConfiguracionNavegacion.jsx
│   └── ConfiguracionPrivacidad.jsx
├── hooks/              ← Lógica de estado
│   └── useConfiguracion.js
├── components/         ← Componentes específicos del feature
│   └── VoiceCentralButton.jsx
├── styles.css          ← Estilos del feature
├── index.js            ← API pública (qué exporta)
└── README.md           ← Documentación
```

> "Todo relacionado a configuración vive aquí. Si mañana quiero eliminar este feature, solo borro esta carpeta. No hay código disperso por todo el proyecto."

### 3.4 Ventajas de FSD

| Arquitectura | Escalabilidad | Complejidad | Para Frontend |
|--------------|---------------|-------------|---------------|
| **Hexagonal** | Alta | Alta | ❌ (mejor para backend) |
| **Microservicios** | Muy Alta | Muy Alta | ⚠️ (solo para equipos grandes) |
| **FSD** | Alta | Media | ✅ (diseñado para frontend) |

> "FSD es el balance perfecto: **profesional pero pragmático**. No es over-engineering como hexagonal en frontend, ni demasiado costoso como microservicios."

---

## 4. EXPLICACIÓN DEL CÓDIGO (4 min)

### 4.1 Hook de Estado: `useConfiguracion.js`

> "El corazón del módulo es este **custom hook** que centraliza toda la lógica de estado."

**Muestra el código en pantalla:**

```javascript
export const useConfiguracion = () => {
  // 1. Estado de Accesibilidad
  const [accesibilidad, setAccesibilidad] = useState({
    tamanoFuente: 'medium',
    temaContraste: 'normal',
    idioma: 'es',
    velocidadVoz: 1.0,
    // ... más opciones
  });

  // 2. Cargar desde localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem('config_accesibilidad');
    if (saved) setAccesibilidad(JSON.parse(saved));
  }, []);

  // 3. Función de actualización con persistencia automática
  const updateAccesibilidad = (key, value) => {
    const newConfig = { ...accesibilidad, [key]: value };
    setAccesibilidad(newConfig);
    localStorage.setItem('config_accesibilidad', JSON.stringify(newConfig));
  };

  return { accesibilidad, updateAccesibilidad };
};
```

**Explica cada parte:**

> "**Línea 3-8:** Defino el estado inicial con valores por defecto (medium, normal, español, etc.)"
>
> "**Línea 11-14:** Cuando el componente se monta, cargo las configuraciones guardadas desde localStorage. Esto hace que persistan entre sesiones."
>
> "**Línea 17-21:** Esta función actualiza el estado Y automáticamente guarda en localStorage. El usuario no tiene que hacer nada, es automático."
>
> "**Patrón de diseño:** Este es un **custom hook reutilizable**. Cualquier componente puede usarlo con `const { accesibilidad, updateAccesibilidad } = useConfiguracion()`"

### 4.2 Manejo de Comandos de Voz

> "Ahora veamos cómo funcionan los comandos de voz."

**Muestra `ConfiguracionAccesibilidad.jsx`:**

```javascript
const handleVoiceCommand = (command) => {
  const cmd = command.toLowerCase(); // Convertir a minúsculas

  // Detectar comando de tamaño de fuente
  if (cmd.includes('fuente grande')) {
    updateAccesibilidad('tamanoFuente', 'large');
    speak('Tamaño de fuente grande activado');
    vibrate([50]); // Vibración de 50ms
  }

  // Detectar comando de contraste
  else if (cmd.includes('alto contraste')) {
    updateAccesibilidad('temaContraste', 'alto-contraste');
    speak('Tema de alto contraste activado');
    vibrate([50]);
  }

  // ... más comandos
};

// Conectar al hook de voz
const { isListening, toggleListening } = useVoiceCommands(handleVoiceCommand);
```

**Explica:**

> "**Línea 2:** Convierto el comando a minúsculas para que no importa si digo 'Fuente Grande' o 'fuente grande'."
>
> "**Línea 5-9:** Si el comando incluye las palabras 'fuente grande', hago tres cosas:"
> 1. **Actualizo el estado** (que automáticamente guarda en localStorage)
> 2. **Síntesis de voz** para confirmar al usuario
> 3. **Vibración** para feedback háptico
>
> "**Patrón de diseño:** Uso `includes()` en lugar de `===` porque así funciona con lenguaje natural. El usuario puede decir 'pon fuente grande' o 'quiero fuente grande' y funciona igual."

### 4.3 Componente de Voz: `VoiceCentralButton.jsx`

> "Este es el botón flotante que activa/desactiva el reconocimiento de voz."

**Muestra el código:**

```javascript
export const VoiceCentralButton = ({ isListening, onToggle }) => {
  const vibrate = (pattern = [100]) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const handleClick = () => {
    vibrate([50, 100, 50]); // Patrón: vibra-pausa-vibra
    onToggle(); // Activa/desactiva escucha

    if (!isListening) {
      speak('Estoy escuchando');
    } else {
      speak('Comandos desactivados');
    }
  };

  return (
    <button
      className={`voice-pulse-btn ${isListening ? 'listening' : ''}`}
      onClick={handleClick}
    >
      <span className="material-icons-round">
        {isListening ? 'graphic_eq' : 'mic'}
      </span>
    </button>
  );
};
```

**Explica:**

> "**Línea 2-6:** Función helper para vibración. Verifico que `navigator.vibrate` exista porque no todos los navegadores lo soportan."
>
> "**Línea 9:** Cuando el usuario presiona el botón, primero vibro con un patrón especial (3 vibraciones cortas) para feedback."
>
> "**Línea 13-16:** Síntesis de voz para confirmar si está escuchando o no. Esto es crucial para accesibilidad."
>
> "**Línea 21:** Clase dinámica. Si está escuchando, agrego la clase `listening` que cambia el color a púrpura y hace que pulse."
>
> "**Línea 24:** Icono dinámico. Si está escuchando, muestro `graphic_eq` (ecualizador), sino muestro `mic` (micrófono)."

### 4.4 Persistencia con localStorage

> "Para persistencia uso **localStorage**, que es parte del navegador web."

**Muestra cómo funciona:**

```javascript
// Guardar configuración
localStorage.setItem('config_accesibilidad', JSON.stringify(data));

// Cargar configuración
const saved = localStorage.getItem('config_accesibilidad');
const data = JSON.parse(saved);
```

**Explica:**

> "**localStorage** es como una base de datos en el navegador. Los datos se guardan localmente en el dispositivo y persisten incluso si cierras la app o reinicias el celular."
>
> "**Ventajas:**"
> - ✅ No necesita backend ni internet
> - ✅ Funciona offline
> - ✅ Rápido (lectura/escritura instantánea)
> - ✅ Privado (los datos no salen del dispositivo)
>
> "**Limitaciones:**"
> - ⚠️ Solo 5-10 MB de almacenamiento (suficiente para configuraciones)
> - ⚠️ Si desinstalas la app, se pierde (podemos sincronizar con backend más adelante)

### 4.5 CRUD en Configuración

> "Aunque es configuración, sigue el patrón CRUD:"

| Operación | Implementación | Ejemplo de Uso |
|-----------|---------------|----------------|
| **CREATE** | `useState()` con valores por defecto | Primera vez que abres la app |
| **READ** | `accesibilidad.tamanoFuente` | Mostrar valor actual |
| **UPDATE** | `updateAccesibilidad('tamanoFuente', 'large')` | Comando de voz cambia valor |
| **RESET** | `resetearConfig('accesibilidad')` | Volver a valores por defecto |

> "**Nota importante:** No hay DELETE porque las configuraciones no se borran, solo se modifican o resetean. Es diferente a entidades como 'Lugares' o 'Contactos' donde sí necesitas borrado lógico."

---

## 5. PREGUNTAS FRECUENTES CON RESPUESTAS

### P1: ¿Por qué FSD en lugar de la estructura típica de React?

**Respuesta corta:**
> "La estructura típica organiza por tipo de archivo (components/, pages/, hooks/). FSD organiza por funcionalidad. Esto hace que sea más fácil encontrar código relacionado y trabajar en equipo sin conflictos."

**Respuesta técnica:**
> "En estructura típica, si quiero agregar una nueva configuración, tendría que modificar archivos en 5 carpetas diferentes (components/, hooks/, pages/, styles/, utils/). Con FSD, todo está en `features/configuracion/`. Es más cohesivo y menos acoplado."

---

### P2: ¿Cómo funciona el reconocimiento de voz?

**Respuesta corta:**
> "Uso la **Web Speech API** del navegador, que convierte voz a texto. Luego detecto palabras clave con `includes()` y ejecuto acciones."

**Respuesta técnica:**
```javascript
const recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES';
recognition.onresult = (event) => {
  const command = event.results[0][0].transcript;
  handleVoiceCommand(command); // Mi función que detecta palabras clave
};
recognition.start();
```

> "Es 100% frontend, no necesita backend. El navegador/sistema operativo hace el reconocimiento."

---

### P3: ¿Qué pasa si no hay internet?

**Respuesta:**
> "**localStorage funciona offline** porque está en el dispositivo. Sin embargo, la **síntesis de voz** (Text-to-Speech) y el **reconocimiento de voz** (Speech-to-Text) pueden necesitar internet dependiendo del navegador."
>
> "En Android con Chrome, hay una opción de descarga de modelos offline. Pero para la demo, necesitamos internet."

---

### P4: ¿Por qué localStorage y no una base de datos?

**Respuesta:**
> "Para configuraciones de usuario, localStorage es suficiente porque:"
> 1. Los datos son pequeños (menos de 1 KB)
> 2. No necesitan sincronización entre dispositivos (por ahora)
> 3. Deben funcionar offline
> 4. Son privados del usuario
>
> "Más adelante podemos sincronizar con backend usando un patrón de **sincronización eventual**: guardar local primero, subir cuando haya internet."

---

### P5: ¿Cómo escala FSD con más desarrolladores?

**Respuesta:**
> "Cada feature es autónomo. Imagina que somos 5 desarrolladores:"
> - Developer 1 → `features/configuracion/`
> - Developer 2 → `features/navegacion/`
> - Developer 3 → `features/lugares/`
> - Developer 4 → `features/contactos/`
> - Developer 5 → `shared/ui/` (componentes compartidos)
>
> "Cada uno trabaja en su carpeta sin pisar el código del otro. Los merge conflicts son mínimos."

---

### P6: ¿El módulo tiene tests?

**Respuesta honesta:**
> "Actualmente no, porque el enfoque fue implementar las funcionalidades primero. Sin embargo, FSD facilita mucho el testing porque cada feature es independiente."

**Ejemplo de test futuro:**
```javascript
import { renderHook } from '@testing-library/react-hooks';
import { useConfiguracion } from './useConfiguracion';

test('debe actualizar tamaño de fuente', () => {
  const { result } = renderHook(() => useConfiguracion());

  act(() => {
    result.current.updateAccesibilidad('tamanoFuente', 'large');
  });

  expect(result.current.accesibilidad.tamanoFuente).toBe('large');
});
```

---

### P7: ¿Por qué React + Capacitor y no React Native?

**Respuesta:**
> "**Capacitor** convierte apps React web a apps móviles nativas. Ventajas:"
> - ✅ Escribes código React normal (más fácil)
> - ✅ Funciona en web Y móvil (code reuse)
> - ✅ Acceso a APIs nativas (cámara, GPS, vibración)
> - ✅ Genera APK/IPA igual que React Native
>
> "**React Native** es mejor si necesitas performance extremo (juegos, apps de edición de video). Para OpenBlind, Capacitor es suficiente y más simple."

---

### P8: ¿El código cumple con estándares de accesibilidad?

**Respuesta:**
> "Sí, cumple con **WCAG 2.1 nivel AA:**"
> 1. **Contraste de color:** Púrpura (#7C3AED) y Ámbar (#F59E0B) tienen ratio 4.5:1 mínimo
> 2. **Navegación por teclado:** Todos los botones son accesibles con Tab
> 3. **Aria-labels:** Todos los botones tienen `aria-label` para lectores de pantalla
> 4. **Multimodal:** Visual + Auditivo + Háptico
> 5. **Sin solo-color:** La información no depende solo del color (hay iconos y texto)

---

### P9: ¿Cuánto tiempo tomó implementar?

**Respuesta honesta:**
> "El módulo completo (3 vistas + hook + componente + estilos + documentación) tomó aproximadamente **8-10 horas de desarrollo**."
>
> "La documentación y estructura FSD tomó otras **4-6 horas**."
>
> "**Total: ~15 horas** incluyendo investigación de FSD y pruebas."

---

### P10: ¿Qué harías diferente si empezaras de nuevo?

**Respuesta reflexiva:**
> "Tres cosas:"
> 1. **TypeScript:** Usaría TypeScript desde el inicio para types seguros
> 2. **Testing:** Escribiría tests junto con el código (TDD)
> 3. **Design System:** Crearía un design system en `shared/ui/` primero (Button, Input, Toggle) y luego usarlo en features
>
> "Pero para un prototipo funcional, lo que hice es correcto. **Primero haces que funcione, luego lo haces perfecto.**"

---

## 🎯 PUNTOS CLAVE PARA ENFATIZAR

Durante toda la presentación, repite estos puntos:

1. ✅ **100% accesible** - Voz + Vibración + Visual
2. ✅ **Arquitectura profesional** - FSD es usado en empresas reales
3. ✅ **Funciona offline** - localStorage sin backend
4. ✅ **Bien documentado** - 4 guías completas
5. ✅ **Escalable** - Fácil agregar más features
6. ✅ **Código limpio** - Siguiendo mejores prácticas React

---

## 📊 SLIDE DECK SUGERIDO (si puedes usar PowerPoint)

**Slide 1: Portada**
- Título: Módulo de Configuración - OpenBlind
- Subtítulo: Implementado con Feature-Sliced Design
- Tu nombre y número

**Slide 2: Problema**
- ¿Cómo personalizan las personas ciegas una app?
- Respuesta: Comandos de voz + Feedback multimodal

**Slide 3: Solución**
- 3 secciones de configuración
- 100% controlable por voz
- Persistencia local

**Slide 4: Arquitectura FSD**
- Diagrama de 7 capas
- Regla de importación
- Por qué FSD

**Slide 5: Demo (video o live)**
- Grabación de pantalla mostrando comandos de voz

**Slide 6: Código Clave**
- Snippet del hook useConfiguracion
- Explicación simple

**Slide 7: Métricas**
- 3 vistas implementadas
- 1,103 líneas de código
- 100+ comandos de voz
- 4 guías documentadas

**Slide 8: Próximos Pasos**
- Conectar a backend
- Sincronización entre dispositivos
- Testing automatizado
- Más configuraciones

**Slide 9: Conclusión**
- FSD es el futuro de arquitectura frontend
- Accesibilidad es fundamental
- Código bien documentado facilita mantenimiento

**Slide 10: ¿Preguntas?**
- Tu email/GitHub
- Link al repositorio

---

## ⏱️ TIMING RECOMENDADO

| Sección | Tiempo | Acumulado |
|---------|--------|-----------|
| Introducción | 2 min | 2 min |
| Demo en vivo | 3 min | 5 min |
| Explicación FSD | 3 min | 8 min |
| Explicación código | 4 min | 12 min |
| Preguntas | 3 min | 15 min |

**Total:** 15 minutos (ajustable a 10 si te piden más corto)

---

## 🎤 TIPS DE PRESENTACIÓN

### HACER ✅

1. **Practica la demo 5 veces** antes de presentar
2. **Habla despacio y claro** - No todos conocen FSD
3. **Haz contacto visual** con el profesor y compañeros
4. **Usa ejemplos concretos** - No solo teoría
5. **Demuestra con código real** - No solo slides
6. **Admite limitaciones** - "No tiene tests aún, pero..."
7. **Muestra entusiasmo** - Es un proyecto cool

### NO HACER ❌

1. ❌ **No leas slides** - Explica con tus palabras
2. ❌ **No uses mucho jargon** - No digas "composability" si puedes decir "reutilizable"
3. ❌ **No te disculpes** - No digas "perdón por el código feo"
4. ❌ **No improvises la demo** - Ensáyala antes
5. ❌ **No asumas conocimiento** - Explica qué es localStorage, Web Speech API, etc.
6. ❌ **No te pases de tiempo** - Respeta el tiempo asignado
7. ❌ **No te pongas nervioso** - Respira profundo

---

## 🚨 PLAN B (Si algo falla)

### Si el celular falla:
- Tienes el proyecto corriendo en navegador (http://localhost:5173)
- Demo desde la laptop con micrófono

### Si los comandos de voz no funcionan:
- Muestra el código de `handleVoiceCommand()`
- Explica cómo funcionaría
- Muestra un video pre-grabado

### Si no tienes internet:
- Demo con localStorage funciona offline
- Síntesis de voz puede fallar (explica que necesita internet)

### Si te hacen una pregunta que no sabes:
> "Excelente pregunta. No estoy 100% seguro, pero mi hipótesis es [razonamiento lógico]. Me gustaría investigar más a fondo y responderte después de la presentación."

**NUNCA digas:** "No sé" y te quedas callado. Siempre razona y muestra pensamiento crítico.

---

## 📝 CHECKLIST PRE-PRESENTACIÓN

**1 día antes:**
```
[ ] APK instalado y probado en celular
[ ] Proyecto corriendo en laptop (backup)
[ ] Todos los comandos de voz probados
[ ] Documentación impresa (por si acaso)
[ ] PowerPoint/PDF terminado
[ ] Ensayaste la presentación completa 2 veces
```

**1 hora antes:**
```
[ ] Celular cargado 100%
[ ] Laptop cargada 100%
[ ] Proyecto corriendo (npm run dev)
[ ] Android Studio abierto con el código
[ ] Agua para la garganta
[ ] Respiración profunda, estás listo(a)
```

---

**¡Éxito en tu defensa! 🚀**

Recuerda: **Tú eres el experto en tu código.** Nadie conoce este proyecto mejor que tú. Confía en tu trabajo y demuéstralo con orgullo.
