# 📱 GUÍA COMPLETA: Presentación Master Class (Lunes)

## ✅ CONFIGURACIÓN COMPLETADA

Tu aplicación OpenBlind ya está configurada para conectarse al backend MySQL desde el celular.

**IP configurada:** `192.168.18.54` (tu PC en WiFi)
**Puerto backend:** `8888`
**Base de datos:** MySQL (openblind)

---

## 🚀 PASOS PARA LA PRESENTACIÓN

### **PASO 1: Preparar el Backend (EN TU PC)**

#### 1.1 Verificar que MySQL está corriendo
```bash
# Abrir XAMPP Control Panel
# Verificar que MySQL esté en estado "Running" (verde)
# Si no está corriendo, hacer clic en "Start"
```

#### 1.2 Verificar que existe la base de datos
```bash
# Abrir phpMyAdmin: http://localhost/phpmyadmin
# Verificar que existe la base de datos "openblind"
# Verificar que existe la tabla "configuracion"
```

#### 1.3 Iniciar el servidor backend
```bash
# Abrir terminal/PowerShell en la carpeta del proyecto
cd /home/user/estructura-hexagonal

# Instalar dependencias (si aún no lo hiciste)
npm install

# Iniciar el servidor
npm start

# Deberías ver:
# ✅ Servidor corriendo en http://localhost:8888
# ✅ Base de datos MySQL conectada correctamente
```

**⚠️ IMPORTANTE:** Deja esta terminal abierta durante toda la presentación. El servidor debe estar corriendo.

---

### **PASO 2: Reconstruir el APK con la Nueva Configuración**

Ahora que el archivo `.env` tiene la IP correcta, debemos reconstruir el APK:

#### 2.1 Ir a la carpeta del frontend
```bash
cd frontend-openblind
```

#### 2.2 Detener el servidor de desarrollo (si está corriendo)
```bash
# Presionar Ctrl+C en la terminal donde está corriendo npm run dev
```

#### 2.3 Construir la aplicación para producción
```bash
npm run build
```

**Esto generará:** Carpeta `dist/` con todos los archivos optimizados para el APK.

#### 2.4 Sincronizar con Capacitor
```bash
npx cap sync
```

**Esto hace:** Copia los archivos del `dist/` a la carpeta `android/app/src/main/assets/public`

#### 2.5 Abrir Android Studio
```bash
npx cap open android
```

**Esto abrirá:** Android Studio con el proyecto de Android.

#### 2.6 Construir el APK en Android Studio

1. **Esperar** a que Android Studio termine de indexar el proyecto (barra de progreso en la parte inferior)
2. **Menú:** `Build > Build Bundle(s) / APK(s) > Build APK(s)`
3. **Esperar** a que termine la construcción (puede tardar 2-5 minutos)
4. **Notificación:** Aparecerá un mensaje "APK(s) generated successfully"
5. **Clic en:** `locate` para abrir la carpeta donde está el APK

**Ubicación del APK:**
```
estructura-hexagonal/frontend-openblind/android/app/build/outputs/apk/debug/app-debug.apk
```

#### 2.7 Instalar el APK en tu celular

**Opción A: Con cable USB**
```bash
# En la terminal (con el celular conectado por USB)
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

**Opción B: Transferir por correo/Drive/Bluetooth**
1. Copiar el archivo `app-debug.apk` a tu celular
2. Abrir el archivo en el celular
3. Permitir instalación de fuentes desconocidas
4. Instalar

---

### **PASO 3: Conectar el Celular a la Misma WiFi**

#### 3.1 En tu celular:
1. **Ir a:** Configuración > WiFi
2. **Conectar** a la misma red WiFi que tu PC
3. **Verificar:** Que estés conectado a la WiFi (no datos móviles)

**⚠️ CRÍTICO:** Ambos dispositivos (PC y celular) DEBEN estar en la misma red WiFi para que funcione.

#### 3.2 Verificar la conexión

**En tu celular, abrir navegador Chrome:**
```
http://192.168.18.54:8888
```

**Deberías ver:**
```json
{
  "success": true,
  "message": "API OpenBlind funcionando correctamente"
}
```

**Si ves esto:** ✅ La conexión funciona correctamente.
**Si NO ves esto:** ❌ Ver sección de troubleshooting más abajo.

---

### **PASO 4: Probar el APK con Backend Conectado**

#### 4.1 Abrir la aplicación OpenBlind en el celular

#### 4.2 Ir a "Configuración"

#### 4.3 Verificar que se conecta al backend

**Abre la consola del navegador en Chrome Remote Debugging:**

1. En tu PC, abrir Chrome
2. Ir a: `chrome://inspect/#devices`
3. Con el celular conectado por USB, debería aparecer tu app
4. Clic en "inspect"
5. En la consola deberías ver:
```
✅ Backend disponible, cargando configuración desde MySQL
✅ Configuración cargada desde MySQL
```

