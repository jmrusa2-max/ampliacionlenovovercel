@echo off
set TIMEOUT_SEC=240

echo.
echo 🚀 Servidor iniciado en http://localhost:3000
echo ⏳ Se cerrará automáticamente en 4 minutos.
echo 💡 Para cerrar antes: presiona Ctrl + C aquí, o cierra esta ventana.
echo.

start /B npm run dev
timeout /t %TIMEOUT_SEC% /nobreak >nul
taskkill /f /im node.exe >nul 2>&1

echo.
echo ✅ localhost:3000 cerrado automáticamente.
pause