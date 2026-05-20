@echo off
REM Frontend Setup Script for Windows
REM This script creates the required directory structure and copies files

setlocal enabledelayedexpansion

cd /d "%~dp0\frontend" || (
    echo Error: Could not change to frontend directory
    exit /b 1
)

echo Creating directory structure...

if not exist "usuario\html" mkdir "usuario\html" && echo - Created: usuario\html
if not exist "usuario\js" mkdir "usuario\js" && echo - Created: usuario\js
if not exist "ingreso\css" mkdir "ingreso\css" && echo - Created: ingreso\css

echo.
echo Copying user section files...

if exist "administrador\html\user-index.html" (
    copy "administrador\html\user-index.html" "usuario\html\index.html" >nul && echo - Copied: user-index.html to usuario/html/index.html
) else (
    echo - Warning: administrador\html\user-index.html not found
)

if exist "administrador\html\user-libros.html" (
    copy "administrador\html\user-libros.html" "usuario\html\libros.html" >nul && echo - Copied: user-libros.html to usuario/html/libros.html
) else (
    echo - Warning: administrador\html\user-libros.html not found
)

if exist "administrador\html\user-mis-prestamos.html" (
    copy "administrador\html\user-mis-prestamos.html" "usuario\html\mis-prestamos.html" >nul && echo - Copied: user-mis-prestamos.html to usuario/html/mis-prestamos.html
) else (
    echo - Warning: administrador\html\user-mis-prestamos.html not found
)

if exist "administrador\js\user-verificacion.js" (
    copy "administrador\js\user-verificacion.js" "usuario\js\user-verificacion.js" >nul && echo - Copied: user-verificacion.js
) else (
    echo - Warning: administrador\js\user-verificacion.js not found
)

if exist "administrador\js\user-libros.js" (
    copy "administrador\js\user-libros.js" "usuario\js\user-libros.js" >nul && echo - Copied: user-libros.js
) else (
    echo - Warning: administrador\js\user-libros.js not found
)

if exist "administrador\js\user-prestamos.js" (
    copy "administrador\js\user-prestamos.js" "usuario\js\user-prestamos.js" >nul && echo - Copied: user-prestamos.js
) else (
    echo - Warning: administrador\js\user-prestamos.js not found
)

if exist "administrador\css\ingreso.css" (
    copy "administrador\css\ingreso.css" "ingreso\css\ingreso.css" >nul && echo - Copied: ingreso.css
) else (
    echo - Warning: administrador\css\ingreso.css not found
)

echo.
echo ✓ Setup complete!
echo.
echo Next steps:
echo 1. Ensure the backend API is running on http://localhost:8080
echo 2. Open ingreso/ingreso.html in your browser
echo 3. Login with your credentials
echo.
pause
