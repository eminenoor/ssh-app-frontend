import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import DeviceList from "./components/DeviceList";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CommandList from "./components/CommandList";
import SshSenderPage from "./components/SSHSenderPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                  <div>
                  <HeaderComponent />
                  <Login />
                  <FooterComponent />
                  </div>} /> 
                <Route path="/users" element={
                  <div>
                  <HeaderComponent />
                  <UserList />
                  <FooterComponent />
                  </div>} /> 
                <Route path="/" element={
                  <div>
                  <HeaderComponent />
                  <Login />
                  <FooterComponent />
                  </div>} /> 
                <Route path="/devices" element={
                  <div>
                  <HeaderComponent />
                  <DeviceList />
                  <FooterComponent />
                </div>} />
                <Route path="/commands" element={
                  <div>
                  <HeaderComponent />
                  <CommandList />
                  <FooterComponent />
                </div>} />
                <Route path="/" element={<DeviceList />} />
                <Route path="/ssh-sender/:id" element={<SshSenderPage />} />
            </Routes> 
        </Router>
    );
};

export default App;
