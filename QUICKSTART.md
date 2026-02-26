# Quick Start Guide

## Prerequisites

1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **PostgreSQL** (v15 or higher)
   - Download: https://www.postgresql.org/download/
   - Or use Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:15`

## Setup Steps

### Option 1: Automated (Windows)
```bash
# Double-click start.bat
# Or run in terminal:
start.bat
```

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install
cd backend
npm install

# 2. Setup database
# Create PostgreSQL database named 'lostlink'
# Update backend/.env with your DATABASE_URL

# 3. Generate Prisma client
npx prisma generate

# 4. Run migrations
npx prisma migrate dev --name init

# 5. Start backend (Terminal 1)
npm run dev

# 6. Start frontend (Terminal 2)
cd ..
npm run dev
```

## Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## Default Database URL

Update `backend/.env`:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lostlink"
```

## Test the Application

1. Open http://localhost:3000
2. Click "Register" to create an account
3. Login with your credentials
4. Try "Report Lost Item"
5. Try "Report Found Item"
6. Browse items and test matching

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

### Database Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Create database: `createdb lostlink`

### Prisma Errors
```bash
cd backend
npx prisma generate
npx prisma migrate reset
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Stop Application

Press `Ctrl+C` in both terminal windows

## Next Steps

- Create admin user (set role to ADMIN in database)
- Configure email settings in backend/.env
- Setup AWS S3 for production image storage
- Follow DEPLOYMENT.md for production deployment
