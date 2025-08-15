import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NotesState from './context/NotesState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './pages/Login';
import Edit from './pages/Edit';
import Signup from './pages/Signup';

const isLoggedIn = () => {
  return !!localStorage.getItem('authToken');
}

const ProtectedRoute = ({children}) => {
  return isLoggedIn() ? children : <Login />;
}
function App() {
  return (
    <>
      <NotesState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/about" element={<h1>About Page</h1>} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/editNote/:id" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
