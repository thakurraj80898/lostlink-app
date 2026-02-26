# LostLink - Complete Feature Testing Checklist

## ✅ Authentication & Authorization

### User Registration
- [ ] POST /api/auth/register
  - [ ] Validates name, email, password (min 6 chars)
  - [ ] Hashes password with bcrypt
  - [ ] Creates user in database
  - [ ] Generates JWT token (7 days)
  - [ ] Sets HTTP-only cookie
  - [ ] Returns user data (no password)
  - [ ] Rate limited (5 attempts/15min)

### User Login
- [ ] POST /api/auth/login
  - [ ] Validates email and password
  - [ ] Compares hashed password
  - [ ] Generates JWT token
  - [ ] Sets HTTP-only cookie
  - [ ] Returns user with role
  - [ ] Rate limited (5 attempts/15min)

### User Logout
- [ ] POST /api/auth/logout
  - [ ] Clears token cookie
  - [ ] Returns success

### Get Current User
- [ ] GET /api/auth/me
  - [ ] Requires authentication
  - [ ] Returns user data with role
  - [ ] Returns 401 if not authenticated

## ✅ Lost Items

### Create Lost Item
- [ ] POST /api/lost
  - [ ] Requires authentication
  - [ ] Checks if user is blocked
  - [ ] Validates: title, category, location, dateLost, description (min 20 chars)
  - [ ] Uploads up to 5 images (max 5MB each)
  - [ ] Supports jpg, png, webp only
  - [ ] Stores in S3 (production) or local (development)
  - [ ] Creates item in database
  - [ ] Returns created item

### Get All Lost Items
- [ ] GET /api/lost
  - [ ] Public access (no auth required)
  - [ ] Pagination: ?page=1&limit=10
  - [ ] Filter by category: ?category=Wallet
  - [ ] Filter by location: ?location=Park (partial match)
  - [ ] Search by title: ?search=iPhone
  - [ ] Returns items with user info
  - [ ] Returns pagination metadata
  - [ ] Ordered by newest first

### Get Single Lost Item
- [ ] GET /api/lost/:id
  - [ ] Public access
  - [ ] Returns item with user details
  - [ ] Returns 404 if not found

### Update Lost Item
- [ ] PUT /api/lost/:id
  - [ ] Requires authentication
  - [ ] Checks if user is blocked
  - [ ] Validates all fields
  - [ ] Only owner can update
  - [ ] Returns 403 if not owner
  - [ ] Updates images if provided
  - [ ] Returns updated item

### Delete Lost Item
- [ ] DELETE /api/lost/:id
  - [ ] Requires authentication
  - [ ] Checks if user is blocked
  - [ ] Only owner can delete
  - [ ] Returns 403 if not owner
  - [ ] Deletes from database
  - [ ] Returns success

## ✅ Found Items

### Create Found Item
- [ ] POST /api/found
  - [ ] Requires authentication
  - [ ] Checks if user is blocked
  - [ ] Validates: title, category, location, dateFound, description (min 20 chars)
  - [ ] Uploads up to 5 images (max 5MB each)
  - [ ] Automatically searches for matching lost items
  - [ ] Returns item + potential matches

### Get All Found Items
- [ ] GET /api/found
  - [ ] Public access
  - [ ] Pagination support
  - [ ] Filter by category
  - [ ] Filter by location
  - [ ] Search by title
  - [ ] Returns items with pagination

### Get Single Found Item
- [ ] GET /api/found/:id
  - [ ] Public access
  - [ ] Returns item with user details
  - [ ] Returns 404 if not found

### Get Potential Matches
- [ ] GET /api/found/:id/matches
  - [ ] Returns matching lost items
  - [ ] Matches by: same category + similar location + title keywords

### Update Found Item
- [ ] PUT /api/found/:id
  - [ ] Requires authentication
  - [ ] Checks if user is blocked
  - [ ] Only owner can update
  - [ ] Returns 403 if not owner

