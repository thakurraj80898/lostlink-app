@echo off
echo ========================================
echo Starting LostLink Application
echo ========================================
echo.

echo [1/6] Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend dependencies installation failed
    pause
    exit /b 1
)

echo.
echo [2/6] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend dependencies installation failed
    pause
    exit /b 1
)

echo.
echo [3/6] Generating Prisma client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: Prisma generation failed
    pause
    exit /b 1
)

echo.
echo [4/6] Running database migrations...
call npx prisma migrate dev --name init
if %errorlevel% neq 0 (
    echo ERROR: Database migration failed
    echo Make sure PostgreSQL is running and DATABASE_URL is correct in .env
    pause
    exit /b 1
)

echo.
echo [5/6] Starting backend server...
start "LostLink Backend" cmd /k "npm run dev"

echo.
echo [6/6] Starting frontend server...
cd ..
start "LostLink Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo LostLink is starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul
