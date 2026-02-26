# LOSTLINK - COMPLETE PROJECT DOCUMENTATION

## PROJECT OVERVIEW

**Project Name:** LostLink - Lost & Found Management System
**Developer:** Raj Thakur
**Contact:** thakurraj80898@gmail.com
**Type:** Web Application
**Status:** Fully Functional

---

## TABLE OF CONTENTS

1. Project Introduction
2. Technology Stack
3. System Architecture
4. Database Design
5. Features Implementation
6. API Endpoints
7. Installation Guide
8. Deployment Guide
9. User Guide
10. Testing
11. Future Enhancements

---

## 1. PROJECT INTRODUCTION

### What is LostLink?

LostLink is a comprehensive web-based platform that connects people who lose items with those who find them. It solves the problem of lost items through technology, QR codes, and automated notifications.

### Key Features:
- Report lost and found items
- Intelligent matching system
- Personal QR codes for belongings
- Public links for non-app users
- Email notifications
- Secure authentication
- Mobile-responsive design

### Problem Solved:
- No centralized platform for lost & found
- Difficult to connect finders with owners
- No preventive measures for belongings
- Existing solutions require app installation

---

## 2. TECHNOLOGY STACK

### Frontend:
- **Next.js 14** - React framework with SSR
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Validation
- **QRCode.js** - QR generation

### Backend:
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma ORM** - Database toolkit
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Multer** - File uploads
- **Helmet** - Security
- **CORS** - Cross-origin
- **Express Rate Limit** - Rate limiting

### Database:
- **PostgreSQL** - Relational database
- **Supabase** - Cloud hosting

### Development Tools:
- VS Code
- Git & GitHub
- Postman
- npm
- Prisma Studio

---

## 3. SYSTEM ARCHITECTURE

### Architecture Pattern:
Client-Server Architecture with RESTful API

### Components:

**Frontend (Client):**
- Next.js application
- Runs on port 3000
- Handles UI/UX
- Makes API calls to backend
- Manages client-side state

**Backend (Server):**
- Express.js API server
- Runs on port 5000
- Handles business logic
- Database operations
- Authentication
- Email notifications

**Database:**
- PostgreSQL on Supabase
- Stores all application data
- Cloud-hosted
- Automatic backups

### Data Flow:
1. User interacts with frontend
2. Frontend sends HTTP request to backend API
3. Backend validates and processes request
4. Backend queries/updates database
5. Backend sends response to frontend
6. Frontend updates UI

---

## 4. DATABASE DESIGN

### Tables:

**1. User Table**
```sql
- id: TEXT (Primary Key, UUID)
- name: TEXT
- email: TEXT (Unique)
- password: TEXT (Hashed)
- phone: TEXT (Optional)
- role: ENUM (USER, ADMIN, BLOCKED)
- createdAt: TIMESTAMP
```

**2. LostItem Table**
```sql
- id: TEXT (Primary Key, UUID)
- title: TEXT
- description: TEXT
- category: TEXT
- location: TEXT
- dateLost: TIMESTAMP
- images: TEXT[] (Array)
- status: ENUM (LOST, MATCHED)
- userId: TEXT (Foreign Key → User)
- createdAt: TIMESTAMP
```

**3. FoundItem Table**
```sql
- id: TEXT (Primary Key, UUID)
- title: TEXT
- description: TEXT
- category: TEXT
- location: TEXT
- dateFound: TIMESTAMP
- images: TEXT[] (Array)
- status: ENUM (FOUND, MATCHED)
- userId: TEXT (Foreign Key → User)
- createdAt: TIMESTAMP
```

**4. MatchRequest Table**
```sql
- id: TEXT (Primary Key, UUID)
- lostItemId: TEXT (Foreign Key → LostItem)
- foundItemId: TEXT (Foreign Key → FoundItem)
- requesterId: TEXT (Foreign Key → User)
- message: TEXT (Optional)
- status: ENUM (PENDING, APPROVED, REJECTED)
- createdAt: TIMESTAMP
```

### Relationships:
- One User → Many LostItems
- One User → Many FoundItems
- One User → Many MatchRequests
- One LostItem → Many MatchRequests
- One FoundItem → Many MatchRequests

