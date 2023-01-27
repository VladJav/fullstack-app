import {
    Button, Card, CardActions, CardContent, TextareaAutosize,
} from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useProfileOwner } from '../../hooks';

export default function CreatePostButton() {
    const isProfileOwner = useProfileOwner();
    const [showForm, setShowForm] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const createPost = async () => {
        await axios.post('http://localhost:8000/api/v1/posts', {
            title,
            content,
        }, { withCredentials: true });
        setShowForm(false);
        window.location.reload(false);
    };
    return (
        <Box>
            {isProfileOwner ? <Button onClick={() => setShowForm(!showForm)} sx={{ width: '100%' }} variant="outlined">CREATE POST</Button> : ''}
            {showForm ? (
                <Card>
                    <CardContent>
                        <TextField onChange={(e) => { setTitle(e.currentTarget.value); }} sx={{ width: '100%' }} inputProps={{ maxLength: 60 }} />
                        <TextareaAutosize onChange={(e) => { setContent(e.currentTarget.value); }} style={{ width: '100%' }} minRows={10} />
                    </CardContent>
                    <CardActions>
                        <Button onClick={createPost}>Create</Button>
                    </CardActions>
                </Card>
            ) : ''}
        </Box>
    );
}
