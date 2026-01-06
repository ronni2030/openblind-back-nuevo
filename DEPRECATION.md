Deprecación: uso de query param `tipo=zona_segura` / `tipo=punto_critico`

Resumen:
- Anteriormente el endpoint `/api/admin/lugares?tipo=zona_segura` y `?tipo=punto_critico` devolvían Zonas Seguras y Puntos Críticos.
- Se han creado endpoints dedicados:
  - `/api/admin/zonas-seguras`
  - `/api/admin/puntos-criticos`

Acción tomada:
- Mantengo compatibilidad: las consultas legacy seguirán devolviendo datos por ahora.
- Se añadió un **mensaje deprecatorio** en logs cada vez que se usa `tipo=zona_segura` o `tipo=punto_critico`.

Siguiente pasos recomendados:
1. Actualizar el front para usar los endpoints dedicados.
2. Monitorizar logs durante 2 semanas para detectar uso residual de los parámetros deprecated.
3. Planificar la eliminación del soporte legacy en una versión futura (ej. 2 semanas después de notificar al equipo).

Cómo probar:
- Ejecutar `powershell -File .\tests\api\test_zonas_puntos.ps1` con el servidor en ejecución.
