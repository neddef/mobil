@echo off
echo Backend sunucusu baslaniyor...
cd yeni-backend
echo Eski server durduruluyor (varsa)...
taskkill /F /IM node.exe /T >NUL 2>&1
timeout /t 1
echo Server yeniden baslatiliyor...
npm run dev 