**Si ves estos mensajes:** ✅ Está conectado al backend MySQL.
**Si ves "Backend no disponible":** ❌ Ver troubleshooting.

#### 4.4 Probar cada operación CRUD

**CREAR (CREATE):**
- La primera vez que abres configuración, se crea automáticamente con valores por defecto
- Verifica en phpMyAdmin que existe el registro en la tabla `configuracion`

**LEER (READ):**
- Al abrir la pantalla de configuración, carga los datos desde MySQL
- Verifica que los valores mostrados coinciden con los de la base de datos

**ACTUALIZAR (UPDATE):**
- Cambia cualquier configuración (ejemplo: tamaño de fuente)
- Verifica en phpMyAdmin que el campo se actualizó
- Console log debería mostrar: `✅ Campo tamanoFuente actualizado en MySQL`

**ACTUALIZAR PARCIAL (PATCH):**
- Cada vez que cambias un valor individual, se hace PATCH
- Verifica que `ultimaActualizacion` cambia en la base de datos

**RESETEAR (RESET):**
- Usa el botón "Resetear" en cualquier sección
- Verifica que los valores vuelven a los defaults en MySQL

**ELIMINAR (SOFT DELETE):**
- Para probar esto, puedes:
  1. Abrir consola del navegador (Chrome inspect)
  2. Ejecutar:
  ```javascript
  fetch('http://192.168.18.54:8888/api/configuracion/1', { method: 'DELETE' })
    .then(r => r.json())
    .then(console.log)
  ```
  3. Verificar en MySQL que `activo` cambió a `0` (false)
  4. Verificar que `fechaEliminacion` tiene una fecha

**RESTAURAR (RESTORE):**
- Después de eliminar, ejecutar:
```javascript
fetch('http://192.168.18.54:8888/api/configuracion/1/restore', { method: 'POST' })
  .then(r => r.json())
  .then(console.log)
```
- Verificar en MySQL que `activo` volvió a `1` (true)
- Verificar que `fechaEliminacion` es `NULL`

---

## 🎓 PARA LA MASTER CLASS: Explicaciones Técnicas

### **¿Por qué NO hay Login/Registro?**

"Esta aplicación está diseñada para personas con discapacidad visual. Pedirles que creen una cuenta, recuerden una contraseña, y hagan login cada vez sería una barrera de accesibilidad innecesaria.

En su lugar, usamos un **deviceId único** generado automáticamente la primera vez que abren la app. Este UUID se guarda en localStorage y funciona como su identificador permanente. Es más accesible y más seguro para ellos."

**Archivo:** `frontend-openblind/src/features/configuracion/utils/deviceId.js`

---

### **¿Cómo funciona el sistema híbrido Backend + localStorage?**

"La aplicación implementa un patrón **offline-first** o **progressive enhancement**:

1. **Al abrir la app:** Intenta conectar con el backend MySQL
2. **Si hay conexión:** Usa el backend para todas las operaciones CRUD
3. **Si NO hay conexión:** Usa localStorage como fallback automático
4. **Ventaja:** La app funciona 100% sin internet, pero se mejora cuando hay conexión"

**Archivo:** `frontend-openblind/src/features/configuracion/hooks/useConfiguracion.js:64-126`

---

### **¿Por qué borrado lógico en lugar de borrado físico?**

