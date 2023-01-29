import {
    Button,
} from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useProfileOwner } from '../../hooks';
import { PostForm } from '../PostForm';
// eslint-disable-next-line import/named
import { createPostService } from '../../services/postService';

export default function CreatePostButton() {
    const isProfileOwner = useProfileOwner();
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const createPost = async () => {
        await createPostService({ title, content });
        setShowForm(false);
        window.location.reload(false);
    };
    return (
        <Box>
            {isProfileOwner ? <Button onClick={() => setShowForm(!showForm)} sx={{ width: '100%' }} variant="outlined">CREATE POST</Button> : ''}
            {showForm ? (
                <PostForm
                  title={title}
                  content={content}
                  onClick={createPost}
                  setTitle={setTitle}
                  setContent={setContent}
                />
            ) : ''}
        </Box>
    );
}
