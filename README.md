# 🌍 Wanderlust - Full Stack Vacation Rental Platform

<div align="center">

![JavaScript Badge](https://img.shields.io/badge/JavaScript-50.1%25-F7DF1E?logo=javascript&logoColor=black)
![EJS Badge](https://img.shields.io/badge/EJS-28.4%25-90C53F)
![CSS Badge](https://img.shields.io/badge/CSS-21.5%25-1572B6?logo=css3)
![Node.js](https://img.shields.io/badge/Node.js-v22.22.3-339933?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-5.2.1-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-4.17.2-13AA52?logo=mongodb)
![License](https://img.shields.io/badge/License-ISC-blue)

*A modern, full-stack web application for discovering and listing vacation rentals worldwide.*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Routes](#-api-endpoints) • [Project Structure](#-project-structure-detailed) • [Contributing](#-contributing)

</div>

---

## ✨ Features

### 🏠 For Travelers
- 🔍 **Browse Listings** - Discover vacation rental properties with detailed descriptions and high-quality images
- 🗺️ **Interactive Map** - View property locations on an interactive map powered by MapTiler
- ⭐ **Reviews & Ratings** - Read and leave detailed reviews with 1-5 star ratings for properties
- 👤 **User Accounts** - Create personalized accounts and manage your listings and reviews
- 🔐 **Secure Authentication** - Sign up and log in securely with password hashing and session management
- 🎯 **Property Details** - View comprehensive property information including price, location, and country

### 🏢 For Hosts
- 📝 **Create Listings** - Add your property with title, description, price, location, and country
- ✏️ **Edit & Manage** - Update your listings anytime with new information or photos
- 🗑️ **Delete Listings** - Remove properties from the platform when no longer available
- 🖼️ **Cloud Image Upload** - Upload property photos directly to Cloudinary with automatic optimization
- 📊 **Ownership Protection** - Only property owners can edit or delete their listings

### 🎨 General Features
- 📱 **Responsive Design** - Optimized experience on desktop, tablet, and mobile devices
- 🎯 **Clean UI/UX** - Modern, intuitive interface with EJS templating
- 🔔 **Real-time Feedback** - Flash messages for all user actions (success, error, info)
- 🛡️ **Data Validation** - Client and server-side validation with Joi schemas
- 💾 **Persistent Sessions** - MongoDB-backed session storage for reliable user authentication
- 🗺️ **Geocoding** - Automatic location geocoding for accurate property mapping

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%">

### Backend
- **Node.js** v22.22.3 - JavaScript runtime
- **Express.js** 5.2.1 - Web framework
- **MongoDB** 4.17.2 - NoSQL database
- **Mongoose** 9.4.1 - ODM for MongoDB
- **Passport.js** 0.7.0 - Authentication middleware
- **passport-local** 1.0.0 - Local auth strategy
- **passport-local-mongoose** 9.1.0 - Password hashing
- **express-session** 1.19.0 - Session management
- **connect-mongo** 4.6.0 - MongoDB session store

</td>
<td width="50%">

### Frontend & Utilities
- **EJS** 5.0.2 - Templating engine (28.4%)
- **CSS** 3 - Styling (21.5%)
- **JavaScript** - Interactivity (50.1%)
- **ejs-mate** 4.0.0 - Layout & partials
- **Multer** 2.1.1 - File upload handling
- **Cloudinary** 1.41.3 - Cloud storage
- **multer-storage-cloudinary** 4.0.0 - Multer storage adapter
- **Joi** 18.2.1 - Schema validation
- **@maptiler/client** 3.0.2 - Map integration
- **method-override** 3.0.0 - HTTP method override
- **connect-flash** 0.1.1 - Flash messages
- **dotenv** 17.4.2 - Environment variables

</td>
</tr>
</table>

---

## 📦 Installation

### Prerequisites
- ✅ Node.js v22.22.3 or higher
- ✅ MongoDB Atlas account (or local MongoDB instance)
- ✅ Cloudinary account (for image uploads)
- ✅ MapTiler API key (for map integration)
- ✅ Git

### Step-by-Step Setup

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Nitish-inn/wanderlust-project.git
cd wanderlust-project
```

#### 2️⃣ Install Dependencies
```bash
npm install
```

#### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Database
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/wanderlust

# Session
SECRET=your_super_secret_session_key_here

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# MapTiler Configuration
MAPTILER_API_KEY=your_maptiler_api_key

# Environment
NODE_ENV=development
```

#### 4️⃣ Initialize Database (Optional - for sample data)
```bash
node init/index.js
```

#### 5️⃣ Start the Server
```bash
npm start
```

🎉 Your application is now running at `http://localhost:8080`

---

## 🌐 API Endpoints

### 📍 Listings Routes

| Method | Endpoint | Authentication | Description |
|--------|----------|-----------------|-------------|
| GET | `/listings` | No | Get all listings |
| GET | `/listings/new` | ✅ Required | Show create listing form |
| POST | `/listings` | ✅ Required | Create a new listing with image |
| GET | `/listings/:id` | No | Get specific listing details |
| GET | `/listings/:id/edit` | ✅ Owner Only | Show edit listing form |
| PUT | `/listings/:id` | ✅ Owner Only | Update listing with image |
| DELETE | `/listings/:id` | ✅ Owner Only | Delete a listing |

### ⭐ Reviews Routes

| Method | Endpoint | Authentication | Description |
|--------|----------|-----------------|-------------|
| POST | `/listings/:id/reviews` | ✅ Required | Create a review (1-5 stars) |
| DELETE | `/listings/:id/reviews/:reviewId` | ✅ Author Only | Delete a review |

### 👤 User Authentication Routes

| Method | Endpoint | Authentication | Description |
|--------|----------|-----------------|-------------|
| GET | `/signup` | No | Show signup form |
| POST | `/signup` | No | Register new user |
| GET | `/login` | No | Show login form |
| POST | `/login` | No | Authenticate user |
| GET | `/logout` | ✅ Required | Logout user & clear session |

---

## 📁 Project Structure (Detailed)

```
wanderlust-project/
│
├── 📄 app.js                          # Main Express application
├── 📄 package.json                    # Dependencies & scripts
├── 📄 package-lock.json               # Locked dependency versions
├── 📄 .gitignore                      # Git ignore patterns
│
├── 🗂️ controllers/                    # Business logic (MVC Controller Layer)
│   ├── listing.js                     # Listing CRUD operations
│   │   ├── index()              - Get all listings
│   │   ├── renderNewForm()      - Show new listing form
│   │   ├── createListing()      - Create with image & geocoding
│   │   ├── showListing()        - Display single listing + reviews
│   │   ├── renderEditform()     - Show edit form
│   │   ├── updateListing()      - Update listing data
│   │   └── destroyListing()     - Delete listing
│   │
│   ├── review.js                      # Review operations
│   │   ├── createReview()      - Create review with rating
│   │   └── destroyReview()     - Delete review
│   │
│   └── user.js                        # User authentication
│       ├── renderSignupForm()  - Show signup form
│       ├── signup()            - Register new user
│       ├── renderloginForm()   - Show login form
│       ├── login()             - Authenticate user
│       └── logout()            - Logout & clear session
│
├── 🗂️ models/                         # Database Schemas (MVC Model Layer)
│   ├── listing.js                     # Listing Schema
│   │   ├── title: String (required)
│   │   ├── description: String
│   │   ├── image: {filename, url}
│   │   ├── price: Number
│   │   ├── location: String (required)
│   │   ├── country: String
│   │   ├── reviews: [ObjectId]
│   │   ├── owner: ObjectId (User reference)
│   │   └── geometry: GeoJSON (for mapping)
│   │
│   ├── review.js                      # Review Schema
│   │   ├── comment: String
│   │   ├── rating: Number (1-5)
│   │   ├── createdAt: Date (auto)
│   │   └── author: ObjectId (User reference)
│   │
│   └── user.js                        # User Schema
│       ├── email: String (required)
│       ├── username: String (Passport plugin)
│       └── password: String (Hashed, Passport plugin)
│
├── 🗂️ routes/                         # API Routes (MVC Router Layer)
│   ├── listing.js                     # Listing routes
│   │   └── GET/POST/PUT/DELETE /listings
│   │
│   ├── review.js                      # Review routes
│   │   └── POST/DELETE /listings/:id/reviews
│   │
│   └── user.js                        # User authentication routes
│       └── GET/POST /signup, /login, /logout
│
├── 🗂️ views/                          # EJS Templates (28.4%)
│   ├── listings/
│   │   ├── index.ejs                 # All listings page
│   │   ├── show.ejs                  # Single listing details
│   │   ├── new.ejs                   # Create listing form
│   │   ├── edit.ejs                  # Edit listing form
│   │
│   ├── users/
│   │   ├── signup.ejs                # User registration form
│   │   └── login.ejs                 # User login form
│   │
│   ├── layouts/
│   │   ├── boilerplate.ejs           # Main layout template
│   │   └── navbar.ejs                # Navigation bar
│   │
│   ├── error.ejs                      # Error page
│   └── partials/
│       ├── flash.ejs                 # Flash message component
│       └── listings.ejs              # Listings card component
│
├── 🗂️ public/                         # Static Assets (21.5% CSS)
│   ├── css/
│   │   ├── style.css                 # Main stylesheet
│   │   └── responsive.css            # Responsive design
│   │
│   └── images/
│       └── [Property images]
│
├── 🗂️ utils/                          # Utility Functions
│   ├── wrapAsync.js                  # Async error wrapper
│   │   └── Wraps async route handlers for error handling
│   │
│   └── ExpressError.js               # Custom Error Class
│       └── Extends Error with statusCode
│
├── 🗂️ middleware/                     # Custom Middleware
│   └── middleware.js
│       ├── isLoggedIn()              - Check user authentication
│       ├── saveRedirectUrl()         - Save intended URL
│       ├── isOwner()                 - Verify listing ownership
│       ├── isReviewAuthor()          - Verify review authorship
│       ├── validateListing()         - Joi schema validation
│       └── validateReview()          - Joi schema validation
│
├── 🗂️ init/                           # Database Initialization
│   ├── index.js                       # Connect & initialize DB
│   └── data.js                        # Sample listing data
│
├── 📄 schema.js                        # Joi Validation Schemas
│   ├── listingSchema                 # Validate listing data
│   └── reviewSchema                  # Validate review data
│
├── 📄 cloudConfig.js                   # Cloudinary Configuration
│   ├── Cloud storage setup
│   └── Multer storage adapter
│
└── 📄 .env                             # Environment Variables (⚠️ Never commit!)
    ├── Database URL
    ├── Session secret
    ├── Cloudinary credentials
    └── MapTiler API key
```

### 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER REQUEST                         │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
            ┌─────────────────────────┐
            │   Express Router        │
            │  (routes/*.js)          │
            └───────────┬─────────────┘
                        │
                        ▼
        ┌──────────────────────────────────┐
        │  Middleware Stack               │
        │  - Authentication               │
        │  - Validation                   │
        │  - Error Handling               │
        └───────────────┬──────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────┐
        │   Controllers                    │
        │  (controllers/*.js)              │
        │  - Business Logic                │
        │  - Geocoding                     │
        │  - Image Upload                  │
        └───────────────┬──────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────┐
        │   Models (Mongoose)              │
        │  (models/*.js)                   │
        │  - Schema Definition             │
        │  - Database Queries              │
        └───────────────┬──────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────┐
        │   MongoDB/Atlas                  │
        │  - Data Persistence              │
        │  - Relationships                 │
        └──────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────────┐
        │   EJS Templating                 │
        │  (views/*.ejs)                   │
        │  - HTML Rendering                │
        │  - Dynamic Content               │
        └───────────────┬──────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│            Browser Response (HTML/CSS/JS)               │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication & Authorization Flow

```
┌────────────────────────────────────────────────────────┐
│ 1. User Registration                                   │
│    Signup Form → Password Hashed → User Created        │
└────────────────┬───────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────┐
│ 2. User Login                                          │
│    Credentials → Passport Auth → Session Created       │
└────────────────┬───────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────┐
│ 3. Session Persistence                                │
│    Express-Session → MongoDB Store → 7-day Expiry      │
└────────────────┬───────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────┐
│ 4. Protected Routes                                    │
│    isLoggedIn Middleware → Next() or Redirect/Login    │
└────────────────┬───────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────┐
│ 5. Ownership Verification                             │
│    isOwner Middleware → Compare IDs → Allow/Deny       │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Features Implementation

### 📸 Image Upload Process
```javascript
1. User selects image → Multer middleware processes
2. Image uploaded to Cloudinary cloud storage
3. URL & filename stored in MongoDB
4. CDN serves optimized image to users
```

### 🗺️ Geocoding Process
```javascript
1. User enters location → Sent to MapTiler API
2. MapTiler returns GeoJSON coordinates
3. Coordinates stored in listing geometry
4. Interactive map displays property location
```

### ⭐ Review System
```javascript
1. User writes review with 1-5 rating
2. Joi validates input (rating 1-5, comment required)
3. Review created with author reference
4. Listing updated with review ID
5. Reviews displayed on listing page
```

---

## 🤝 Contributing

We love contributions! Here's how to get started:

### Fork & Clone
```bash
git clone https://github.com/YOUR-USERNAME/wanderlust-project.git
cd wanderlust-project
git checkout -b feature/amazing-feature
```

### Make Changes & Commit
```bash
git add .
git commit -m "feat: Add amazing feature"
```

### Push & Create PR
```bash
git push origin feature/amazing-feature
```

Then open a [Pull Request](https://github.com/Nitish-inn/wanderlust-project/pulls) on GitHub!

### Contribution Guidelines
- ✅ Follow the existing code style
- ✅ Add comments for complex logic
- ✅ Test your changes locally
- ✅ Update README if needed
- ✅ Make descriptive commit messages

---

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**[Nitish-inn](https://github.com/Nitish-inn)** - Full Stack Developer

### 🌐 Connect With Me
[![GitHub](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github)](https://github.com/Nitish-inn)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter)](https://twitter.com)

---

## 🆘 Support & Issues

### Getting Help
- 🐛 **Found a bug?** [Open an Issue](https://github.com/Nitish-inn/wanderlust-project/issues)
- 💡 **Have a suggestion?** [Start a Discussion](https://github.com/Nitish-inn/wanderlust-project/discussions)
- 📚 **Need documentation?** Check the inline code comments

### Common Issues

#### MongoDB Connection Error
```
Error: ATLASDB_URL is not defined
Solution: Check your .env file and ensure ATLASDB_URL is set correctly
```

#### Image Upload Fails
```
Error: Cloudinary credentials missing
Solution: Verify CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET in .env
```

#### Map Not Displaying
```
Error: MapTiler API key invalid
Solution: Ensure MAPTILER_API_KEY is correct in .env file
```

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Language Composition** | JavaScript 50.1% • EJS 28.4% • CSS 21.5% |
| **Node Version** | 22.22.3 |
| **Main Dependencies** | 18 npm packages |
| **Database** | MongoDB Atlas (NoSQL) |
| **Cloud Services** | Cloudinary, MapTiler, MongoDB |
| **Lines of Code** | 2000+ |

---

## 🎯 Future Roadmap

- [ ] 🔍 Advanced search & filtering (price range, amenities)
- [ ] 📅 Booking system with date picker
- [ ] 💳 Payment integration (Stripe/PayPal)
- [ ] 📧 Email notifications for bookings
- [ ] 👥 User profile with review history
- [ ] ❤️ Wishlist/favorites functionality
- [ ] 📊 Admin dashboard with analytics
- [ ] 🌐 Multi-language support (i18n)
- [ ] 📱 Progressive Web App (PWA)
- [ ] 🤖 AI-powered recommendations

---

## 💬 Feedback

Have suggestions or feedback? Let me know by [opening an issue](https://github.com/Nitish-inn/wanderlust-project/issues/new) or reaching out directly!

---

<div align="center">

### ⭐ If you find this project helpful, please give it a star! ⭐

**Made with ❤️ for travel enthusiasts and developers**

Last Updated: 2026-07-05

</div>