### Delete Found Item
- [ ] DELETE /api/found/:id
  - [ ] Requires authentication
  - [ ] Checks if user is blocked
  - [ ] Only owner can delete
  - [ ] Returns 403 if not owner

## ✅ Matching System

### Send Match Request
- [ ] POST /api/match/request
  - [ ] Requires authentication
  - [ ] Checks if user is blocked
  - [ ] Validates lostItemId and foundItemId
  - [ ] Prevents duplicate requests (same items + requester)
  - [ ] Creates match request
  - [ ] Sends email to lost item owner
  - [ ] Returns match request

### Get Match Requests
- [ ] GET /api/match/requests
  - [ ] Requires authentication
  - [ ] Returns requests for user's lost items
  - [ ] Includes item details and requester info
  - [ ] Ordered by newest first

### Approve Match
- [ ] POST /api/match/:id/approve
  - [ ] Requires authentication
  - [ ] Checks if user is blocked
  - [ ] Only lost item owner can approve
  - [ ] Returns 403 if not owner
  - [ ] Updates match status to APPROVED
  - [ ] Marks both items as MATCHED (atomic transaction)
  - [ ] Returns success

### Reject Match
- [ ] POST /api/match/:id/reject
  - [ ] Requires authentication
  - [ ] Checks if user is blocked
  - [ ] Only lost item owner can reject
  - [ ] Returns 403 if not owner
  - [ ] Updates match status to REJECTED
  - [ ] Returns success

## ✅ Admin Features

### Get All Users
- [ ] GET /api/admin/users
  - [ ] Requires ADMIN role
  - [ ] Returns 403 if not admin
  - [ ] Returns all users with stats
  - [ ] Includes item counts per user
  - [ ] Ordered by newest first

### Get Dashboard Stats
- [ ] GET /api/admin/stats
  - [ ] Requires ADMIN role
  - [ ] Returns total users, lost items, found items, matches
  - [ ] Returns recent activity (last 30 days)

### Delete User
- [ ] DELETE /api/admin/user/:id
  - [ ] Requires ADMIN role
  - [ ] Deletes user account
  - [ ] Cascade deletes all user's items

### Delete Item
- [ ] DELETE /api/admin/item/:id
  - [ ] Requires ADMIN role
  - [ ] Deletes item (lost or found)
  - [ ] Returns success

### Block User
- [ ] POST /api/admin/user/:id/block
  - [ ] Requires ADMIN role
  - [ ] Sets user role to BLOCKED
  - [ ] Blocked users cannot create/update/delete items
  - [ ] Returns updated user

## ✅ Security Features

### Helmet Middleware
- [ ] XSS protection enabled
- [ ] Content security policy
- [ ] Cross-origin resource policy

### CORS Configuration
- [ ] Specific origin whitelist
- [ ] Credentials enabled
- [ ] Allowed methods: GET, POST, PUT, DELETE

### Rate Limiting
- [ ] General API: 100 req/15min
- [ ] Auth endpoints: 5 req/15min
- [ ] Returns 429 when exceeded

### Input Sanitization
- [ ] NoSQL injection prevention
- [ ] HTML tag removal
- [ ] Whitespace trimming

### Error Handling
- [ ] Production: Generic error messages
- [ ] Development: Detailed errors
- [ ] Console logs for debugging

### Environment Protection
- [ ] Validates required env vars on startup
- [ ] JWT_SECRET min 32 chars
- [ ] Throws error if missing

## ✅ File Upload

### Image Upload
- [ ] Max 5 images per item
- [ ] Max 5MB per image
- [ ] Only jpg, png, webp allowed
- [ ] Rejects other formats
- [ ] Returns error if size exceeded

### Storage Options
- [ ] Local storage (USE_S3=false)
  - [ ] Saves to /uploads directory
  - [ ] Serves via /uploads route
- [ ] AWS S3 (USE_S3=true)
  - [ ] Uploads to S3 bucket
  - [ ] Returns public S3 URLs
  - [ ] Deletes local temp files

