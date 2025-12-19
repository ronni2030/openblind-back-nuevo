# 📐 Estructura Hexagonal - Frontend OpenBlind

## ¿Qué es la Arquitectura Hexagonal?

También llamada "Ports and Adapters", separa el código en capas independientes:

```
┌──────────────────────────────────────────┐
│         CAPA DE DOMINIO (Core)           │
│  - Entidades (LugarFavorito, Contacto)   │
│  - Interfaces/Ports (Contratos)          │
│  - Casos de Uso (Lógica de negocio)      │
└──────────────────┬───────────────────────┘
                   │
    ┌──────────────┴──────────────┐
    │                             │
┌───▼────────────┐    ┌───────────▼────────┐
│ INFRAESTRUCTURA│    │    PRESENTACIÓN     │
│   (Adapters)   │    │       (UI)          │
│                │    │                     │
│ - API HTTP     │    │ - Componentes React │
│ - Web Speech   │    │ - Páginas/Vistas    │
│ - Repositorios │    │ - Estilos           │
└────────────────┘    └─────────────────────┘
         │                      │
         └──────────┬───────────┘
                    │
          ┌─────────▼──────────┐
          │    APLICACIÓN      │
          │  (Coordinación)    │
          │                    │
          │ - Custom Hooks     │
          │ - Servicios        │
          └────────────────────┘
```

## 📁 Estructura de Carpetas

```
src/
├── domain/                    # 🧠 NÚCLEO (Reglas de negocio)
│   ├── entities/              # Objetos de negocio
│   │   ├── LugarFavorito.js
│   │   └── ContactoEmergencia.js
│   ├── interfaces/            # Contratos (Ports)
│   │   ├── ILugarRepository.js
│   │   ├── IContactoRepository.js
│   │   └── ISpeechService.js
│   └── useCases/              # Lógica de negocio
│       ├── lugares/
│       │   ├── CrearLugarUseCase.js
│       │   ├── ListarLugaresUseCase.js
│       │   ├── ActualizarLugarUseCase.js
│       │   ├── EliminarLugarUseCase.js
│       │   └── NavegarALugarUseCase.js
│       └── contactos/
│           ├── CrearContactoUseCase.js
│           ├── ListarContactosUseCase.js
│           ├── ActualizarContactoUseCase.js
│           ├── EliminarContactoUseCase.js
│           └── LlamarContactoUseCase.js
│
├── infrastructure/            # 🔌 ADAPTADORES EXTERNOS
│   ├── api/                   # Implementación HTTP
│   │   ├── ApiClient.js
│   │   ├── LugarRepository.js      # Implementa ILugarRepository
│   │   └── ContactoRepository.js   # Implementa IContactoRepository
│   └── speech/                # Implementación Web Speech API
│       ├── WebSpeechService.js     # Implementa ISpeechService
│       └── CommandParser.js        # Parser NLP
│
├── application/               # 🎯 COORDINACIÓN
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useSpeech.js
│   │   ├── useLugares.js
│   │   └── useContactos.js
│   └── services/              # Servicios de aplicación
│       └── VoiceCommandService.js
│
├── presentation/              # 🎨 INTERFAZ DE USUARIO
│   ├── components/            # Componentes reutilizables
│   │   ├── StarBackground.jsx
│   │   ├── Header.jsx
│   │   ├── AnimatedButton.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── VoiceButton.jsx
│   ├── pages/                 # Vistas/Páginas
│   │   └── Dashboard.jsx
│   └── styles/                # Estilos CSS
│       └── index.css
│
├── config.js                  # ⚙️ Configuración de Dependencias
├── AppHexagonal.jsx           # 🚀 Componente Principal
└── main.jsx                   # Punto de entrada
```

## 🔄 Flujo de Datos

### Ejemplo: Usuario crea un lugar favorito

1. **Usuario**: Dice "agrega mi casa en Av. Amazonas 123"
2. **Presentación** (VoiceButton): Captura el audio
3. **Aplicación** (useSpeech): Procesa con Web Speech API
4. **Aplicación** (VoiceCommandService): Parsea el comando
5. **Dominio** (CrearLugarUseCase): Valida y crea la entidad
6. **Infraestructura** (LugarRepository): Envía POST al backend
7. **Dominio**: Retorna LugarFavorito creado
8. **Aplicación** (useLugares): Actualiza el estado
9. **Presentación**: Re-renderiza la lista

