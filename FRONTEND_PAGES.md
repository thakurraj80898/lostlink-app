# LOSTLINK - FRONTEND PAGES

## Total Frontend Pages: 15+

---

## 1. HOME PAGE
**File:** `app/page.tsx`
**Route:** `/`
**Description:** Landing page with hero section, features, and recent items
**Features:**
- Animated gradient hero section
- How it works section
- Recent items display
- Call-to-action buttons

---

## 2. LOGIN PAGE
**File:** `app/login/page.tsx`
**Route:** `/login`
**Description:** User login page
**Features:**
- Email and password fields
- Form validation
- Error handling
- Redirect to dashboard after login

---

## 3. REGISTER PAGE
**File:** `app/register/page.tsx`
**Route:** `/register`
**Description:** User registration page
**Features:**
- Name, email, password fields
- Password confirmation
- Form validation
- Auto-login after registration

---

## 4. REPORT LOST ITEM PAGE
**File:** `app/report-lost/page.tsx`
**Route:** `/report-lost`
**Description:** Form to report lost items
**Features:**
- Title, category, location fields
- Date picker
- Description textarea
- Multiple image upload
- Form validation

---

## 5. REPORT FOUND ITEM PAGE
**File:** `app/report-found/page.tsx`
**Route:** `/report-found`
**Description:** Form to report found items
**Features:**
- Similar to lost item form
- Automatic matching on submit
- Email notifications triggered

---

## 6. BROWSE LOST ITEMS PAGE
**File:** `app/browse-lost/page.tsx`
**Route:** `/browse-lost`
**Description:** Browse all lost items
**Features:**
- Grid view of items
- Search functionality
- Category filter
- Pagination

---

## 7. BROWSE FOUND ITEMS PAGE
**File:** `app/browse-found/page.tsx`
**Route:** `/browse-found`
**Description:** Browse all found items
**Features:**
- Grid view of items
- Search and filter
- Pagination

---

## 8. DASHBOARD HOME PAGE
**File:** `app/dashboard/page.tsx`
**Route:** `/dashboard`
**Description:** User dashboard home
**Features:**
- Overview statistics
- Quick actions
- Recent activity

---

## 9. MY REPORTS PAGE
**File:** `app/dashboard/my-reports/page.tsx`
**Route:** `/dashboard/my-reports`
**Description:** View all user's reports
**Features:**
- List of lost items
- List of found items
- Share button for lost items
- Edit/delete options
- Status badges

---

## 10. MY QR CODE PAGE
**File:** `app/dashboard/my-qr/page.tsx`
**Route:** `/dashboard/my-qr`
**Description:** Generate personal QR code
**Features:**
- Customizable contact info
- Live QR preview
- Download QR as PNG
- Print option
- Usage instructions

---

## 11. MATCH REQUESTS PAGE
**File:** `app/dashboard/match-requests/page.tsx`
**Route:** `/dashboard/match-requests`
**Description:** View and manage match requests
**Features:**
- Incoming requests
- Approve/reject buttons
- Contact information display

---

## 12. ADMIN PANEL PAGE
**File:** `app/dashboard/admin/page.tsx`
**Route:** `/dashboard/admin`
**Description:** Admin dashboard
**Features:**
- User management
- Item moderation
- Statistics
- Platform settings

---

## 13. ITEM DETAIL PAGE
**File:** `app/item/[id]/page.tsx`
**Route:** `/item/:id`
**Description:** View single item details
**Features:**
- Full item information
- Image gallery
- Contact owner button
- Match request option

---

## 14. PUBLIC LOST ITEM PAGE
**File:** `app/public/lost/[id]/page.tsx`
**Route:** `/public/lost/:id`
**Description:** Public page for non-registered users
**Features:**
- Item details display
- Report found form
- No login required
- Email notification on submit

---

## 15. CONTACT OWNER PAGE
**File:** `app/contact/[id]/page.tsx`
**Route:** `/contact/:id`
**Description:** Contact page from QR code scan
**Features:**
- Owner contact details
- Email button
- WhatsApp button
- Call button
- No login required

---

## COMPONENTS (Reusable)

### 1. Navbar Component
**File:** `components/Navbar.tsx`
**Description:** Navigation bar
**Features:**
- Logo
- Navigation links
- Login/Register buttons
- User menu (when logged in)

### 2. Footer Component
**File:** `components/Footer.tsx`
**Description:** Footer section
**Features:**
- Quick links
- Contact information
- Copyright notice
- Created by Raj Thakur

### 3. Sidebar Component
**File:** `components/Sidebar.tsx`
**Description:** Dashboard sidebar
**Features:**
- Navigation menu
- Active link highlighting
- Mobile responsive

### 4. ShareItem Component
**File:** `components/ShareItem.tsx`
**Description:** Share modal for lost items
**Features:**
- QR code display
- Copy link button
- WhatsApp share
- Download QR option

### 5. ProtectedRoute Component
**File:** `components/ProtectedRoute.tsx`
**Description:** Route protection
**Features:**
- Authentication check
- Redirect to login if not authenticated

---

## CONTEXT

### AuthContext
**File:** `contexts/AuthContext.tsx`
**Description:** Authentication state management
**Features:**
- User state
- Login function
- Register function
- Logout function
- Loading state

---

## LIBRARIES & UTILITIES

### API Client
**File:** `lib/api.ts`
**Description:** Axios configuration and API functions
**Features:**
- Base URL configuration
- Auth API functions
- Lost items API
- Found items API
- Match API

### Validations
**File:** `lib/validations.ts`
**Description:** Zod validation schemas
**Features:**
- Report item schema
- Login schema
- Register schema

### Mock Data
**File:** `lib/mockData.ts`
**Description:** Sample data for development
**Features:**
- Mock lost items
- Mock found items

---

## STYLING

### Global CSS
**File:** `app/globals.css`
**Description:** Global styles and animations
**Features:**
- Tailwind directives
- Custom animations (blob, fade-in)
- Keyframes

### Tailwind Config
**File:** `tailwind.config.ts`
**Description:** Tailwind CSS configuration
**Features:**
- Custom colors
- Custom animations
- Plugin configuration

---

## TOTAL FRONTEND FILES: 25+
- Pages: 15
- Components: 5
- Context: 1
- Libraries: 3
- Styles: 2
