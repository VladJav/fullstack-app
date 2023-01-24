import axios from 'axios';

export default function registerUser(email, password) {
    return axios.post('http://localhost:8000/api/v1/auth/register', {
        email,
        password,
    }, { withCredentials: true });
}
