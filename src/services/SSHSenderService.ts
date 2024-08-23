import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/ssh-sender/1';

const token = localStorage.getItem('token');

export const commandList = () => axios.get(REST_API_BASE_URL, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
