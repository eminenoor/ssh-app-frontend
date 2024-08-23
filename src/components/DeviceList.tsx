import React, { useEffect, useState } from "react";
import { deviceList } from "../services/DeviceService";
import { Device } from "../types";
import { useNavigate } from "react-router-dom";

const DeviceList = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    deviceList()
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setDevices(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeviceClick = (device: Device) => {
    navigate(`/ssh-sender/${device.id}`, { state: { device } });
  };

  function addNewDevice(){
    navigate("/add-device");
  }

  function logout(){
    navigate("/");
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List of Devices</h2>
      <nav className="navbar navbar-light">
        <form className="form-inline">
          <button className="btn btn-primary mb-2 me-md-2" onClick={addNewDevice}>Add Device</button>
          <button className="btn btn-danger mb-2" onClick={logout}>Logout</button>
        </form>
      </nav>
      <div className="table-responsive">
        <table className="table table-stripped-columns table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>Device ID</th>
              <th>IP Address</th>
              <th>User Name</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {devices.length === 0 ? (
              <tr><td colSpan={4}>No devices available</td></tr>
            ) : (
              devices.map((device) => (
                <tr key={device.id} onClick={() => handleDeviceClick(device)} style={{ cursor: 'pointer' }}>
                  <td>{device.id}</td>
                  <td>{device.ip}</td>
                  <td>{device.userName}</td>
                  <td>{device.password}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceList;
