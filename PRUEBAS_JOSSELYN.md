# 🧪 Guía de Pruebas - Configuración Global (Josselyn Moposita)

Esta guía te ayudará a probar tus 3 pantallas de configuración del sistema.

**Autor:** MOPOSITA PILATAXI JOSSELYN PAMELA (N°5)
**Fecha:** 2024
**Pantallas a probar:**
- ⚙️ Configuración de Accesibilidad (`/configuracion/accesibilidad`)
- 🧭 Configuración de Navegación (`/configuracion/navegacion`)
- 🔒 Configuración de Privacidad (`/configuracion/privacidad`)

---

## 📋 Pre-requisitos

Antes de empezar las pruebas, verifica que:

### 1️⃣ Backend corriendo
```bash
cd /home/user/estructura-hexagonal
npm start
```

Deberías ver:
```
✅ Servidor corriendo en puerto 8888
✅ Conexión establecida con MySQL
✅ Modelos sincronizados con MySQL
```

### 2️⃣ Frontend corriendo
```bash
cd /home/user/estructura-hexagonal/frontend-admin
npm run dev
```

Deberías ver:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5174/
```

### 3️⃣ Navegar al Dashboard
- Abre tu navegador en `http://localhost:5174`
- Deberías ver el Dashboard cargando
- Verifica que aparecen las métricas: "Configuraciones Activas: 1"

---

## 🎯 PRUEBA 1: Configuración de Accesibilidad

### Navegación
Desde el Dashboard:
- **Opción A:** Haz click en la tarjeta "Configuraciones Activas"
- **Opción B:** Haz click en el botón "🎯 Accesibilidad"
- **Opción C:** Sidebar → "Configuración" → "Accesibilidad"

URL esperada: `http://localhost:5174/configuracion/accesibilidad`

### Funcionalidades a probar

#### ✅ Carga inicial
- [ ] La pantalla carga sin errores
- [ ] El título dice "Configuración de Accesibilidad"
- [ ] El subtítulo dice "Valores por defecto que heredarán los nuevos usuarios"
- [ ] Aparece el botón "💾 Guardar Cambios"
- [ ] Los valores iniciales se cargan desde la base de datos

#### ✅ Sección: Apariencia
- [ ] **Tamaño de fuente** - dropdown con opciones:
  - Pequeño
  - Mediano (por defecto)
  - Grande
  - Extra Grande
- [ ] **Tema de contraste** - dropdown con opciones:
  - Normal (por defecto)
  - Alto Contraste
- [ ] **Idioma** - dropdown con opciones:
  - Español (por defecto)
  - English

#### ✅ Sección: Síntesis de Voz
- [ ] **Velocidad de voz** - slider de 0.5 a 2.0
  - Valor por defecto: 1.0
  - Muestra valor actual: "Velocidad de voz (1.0x)"
- [ ] **Volumen** - slider de 0 a 100
  - Valor por defecto: 80
  - Muestra valor actual: "Volumen (80%)"
- [ ] **Nivel de detalle** - dropdown con opciones:
  - Básico
  - Completo (por defecto)
  - Experto
- [ ] **Feedback háptico** - checkbox
  - Por defecto: activado ✅

#### ✅ Guardar cambios
**Prueba básica:**
1. Cambia el tamaño de fuente a "Grande"
2. Cambia el idioma a "English"
3. Mueve el slider de volumen a 60
4. Haz click en "💾 Guardar Cambios"

**Resultado esperado:**
- Aparece alerta: "✅ Configuración guardada correctamente en la base de datos"
- Los valores se guardan en MySQL
- Al recargar la página (F5), los valores persisten

**Prueba avanzada:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network"
3. Cambia algún valor y guarda
4. Busca la petición PUT a `/api/admin/configuracion`
5. Verifica que el Response tenga `success: true`

#### ❌ Manejo de errores
**Prueba con backend apagado:**
1. Detén el backend (Ctrl+C en la terminal del servidor)
2. Intenta guardar cambios
3. Deberías ver: "❌ Error de conexión: No se pudo conectar con el servidor en http://localhost:8888"

---

## 🧭 PRUEBA 2: Configuración de Navegación

### Navegación
Desde el Dashboard:
- Haz click en el botón "🧭 Navegación"

URL esperada: `http://localhost:5174/configuracion/navegacion`

### Funcionalidades a probar

#### ✅ Carga inicial
- [ ] La pantalla carga sin errores
- [ ] El título dice "Configuración de Navegación"
- [ ] El subtítulo dice "Parámetros de navegación y generación de rutas"
- [ ] Aparece el botón "💾 Guardar"

#### ✅ Sección: Rutas
- [ ] **Longitud máxima de ruta** - slider de 1 a 50 km
  - Valor por defecto: 10 km
  - Muestra valor actual: "Longitud máxima de ruta (10 km)"
- [ ] **Sugerir paradas seguras** - checkbox
  - Por defecto: activado ✅

#### ✅ Sección: Instrucciones
- [ ] **Frecuencia de instrucciones** - dropdown con opciones:
  - Baja
  - Media (por defecto)
  - Alta
- [ ] **Tipo de instrucción** - dropdown con opciones:
  - Por distancia (por defecto)
  - Por tiempo
- [ ] **Alertar cuando el usuario se desvía** - checkbox
  - Por defecto: activado ✅
- [ ] **Alertar sobre obstáculos** - checkbox
  - Por defecto: activado ✅

