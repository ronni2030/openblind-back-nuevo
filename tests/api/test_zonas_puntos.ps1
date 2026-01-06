# Tests básicos para Zonas Seguras y Puntos Críticos
$base = 'http://localhost:8888'

function Test-Get($path) {
    Write-Host "GET $path"
    try {
        $res = Invoke-WebRequest -Uri "$base$path" -UseBasicParsing
        Write-Host "Status: $($res.StatusCode)"
        Write-Host $res.Content
    } catch {
        Write-Host "ERROR: $_"
    }
    Write-Host "----"
}

function Test-Post($path, $body) {
    Write-Host "POST $path"
    try {
        $res = Invoke-WebRequest -Uri "$base$path" -Method Post -Body ($body | ConvertTo-Json) -ContentType 'application/json' -UseBasicParsing
        Write-Host "Status: $($res.StatusCode)"
        Write-Host $res.Content
    } catch {
        Write-Host "ERROR: $_"
    }
    Write-Host "----"
}

# Ejecutar tests
Test-Get '/api/admin/zonas-seguras'
Test-Get '/api/admin/puntos-criticos'

# Compatibilidad legacy
Test-Get '/api/admin/lugares?tipo=zona_segura'
Test-Get '/api/admin/lugares?tipo=punto_critico'

# Crear y validar creación
Test-Post '/api/admin/zonas-seguras' @{ nombre = 'ZonaTest'; descripcion = 'creada por test'; latitud = -0.1; longitud = -78.5 }
Test-Post '/api/admin/puntos-criticos' @{ nombre = 'PuntoTest'; descripcion = 'creado por test'; latitud = -0.2; longitud = -78.6 }

# Volver a listar
Test-Get '/api/admin/zonas-seguras'
Test-Get '/api/admin/puntos-criticos'
