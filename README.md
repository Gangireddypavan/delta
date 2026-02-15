# Wanderlust

Wanderlust is a full-stack web application that allows users to list, discover, and book unique accommodations around the world. Inspired by Airbnb, it features a robust listing management system, user reviews, and secure authentication.

## 🚀 Key Features

- **Listing Management**: Create, edit, and delete listings with ease.
- **Image Uploads**: Integrated with Cloudinary for seamless and optimized image hosting.
- **Interactive Map**: Discover listings geographically (using Mapbox).
- **Reviews & Ratings**: Share experiences and rate accommodations.
- **Authentication**: Secure registration and login powered by Passport.js.
- **Modern UI**: Responsive design with premium hover effects and a dynamic tax-inclusive price toggle.

## 🛠️ Tech Stack

- **Frontend**: EJS (Embedded JavaScript templates), Bootstrap, Vanilla CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Cloud Services**: Cloudinary (Image Storage).
- **Authentication**: Passport.js.

## 📦 Recent Enhancements

- **Version-Agnostic Cloudinary Storage**: Fixed compatibility issues between `multer-storage-cloudinary` v2 and v4, ensuring reliable image handling across environments.
- **Visual Polish**: Added subtle vertical lift and shadow transitions to listing cards.
- **Tax Toggle**: Implemented a responsive toggle to show/hide inclusive price breakdowns instantly.

## 🚦 Getting Started

### Prerequisites

- Node.js installed.
- MongoDB instance running (local or Atlas).
- Cloudinary account for image features.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd wanderlust
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (create a `.env` file):
   ```env
   CLOUD_NAME=your_cloud_name
   CLOUD_API_KEY=your_api_key
   CLOUD_API_SECRET=your_api_secret
   SECRET=your_session_secret
   ```

4. Seed the database (optional):
   ```bash
   node init/index.js
   ```

5. Start the server:
   ```bash
   node app.js
   ```
   The app will be available at `http://localhost:8080`.


