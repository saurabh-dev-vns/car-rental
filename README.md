# Car Rental 

Welcome to the Car Rental  project! This application allows users to rent cars easily and efficiently. It provides a user-friendly interface for both customers and administrators to manage car rentals.

## This project is now OFFICIALLY accepted for

- ![project-image1](socialwinterofcode_cover.jpg)

## Table of Contents

- [Features](#features)
- [Preview](#preview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- User registration and authentication
- Browse available cars for rent
- Book a car for a specified duration
- View booking history
- Admin panel for managing cars and bookings
- Search and filter options for cars
- Responsive design for mobile and desktop

## Preview
 - ![project-image1](carrental1.png)
 - ![project-image1](carrental2.png)
 - ![project-image1](carrental3.png)

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript, React 
- **Backend:** Node.js, Express.js 
- **Database:** MongoDB 
- **Deployment:** Vercel

## Installation

### Clone the Repository
1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/saurabh-dev-vns/car-rental.git
   ```
2. Navigate to the project directory:
   ```sh
   cd car-rental
   ```

### Client
1. Navigate to the client directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

3. ## Firebase Authentication Setup (Required)

This project uses **Firebase Authentication** for user registration and login.
Before running the client, you must configure Firebase properly.

### Step 1: Create a Firebase Project
- Go to https://console.firebase.google.com
- sign up if not already have an account
- Click **Add project**
- Enter a project name and complete setup

### Step 2:click on app and Add a Web(</>) App 
- Click the **Web (</>)** icon
- Register the app by entering name such as car-rental-web (hosting not required)

### Step 3: Enable Authentication
- Go to **Authentication → Get Started** (in the side menu bar under build)
- Enable **Email/Password**
- (Optional) Enable **Google Sign-In**

### Step 4: Get Firebase Configuration
After registering the web app, copy the Firebase config values.
These will be used in the client `.env` file.


4. Create a `.env` file in the client directory using the Firebase configuration obtained above.
 For example:

   VITE_API_URL=http://localhost:5000/api
   VITE_API_KEY=your_api_key_here
   VITE_PROJECT_ID=your_project_id_here
   VITE_AUTH_DOMAIN=your_auth_domain_here
   VITE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_APP_ID=your_app_id_here
   VITE_MEASUREMENT_ID=your_measurement_id_here //this might not be present in the configuration which you can avoid


   ```

   **Environment Variable Explanations:**
   - `VITE_API_URL`: The base URL for the backend API. For local development, use `http://localhost:5000/api`. In production, replace with your deployed server URL.
   - `VITE_API_KEY`: Your Firebase API key. Obtain this from the Firebase Console under Project Settings > General > Your apps > Web app configuration. [Firebase Docs](https://firebase.google.com/docs/web/setup)
   - `VITE_PROJECT_ID`: Your Firebase project ID. Found in the Firebase Console under Project Settings > General.
   - `VITE_AUTH_DOMAIN`: Your Firebase Auth domain, typically `<project-id>.firebaseapp.com`. Obtain from Firebase Console.
   - `VITE_STORAGE_BUCKET`: Your Firebase Storage bucket URL, usually `<project-id>.appspot.com`. Found in Firebase Console under Storage.
   - `VITE_MESSAGING_SENDER_ID`: The sender ID for Firebase Cloud Messaging. Obtain from Firebase Console under Project Settings > Cloud Messaging.
   - `VITE_APP_ID`: Your Firebase app ID. Found in Firebase Console under Project Settings > General > Your apps.
   - `VITE_MEASUREMENT_ID`: Your Google Analytics measurement ID (e.g., G-XXXXXXXXXX). Obtain from Google Analytics if using Firebase Analytics. [Google Analytics Docs](https://support.google.com/analytics/answer/9304153)

   **Security Note:** Never commit `.env` files to version control. Add `.env` to your `.gitignore` file to prevent accidental exposure of sensitive information.
4. Start the development server:
   ```sh
   npm run dev
   ```

### Server
1. Navigate to the server directory:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the server directory and add the necessary configurations. For example:
   ```plaintext
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/car-rental
   JWT_SECRET=your_jwt_secret
   ```

   **Environment Variable Explanations:**
   - `PORT`: The port number on which the server will run. Default is 5000 for local development.
   - `MONGO_URI`: The connection string for your MongoDB database. For local MongoDB, use `mongodb://localhost:27017/car-rental`. For MongoDB Atlas, obtain the connection string from your Atlas cluster dashboard. [MongoDB Docs](https://docs.mongodb.com/manual/reference/connection-string/)
   - `JWT_SECRET`: A secret key used for signing JWT tokens. Generate a strong, random string (e.g., using `openssl rand -base64 32` or an online generator). Keep this secret and never share it.

   **Security Note:** Never commit `.env` files to version control. Add `.env` to your `.gitignore` file to prevent accidental exposure of sensitive information like database credentials and JWT secrets.
4. Start the server:
   ```sh
   npm start
   ```

## Usage
1. User Registration: Create an account to start renting cars.
2. Browse Cars: View the list of available cars and their details.
3. Book a Car: Select a car, choose your rental dates, and confirm your booking.
4. Admin Panel: If you are an admin, log in to manage cars and bookings.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
