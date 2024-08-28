import React from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const ProfileComponent: React.FC = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <div className="profile-container">
            <CgProfile  className="profile-icon"/>
            <span className="profile-username">{username}</span>
            <button className="btn-logout ms-3" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ProfileComponent;


