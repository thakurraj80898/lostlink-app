# LOSTLINK - TEST CASES

---

## TEST CASE 1: USER REGISTRATION

**Test Objective:** Verify new user account creation

**Test Data:**
- Name: Raj Thakur
- Email: raj@test.com
- Password: Test@123
- Confirm Password: Test@123

**Expected Result:**
- User account created in database
- Password hashed with bcrypt
- JWT token generated
- Token stored in HTTP-only cookie
- Redirect to dashboard

**Actual Result:**
- User registered successfully
- Token stored in cookie
- Redirected to /dashboard

**Status:** ✅ Passed

---

## TEST CASE 2: USER LOGIN

**Test Objective:** Verify login with valid credentials

**Test Data:**
- Email: raj@test.com
- Password: Test@123

**Expected Result:**
- Credentials verified
- JWT token issued
- Cookie set
- Redirect to dashboard

**Actual Result:**
- Login successful
- Dashboard loaded
- User data displayed

**Status:** ✅ Passed

---

## TEST CASE 3: REPORT LOST ITEM

**Test Objective:** Verify lost item submission with image upload

**Test Data:**
- Title: Black Leather Wallet
- Category: Wallet
- Location: College Campus, Building A
- Date Lost: 10 Jan 2025
- Description: Black wallet with ID cards
- Image: wallet.jpg (2MB)

**Expected Result:**
- Item saved to database
- Image uploaded successfully
- Public link generated
- QR code available for sharing
- Item appears in "My Reports"

**Actual Result:**
- Lost item created with ID: abc123
- Image stored in uploads folder
- Public link: /public/lost/abc123
- Share button working

**Status:** ✅ Passed

---

## TEST CASE 4: REPORT FOUND ITEM WITH AUTO-MATCHING

**Test Objective:** Verify found item submission and automatic matching

**Test Data:**
- Title: Black Wallet
- Category: Wallet
- Location: College Campus
- Date Found: 11 Jan 2025
- Description: Found near library
- Image: found_wallet.jpg

**Expected Result:**
- Item saved to database
- Matching algorithm runs
- Potential matches identified
- Email sent to owner of matching lost item
- Match request created

**Actual Result:**
- Found item created
- 1 match detected (Lost Item: abc123)
- Email sent to raj@test.com
- Subject: "Someone Found Your Item!"

**Status:** ✅ Passed

---

## TEST CASE 5: QR CODE GENERATION

**Test Objective:** Verify personal QR code creation for belongings

**Test Data:**
- Name: Raj Thakur
- Email: raj@test.com
- Phone: +91 9876543210
- Message: "If you find my item, please contact me!"

**Expected Result:**
- QR code generated with contact info
- QR code size: 400x400 pixels
- Downloadable as PNG
- Scannable with any QR reader
- Links to contact page

**Actual Result:**
- QR code created successfully
- Download as "Raj-Thakur-Contact-QR.png"
- Scanned QR opens /contact/user123
- Contact buttons working (Email, WhatsApp, Call)

**Status:** ✅ Passed

---

## TEST CASE 6: PUBLIC LINK ACCESS (NON-REGISTERED USER)

**Test Objective:** Verify non-registered user can report finding via public link

**Test Data:**
- Public Link: /public/lost/abc123
- Finder Name: John Doe
- Finder Email: john@example.com
- Finder Phone: 9988776655
- Location Found: Library Entrance
- Message: "Found your wallet near library"

**Expected Result:**
- Public page accessible without login
- Lost item details displayed
- Form submission successful
- Email sent to item owner
- Thank you page displayed

**Actual Result:**
- Page loaded without authentication
- Form submitted successfully
- Owner received email with finder details
- "Thank You" confirmation shown

**Status:** ✅ Passed

---

## TEST CASE 7: EMAIL NOTIFICATION

**Test Objective:** Verify email sent when items are matched

**Test Data:**
- Lost Item: iPhone 13 Pro
- Found Item: iPhone 13 Pro
- Owner Email: raj@test.com
- Finder Email: john@test.com

**Expected Result:**
- Email sent to owner with finder details
- Email sent to finder with owner details
- HTML formatted emails
- Working links in email

**Actual Result:**
- Owner received: "Someone Found Your Item!"
- Finder received: "Match Found!"
- Both emails delivered successfully
- Links working correctly

**Status:** ✅ Passed

---

## TEST CASE 8: SEARCH AND FILTER

**Test Objective:** Verify search and filter functionality

**Test Data:**
- Search Query: "wallet"
- Category Filter: Wallet
- Location Filter: "campus"
- Page: 1
- Limit: 10

**Expected Result:**
- Filtered results displayed
- Only matching items shown
- Pagination working
- Total count displayed

**Actual Result:**
- 3 matching items found
- Results filtered correctly
- Pagination: Page 1 of 1
- Total: 3 items

**Status:** ✅ Passed

---

## TEST CASE 9: AUTHORIZATION CHECK

**Test Objective:** Verify only owner can edit/delete their items

**Test Data:**
- User A ID: user123
- User B ID: user456
- Item ID: abc123 (owned by User A)
- Action: User B tries to delete Item abc123

**Expected Result:**
- Access denied
- 403 Forbidden error
- Error message: "Not authorized"
- Item not deleted

**Actual Result:**
- Request blocked
- Status: 403
- Message: "Not authorized to delete this item"
- Item still exists in database

**Status:** ✅ Passed

---

## TEST CASE 10: IMAGE UPLOAD

**Test Objective:** Verify multiple image upload functionality

**Test Data:**
- File 1: wallet_front.jpg (1.5MB)
- File 2: wallet_back.jpg (1.8MB)
- File 3: wallet_inside.jpg (1.2MB)
- Total Size: 4.5MB

**Expected Result:**
- All images uploaded successfully
- Images stored in uploads folder
- File paths saved in database
- Images accessible via URL

**Actual Result:**
- 3 images uploaded
- Stored in: /uploads/
- Paths: ["wallet_front.jpg", "wallet_back.jpg", "wallet_inside.jpg"]
- Images displayed in item details

**Status:** ✅ Passed

---

## TEST CASE 11: PASSWORD SECURITY

**Test Objective:** Verify password is hashed and not stored in plain text

**Test Data:**
- Password: MySecurePass@123

**Expected Result:**
- Password hashed with bcrypt
- Hash stored in database
- Original password not visible
- Hash starts with $2b$10$

**Actual Result:**
- Password hashed successfully
- Database value: $2b$10$rKvVPZqGhZ8YvZ8YvZ8Yv...
- Login works with original password
- Password not exposed in API response

**Status:** ✅ Passed

---

## TEST CASE 12: JWT TOKEN EXPIRATION

**Test Objective:** Verify JWT token expires after 7 days

**Test Data:**
- Token issued: 1 Jan 2025
- Current date: 9 Jan 2025 (8 days later)

**Expected Result:**
- Token expired
- 401 Unauthorized error
- User redirected to login
- Error: "Invalid token"

**Actual Result:**
- Token validation failed
- Status: 401
- User logged out automatically
- Redirected to /login

**Status:** ✅ Passed

---

## SUMMARY

**Total Test Cases:** 12
**Passed:** 12
**Failed:** 0
**Success Rate:** 100%

**Testing Date:** [Your Date]
**Tested By:** Raj Thakur
**Environment:** Development (localhost)

---

**© 2024 LostLink Testing Documentation**