### Indexes:
- User.email (Unique index)
- LostItem.userId, category, status, createdAt
- FoundItem.userId, category, status, createdAt
- MatchRequest.lostItemId, foundItemId, requesterId, status

---

## 5. FEATURES IMPLEMENTATION

### 5.1 User Authentication

**Registration:**
- File: `app/register/page.tsx`
- API: `POST /api/auth/register`
- Password hashed with bcrypt
- JWT token generated
- Cookie stored

**Login:**
- File: `app/login/page.tsx`
- API: `POST /api/auth/login`
- Credentials validated
- JWT token issued
- Redirects to dashboard

**Logout:**
- API: `POST /api/auth/logout`
- Cookie cleared
- Redirects to home

### 5.2 Lost Item Reporting

**Frontend:**
- File: `app/report-lost/page.tsx`
- Form with validation (Zod schema)
- Image upload support
- Category dropdown

**Backend:**
- API: `POST /api/lost`
- Controller: `lost.controller.ts`
- Saves to database
- Returns item with ID

**Features:**
- Multiple image upload
- Form validation
- Error handling
- Success redirect

### 5.3 Found Item Reporting

**Frontend:**
- File: `app/report-found/page.tsx`
- Similar to lost item form

**Backend:**
- API: `POST /api/found`
- Controller: `found.controller.ts`
- Automatic matching logic
- Email notifications sent

**Matching Algorithm:**
```typescript
- Match by category
- Match by location proximity
- Match by date range
- Keyword matching in title/description
```

### 5.4 Personal QR Code System

**Frontend:**
- File: `app/dashboard/my-qr/page.tsx`
- QRCode.js library
- Customizable contact info
- Download functionality

**Features:**
- Live QR preview
- Customizable message
- Download as PNG
- Print option

**Contact Page:**
- File: `app/contact/[id]/page.tsx`
- Public access (no login)
- Display owner details
- Email/WhatsApp/Call buttons

### 5.5 Public Link Sharing

**Share Component:**
- File: `components/ShareItem.tsx`
- Modal with QR code
- Copy link button
- WhatsApp share
- Download QR

**Public Report Page:**
- File: `app/public/lost/[id]/page.tsx`
- No authentication required
- Form for finder details
- Email sent to owner

**Backend:**
- API: `GET /api/public/lost/:id`
- API: `POST /api/public/lost/:id/found`
- Controller: `public.controller.ts`

### 5.6 Email Notifications

**Service:**
- File: `services/notification.service.ts`
- Uses Nodemailer
- HTML email templates

**Email Types:**
1. Match found (to owner)
2. Match found (to finder)
3. Public report (to owner)
4. Thank you (to finder)

**Configuration:**
- SMTP settings in `.env`
- Gmail or SendGrid

### 5.7 Dashboard

**My Reports:**
- File: `app/dashboard/my-reports/page.tsx`
- Lists all user's items
- Lost and found items
- Share button for lost items
- View/Edit/Delete actions

**Features:**
- Real-time data fetching
- Image thumbnails
- Status badges
- Action buttons

### 5.8 Browse Items

**Browse Lost:**
- File: `app/browse-lost/page.tsx`
- All lost items
- Search and filter
- Pagination

**Browse Found:**
- File: `app/browse-found/page.tsx`
- All found items
- Similar features

---

## 6. API ENDPOINTS

### Authentication:
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
POST   /api/auth/logout      - Logout user
GET    /api/auth/me          - Get current user
```

### Lost Items:
```
POST   /api/lost             - Create lost item
GET    /api/lost             - Get all lost items
GET    /api/lost/:id         - Get single lost item
PUT    /api/lost/:id         - Update lost item
DELETE /api/lost/:id         - Delete lost item
```

### Found Items:
```
POST   /api/found            - Create found item
GET    /api/found            - Get all found items
GET    /api/found/:id        - Get single found item
PUT    /api/found/:id        - Update found item
DELETE /api/found/:id        - Delete found item
```

### Match Requests:
```
POST   /api/match/request    - Create match request
GET    /api/match            - Get user's match requests
POST   /api/match/:id/approve - Approve match
POST   /api/match/:id/reject  - Reject match
```

### Public Access:
```
GET    /api/public/lost/:id         - Get lost item (public)
POST   /api/public/lost/:id/found   - Report found (public)
```

### Admin:
```
GET    /api/admin/users      - Get all users
GET    /api/admin/items      - Get all items
GET    /api/admin/stats      - Get statistics
```

---

## 7. INSTALLATION GUIDE

### Prerequisites:
- Node.js 18+
- PostgreSQL or Supabase account
- Git

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd LostLink
```