"El borrado lógico es una best practice en producción porque:

1. **Cumplimiento legal:** Regulaciones como GDPR requieren poder recuperar datos
2. **Auditoría:** Podemos rastrear quién eliminó qué y cuándo
3. **Recuperación:** Usuarios pueden arrepentirse y restaurar su configuración
4. **Integridad referencial:** No rompemos relaciones con otras tablas

En lugar de `DELETE FROM configuracion WHERE id = X`, hacemos `UPDATE configuracion SET activo = false WHERE id = X`. El registro sigue en la base de datos pero marcado como inactivo."

**Archivo:** `src/infrastructure/http/controllers/configuracion.controller.js:291-339`

---

### **¿Cómo están organizados los archivos? (Feature-Sliced Design)**

"Usamos **Feature-Sliced Design**, una arquitectura moderna de frontend con 7 capas:

```
📁 frontend-openblind/src/
├── 📁 application/        # Capa 1: Configuración global de la app
├── 📁 processes/          # Capa 2: Procesos de negocio complejos
├── 📁 pages/              # Capa 3: Páginas completas (rutas)
├── 📁 widgets/            # Capa 4: Secciones reutilizables de página
├── 📁 features/           # Capa 5: Funcionalidades completas (AQUÍ está Configuración)
│   └── 📁 configuracion/
│       ├── 📁 api/        # Comunicación con backend
│       ├── 📁 hooks/      # Lógica de estado (useConfiguracion)
│       ├── 📁 utils/      # Utilidades (deviceId)
│       └── 📁 views/      # Componentes de UI
├── 📁 entities/           # Capa 6: Entidades de negocio
└── 📁 shared/             # Capa 7: Código compartido
```

**Ventajas:**
- Escalabilidad: Fácil agregar nuevas features sin tocar las existentes
- Mantenibilidad: Cada feature es autocontenida
- Testeable: Cada capa se puede probar independientemente"

---

### **¿Cómo funcionan las tres secciones de configuración?**

**1. ACCESIBILIDAD** (`ConfiguracionAccesibilidad.jsx`)
- **Tamaño de fuente:** small/medium/large/extra-large
- **Tema de contraste:** normal/alto-contraste
- **Idioma:** español/inglés
- **Velocidad de voz:** 0.5x - 2.0x (para TTS)
- **Volumen de voz:** 0-100%
- **Feedback háptico:** vibración ON/OFF
- **Nivel de detalle:** básico/completo/experto

**2. NAVEGACIÓN** (`ConfiguracionNavegacion.jsx`)
- **Longitud máxima de ruta:** 1-50 km
- **Paradas seguras:** sugerir lugares seguros para descansar
- **Frecuencia de instrucciones:** baja/media/alta
- **Tipo de instrucción:** por distancia ("en 50 metros...") o por tiempo ("en 30 segundos...")
- **Alerta de desvío:** avisar si se salen de la ruta
- **Alerta de obstáculo:** avisar sobre obstáculos detectados

**3. PRIVACIDAD** (`ConfiguracionPrivacidad.jsx`)
- **Retención de ubicación:** cuántos días guardar historial (7/14/30/90)
- **Tracking en background:** permitir GPS cuando app está en segundo plano
- **Compartir ubicación:** permitir que contactos vean su ubicación
- **Guardar historial:** mantener registro de rutas pasadas
- **Modo anónimo:** no guardar ningún dato personal

---

## ❌ TROUBLESHOOTING: Solución de Problemas

### Problema 1: "Backend no disponible" en la consola

**Causa:** El celular no puede conectar con el backend en tu PC.

**Soluciones:**

1. **Verificar que el backend está corriendo:**
   ```bash
   # En la PC, debería mostrar:
   npm start
   # ✅ Servidor corriendo en http://localhost:8888
   ```

2. **Verificar que ambos están en la MISMA WiFi:**
   - PC: Abrir cmd > `ipconfig` > buscar "Adaptador de red inalámbrica Wi-Fi"
   - Celular: Configuración > WiFi > verificar red conectada
   - DEBEN SER LA MISMA RED

