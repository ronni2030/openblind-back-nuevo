# 📦 CÓMO GENERAR EL APK - PASO A PASO

## ⚡ PASOS RÁPIDOS (5 minutos)

```bash
# 1. Ir al directorio del frontend
cd /home/user/estructura-hexagonal/frontend-openblind

# 2. Compilar el frontend
npm run build

# 3. Sincronizar con Android
npx cap sync android

# 4. Ir a la carpeta de Android
cd android

# 5. Compilar APK con Gradle
./gradlew assembleDebug

# 6. El APK estará en:
# android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📋 CHECKLIST PRE-COMPILACIÓN

Antes de generar el APK, verifica:

- ✅ **Node.js instalado** (`node --version`)
- ✅ **Java 17 instalado** (`java --version`)
- ✅ **Gradle instalado** (`gradle --version`)
- ✅ **Android SDK instalado**
- ✅ **Variable JAVA_HOME configurada**
- ✅ **IP del backend configurada en App.jsx**

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Error: "Unsupported class file major version"
**Causa:** Java version incorrecta
**Solución:**
```bash
# Instalar Java 17 LTS
sudo apt install openjdk-17-jdk

# Configurar JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

### Error: "Could not resolve com.android.tools.build:gradle"
**Causa:** Sin conexión a internet
**Solución:**
```bash
# Compilar con cache (si ya compilaste antes)
./gradlew assembleDebug --offline

# O asegurarte de tener internet estable
```

### Error: "EACCES: permission denied"
**Causa:** Sin permisos de ejecución
**Solución:**
```bash
chmod +x gradlew
./gradlew assembleDebug
```

---

## 📱 INSTALAR APK EN CELULAR

### Opción 1: USB Debugging
```bash
# 1. Habilitar USB Debugging en el celular
# Ajustes > Opciones de desarrollador > Depuración USB

# 2. Conectar celular por USB

# 3. Verificar conexión
adb devices

# 4. Instalar APK
adb install app/build/outputs/apk/debug/app-debug.apk
```

### Opción 2: Transferencia de archivo
```bash
# 1. Copiar APK a tu celular
cp android/app/build/outputs/apk/debug/app-debug.apk ~/Escritorio/

# 2. Transferir archivo al celular (USB, email, etc.)

# 3. En el celular:
# - Abrir archivo app-debug.apk
# - Permitir instalación desde fuentes desconocidas
# - Instalar
```

---

## 🚀 COMANDOS COMPLETOS (COPIAR Y PEGAR)

```bash
# TODO EN UNO (ejecutar desde la raíz del proyecto)
cd frontend-openblind && \
npm run build && \
npx cap sync android && \
cd android && \
./gradlew assembleDebug && \
echo "✅ APK generado en: $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
```

---

## 📊 TAMAÑO ESPERADO DEL APK

- **app-debug.apk**: ~15-25 MB
- **app-release.apk** (optimizado): ~8-12 MB

---

## 🎯 VERIFICAR QUE EL APK FUNCIONA

Después de instalar:

1. ✅ Abre la app
2. ✅ Escucha "Bienvenido a OpenBlind..."
3. ✅ Di "Abre lugares favoritos"
4. ✅ Toca "+" para agregar
5. ✅ Verifica que se guarde en la base de datos

---

## ⏱️ TIEMPOS ESTIMADOS

| Paso | Tiempo |
|------|--------|
| npm run build | 10-20 segundos |
| npx cap sync | 5-10 segundos |
| gradlew assembleDebug | 2-5 minutos (primera vez) |
| gradlew assembleDebug | 30-60 segundos (siguiente) |
| **TOTAL** | **3-6 minutos** |

---

**¡LISTO PARA GENERAR! 🚀**
