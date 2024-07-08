
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
import MainNavbar from "./components/MainNavbar.jsx";
import ManageAccount from "./components/ManageAccounts.jsx";
import InitialNavbar from "./components/InitialNavbar.jsx";
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'True';


function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

        <Route
            path="/home"
            element={
              <SwitchRoute
                elementIfAuthenticated={<Home />} 
                elementIfNotAuthenticated={<Login />} 
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/" element={<ProtectedRoute elementIfAuthenticated={<Home />} isAuthenticated={isAuthenticated}/>}  />
          <Route path="/createPost" element={<ProtectedRoute elementIfAuthenticated={<CreatePost />} isAuthenticated={isAuthenticated}/>}  />
          
          <Route path="/register" element={<> <InitialNavbar /> <Register /> </>} />
          <Route path="/login" element={ <> <InitialNavbar /> <Login /> </>} />
          <Route path="/search" element={<> <MainNavbar /> <Searching /> </>} />
          <Route path="/manageAccount" element={<> <MainNavbar /> <ManageAccount /> </>} />
          
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