### Step 2: Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### Step 3: Setup Database

**Option A: Supabase (Recommended)**
1. Go to supabase.com
2. Create new project
3. Get connection string
4. Copy to `backend/.env`

**Option B: Local PostgreSQL**
1. Install PostgreSQL
2. Create database: `createdb lostlink`
3. Update connection string

### Step 4: Configure Environment Variables

**Backend `.env`:**
```env
PORT=5000
DATABASE_URL="postgresql://..."
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development

SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

FRONTEND_URL=http://localhost:3000
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 5: Setup Database Schema

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### Step 6: Create ENUM Types (Supabase)

Run in Supabase SQL Editor:
```sql
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'BLOCKED');
CREATE TYPE "ItemStatus" AS ENUM ('LOST', 'MATCHED');
CREATE TYPE "FoundItemStatus" AS ENUM ('FOUND', 'MATCHED');
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
```

### Step 7: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 8: Access Application
```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

---

## 8. DEPLOYMENT GUIDE

### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel:**
1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Add environment variables
5. Deploy

**Backend on Railway:**
1. Go to railway.app
2. New project from GitHub
3. Add environment variables
4. Deploy

### Option 2: Full Stack on Render

1. Create web service
2. Connect GitHub
3. Add environment variables
4. Deploy

### Environment Variables for Production:
- Update `FRONTEND_URL` to production URL
- Update `DATABASE_URL` to production database
- Set `NODE_ENV=production`
- Use production SMTP credentials

---

## 9. USER GUIDE

### For Item Owners:

**Step 1: Register/Login**
- Go to website
- Click Register
- Fill details
- Login

**Step 2: Report Lost Item**
- Click "Report Lost Item"
- Fill form (title, category, location, date, description)
- Upload images
- Submit

**Step 3: Share**
- Go to "My Reports"
- Click "Share & Get QR"
- Copy link or download QR
- Share on WhatsApp/social media
- Print QR and stick on belongings

**Step 4: Wait for Match**
- System automatically matches
- Email notification when found
- Connect with finder

### For Finders:

**Option 1: Scan QR Code**
- Scan QR on item
- Lands on contact page
- Call/Email/WhatsApp owner directly

**Option 2: Use Public Link**
- Open shared link
- Fill form with details
- Submit
- Owner gets email

**Option 3: Register and Report**
- Register on platform
- Report found item
- System matches automatically
- Owner gets notified

---

## 10. TESTING

### Manual Testing Done:

**Authentication:**
✅ Registration with valid data
✅ Registration with duplicate email (error)
✅ Login with correct credentials
✅ Login with wrong credentials (error)
✅ Logout functionality
✅ Protected routes (redirect if not logged in)

**Lost Item:**
✅ Create lost item with images
✅ View all lost items
✅ Edit own lost item
✅ Delete own lost item
✅ Cannot edit others' items

**Found Item:**
✅ Create found item
✅ Automatic matching works
✅ Email sent to matched owners
✅ View all found items

**QR Code:**
✅ Generate personal QR
✅ Download QR as PNG
✅ Scan QR lands on contact page
✅ Contact buttons work (email, WhatsApp, call)

**Public Link:**
✅ Share button generates link
✅ Public link accessible without login
✅ Public form submission works
✅ Owner receives email

**Email Notifications:**
✅ Match found email sent
✅ Public report email sent
✅ Thank you email sent to finder
✅ HTML formatting correct

**Security:**
✅ Passwords hashed
✅ JWT tokens working
✅ Protected API endpoints
✅ Rate limiting active
✅ CORS configured

**Responsive Design:**
✅ Works on mobile
✅ Works on tablet
✅ Works on desktop
✅ All features accessible

