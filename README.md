# 🔐 Password Manager Frontend

A secure and feature-rich password manager frontend built with **React**, **Tailwind CSS**, and **Firebase Authentication**, allowing users to register, authenticate, and manage their personal password vaults.

---

## 📦 Tech Stack

- **React 18**
- **Vite** – Lightning fast frontend build tool
- **Tailwind CSS** – Utility-first CSS framework
- **Redux Toolkit** – State management
- **Redux Persist** – For persistent state
- **React Router v7** – Client-side routing
- **Firebase Auth** – Google and Email authentication
- **React Toastify** – Elegant toast notifications
- **Axios** – For API requests
- **Lucide React** and **React Icons** – For iconography
- **React Helmet** – For managing document head

---

## ✨ Features

- **User Authentication**
  - Sign up via Email/Password or Google (Firebase OAuth)
  - OTP-based email verification (6-digit code)
  - Password reset via email link
  - Google account linking with password login

- **User Profile**
  - View and update profile info (name, email, image)
  - Change password
  - Delete account

- **Password Vault**
  - Create, Read, Update, and Delete stored passwords
  - Auto-generate secure passwords
  - Responsive and user-friendly UI

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following:

```env
VITE_FIREBASE_API_KEY="your_firebase_api_key_here"
VITE_BACKEND_URL="https://your-backend-api-url.com"
