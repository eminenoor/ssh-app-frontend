import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import DeviceList from "./components/DeviceList";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CommandList from "./components/CommandList";
import SshSenderPage from "./components/SSHSenderPage";
import AddCommand from "./components/AddCommandPage";
import AddDevice from "./components/AddDevicePage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                  <div>
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
                <Route path="/ssh-sender/:id" element={
                  <div>
                  <HeaderComponent />
                  <SshSenderPage />
                  </div>} />
                <Route path="/add-command" element={<AddCommand />} />
                <Route path="/add-device" element={<AddDevice />} />
            </Routes> 
        </Router>
    );
};

export default App;