3. **Verificar que el firewall no está bloqueando:**
   ```bash
   # Windows: Panel de Control > Firewall de Windows
   # Agregar excepción para Node.js en puerto 8888
   ```

4. **Probar conexión desde el celular:**
   - Abrir Chrome en el celular
   - Ir a: `http://192.168.18.54:8888`
   - Debería mostrar: `{"success": true, "message": "API OpenBlind funcionando correctamente"}`

---

### Problema 2: La IP cambió (después de reiniciar la PC)

**Causa:** Windows asigna IPs dinámicas en WiFi, puede cambiar.

**Solución:**

1. **Obtener nueva IP:**
   ```bash
   ipconfig
   # Buscar "Adaptador de red inalámbrica Wi-Fi"
   # Copiar "Dirección IPv4"
   ```

2. **Actualizar `.env`:**
   ```bash
   # Editar: frontend-openblind/.env
   VITE_API_URL=http://[NUEVA_IP]:8888
   ```

3. **Reconstruir APK:**
   ```bash
   cd frontend-openblind
   npm run build
   npx cap sync
   npx cap open android
   # Build > Build APK
   ```

---

### Problema 3: "Error de red" o "Failed to fetch"

**Causa:** Configuración de CORS o red.

**Solución:**

1. **Verificar CORS en el backend:**
   ```javascript
   // Ya está configurado en app.js:48-53
   app.use(cors({
     origin: '*',
     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization']
   }));
   ```

2. **Verificar que no estás usando datos móviles:**
   - Desactivar datos móviles en el celular
   - Usar SOLO WiFi

---

### Problema 4: Los cambios no se reflejan en MySQL

**Causa:** Posiblemente está usando localStorage en lugar del backend.

**Solución:**

1. **Verificar en consola Chrome Inspect:**
   ```
   ✅ Backend disponible, cargando desde MySQL  <- DEBE aparecer
   ❌ Backend no disponible, usando localStorage  <- NO debe aparecer
   ```

2. **Si dice "Backend no disponible", verificar:**
   - Servidor backend está corriendo
   - WiFi conectada
   - IP correcta en `.env`
   - APK reconstruido después de cambiar `.env`

---

### Problema 5: MySQL dice "Connection refused"

**Causa:** MySQL no está corriendo o configuración incorrecta.

**Solución:**

1. **Iniciar MySQL en XAMPP:**
   ```bash
   # Abrir XAMPP Control Panel
   # Clic en "Start" en la fila de MySQL
   # Debe aparecer en verde "Running"
   ```

2. **Verificar credenciales en `.env` del backend:**
   ```bash
   # Ver archivo: /home/user/estructura-hexagonal/.env
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=    # (vacío para XAMPP)
   MYSQL_DATABASE=openblind
   ```

3. **Crear base de datos si no existe:**
   ```sql
   # Abrir phpMyAdmin: http://localhost/phpmyadmin
   # SQL > Ejecutar:
   CREATE DATABASE IF NOT EXISTS openblind;
   ```

---

## 📊 VERIFICACIÓN FINAL ANTES DE LA PRESENTACIÓN

### Checklist Pre-Presentación:

- [ ] **Backend corriendo:** Terminal muestra "Servidor corriendo en http://localhost:8888"
- [ ] **MySQL corriendo:** XAMPP muestra MySQL en verde
- [ ] **Base de datos existe:** phpMyAdmin muestra base "openblind" con tabla "configuracion"
- [ ] **APK instalado:** OpenBlind está instalado en el celular
- [ ] **WiFi conectada:** PC y celular en la misma red WiFi
- [ ] **Conexión verificada:** `http://192.168.18.54:8888` muestra respuesta JSON en el celular
- [ ] **Logs correctos:** Chrome inspect muestra "Backend disponible, cargando desde MySQL"
- [ ] **CRUD funciona:** Cambios en configuración se reflejan en phpMyAdmin

---

## 🎤 DEMO SUGERIDA PARA LA PRESENTACIÓN

### Secuencia de Demostración:

1. **Mostrar phpMyAdmin:**
   - "Aquí tenemos la base de datos MySQL con la tabla configuracion"
   - Mostrar campos: tamanoFuente, temaContraste, idioma, etc.

