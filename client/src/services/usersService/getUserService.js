import axios from 'axios';

export default function getUserService(userId, page = 1) {
    return axios.get(`http://localhost:8000/api/v1/users/${userId}?page=${page}`);
}
