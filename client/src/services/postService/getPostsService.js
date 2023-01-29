import axios from 'axios';

export default function getPostsService(page) {
    return axios.get(`http://localhost:8000/api/v1/posts?sort=-created&page=${page}`);
}