## ✅ Frontend Features

### Pages
- [ ] Home page with hero and recent items
- [ ] Register page with validation
- [ ] Login page with validation
- [ ] Dashboard with stats
- [ ] Report Lost Item form
- [ ] Report Found Item form
- [ ] Browse Lost Items (grid + filters)
- [ ] Browse Found Items (grid + filters)
- [ ] Item Detail page
- [ ] My Reports page
- [ ] Match Requests page
- [ ] Admin Panel

### Authentication
- [ ] AuthContext manages user state
- [ ] Auto-login on page load
- [ ] Protected routes redirect to login
- [ ] Logout clears state
- [ ] Navbar shows user status

### Form Validation
- [ ] Zod + React Hook Form
- [ ] Title required
- [ ] Category required
- [ ] Location required
- [ ] Date required
- [ ] Description min 20 chars
- [ ] Image max 5MB
- [ ] Inline error messages

### API Integration
- [ ] Axios centralized API service
- [ ] All CRUD operations
- [ ] Error handling
- [ ] Loading states

## ✅ Database

### Models
- [ ] User (id, name, email, password, phone, role, createdAt)
- [ ] LostItem (id, title, description, category, location, dateLost, images[], status, userId, createdAt)
- [ ] FoundItem (id, title, description, category, location, dateFound, images[], status, userId, createdAt)
- [ ] MatchRequest (id, lostItemId, foundItemId, requesterId, message, status, createdAt)

### Enums
- [ ] Role: USER, ADMIN, BLOCKED
- [ ] ItemStatus: LOST, MATCHED
- [ ] FoundItemStatus: FOUND, MATCHED
- [ ] MatchStatus: PENDING, APPROVED, REJECTED

### Indexes
- [ ] User: email
- [ ] LostItem: userId, category, status, createdAt
- [ ] FoundItem: userId, category, status, createdAt
- [ ] MatchRequest: lostItemId, foundItemId, requesterId, status

### Relations
- [ ] User -> LostItems (one-to-many)
- [ ] User -> FoundItems (one-to-many)
- [ ] User -> MatchRequests (one-to-many)
- [ ] LostItem -> MatchRequests (one-to-many)
- [ ] FoundItem -> MatchRequests (one-to-many)
- [ ] Cascade delete on user deletion

## ✅ Deployment

### Backend
- [ ] Dockerfile created
- [ ] docker-compose.yml configured
- [ ] Health check endpoint
- [ ] Environment variables template
- [ ] Nginx configuration
- [ ] SSL ready

### Frontend
- [ ] Next.js production build
- [ ] Image optimization
- [ ] Compression enabled
- [ ] Vercel configuration

### Infrastructure
- [ ] AWS RDS setup script
- [ ] S3 bucket configuration
- [ ] EC2 deployment guide
- [ ] Domain configuration
- [ ] CI/CD workflow

## 🧪 Testing Commands

```bash
# Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev

# Frontend
cd ..
npm install
npm run dev

# Test API
curl http://localhost:5000/health
curl http://localhost:5000/api/lost

# Test Frontend
open http://localhost:3000
```

## 📋 Manual Testing Flow

1. **Register** → Create account → Verify JWT cookie set
2. **Login** → Login with credentials → Verify redirect to dashboard
3. **Report Lost** → Fill form → Upload images → Submit
4. **Report Found** → Fill form → See potential matches
5. **Browse Items** → Filter by category → Search by keyword
6. **Send Match Request** → Click on item → Send request
7. **Approve Match** → Lost owner approves → Both items marked MATCHED
8. **Admin Panel** → Login as admin → View stats → Block user
9. **Blocked User** → Try to create item → Get 403 error
10. **Logout** → Logout → Verify redirect to home

## ✅ All Features Status

**Total Features: 100+**
**Implementation: Complete**
**Security: Production-ready**
**Deployment: Configured**

All features are implemented and ready for testing!
