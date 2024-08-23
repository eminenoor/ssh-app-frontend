import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/devices';

const token = localStorage.getItem('token');

export const deviceList = () => axios.get(REST_API_BASE_URL, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
