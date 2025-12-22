# 🎯 GUÍA DE PRESENTACIÓN - OPENBLIND
## Para presentar mañana 8am ⏰

---

## 📱 INTRODUCCIÓN (1 minuto)

**¿Qué es OpenBlind?**
> "OpenBlind es una aplicación móvil de accesibilidad diseñada para personas con discapacidad visual. Permite gestionar lugares favoritos y contactos de emergencia mediante comandos de voz automáticos y controles táctiles."

**Funcionalidades principales:**
- ✅ Comandos de voz que se activan automáticamente
- ✅ CRUD completo de Lugares Favoritos
- ✅ CRUD completo de Contactos de Emergencia
- ✅ Navegación GPS a lugares guardados
- ✅ Llamadas rápidas a contactos

---

## 🛠️ TECNOLOGÍAS UTILIZADAS (2 minutos)

### Frontend
```
React 19        → Interfaz reactiva
Vite 7          → Build ultrarrápido
Capacitor 8     → APK Android nativo
Framer Motion   → Animaciones fluidas
Web Speech API  → Voz y reconocimiento
```

### Backend
```
Node.js + Express → API REST
MySQL 8           → Base de datos
Sequelize         → ORM (aunque usamos raw SQL)
```

### ¿Por qué React?
1. **Componentes reutilizables** - Modal, Header, ListItem
2. **Virtual DOM** - Solo actualiza lo que cambia
3. **Hooks personalizados** - useVoiceCommands reutilizable
4. **Ecosistema rico** - Capacitor, Framer Motion, etc.

---

## 🏗️ ARQUITECTURA DEL PROYECTO (3 minutos)

### Arquitectura Hexagonal

```
┌─────────────────────────────────────────────┐
│           FRONTEND (React)                  │
├─────────────────────────────────────────────┤
│ presentation/   → Componentes UI            │
│ application/    → Hooks (Lógica)            │
│ infrastructure/ → API fetch                 │
└─────────────────────────────────────────────┘
                    ↕ HTTP
┌─────────────────────────────────────────────┐
│           BACKEND (Express)                 │
├─────────────────────────────────────────────┤
│ domain/         → Modelos de negocio        │
│ infrastructure/ → Controllers, Routes, DB   │
│ config/         → Configuración             │
└─────────────────────────────────────────────┘
                    ↕ SQL
┌─────────────────────────────────────────────┐
│           BASE DE DATOS (MySQL)             │
├─────────────────────────────────────────────┤
│ clientes                                    │
│ lugares_favoritos                           │
│ contactos_emergencia                        │
└─────────────────────────────────────────────┘
```

**¿Por qué Arquitectura Hexagonal?**
- ✅ Separa lógica de negocio de infraestructura
- ✅ Fácil de testear
- ✅ Intercambiable (puedes cambiar MySQL por MongoDB)
- ✅ Mantenible a largo plazo

---

## 🔄 FLUJO COMPLETO DE UN CRUD (4 minutos)

### Ejemplo: Crear un Lugar Favorito

**1. Usuario en la App (Frontend)**
```jsx
// Usuario dice: "Agrega la ubicación donde estoy, nombre casa"
// O hace clic en el botón "Nuevo"

// App.jsx hace fetch:
const response = await fetch('http://192.168.18.54:8888/lugares-favoritos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Casa',
    direccion: 'Av. Amazonas 123',
    icono: 'home'
  })
});
```

**2. Ruta en el Backend**
```javascript
// lugarFavorito.router.js
router.post('/', createLugar);  // Línea 22
```

**3. Controlador procesa la petición**
```javascript
// lugarFavorito.controller.js:191-224
lugarFavoritoCtl.createLugar = async (req, res) => {
  const { nombre, direccion, icono } = req.body;
  const ID_CLIENTE = 1;

  // 1. Asegurar que el cliente existe
  await asegurarClienteExiste(ID_CLIENTE);

  // 2. Insertar en BD
  const [result] = await sql.promise().query(
    `INSERT INTO lugares_favoritos
     (idCliente, nombreLugar, direccion, icono, ...)
     VALUES (?, ?, ?, ?, ...)`,
    [ID_CLIENTE, nombre, direccion, icono]
  );

  // 3. Responder con formato estándar
  return res.apiResponse(nuevoLugar, 201, 'Lugar favorito creado');
};
```

**4. Base de Datos guarda**
```sql
INSERT INTO lugares_favoritos
VALUES (1, 'Casa', 'Av. Amazonas 123', 'home', -0.283055, -78.484526, NOW(), NOW());
```

**5. Respuesta al Frontend**
```json
{
  "success": true,
  "message": "Lugar favorito creado",
  "data": {
    "id_lugar": 17,
    "nombre": "Casa",
    "direccion": "Av. Amazonas 123",
    "icono": "home"
  }
}
```

**6. Frontend actualiza la UI**
```jsx
setLugares([...lugares, newLugar]);
speak('Lugar creado');  // Retroalimentación auditiva
```

---

## 🎤 COMANDOS DE VOZ (2 minutos)

### ¿Cómo funciona?

