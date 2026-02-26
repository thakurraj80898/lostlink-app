# LostLink Backend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Update `.env` file with your PostgreSQL database URL:
```
DATABASE_URL="postgresql://username:password@localhost:5432/lostlink"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Database Migration
```bash
npx prisma migrate dev --name init
```

### 5. Start Development Server
```bash
npm run dev
```

Server will run on http://localhost:5000

## Database Schema

- **User**: id, name, email, password, phone, role (USER/ADMIN), createdAt
- **LostItem**: id, title, description, category, location, dateLost, images[], status (LOST/MATCHED), userId, createdAt
- **FoundItem**: id, title, description, category, location, dateFound, images[], status (FOUND/MATCHED), userId, createdAt
- **MatchRequest**: id, lostItemId, foundItemId, requesterId, message, status (PENDING/APPROVED/REJECTED), createdAt

## Indexes Created

- User: email
- LostItem: userId, category, status, createdAt
- FoundItem: userId, category, status, createdAt
- MatchRequest: lostItemId, foundItemId, requesterId, status