---

## 11. FUTURE ENHANCEMENTS

### Phase 1 (Short-term):
1. Mobile apps (Android/iOS)
2. SMS notifications
3. In-app chat
4. Advanced search with filters
5. Reward system

### Phase 2 (Mid-term):
6. AI image recognition
7. GPS location tracking
8. Social media login
9. Multi-language support
10. Blockchain integration

### Phase 3 (Long-term):
11. Police database integration
12. IoT device integration
13. AR-based search
14. Voice assistant support
15. Insurance integration

---

## PROJECT STATISTICS

**Lines of Code:** ~10,000+
**Files Created:** 50+
**API Endpoints:** 20+
**Database Tables:** 4
**Features:** 15+
**Development Time:** [Your duration]

---

## FOLDER STRUCTURE

```
LostLink/
├── app/
│   ├── browse-found/
│   ├── browse-lost/
│   ├── contact/[id]/
│   ├── dashboard/
│   │   ├── admin/
│   │   ├── match-requests/
│   │   ├── my-qr/
│   │   └── my-reports/
│   ├── item/[id]/
│   ├── login/
│   ├── public/lost/[id]/
│   ├── register/
│   ├── report-found/
│   ├── report-lost/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.ts
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── components/
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── ShareItem.tsx
│   └── Sidebar.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   ├── api.ts
│   ├── mockData.ts
│   └── validations.ts
├── public/
│   └── manifest.json
├── .env.local
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## IMPORTANT FILES

### Configuration Files:
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `tailwind.config.ts` - Tailwind config
- `next.config.js` - Next.js config
- `.env` - Environment variables
- `prisma/schema.prisma` - Database schema

### Key Components:
- `AuthContext.tsx` - Authentication state
- `Navbar.tsx` - Navigation bar
- `Footer.tsx` - Footer with creator info
- `ShareItem.tsx` - QR code modal
- `Sidebar.tsx` - Dashboard sidebar

### Key Pages:
- `page.tsx` - Landing page
- `login/page.tsx` - Login page
- `register/page.tsx` - Registration
- `report-lost/page.tsx` - Report lost item
- `report-found/page.tsx` - Report found item
- `dashboard/my-reports/page.tsx` - User reports
- `dashboard/my-qr/page.tsx` - QR generator

### Backend Files:
- `server.ts` - Express server
- `auth.controller.ts` - Auth logic
- `lost.controller.ts` - Lost items logic
- `found.controller.ts` - Found items logic
- `public.controller.ts` - Public access
- `notification.service.ts` - Email service

---

## TROUBLESHOOTING

### Common Issues:

**1. Database Connection Error**
- Check Supabase project is active
- Verify DATABASE_URL is correct
- Ensure ENUM types are created

**2. Email Not Sending**
- Check SMTP credentials
- Enable "Less secure apps" for Gmail
- Use app-specific password

**3. Images Not Uploading**
- Check uploads folder exists
- Verify Multer configuration
- Check file size limits

**4. Login Failed**
- Clear browser cookies
- Check JWT_SECRET is set
- Verify password is correct

**5. Port Already in Use**
- Kill process: `npx kill-port 5000`
- Or change port in .env

---

## CREDITS

**Developer:** Raj Thakur
**Email:** thakurraj80898@gmail.com
**Project:** Final Year Project
**Year:** 2024-2025

**Technologies Used:**
- Next.js Team
- React Team
- Prisma Team
- Supabase Team
- All open-source contributors

---

## LICENSE

This project is created for educational purposes.

---

## CONTACT & SUPPORT

For any queries or support:
- Email: thakurraj80898@gmail.com
- Project: LostLink

---

**© 2024 LostLink. Created by Raj Thakur**

---

## CONCLUSION

LostLink successfully demonstrates a full-stack web application with modern technologies, solving a real-world problem. The project showcases skills in:

- Frontend development (React, Next.js)
- Backend development (Node.js, Express)
- Database design (PostgreSQL, Prisma)
- Authentication & Security
- API development
- Email integration
- QR code generation
- Responsive design
- Cloud deployment

The application is production-ready and can be deployed for real-world use.
