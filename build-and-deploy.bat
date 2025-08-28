@echo off
echo ====================================
echo  Techtornix Production Build Script
echo ====================================

echo.
echo [1/3] Installing dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo Error: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo [2/3] Building React app for production...
call npm run build
if errorlevel 1 (
    echo Error: Build failed
    pause
    exit /b 1
)

echo.
echo [3/3] Copying .htaccess to build folder...
copy .htaccess build\.htaccess
if errorlevel 1 (
    echo Warning: Could not copy .htaccess file
)

echo.
echo ====================================
echo  BUILD COMPLETED SUCCESSFULLY!
echo ====================================
echo.
echo Next steps:
echo 1. Upload contents of 'frontend/build' folder to Hostinger public_html
echo 2. Deploy backend to Railway with environment variables
echo 3. Update MongoDB Atlas connection string
echo.
echo Files ready for deployment:
echo - Frontend: frontend/build/ folder
echo - Backend: Complete backend/ folder
echo.
pause
