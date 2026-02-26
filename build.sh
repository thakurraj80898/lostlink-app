#!/bin/bash

echo "Building LostLink for production..."

# Frontend
echo "Building frontend..."
cd /d/LostLink
npm run build

# Backend
echo "Building backend..."
cd backend
npm run build

echo "Build complete!"
echo ""
echo "Next steps:"
echo "1. Deploy frontend: vercel --prod"
echo "2. Deploy backend: docker-compose up -d"
echo "3. Run migrations: npx prisma migrate deploy"
