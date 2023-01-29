import axios from 'axios';

export default function updatePostService(postId, updateBody) {
    const { title, content } = updateBody;
    return axios.put(`http://localhost:8000/api/v1/posts/${postId}`, { title, content }, { withCredentials: true });
}
