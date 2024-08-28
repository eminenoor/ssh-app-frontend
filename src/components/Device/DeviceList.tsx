import React, { useEffect, useState } from "react";
import { deviceList } from "../../services/DeviceService";
import { Device } from "../../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeviceList = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    deviceList()
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setDevices(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          toast.error("Failed to fetch devices.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch devices.");
      });
  }, []);

  const handleSelectDevice = (id: number) => {
    setSelectedDevices((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((deviceId) => deviceId !== id)
        : [...prevSelected, id]
    );
  };

  const handleEditDevice = () => {
    if (selectedDevices.length === 1) {
      const deviceId = selectedDevices[0];
      navigate(`/edit-device/${deviceId}`);
    } else {
      toast.info("Please select a single device to edit.");
    }
  };

  const handleDeleteDevices = async () => {
    const token = localStorage.getItem("token");

    if (selectedDevices.length > 0) {
      try {
        await Promise.all(
          selectedDevices.map((id) =>
            axios.delete(`http://localhost:8080/devices/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setDevices((prevDevices) =>
          prevDevices.filter((device) => !selectedDevices.includes(device.id))
        );

        setSelectedDevices([]);
        toast.success("Device(s) deleted successfully!");
      } catch (error) {
        console.error("Error deleting devices:", error);
        toast.error("Failed to delete the device(s).");
      }
    } else {
      toast.warning("No devices selected to delete.");
    }
  };

  const addNewDevice = () => {
    navigate("/add-device");
  };

  const handleDeviceClick = (device: Device) => {
    navigate(`/ssh-sender/${device.id}`, { state: { device } });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List of Devices</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th>IP Address</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.length === 0 ? (
              <tr>
                <td colSpan={6}>No devices available</td>
              </tr>
            ) : (
              devices.map((device) => (
                <tr key={device.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedDevices.includes(device.id)}
                      onChange={() => handleSelectDevice(device.id)}
                    />
                  </td>
                  <td>{device.ip}</td>
                  <td>{device.userName}</td>
                  <td>{device.password}</td>
                  <td>
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => handleDeviceClick(device)}
                    >
                      Send SSH Command
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="button-group mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={handleEditDevice}
          disabled={selectedDevices.length !== 1}
        >
          Edit Device
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={handleDeleteDevices}
          disabled={selectedDevices.length === 0}
        >
          Delete Device(s)
        </button>
        <button className="btn btn-primary" onClick={addNewDevice}>
          Add Device
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default DeviceList;
