import carlogo from '../assets/images/carlogo.png';
import { useUser } from './User';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css"

export default function Header() {
  const { isLoggedIn } = useUser();
  const [open, setOpen] = useState(false);
  const [onLogin, setOnLogin] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuClick = (path, page) => {
    setOpen(false);
    navigate(path)
  };

  return (
    <nav className="nav-bar">
      <p className="car-icon"><a href="/"><img src={carlogo} alt="logo" height="50" /></a></p>


      <div className="dropdown">
        <div className="menu-icon" onClick={handleOpen}>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
        </div>
        {open && (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={() => handleMenuClick('/')}>Home</button>
            </li>
            <li className="menu-item">
              <button onClick={() => handleMenuClick('/carmodels')}>Cars</button>
            </li>
            {isLoggedIn ? (
              <li className="menu-item">
                <button onClick={() => handleMenuClick('/profile')}>My Profile</button>
              </li>
            ) : (
              <li className="menu-item">
                <button onClick={() => handleMenuClick('/login')}>Log in</button>
              </li>

            )}
            <li className="menu-item">
              <button onClick={() => handleMenuClick('/employees')}>About Us</button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}
