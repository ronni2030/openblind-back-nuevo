# 🚀 GUÍA COMPLETA: Desde Clonar hasta Generar APK

**Para:** Josselyn Pamela Moposita Pilataxi (N°5)
**Proyecto:** OpenBlind - Módulo Configuración
**Fecha:** Presentación Lunes

---

## 📋 ÍNDICE

1. [Prerrequisitos](#prerrequisitos)
2. [Paso 1: Clonar el Repositorio](#paso-1-clonar-el-repositorio)
3. [Paso 2: Instalar Dependencias](#paso-2-instalar-dependencias)
4. [Paso 3: Verificar Estructura FSD](#paso-3-verificar-estructura-fsd)
5. [Paso 4: Ejecutar en Navegador](#paso-4-ejecutar-en-navegador)
6. [Paso 5: Probar Comandos de Voz](#paso-5-probar-comandos-de-voz)
7. [Paso 6: Preparar para Android](#paso-6-preparar-para-android)
8. [Paso 7: Generar APK con Android Studio](#paso-7-generar-apk-con-android-studio)
9. [Solución de Problemas](#solución-de-problemas)

---

## Prerrequisitos

### Software que DEBES tener instalado:

| Software | Versión Mínima | Cómo verificar |
|----------|---------------|----------------|
| **Node.js** | v18+ | `node --version` |
| **npm** | v9+ | `npm --version` |
| **Git** | cualquiera | `git --version` |
| **Android Studio** | 2023.1+ | Abrir Android Studio |
| **Java JDK** | 17+ | `java -version` |

### Si NO tienes algo instalado:

**Node.js:**
```bash
# Descargar de https://nodejs.org (versión LTS)
# O usar nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

**Android Studio:**
```bash
# Descargar de https://developer.android.com/studio
# Instalar con todas las opciones por defecto
# Asegurarse de instalar Android SDK Platform-API 34
```

**Java JDK 17:**
```bash
# En Ubuntu/Debian:
sudo apt install openjdk-17-jdk

# En Windows/Mac: Descargar de https://adoptium.net
```

---

## Paso 1: Clonar el Repositorio

### 1.1 Borrar proyecto anterior (si existe)

```bash
# ADVERTENCIA: Esto borrará TODO el proyecto anterior
cd ~
rm -rf estructura-hexagonal

# O si prefieres respaldo:
mv estructura-hexagonal estructura-hexagonal.backup
```

### 1.2 Clonar repositorio

```bash
# Clonar desde GitHub
git clone https://github.com/Padme2003/estructura-hexagonal.git

# Entrar al directorio
cd estructura-hexagonal

# Verificar branch correcto
git branch -a

# Cambiar a tu branch si es necesario
git checkout claude/age-restricted-accessibility-feature-zXOvx

# Verificar último commit
git log --oneline -5
```

**Deberías ver estos commits recientes:**
```
5ba9f23 docs: Resumen ejecutivo completo para presentación del lunes
8ed0597 feat: Estructura completa FSD + Master Class
72a418a feat: Módulo Configuración con Feature-Based Architecture
```

---

## Paso 2: Instalar Dependencias

### 2.1 Instalar dependencias del frontend

```bash
# Entrar a la carpeta del frontend
cd frontend-openblind

# Limpiar cache de npm (por si acaso)
npm cache clean --force

# Instalar todas las dependencias
npm install

# Esto instalará:
# - React 19
# - Vite 7
# - Framer Motion
# - Capacitor 8
# - Todas las dev dependencies
```

**Tiempo estimado:** 2-5 minutos

**Output esperado:**
```
added 500+ packages, and audited 501 packages in 3m
found 0 vulnerabilities
```

### 2.2 Verificar instalación

```bash
# Verificar que node_modules existe
ls -la | grep node_modules

# Verificar package.json
cat package.json | grep -A5 dependencies
```

---

## Paso 3: Verificar Estructura FSD

### 3.1 Verificar que todas las carpetas existen

```bash
# Verificar capas FSD
ls -la src/ | grep -E "(app|shared|entities|features|widgets|pages|processes)"

# Debería mostrar:
# drwxr-xr-x app/
# drwxr-xr-x entities/
# drwxr-xr-x features/
# drwxr-xr-x pages/
# drwxr-xr-x processes/
# drwxr-xr-x shared/
# drwxr-xr-x widgets/
```

### 3.2 Verificar módulo Configuración

```bash
# Ver archivos del módulo
ls -la src/features/configuracion/

# Debería mostrar:
# README.md
# index.js
# styles.css
# components/
# hooks/
# utils/
# views/

# Ver las 3 vistas
ls -la src/features/configuracion/views/

# Debería mostrar:
# ConfiguracionAccesibilidad.jsx
# ConfiguracionNavegacion.jsx
# ConfiguracionPrivacidad.jsx
```

### 3.3 Verificar documentación

```bash
# Ver guías principales
ls -la *.md

# Debería mostrar:
# ARQUITECTURA_FSD.md
# MASTER_CLASS_FSD.md
# RESUMEN_ENTREGABLE_LUNES.md
```

---

## Paso 4: Ejecutar en Navegador

### 4.1 Iniciar servidor de desarrollo

```bash
# Asegúrate de estar en frontend-openblind/
pwd
# Debería mostrar: .../estructura-hexagonal/frontend-openblind

# Iniciar Vite
npm run dev
```

**Output esperado:**
```
  VITE v7.2.5  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

### 4.2 Abrir en navegador

```bash
# Opción 1: Abrir automáticamente (si estás en Linux con GUI)
xdg-open http://localhost:5173

# Opción 2: Copiar URL y pegar en Chrome/Firefox
# http://localhost:5173
```

### 4.3 Navegar al módulo Configuración

**En el navegador:**
1. Deberías ver el dashboard de OpenBlind
2. Busca el módulo "Configuración" en el carrusel
3. Haz clic para entrar

**Si no aparece Configuración en el dashboard:**
- Ve directamente a: `http://localhost:5173/#/configuracion`
- O edita `src/App.jsx` para agregar la ruta

---

## Paso 5: Probar Comandos de Voz

### 5.1 Dar permisos de micrófono

**En Chrome:**
1. Cuando se abra la vista, Chrome pedirá permiso para usar el micrófono
2. Clic en "Permitir"
3. Si no aparece, haz clic en el icono de candado en la barra de URL
4. Permisos > Micrófono > Permitir

### 5.2 Activar reconocimiento de voz

1. Haz clic en el **botón flotante de micrófono** (abajo a la derecha)
2. El botón debería ponerse púrpura y pulsar (animación)
3. Deberías escuchar: "Estoy escuchando"

### 5.3 Probar comandos

**Vista: Configuración de Accesibilidad**

Di en voz alta (español):

| Comando | Resultado Esperado |
|---------|-------------------|
| "fuente grande" | Cambia tamaño de fuente + vibra + dice "Tamaño grande" |
| "alto contraste" | Cambia tema + vibra + dice "Alto contraste activado" |
| "idioma español" | Cambia idioma + vibra + dice "Idioma español" |
| "voz rápida" | Cambia velocidad + vibra + dice "Voz rápida" |
| "vibración sí" | Activa haptic feedback + vibra + confirma |

**Vista: Configuración de Navegación**

Di en voz alta:

| Comando | Resultado Esperado |
|---------|-------------------|
| "10 kilómetros" | Ajusta longitud + vibra + dice "10 kilómetros" |
| "parada segura sí" | Activa toggle + vibra + confirma |
| "frecuencia alta" | Cambia frecuencia + vibra + dice "Frecuencia alta" |

**Vista: Configuración de Privacidad**

Di en voz alta:

| Comando | Resultado Esperado |
|---------|-------------------|
| "30 días" | Cambia retención + vibra + dice "30 días" |
| "tracking sí" | Activa tracking + vibra + confirma |
| "anónimo no" | Desactiva anónimo + vibra + confirma |

### 5.4 Verificar persistencia

1. Cambia varias configuraciones con comandos de voz
2. Cierra la pestaña del navegador
3. Vuelve a abrir `http://localhost:5173/#/configuracion`
4. Verifica que las configuraciones SE MANTIENEN (localStorage funcionando)

---

## Paso 6: Preparar para Android

### 6.1 Build del proyecto web

```bash
# Detener el servidor (Ctrl+C si está corriendo)
# Luego hacer build:

npm run build

# Esto genera la carpeta dist/ con todo compilado
```

**Output esperado:**
```
vite v7.2.5 building for production...
✓ 234 modules transformed.
dist/index.html                   1.23 kB
dist/assets/index-abc123.js       456.78 kB
dist/assets/index-def456.css      78.90 kB

✓ built in 12.34s
```

### 6.2 Copiar build a Capacitor

```bash
# Sincronizar con Capacitor (copia dist/ a android/app/src/main/assets/public/)
npx cap sync

# O si falla, hacerlo manualmente:
npx cap copy android
npx cap update android
```

**Output esperado:**
```
✔ Copying web assets from dist to android/app/src/main/assets/public in 234ms
✔ Copying native bridge in 12ms
✔ Copying capacitor.config.json in 3ms
✔ copy android in 567ms
✔ Updating Android plugins in 890ms
✔ update android in 1.23s
```

### 6.3 Verificar AndroidManifest.xml

```bash
# Abrir AndroidManifest.xml
cat android/app/src/main/AndroidManifest.xml
```

**Verificar que contenga estos permisos:**

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

**Si NO están, agrégalos:**

```bash
# Editar archivo
nano android/app/src/main/AndroidManifest.xml

# Agregar después de <manifest> y antes de <application>:
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.VIBRATE" />
```

---

## Paso 7: Generar APK con Android Studio

### 7.1 Abrir proyecto en Android Studio

```bash
# Abrir Android Studio con el proyecto
npx cap open android

# O manualmente:
# 1. Abre Android Studio
# 2. File > Open
# 3. Selecciona: estructura-hexagonal/frontend-openblind/android/
```

### 7.2 Esperar sincronización de Gradle

**Esto puede tardar 5-10 minutos la primera vez.**

En Android Studio verás:
```
Gradle sync in progress...
Building 'app' Gradle project info...
```

**Espera hasta ver:**
```
BUILD SUCCESSFUL in 3m 45s
```

### 7.3 Configurar firma de APK (Opcional pero recomendado)

**Para APK de prueba, puedes saltar este paso.**

Si quieres firmar el APK:

1. `Build > Generate Signed Bundle / APK`
2. Selecciona `APK`
3. Clic en `Create new...` (keystore)
4. Llena los datos:
   - **Key store path:** `/home/tu-usuario/openblind-keystore.jks`
   - **Password:** (crea una contraseña segura)
   - **Alias:** openblind-key
   - **Password:** (misma contraseña)
   - **Validity:** 25 años
   - **First and Last Name:** Josselyn Moposita
   - **Organizational Unit:** OpenBlind
   - **Organization:** Universidad
5. Clic en `OK`

### 7.4 Generar APK de Debug (más rápido)

**Opción A: Desde Android Studio (GUI)**

1. En el menú: `Build > Build Bundle(s) / APK(s) > Build APK(s)`
2. Espera a ver: `BUILD SUCCESSFUL in 1m 23s`
3. Clic en el link `locate` que aparece
4. Se abrirá la carpeta con el APK

**Ubicación del APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**Opción B: Desde terminal**

```bash
# Dentro de frontend-openblind/
cd android

# Generar APK de debug
./gradlew assembleDebug

# O si estás en Windows:
gradlew.bat assembleDebug
```

**Output esperado:**
```
> Task :app:assembleDebug
BUILD SUCCESSFUL in 1m 23s
45 actionable tasks: 23 executed, 22 up-to-date
```

### 7.5 Generar APK de Release (más optimizado)

**Solo si quieres APK final para distribuir:**

```bash
cd android
./gradlew assembleRelease

# APK estará en:
# android/app/build/outputs/apk/release/app-release-unsigned.apk
```

### 7.6 Copiar APK a ubicación accesible

```bash
# Volver a frontend-openblind/
cd ..

# Copiar APK a la raíz del proyecto
cp android/app/build/outputs/apk/debug/app-debug.apk ./OpenBlind-Configuracion-v1.0.apk

# Verificar que existe
ls -lh OpenBlind-Configuracion-v1.0.apk

# Debería mostrar algo como:
# -rw-r--r-- 1 user user 8.5M Dec 26 12:34 OpenBlind-Configuracion-v1.0.apk
```

---

## Paso 8: Instalar APK en Dispositivo Android

### 8.1 Opción 1: Emulador de Android Studio

**Crear emulador:**

1. En Android Studio: `Tools > Device Manager`
2. Clic en `Create Device`
3. Selecciona: `Phone > Pixel 6`
4. Selecciona System Image: `Android 13 (Tiramisu) API 33`
5. Clic en `Finish`

**Iniciar emulador:**

1. En Device Manager, clic en ▶️ (Play) junto al emulador
2. Espera a que arranque (2-3 minutos)

**Instalar APK:**

```bash
# Encontrar adb
which adb

# Si no está, agregarlo al PATH:
export PATH=$PATH:~/Android/Sdk/platform-tools

# Instalar APK en emulador
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Debería decir:
# Success
```

**Abrir app en emulador:**
1. En el menú de apps del emulador, busca "OpenBlind"
2. Abre la app
3. Navega a Configuración
4. Prueba comandos de voz (el emulador puede usar el micrófono de tu PC)

### 8.2 Opción 2: Dispositivo Android físico

**Habilitar modo desarrollador en tu celular:**

1. Ve a: `Ajustes > Acerca del teléfono`
2. Presiona 7 veces en `Número de compilación`
3. Verás: "Ahora eres un desarrollador"
4. Ve a: `Ajustes > Sistema > Opciones de desarrollador`
5. Activa: `Depuración USB`

**Conectar celular a PC:**

1. Conecta el celular con cable USB
2. En el celular, acepta: "¿Permitir depuración USB?"

**Instalar APK:**

```bash
# Verificar que el dispositivo se detecta
adb devices

# Debería mostrar:
# List of devices attached
# ABC123DEF456    device

# Instalar APK
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

**Abrir app en celular:**
1. Busca "OpenBlind" en las apps
2. Ábrela
3. Da permisos de micrófono cuando lo pida
4. Prueba comandos de voz

### 8.3 Opción 3: Compartir APK

**Enviar por correo/WhatsApp:**

1. Copia el APK a una ubicación accesible
2. Envíatelo por correo o WhatsApp
3. En el celular, descarga el APK
4. Instala (puede pedir habilitar "Instalar apps desconocidas")

---

## Solución de Problemas

### Problema 1: `npm install` falla

**Error:** `EACCES: permission denied`

**Solución:**
```bash
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER node_modules
npm install
```

### Problema 2: `npm run dev` no funciona

**Error:** `Port 5173 is already in use`

**Solución:**
```bash
# Matar proceso en puerto 5173
npx kill-port 5173

# O cambiar puerto en vite.config.ts:
server: {
  port: 3000
}
```

### Problema 3: Comandos de voz no responden

**Causas posibles:**

1. **Micrófono no permitido:** Verifica permisos en Chrome (candado en URL)
2. **Navegador no soportado:** Usa Chrome/Edge (Firefox no soporta bien Web Speech API)
3. **Idioma incorrecto:** Verifica que el navegador esté en español
4. **No está escuchando:** Verifica que el botón de voz esté pulsando (púrpura)

**Solución:**
```javascript
// En ConfiguracionAccesibilidad.jsx, agregar debug:
const handleVoiceCommand = (command) => {
  console.log('Comando recibido:', command); // <- Agrega esto
  const cmd = command.toLowerCase();
  // ... resto del código
};
```

### Problema 4: Gradle sync falla en Android Studio

**Error:** `Could not find com.android.tools.build:gradle:X.X.X`

**Solución:**
```bash
# Actualizar Gradle wrapper
cd android
./gradlew wrapper --gradle-version=8.0

# Limpiar y rebuild
./gradlew clean
./gradlew build
```

### Problema 5: APK no se instala en celular

**Error:** `INSTALL_FAILED_INVALID_APK`

**Solución:**
```bash
# Firmar APK manualmente
cd android
./gradlew assembleDebug

# Verificar que el APK no esté corrupto
unzip -t app/build/outputs/apk/debug/app-debug.apk
```

### Problema 6: App se cierra al abrir en Android

**Error:** App crash al iniciar

**Solución:**
```bash
# Ver logs en tiempo real
adb logcat | grep OpenBlind

# Buscar líneas con "FATAL EXCEPTION" o "ERROR"
```

**Causas comunes:**
- Falta permiso en AndroidManifest.xml
- Error de JavaScript en el código (revisa console.log en Chrome DevTools)

---

## 🎯 CHECKLIST FINAL

### Antes de la presentación, verifica:

```
✅ INSTALACIÓN
[ ] Node.js instalado (v18+)
[ ] npm install completado sin errores
[ ] node_modules/ existe

✅ ESTRUCTURA FSD
[ ] src/app/ existe
[ ] src/shared/ existe
[ ] src/entities/ existe
[ ] src/features/configuracion/ existe con 3 vistas
[ ] src/widgets/voice-mic-panel/ existe
[ ] src/pages/ existe
[ ] src/processes/ existe

✅ DOCUMENTACIÓN
[ ] ARQUITECTURA_FSD.md existe
[ ] MASTER_CLASS_FSD.md existe
[ ] RESUMEN_ENTREGABLE_LUNES.md existe

✅ FUNCIONAMIENTO EN NAVEGADOR
[ ] npm run dev funciona
[ ] Se abre en http://localhost:5173
[ ] Puedes navegar al módulo Configuración
[ ] Puedes cambiar configuraciones manualmente (clic)

✅ COMANDOS DE VOZ
[ ] Botón de micrófono aparece
[ ] Micrófono se activa (botón púrpura pulsando)
[ ] Escucha síntesis de voz: "Estoy escuchando"
[ ] Al menos 3 comandos funcionan:
    [ ] "fuente grande"
    [ ] "alto contraste"
    [ ] "voz rápida"

✅ PERSISTENCIA
[ ] Cambias configuración
[ ] Cierras navegador
[ ] Vuelves a abrir
[ ] Configuración se mantiene (localStorage)

✅ ANDROID
[ ] npm run build funciona (genera dist/)
[ ] npx cap sync funciona
[ ] Android Studio abre el proyecto
[ ] Gradle sync completa sin errores
[ ] APK se genera (app-debug.apk)
[ ] APK pesa entre 5-15 MB

✅ APK EN DISPOSITIVO
[ ] APK se instala en emulador o celular
[ ] App abre sin crashear
[ ] Puedes navegar a Configuración
[ ] Comandos de voz funcionan en móvil
[ ] Vibración funciona al interactuar
```

---

## 📱 INFORMACIÓN DEL APK GENERADO

**Nombre:** `OpenBlind-Configuracion-v1.0.apk`
**Tamaño aprox:** 8-12 MB
**Versión:** 1.0.0
**Package ID:** com.openblind.app
**Min Android:** API 22 (Android 5.1)
**Target Android:** API 34 (Android 14)

---

## 🎓 PARA LA PRESENTACIÓN

**Lleva preparado:**

1. ✅ **APK instalado en tu celular** (para demo en vivo)
2. ✅ **Proyecto corriendo en navegador** (backup si celular falla)
3. ✅ **MASTER_CLASS_FSD.md abierto** (guión de presentación)
4. ✅ **Android Studio abierto** (mostrar estructura de proyecto)
5. ✅ **Archivo APK** (para compartir con profesores si piden)

**Durante la presentación:**

1. Muestra la app funcionando en celular
2. Demuestra 3-5 comandos de voz
3. Muestra que las configuraciones persisten
4. Explica la arquitectura FSD con ARQUITECTURA_FSD.md
5. Muestra el código clave (useConfiguracion hook)

---

**¡Éxito en la presentación! 🚀**

Si algo falla durante esta guía, anótalo y avísame INMEDIATAMENTE para ayudarte.
