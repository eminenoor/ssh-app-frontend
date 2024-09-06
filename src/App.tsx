import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LoginRegister/Login";
import UserList from "./components/UserList";
import DeviceList from "./components/Device/DeviceList";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CommandList from "./components/Command/CommandList";
import SshSenderPage from "./components/SSHSenderPage";
import AddCommand from "./components/Command/AddCommandPage";
import AddDevice from "./components/Device/AddDevicePage";
import EditCommand from "./components/Command/EditCommandPage";
import EditDevice from "./components/Device/EditDevicePage";
import LogHistoryTable from "./components/LogHistoryTable";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <div>
              <HeaderComponent />
              <UserList />
              <FooterComponent />
            </div>
          }
        />
        <Route path="/" element={<Login />} />
        <Route
          path="/devices"
          element={
            <div>
              <HeaderComponent />
              <DeviceList />
              <FooterComponent />
            </div>
          }
        />
        <Route
          path="/commands"
          element={
            <div>
              <HeaderComponent />
              <CommandList />
              <FooterComponent />
            </div>
          }
        />
        <Route
          path="/ssh-sender/:id"
          element={
            <div>
              <HeaderComponent />
              <SshSenderPage />
              <FooterComponent />
            </div>
          }
        />
        <Route 
          path="/add-command" 
          element={
            <div>
              <HeaderComponent />
              <AddCommand />
              <FooterComponent />
            </div>
          } 
        />
        <Route 
          path="/add-device" 
          element={
            <div>
              <HeaderComponent />
              <AddDevice />
              <FooterComponent />
            </div>
          } 
        />
        <Route 
          path="/edit-command/:id" 
          element={
            <div>
              <HeaderComponent />
              <EditCommand />
              <FooterComponent />
            </div>
          } 
        />
        <Route 
          path="/edit-device/:id" 
          element={
            <div>
              <HeaderComponent />
              <EditDevice />
              <FooterComponent />
            </div>
          } 
        />
        <Route 
          path="/history"
          element={
            <div>
              <HeaderComponent />
              <LogHistoryTable />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
