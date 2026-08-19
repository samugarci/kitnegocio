@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title KitNegocio
chcp 65001 >nul

echo.
echo  KitNegocio
echo  Carpeta: %CD%
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] No encuentro Node.js.
  echo Instala la version LTS desde https://nodejs.org
  echo Reinicia el PC despues de instalar y vuelve a abrir este archivo.
  echo.
  pause
  exit /b 1
)

echo Node: 
node -v
echo npm:
call npm -v
echo.

if not exist "package.json" (
  echo [ERROR] Este archivo no esta en la carpeta del proyecto.
  echo Abre ABRIR-KITNEGOCIO.cmd desde la carpeta donde esta package.json.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Primera vez: instalando dependencias. Puede tardar unos minutos...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo [ERROR] npm install fallo. Revisa el mensaje de arriba.
    pause
    exit /b 1
  )
  echo.
)

if not exist ".env.local" (
  copy /y ".env.example" ".env.local" >nul
  echo Creado .env.local para modo demo.
  echo.
)

echo Arrancando http://127.0.0.1:3000/es
echo Deja ESTA ventana abierta. Si se cierra, Edge dira "conexion rechazada".
echo Cuando veas "Ready" puedes pulsar Actualizar en el navegador.
echo.

start "KitNegocio navegador" /min powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "for ($i=0; $i -lt 90; $i++) { try { $r = Invoke-WebRequest -Uri 'http://127.0.0.1:3000/es' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -eq 200) { Start-Process 'http://127.0.0.1:3000/es'; break } } catch {} ; Start-Sleep -Seconds 2 }"

call npm run dev
echo.
echo El servidor se detuvo. Si Edge no abre, copia el error de esta ventana.
pause
exit /b %ERRORLEVEL%
