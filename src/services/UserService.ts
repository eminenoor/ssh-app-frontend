import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/users';

const token = localStorage.getItem('token');

export const userList = () => axios.get(REST_API_BASE_URL, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
