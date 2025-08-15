# 📓 iNoteBook

iNoteBook is a MERN-stack note-taking application that allows users to **create, edit, search, and delete notes** securely.  
It features **JWT authentication**, a dynamic search bar, and a responsive Bootstrap UI.

---

## 🚀 Features

- **User Authentication**
  - Signup & Login with JWT-based authentication
  - Logout functionality with token removal
- **Notes Management**
  - Add, update, delete notes
  - Each note includes a **title, description, and tag**
- **Dynamic Search**
  - Real-time filtering of notes by title or description
- **Responsive Design**
  - Mobile-friendly UI built with Bootstrap 5
- **Protected Routes**
  - Notes are visible only to logged-in users
- **Context API**
  - Global state management for notes

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Functional Components & Hooks)
- React Router DOM
- Bootstrap 5

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Token) for authentication
- bcrypt.js for password hashing

---

## 📂 Project Structure
    ├── README.md
    ├── backend
    │   ├── db.js
    │   ├── index.js
    │   ├── middleware
    │   │   ├── fetchNotes.js
    │   │   └── fetchUser.js
    │   ├── models
    │   │   ├── NotebookSchema.js
    │   │   └── UserSchema.js
    │   ├── package.json
    │   └── routes
    │       ├── auth.js
    │       └── notes.js
    ├── package.json
    ├── public
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    └── src
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── components
        │   ├── Home.js
        │   ├── Loader.js
        │   ├── Navbar.js
        │   └── UpdateNote.js
        ├── context
        │   ├── NotesContext.js
        │   └── NotesState.js
        ├── index.css
        ├── index.js
        ├── pages
        │   ├── Edit.js
        │   ├── Login.js
        │   └── Signup.js
        ├── reportWebVitals.js
        └── setupTests.js

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/iNoteBook.git
cd iNoteBook
cd backend
npm install

```

# Run the Project
```
npm run dev
```