## ✅ Ventajas de esta Arquitectura

### 1. **Independencia de Frameworks**
El dominio NO depende de React, Fetch, ni Web Speech API.

### 2. **Testeable**
Puedes testear la lógica de negocio sin UI ni API real:
```javascript
const mockRepo = new MockLugarRepository();
const useCase = new CrearLugarUseCase(mockRepo);
const lugar = await useCase.execute({ nombreLugar: 'Casa', direccion: 'Av. Test' });
```

### 3. **Intercambiable**
Puedes cambiar:
- React por Vue/Angular (solo cambias `presentation/`)
- Fetch por Axios (solo cambias `infrastructure/api/`)
- Web Speech por otra API de voz (solo cambias `infrastructure/speech/`)

### 4. **Mantenible**
Cada capa tiene una responsabilidad clara:
- **Domain**: ¿QUÉ hace la app?
- **Infrastructure**: ¿CÓMO se conecta al mundo exterior?
- **Application**: ¿CÓMO coordina las operaciones?
- **Presentation**: ¿CÓMO se ve?

## 🎯 Comparación: Antes vs Después

### ❌ ANTES (App.jsx monolítico):
```javascript
// TODO mezclado en un archivo de 800 líneas
const App = () => {
  const [lugares, setLugares] = useState([]);

  const fetchLugares = async () => {
    const res = await fetch('http://localhost:8888/lugares-favoritos/cliente/1');
    const data = await res.json();
    setLugares(data);
  };

  const extraerContacto = (comando) => {
    // Lógica de NLP mezclada con UI
  };

  // 700 líneas más...
};
```

### ✅ DESPUÉS (Estructura Hexagonal):
```javascript
// App.jsx limpio y enfocado
const App = () => {
  const lugares = useLugares(lugarUseCases, ID_CLIENTE);
  const { speak, startListening } = useSpeech(speechService);

  return <Dashboard />;
};
```

## 📚 Archivos Clave

### `config.js` - Inyección de Dependencias
Instancia TODAS las dependencias en un solo lugar:
```javascript
export const lugarRepository = new LugarRepository(apiClient);
export const lugarUseCases = {
  crear: new CrearLugarUseCase(lugarRepository),
  listar: new ListarLugaresUseCase(lugarRepository),
  // ...
};
```

### `domain/entities/LugarFavorito.js` - Entidad
```javascript
export class LugarFavorito {
  validate(data) { /* reglas de negocio */ }
  hasCoordinates() { /* lógica de dominio */ }
  getGoogleMapsURL() { /* comportamiento */ }
}
```

### `domain/useCases/lugares/CrearLugarUseCase.js` - Caso de Uso
```javascript
export class CrearLugarUseCase {
  async execute(data) {
    LugarFavorito.validate(data);  // 1. Validar
    const lugar = new LugarFavorito(data);  // 2. Crear
    return await this.repository.create(lugar);  // 3. Persistir
  }
}
```

### `infrastructure/api/LugarRepository.js` - Adapter
```javascript
export class LugarRepository extends ILugarRepository {
  async create(lugar) {
    return await this.apiClient.post('/lugares-favoritos/crear', lugar.toAPI());
  }
}
```

### `application/hooks/useLugares.js` - Hook Personalizado
```javascript
export const useLugares = (useCases, idCliente) => {
  const [lugares, setLugares] = useState([]);

  const createLugar = async (data) => {
    const nuevo = await useCases.crear.execute(data);
    setLugares(prev => [nuevo, ...prev]);
  };

  return { lugares, createLugar };
};
```

## 🚀 Cómo Usar

### Desarrollo:
```bash
npm run dev
```

### Agregar un nuevo caso de uso:
1. Crea el archivo en `domain/useCases/`
2. Agrégalo a `config.js`
3. Úsalo en un hook de `application/hooks/`
4. Renderiza en `presentation/pages/`

## 🔐 Principios SOLID Aplicados

- **S**: Cada clase tiene UNA responsabilidad
- **O**: Abierto a extensión, cerrado a modificación (Interfaces)
- **L**: Los adapters implementan interfaces (Liskov)
- **I**: Interfaces pequeñas y específicas
- **D**: Dependencia de abstracciones (IRepository, no fetch directo)

---

**Autor**: Claude Code
**Fecha**: 2025-12-19
**Versión**: 1.0.0
