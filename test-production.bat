@echo off
echo ====================================
echo  Testing Production Deployment
echo ====================================

echo.
echo [1] Testing Frontend (Hostinger):
echo URL: https://techtornix.com
echo.

echo [2] Testing Backend Health (Railway):
echo Replace YOUR-RAILWAY-URL with actual Railway URL
echo curl -X GET https://YOUR-RAILWAY-URL.railway.app/api/health
echo.

echo [3] Testing CORS Integration:
echo This will test if frontend can connect to backend
echo.

echo [4] Testing Admin Login:
echo curl -X POST https://YOUR-RAILWAY-URL.railway.app/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"bahawal.dev@gmail.com\",\"password\":\"Bahawal@6432\"}"
echo.

echo ====================================
echo  Manual Testing Checklist:
echo ====================================
echo.
echo [ ] Frontend loads at https://techtornix.com
echo [ ] All pages accessible (Home, Services, Portfolio, etc.)
echo [ ] React routing works (refresh any page)
echo [ ] Contact form submits successfully
echo [ ] Admin login works
echo [ ] No CORS errors in browser console
echo [ ] Mobile responsive design
echo.

echo ====================================
echo  Deployment URLs:
echo ====================================
echo Frontend: https://techtornix.com
echo Backend: https://YOUR-RAILWAY-URL.railway.app
echo Admin Panel: https://techtornix.com/admin
echo.
pause
