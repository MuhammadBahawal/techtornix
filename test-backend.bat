@echo off
echo ====================================
echo  Testing Techtornix Backend APIs
echo ====================================

echo.
echo Testing backend locally first...
cd backend
echo Starting backend server...
start "Backend Server" cmd /k "npm run dev"

echo.
echo Waiting 10 seconds for server to start...
timeout /t 10 /nobreak > nul

echo.
echo Testing local endpoints:
echo.

echo [1] Health Check:
curl -X GET http://localhost:5000/api/health
echo.
echo.

echo [2] Admin Login Test:
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"bahawal.dev@gmail.com\",\"password\":\"Bahawal@6432\"}"
echo.
echo.

echo [3] Services Endpoint:
curl -X GET http://localhost:5000/api/services
echo.
echo.

echo ====================================
echo  Local Backend Test Complete
echo ====================================
echo.
echo Next: Deploy to Railway and test production URLs
pause
