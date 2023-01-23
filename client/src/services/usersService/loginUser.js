import axios from 'axios';

export function loginUser(email, password) {
    return axios.post('http://localhost:8000/api/v1/auth/login', {
        email,
        password,
    }, { withCredentials: true });
}
