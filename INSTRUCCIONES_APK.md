# 📱 INSTRUCCIONES PARA GENERAR TU PROPIO APK - OpenBlind

## ⚠️ IMPORTANTE:
Cada persona debe generar su PROPIO APK con su IP local. NO compartas el APK con otros.

---

## 🚀 PASO 1: Averiguar tu IP local

Abre PowerShell o CMD y ejecuta:
```powershell
ipconfig
```

Busca la línea que dice **"IPv4 Address"** o **"Dirección IPv4"**.

Ejemplo:
```
IPv4 Address. . . . . . . . . . . : 192.168.1.5
```

**Anota tu IP:** ___________________ (ejemplo: 192.168.1.5)

---

## 🔧 PASO 2: Cambiar la configuración

### **Archivo a modificar:**
```
frontend-openblind/src/App.jsx
```

### **Qué cambiar:**

**BUSCA esta línea (línea 7):**
```javascript
const API_URL = 'http://localhost:8888';
```

**CÁMBIALA por tu IP:**
```javascript
const API_URL = 'http://TU_IP_AQUI:8888';
```

**Ejemplo:**
```javascript
const API_URL = 'http://192.168.1.5:8888';
```

### **Cómo abrir el archivo:**
1. Abre el proyecto en VS Code
2. Navega a: `frontend-openblind/src/App.jsx`
3. Busca la línea 7
4. Cambia `localhost` por tu IP
5. Guarda (Ctrl + S)

---

## 📦 PASO 3: Generar el APK

### **1. Instalar dependencias (si no las tienes):**
```powershell
cd frontend-openblind
npm install
```

### **2. Construir la aplicación:**
```powershell
npm run build
```

### **3. Sincronizar con Android:**
```powershell
npx cap sync android
```

### **4. Abrir en Android Studio:**
1. Abre Android Studio
2. File → Open
3. Selecciona: `frontend-openblind/android`
4. Espera que sincronice (barra abajo)

### **5. Generar APK:**
1. En el menú superior: **Build**
2. **Build Bundle(s) / APK(s)**
3. **Build APK(s)**
4. Espera (1-2 minutos)

### **6. Encontrar el APK:**
El APK estará en:
```
frontend-openblind/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📲 PASO 4: Instalar en tu celular

### **Antes de instalar - IMPORTANTE:**

1. **Tu PC debe estar corriendo el backend:**
   ```powershell
   cd estructura-hex-completo
   npm start
   ```
   Debe decir: "El servidor está escuchando en el puerto 8888"

2. **Tu celular y tu PC DEBEN estar en la misma red WiFi**

### **Instalar el APK:**

1. Copia `app-debug.apk` a tu celular (USB, WhatsApp, etc.)
2. En tu celular, abre el archivo APK
3. Acepta "Instalar desde orígenes desconocidos"
4. Instala la app

---

## ✅ PASO 5: Probar la app

1. **Abre OpenBlind** en tu celular
2. **Acepta permisos:**
   - Micrófono ✓
   - Ubicación ✓
   - Llamadas ✓

3. **Prueba un comando de voz:**
   - Di: "Lugares"
   - Di: "Agrega mi casa en Avenida Amazonas 123"
   - Guarda
   - ✅ Debe aparecer en la lista

4. **Verifica en MySQL:**
   - Abre phpMyAdmin
   - Base de datos: `openblind`
   - Tabla: `lugares_favoritos`
   - ✅ Debes ver tu lugar guardado

---

## ❓ PROBLEMAS COMUNES:

### **"La app no se conecta al backend"**
✅ Verifica:
- Backend corriendo (`npm start`)
- Celular y PC en la misma WiFi
- IP correcta en App.jsx

### **"No puedo compilar el APK"**
✅ Necesitas Java 17:
- Descarga: https://adoptium.net/temurin/releases/?version=17
- Instala marcando "Set JAVA_HOME"

### **"El APK no se instala"**
✅ Activa "Orígenes desconocidos":
- Ajustes → Seguridad → Instalar apps desconocidas → Chrome → Permitir

---

## 📋 CREDENCIALES MySQL (NO CAMBIAR):

```javascript
MYSQLHOST = 'localhost'
MYSQLUSER = 'linkear'
MYSQLPASSWORD = '0987021692@Rj'
MYSQLDATABASE = 'openblind'
```

**ESTAS CREDENCIALES NO SE CAMBIAN. Solo cambia la IP en App.jsx**

---

## 🎯 RESUMEN:

1. ✅ Averiguar tu IP: `ipconfig`
2. ✅ Cambiar App.jsx línea 7: `const API_URL = 'http://TU_IP:8888';`
3. ✅ Compilar: `npm run build` → `npx cap sync android`
4. ✅ Android Studio → Build APK
5. ✅ Instalar en tu celular
6. ✅ Probar con backend corriendo

---

**¡Listo! Cada uno tendrá su propio APK funcionando con su configuración.** 🚀