**Hook personalizado: useVoiceCommands**
```javascript
// frontend-openblind/src/hooks/useVoiceCommands.js

const useVoiceCommands = (onCommand, autoStart = true) => {
  // 1. Configuración de Web Speech API
  recognition.continuous = true;   // Escucha continua
  recognition.lang = 'es-ES';      // Español

  // 2. Auto-inicio al cargar la app
  if (autoStart) {
    setTimeout(() => {
      recognition.start();
      speak('Bienvenido a OpenBlind. Los comandos de voz están activos.');
    }, 1000);
  }

  // 3. Procesar comandos
  recognition.onresult = (event) => {
    const command = event.results[last][0].transcript.toLowerCase();
    processCommand(command);  // "abre lugares" → onCommand('lugares')
  };
};
```

**Comandos disponibles:**
- "Abre lugares favoritos"
- "Agrega la ubicación donde estoy, nombre casa"
- "Guárdala"
- "Abre contactos"
- "Volver"

---

## 💾 BASE DE DATOS (2 minutos)

### Esquema

```sql
CREATE TABLE clientes (
  idClientes INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE lugares_favoritos (
  idLugarFavorito INT AUTO_INCREMENT PRIMARY KEY,
  idCliente INT NOT NULL,
  nombreLugar VARCHAR(100) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  latitud DECIMAL(10, 8),
  longitud DECIMAL(11, 8),
  icono VARCHAR(50) DEFAULT 'place',
  createLugarFavorito TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idCliente) REFERENCES clientes(idClientes)
);

CREATE TABLE contactos_emergencia (
  idContactoEmergencia INT AUTO_INCREMENT PRIMARY KEY,
  idCliente INT NOT NULL,
  nombreContacto VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  relacion VARCHAR(50),
  prioridad INT DEFAULT 1,
  FOREIGN KEY (idCliente) REFERENCES clientes(idClientes)
);
```

### Conexión

```javascript
// src/infrastructure/database/connection/dataBase.sql.js
const pool = mysql.createPool({
  host: 'localhost',
  user: 'linkear',
  password: '0987021692@Rj',
  database: 'openblind',
  port: 3306
});
```

### Auto-creación de Clientes

```javascript
// src/infrastructure/http/controllers/lugarFavorito.controller.js:5-25
async function asegurarClienteExiste(idCliente) {
  const [cliente] = await sql.promise().query(
    'SELECT idClientes FROM clientes WHERE idClientes = ?',
    [idCliente]
  );

  if (cliente.length === 0) {
    await sql.promise().query(
      'INSERT INTO clientes (idClientes) VALUES (?)',
      [idCliente]
    );
  }
}
```

---

## 📱 APK ANDROID (1 minuto)

### Proceso de Generación

```bash
# 1. Compilar frontend
cd frontend-openblind
npm run build

# 2. Sincronizar con Capacitor
npx cap sync android

# 3. Compilar APK
cd android
./gradlew assembleDebug

# 4. APK en:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### Configuración Clave

**AndroidManifest.xml:**
```xml
<application android:usesCleartextTraffic="true">
  <!-- Permite HTTP (no HTTPS) para backend local -->
</application>

<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.CALL_PHONE" />
```

**capacitor.config.ts:**
```typescript
server: {
  androidScheme: 'http',
  cleartext: true
}
```

---

## 🎯 PUNTOS CLAVE PARA LA PRESENTACIÓN

### 1. **Innovación**
- Voz automática sin necesidad de botones
- Accesibilidad real para personas con discapacidad visual

### 2. **Arquitectura Sólida**
- Hexagonal (separación de responsabilidades)
- Código mantenible y escalable

### 3. **CRUD Completo**
- CREATE, READ, UPDATE, DELETE implementados
- Frontend y Backend integrados

### 4. **Tecnologías Modernas**
- React 19 (última versión)
- Vite (build tool del futuro)
- Capacitor (APK nativo)

### 5. **Base de Datos Relacional**
- MySQL con relaciones (Foreign Keys)
- Auto-creación de clientes
- Integridad referencial

---

## ⏱️ TIMELINE DE PRESENTACIÓN (10 minutos total)

| Minuto | Tema |
|--------|------|
| 0-1 | Introducción y demo rápida |
| 1-3 | Tecnologías utilizadas |
| 3-6 | Arquitectura Hexagonal |
| 6-8 | Flujo completo de un CRUD |
| 8-9 | Comandos de voz |
| 9-10 | Base de datos y APK |

---

## 💡 TIPS PARA PRESENTAR

1. **Empieza con la DEMO** - Muestra la app funcionando primero
2. **Habla del problema** - Accesibilidad para personas con discapacidad visual
3. **Explica la solución** - Voz automática + CRUDs
4. **Muestra el código** - Arquitectura Hexagonal
5. **Destaca lo técnico** - React, Node.js, MySQL
6. **Termina con el valor** - Impacto social

---

## 🚀 FRASE DE CIERRE

> "OpenBlind no es solo una app, es una herramienta de independencia para personas con discapacidad visual. Permite que puedan guardar sus lugares importantes, llamar a sus contactos de emergencia y navegar sin necesidad de tocar la pantalla, solo con su voz."

---

**¡ÉXITO EN TU PRESENTACIÓN! 🎉**
