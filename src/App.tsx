import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/home/Home'
import Login from './pages/login/LoginForm'
import NotFound from './pages/404/404'
import Auth from './pages/auth/Auth'

import Cookies from 'js-cookie';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <>
            <Route path="/" element={Cookies.get("userAuth") === undefined ? <Auth/> : <Home/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/login" element={Cookies.get("userAuth") === undefined ? <Login/> : <Auth/>} />
            <Route path= "*" element={<NotFound />}/>
          </>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