2. **Abrir APK en el celular:**
   - "La aplicación se conecta automáticamente al backend"
   - Mostrar Chrome inspect con logs: "Backend disponible, cargando desde MySQL"

3. **Demostrar READ:**
   - "Los valores que ven en pantalla vienen directamente de MySQL"
   - Mostrar phpMyAdmin con los mismos valores

4. **Demostrar UPDATE:**
   - Cambiar tamaño de fuente de "medium" a "large"
   - Actualizar phpMyAdmin (F5)
   - "Ven cómo el campo tamanoFuente cambió a 'large' en la base de datos"

5. **Demostrar UPDATE PARCIAL (PATCH):**
   - "Solo actualizamos el campo que cambió, no toda la fila"
   - Mostrar campo `ultimaActualizacion` que se actualiza automáticamente

6. **Demostrar RESET:**
   - "Reseteamos a valores por defecto"
   - Actualizar phpMyAdmin
   - "Todos los valores volvieron a sus defaults"

7. **Demostrar SOFT DELETE:**
   - Ejecutar DELETE desde consola Chrome
   - Actualizar phpMyAdmin
   - "El registro NO se eliminó, solo marcamos activo = false"
   - Mostrar `fechaEliminacion` con timestamp

8. **Demostrar RESTORE:**
   - Ejecutar RESTORE desde consola
   - Actualizar phpMyAdmin
   - "Recuperamos el registro, activo = true nuevamente"

9. **Explicar deviceId:**
   - Abrir localStorage en Chrome inspect
   - "Cada usuario tiene un UUID único generado automáticamente"
   - "No necesitan login/registro, más accesible para personas ciegas"

10. **Explicar arquitectura híbrida:**
    - Desconectar WiFi del celular
    - "La app sigue funcionando con localStorage"
    - Reconectar WiFi
    - "Ahora vuelve a usar MySQL automáticamente"

---

## 📝 NOTAS FINALES

### Datos Técnicos para la Defensa:

- **Frontend:** React 19 + Vite 6 + Capacitor 8
- **Backend:** Node.js + Express + Sequelize ORM
- **Base de datos:** MySQL 8.0
- **Arquitectura:** Feature-Sliced Design (7 capas)
- **Patrón:** Offline-First / Progressive Enhancement
- **Autenticación:** DeviceId UUID (sin login/registro)
- **Eliminación:** Soft Delete (borrado lógico)
- **Animaciones:** Framer Motion
- **Accesibilidad:** WCAG 2.1 AA compliant

### Endpoints Implementados:

```
GET    /api/configuracion/:userId           - Obtener configuración
POST   /api/configuracion                   - Crear configuración
PUT    /api/configuracion/:userId           - Actualizar configuración completa
PATCH  /api/configuracion/:userId/field     - Actualizar un campo
POST   /api/configuracion/:userId/reset     - Resetear a defaults
DELETE /api/configuracion/:userId           - Eliminar (soft delete)
POST   /api/configuracion/:userId/restore   - Restaurar eliminada
```

### Archivos Clave para Mencionar:

**Backend:**
- `src/domain/models/sql/configuracion.js` - Modelo de datos (17 campos de configuración)
- `src/infrastructure/http/controllers/configuracion.controller.js` - Controlador CRUD
- `src/infrastructure/http/router/configuracion.router.js` - Definición de rutas

**Frontend:**
- `frontend-openblind/src/features/configuracion/api/configuracionApi.js` - Capa de comunicación con backend
- `frontend-openblind/src/features/configuracion/hooks/useConfiguracion.js` - Hook híbrido backend/localStorage
- `frontend-openblind/src/features/configuracion/utils/deviceId.js` - Identificación sin login
- `frontend-openblind/src/features/configuracion/views/` - 3 vistas de configuración

---

## ✅ LISTO PARA LA PRESENTACIÓN

Sigue estos pasos en orden y todo funcionará correctamente. Si tienes algún problema, revisa la sección de Troubleshooting.

**¡Éxito en tu presentación del lunes! 🎓**