#### ✅ Guardar cambios
**Prueba básica:**
1. Cambia longitud máxima a 25 km
2. Cambia frecuencia a "Alta"
3. Cambia tipo de instrucción a "Por tiempo"
4. Haz click en "💾 Guardar"

**Resultado esperado:**
- Aparece alerta: "✅ Configuración guardada correctamente en la base de datos"
- Los valores se guardan en MySQL
- Al recargar la página (F5), los valores persisten

---

## 🔒 PRUEBA 3: Configuración de Privacidad

### Navegación
Desde el Dashboard:
- Haz click en el botón "🔒 Privacidad"

URL esperada: `http://localhost:5174/configuracion/privacidad`

### Funcionalidades a probar

#### ✅ Carga inicial
- [ ] La pantalla carga sin errores
- [ ] El título dice "Configuración de Privacidad"
- [ ] El subtítulo dice "Políticas de privacidad y manejo de datos"
- [ ] Aparece el botón "💾 Guardar"

#### ✅ Sección: Ubicación y Rastreo
- [ ] **Retención de historial de ubicaciones** - dropdown con opciones:
  - 7 días
  - 14 días
  - 30 días (por defecto)
  - 90 días
- [ ] **Permitir tracking en segundo plano** - checkbox
  - Por defecto: desactivado ❌
- [ ] **Permitir compartir ubicación con contactos** - checkbox
  - Por defecto: activado ✅

#### ✅ Sección: Historial y Datos
- [ ] **Guardar historial de rutas y ubicaciones** - checkbox
  - Por defecto: activado ✅
- [ ] **Permitir modo anónimo (no guardar datos)** - checkbox
  - Por defecto: desactivado ❌

#### ✅ Guardar cambios
**Prueba básica:**
1. Cambia retención a "90 días"
2. Activa "Permitir tracking en segundo plano"
3. Desactiva "Permitir modo anónimo"
4. Haz click en "💾 Guardar"

**Resultado esperado:**
- Aparece alerta: "✅ Configuración guardada correctamente en la base de datos"
- Los valores se guardan en MySQL
- Al recargar la página (F5), los valores persisten

---

## 🔄 PRUEBA INTEGRADA: Navegación entre las 3 pantallas

### Flujo completo
1. Dashboard → Click "🎯 Accesibilidad"
2. Cambia tamaño de fuente a "Grande"
3. Guarda cambios ✅
4. Click en "🧭 Navegación" (botón rápido)
5. Cambia longitud máxima a 30 km
6. Guarda cambios ✅
7. Click en "🔒 Privacidad" (botón rápido)
8. Cambia retención a 90 días
9. Guarda cambios ✅
10. Regresa al Dashboard (desde sidebar)
11. Verifica que "Configuraciones Activas: 1"

**Resultado esperado:**
- Todas las configuraciones se guardan correctamente
- No hay errores en la consola
- La navegación es fluida entre pantallas

---

## 🛠️ Verificación en Base de Datos (Avanzado)

Si tienes acceso a MySQL, puedes verificar que los datos se guardaron:

```sql
USE openblind;

-- Ver la configuración global (solo debe haber 1 registro)
SELECT * FROM configuracion_global WHERE id = 1;

-- Verificar valores específicos
SELECT
    tamanoFuente,
    idioma,
    longitudMaxima,
    retencionUbicacion,
    ultimaActualizacion
FROM configuracion_global
WHERE id = 1;
```

---

## 🐛 Problemas Comunes y Soluciones

### ❌ "Error al cargar las métricas"
**Causa:** Backend no está corriendo
**Solución:** Inicia el backend con `npm start` desde la carpeta raíz

### ❌ "Error al obtener configuración"
**Causa:** Tabla `configuracion_global` no existe
**Solución:** El backend debería crearla automáticamente al iniciar. Verifica los logs.

### ❌ Los valores no se guardan
**Causa:** Error en la base de datos o formato de datos
**Solución:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network"
3. Busca la petición PUT que falló
4. Ve la pestaña "Response" para ver el error exacto

### ❌ Los valores no persisten al recargar
**Causa:** No se está llamando a `loadConfig()` correctamente
**Solución:** Verifica que useEffect esté llamando a loadConfig() al montar el componente

---

## ✅ Checklist Final

- [ ] ✅ Las 3 pantallas cargan sin errores
- [ ] ✅ Todos los campos se muestran correctamente
- [ ] ✅ Los valores por defecto son correctos
- [ ] ✅ Se pueden modificar los valores
- [ ] ✅ El botón "Guardar" funciona
- [ ] ✅ Aparece mensaje de éxito al guardar
- [ ] ✅ Los valores persisten al recargar
- [ ] ✅ La navegación entre pantallas funciona
- [ ] ✅ Los datos se guardan en MySQL
- [ ] ✅ No hay errores en la consola del navegador
- [ ] ✅ No hay errores en los logs del backend

---

## 🎉 ¡Listo para Demostración!

Si completaste todos los checks ✅, tus 3 pantallas están funcionando correctamente y listas para demostrar.

**Recuerda:**
- Estas pantallas controlan los valores POR DEFECTO para NUEVOS usuarios
- Solo existe 1 registro en la base de datos (id=1)
- Los usuarios existentes pueden tener sus propias configuraciones personalizadas

---

## 📞 Soporte

Si encuentras algún error o tienes dudas:
1. Revisa los logs del backend
2. Revisa la consola del navegador (F12)
3. Verifica que MySQL esté corriendo
4. Comprueba que la tabla `configuracion_global` existe
