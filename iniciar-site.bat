@echo off
cd /d "%~dp0"
echo Iniciando o site em http://localhost:3000 ...
start "" http://localhost:3000
npx --yes serve . -l 3000
pause
