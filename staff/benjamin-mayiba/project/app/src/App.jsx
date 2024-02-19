import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'; // Añade Navigate aquí
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLoginShow = () =>{
    setIsAuthenticated(false);
    navigate('/login');
  }

  const handleRegisterShow = () =>{
      setIsAuthenticated(false);
      navigate('/register');
  }

  function handleHomeShow() {
    setIsAuthenticated(true);
    navigate('/home');
  }

  function handleLogout() {
    setIsAuthenticated(false);
    navigate('/login');
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />} />
      <Route path="/register" element={<Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />} />
      <Route path="/home" element={<Home onLogout={handleLogout} />} />
      {/* Redirigir de manera condicional */}
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <Navigate to="/home" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
