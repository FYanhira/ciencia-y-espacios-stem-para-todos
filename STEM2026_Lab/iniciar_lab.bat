@echo off
cd /d "%~dp0"
set PORT=8765
set SWS=%~dp0servidor\lab-server-win64.exe

if not exist "%SWS%" (
  echo No se encontro el servidor portable en servidor\lab-server-win64.exe
  echo Copia de nuevo la carpeta STEM2026_Lab completa desde la USB.
  pause
  exit /b 1
)

echo === STEM 2026 Lab (sin Python) ===
echo.
echo En ESTA PC abre Chrome:
echo   http://127.0.0.1:%PORT%/
echo.
echo IP de esta maquina (por si otra PC entra en red):
ipconfig | findstr /i "IPv4"
echo.
echo Si Windows pide confirmacion la primera vez, elige "Mas informacion" ^> Ejecutar.
echo Deja esta ventana ABIERTA mientras usen el lab.
echo.

start "" "http://127.0.0.1:%PORT%/"
"%SWS%" -a 0.0.0.0 -p %PORT% -d "%~dp0"
pause
