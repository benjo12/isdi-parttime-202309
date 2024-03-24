import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'; // Añade Navigate aquí
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import logic from './logic'

function App() {
  const navigate = useNavigate();

  const handleLoginShow = () =>{
    //setIsAuthenticated(false);
    logic.logoutUser(() => navigate("/login"));
  }

  const handleRegisterShow = () =>{
      //setIsAuthenticated(false);
      navigate('/register');
  }

  function handleHomeShow() {
    //setIsAuthenticated(true);
    navigate('/');
  }


  return (
    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />} />
      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to='/'/>:<Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />} />
      <Route path="/*" element={logic.isUserLoggedIn() ? <Home onLogout={handleLoginShow} /> : <Navigate to='/login'/>} />
    </Routes>
  );
}

export default App;
