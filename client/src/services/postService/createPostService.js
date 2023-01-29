import axios from 'axios';

export default function createPostService(createBody) {
    const { title, content } = createBody;
    return axios.post('http://localhost:8000/api/v1/posts', {
        title,
        content,
    }, { withCredentials: true });
}
