import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase";// Import your Firebase authentication instance

  const brandStyle = {
    // Add your styles here
    fontWeight: 'bold',
    fontSize: '1.5rem',
    // Add more styles as needed
  };

  
  const NavigationBar = () => {
    const [user] = useAuthState(auth);  // Use useAuthState within the body of the component
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand" style={brandStyle}>
        Crypto Tracker
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              🌎 Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chartdata" className="nav-link">
              💰 Chartdata
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/watchlist" className="nav-link">
              📊 Watchlist
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/news" className="nav-link">
              🗞 News
            </Link>
          </li>
    
          {user ? (
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => auth.signOut()}
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Account
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/account">
                 Signin
                </a>
                <a className="dropdown-item" href="/register">
                Register
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="reset">
                  Forgot Password
                </a>
              </div>
            </li>
          )}
      
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;