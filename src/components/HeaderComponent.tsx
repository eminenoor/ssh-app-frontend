import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileComponent from "./ProfileComponent";

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      {/* Top Header */}
      <nav className="navbar navbar-dark custom-navbar">
        <div className="container-fluid d-flex justify-content-center">
          <span className="navbar-brand mb-0 h1">SSH Command Executer</span>
        </div>
      </nav>

      {/* Bottom Navbar */}
      <nav className="navbar navbar-expand-lg custom-sub-navbar">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo03">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/devices")}>Devices</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/commands")}>Commands</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/history")}>History</a>
            </li>
          </ul>
          
        </div>
        
        <ProfileComponent />
      </nav>
    </div>
  );
};

export default HeaderComponent;

