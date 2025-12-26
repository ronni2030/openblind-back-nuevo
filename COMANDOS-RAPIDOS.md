# ⚡ COMANDOS RÁPIDOS PARA EL DÍA DE LA PRESENTACIÓN

## 🔴 ANTES DE LA PRESENTACIÓN (30 minutos antes)

### 1. Iniciar MySQL (XAMPP)
```bash
# Abrir XAMPP Control Panel
# Clic en "Start" en MySQL
# Verificar que aparezca en VERDE
```

### 2. Iniciar Backend
```bash
cd /home/user/estructura-hexagonal
npm start
```

**✅ Debe mostrar:**
```
Servidor corriendo en http://localhost:8888
Base de datos MySQL conectada correctamente
```

### 3. Verificar desde tu PC
```bash
# Abrir navegador y ir a:
http://localhost:8888
```

**✅ Debe mostrar:**
```json
{
  "success": true,
  "message": "API OpenBlind funcionando correctamente"
}
```

### 4. Conectar celular a WiFi
```
Configuración > WiFi > Conectar a la MISMA red que tu PC
```

### 5. Verificar desde el celular
```bash
# Abrir Chrome en el celular
# Ir a:
http://192.168.18.54:8888
```

**✅ Debe mostrar el mismo JSON**

---

## 🔧 SI LA IP CAMBIÓ (emergencia)

### 1. Obtener nueva IP
```bash
ipconfig
# Buscar: Adaptador de red inalámbrica Wi-Fi
# Copiar: Dirección IPv4
```

### 2. Actualizar .env
```bash
# Editar: frontend-openblind/.env
# Cambiar la línea:
VITE_API_URL=http://[NUEVA_IP]:8888
```

### 3. Reconstruir APK (15-20 minutos)
```bash
cd frontend-openblind
npm run build
npx cap sync
npx cap open android
# Build > Build APK(s)
# Esperar...
# Instalar nuevo APK en el celular
```

---

## 🎤 DURANTE LA PRESENTACIÓN

### Abrir Chrome Remote Debugging
```
1. Conectar celular por USB
2. Abrir Chrome en PC
3. Ir a: chrome://inspect/#devices
4. Clic en "inspect" debajo de OpenBlind
5. Ver consola con los logs
```

### Abrir phpMyAdmin
```
http://localhost/phpmyadmin
# Base de datos: openblind
# Tabla: configuracion
```

### Demostrar CREATE (automático)
```
1. Abrir app por primera vez
2. Ir a Configuración
3. Refrescar phpMyAdmin (F5)
4. Mostrar nuevo registro creado con userId=1
```

### Demostrar READ
```
1. Mostrar valores en phpMyAdmin
2. Mostrar los mismos valores en la app
3. Explicar: "Los datos vienen de MySQL"
```

### Demostrar UPDATE
```
1. Cambiar tamaño de fuente en la app
2. Refrescar phpMyAdmin (F5)
3. Mostrar que tamanoFuente cambió en MySQL
4. Mostrar console log: "✅ Campo tamanoFuente actualizado en MySQL"
```

### Demostrar SOFT DELETE
```javascript
// En Chrome inspect > Console
fetch('http://192.168.18.54:8888/api/configuracion/1', {
  method: 'DELETE'
})
.then(r => r.json())
.then(console.log)

// Refrescar phpMyAdmin
// Mostrar: activo = 0, fechaEliminacion tiene fecha
```

### Demostrar RESTORE
```javascript
// En Chrome inspect > Console
fetch('http://192.168.18.54:8888/api/configuracion/1/restore', {
  method: 'POST'
})
.then(r => r.json())
.then(console.log)

// Refrescar phpMyAdmin
// Mostrar: activo = 1, fechaEliminacion = NULL
```

---

## 🆘 TROUBLESHOOTING RÁPIDO

### "Backend no disponible" en consola
```
✅ Verificar que npm start está corriendo
✅ Verificar que ambos están en la misma WiFi
✅ Probar http://192.168.18.54:8888 desde el celular
```

### "Connection refused" de MySQL
```
✅ Abrir XAMPP
✅ Clic en Start en MySQL
✅ Verificar que está en VERDE
```

### APK no se conecta
```
✅ Verificar WiFi (misma red en PC y celular)
✅ Desactivar datos móviles en el celular
✅ Verificar que backend responde desde navegador del celular
```

---

## 📊 PUNTOS CLAVE PARA EXPLICAR

### ¿Por qué NO hay login?
```
"App para ciegos, login es barrera de accesibilidad.
Usamos deviceId UUID único generado automáticamente."
```

### ¿Qué es soft delete?
```
"No borramos físicamente. Marcamos activo=false.
Cumplimiento GDPR, auditoría, posibilidad de recuperar."
```

### ¿Qué es Feature-Sliced Design?
```
"Arquitectura moderna de 7 capas.
Cada feature es autocontenida, escalable, mantenible."
```

### ¿Qué es el sistema híbrido?
```
"Offline-first: Intenta backend (MySQL) primero.
Si falla, usa localStorage automáticamente.
App funciona 100% sin internet."
```

---

## 📱 DATOS TÉCNICOS

**Stack:**
- Frontend: React 19 + Vite 6 + Capacitor 8
- Backend: Node.js + Express + Sequelize
- Database: MySQL 8.0
- Architecture: Feature-Sliced Design

**Endpoints:**
```
GET    /api/configuracion/:userId
POST   /api/configuracion
PUT    /api/configuracion/:userId
PATCH  /api/configuracion/:userId/field
POST   /api/configuracion/:userId/reset
DELETE /api/configuracion/:userId
POST   /api/configuracion/:userId/restore
```

**Configuraciones (17 campos):**
- Accesibilidad: 7 campos (fuente, contraste, idioma, voz, háptico)
- Navegación: 6 campos (longitud, paradas, frecuencia, alertas)
- Privacidad: 5 campos (retención, tracking, compartir, historial)

---

## ✅ CHECKLIST FINAL

- [ ] MySQL corriendo (verde en XAMPP)
- [ ] Backend corriendo (`npm start` activo)
- [ ] PC conectada a WiFi
- [ ] Celular conectado a MISMA WiFi
- [ ] APK instalado en celular
- [ ] http://192.168.18.54:8888 responde desde celular
- [ ] Chrome inspect conectado (chrome://inspect)
- [ ] phpMyAdmin abierto (localhost/phpmyadmin)
- [ ] Consola muestra "Backend disponible, cargando desde MySQL"

---

**¡TODO LISTO! 🚀**
