# MERN User Profile Management App (VisualNest)

A full-stack **MERN** application for user registration, authentication, and profile management. Built as a learning project to master authentication flows, user-specific data handling, and full-stack integration.

The app is not focused on advanced styling or responsiveness yet the main goal was to get the core functionalities solid (auth + profile CRUD).

## 📦 Technologies
- React.js
- Material UI (MUI)
- Node.js + Express.js
- MongoDB (with Mongoose)
- JWT (for authentication)
- Axios (API calls)
- Multer (for profile picture upload, if implemented)

## 🦄 Features
Here's what you can do with VisualNest:

* **Sign Up**: Create a new account with email and password.
* **Profile Completion**: Right after signup, complete your profile upload a profile picture and fill personal details (name, bio, phone, etc.).
* **Login**: Log in with your credentials your full profile loads automatically.
* **View Profile**: See all your saved data (picture + details) on the dashboard.
* **Edit Profile**: Update any field or change your picture and save changes.
* **Logout & Re-login**: Data stays private and reloads only for you.
* Private data no one else can see or access your profile.

## 🎯 Keyboard Shortcuts / UX Notes
- Standard form navigation (Tab, Enter to submit).
- File upload for profile picture (drag & drop or browse).
- Basic form validation (email format, required fields).

## 👩🏽‍🍳 The Process
I started with the backend: set up Express server, MongoDB connection, user model with Mongoose, and auth routes (signup/login with JWT).

Then moved to frontend: React app with Material UI for clean forms. Implemented protected routes (only logged-in users see profile).

The trickiest part was handling profile picture upload storing it securely and linking to user.

After auth was working, I added the profile completion flow (redirect after signup), data fetching on login, and edit functionality.

Finally, tested the full flow: signup → profile → logout → login → edit → save.

Along the way, I documented what I learned realizing that writing it down helps solidify understanding.

## 📚 What I Learned
This project leveled up my full-stack skills a lot:

- **JWT Authentication**: How to generate tokens, protect routes, and handle login state in React.
- **User-Specific Data**: Querying MongoDB with user ID to keep everything private.
- **File Uploads**: Using Multer on backend and handling FormData in React.
- **Protected Routes**: Using context or hooks to manage auth state.
- **Redirect Flows**: Post-signup redirect to profile form great for UX.
- **Error Handling**: Showing user-friendly messages for invalid login, duplicate email, etc.
- **Logical Thinking**: Planning the entire user journey from signup to edit.

Overall, it improved my understanding of secure full-stack apps and how frontend/backend talk seamlessly.

## 💭 How can it be improved?
- Add password reset / forgot password flow
- Email verification on signup
- Dark mode toggle with Material UI themes
- More profile fields (skills, social links, address)
- Profile picture storage on Cloudinary instead of local
- Add avatar preview before upload
- Responsive design (mobile-friendly forms)
- Add more security (rate limiting, input sanitization)
- Unit/integration tests with Jest + Supertest

## 🚦 Running the Project
To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Run npm install or yarn in the project directory to install the required dependencies.
3. Run npm run start or yarn start to get the project started.
