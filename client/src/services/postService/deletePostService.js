import axios from 'axios';

export default function deletePostService(postId) {
    return axios.delete(`http://localhost:8000/api/v1/posts/${postId}`, { withCredentials: true });
}
