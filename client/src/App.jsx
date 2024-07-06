
import Home from "./components/Home";
import CreatePost from './components/CreatePost';
import Searching from './components/Searching';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './auth/login.jsx';
import Register from './auth/register.jsx';
import Notfound from './components/nofound.jsx';
import ProtectedRoute from './routehandling/protectedroute.jsx';
import { AuthProvider } from "./auth/authcontext.jsx";
import SwitchRoute from './routehandling/switchroute.js';
const isAuthenticated = true;


function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<ProtectedRoute elementIfAuthenticated={<Home />} isAuthenticated={isAuthenticated}/>}  />
        <Route path="/createPost" element={<ProtectedRoute elementIfAuthenticated={<CreatePost />} isAuthenticated={isAuthenticated}/>}  />
          <Route path="/home" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

