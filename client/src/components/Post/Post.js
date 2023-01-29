import {

    Card, CardActionArea, CardHeader, IconButton,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { stringAvatar } from '../../utils';
import { PostContent } from '../PostContent';
import { useProfileOwner } from '../../hooks';
import { PostForm } from '../PostForm';
import { deletePostService, updatePostService } from '../../services/postService';

export default function Post(props) {
    const {
 title, content, author, userId, postId,
} = props;
    const isProfileOwner = useProfileOwner();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateContent, setUpdateContent] = useState(content);
    const deletePost = async () => {
        await deletePostService(postId);
        window.location.reload(false);
    };
    const updatePost = async () => {
        await updatePostService(postId, { title: updateTitle, content: updateContent });
        setShowUpdateForm(false);
        window.location.reload(false);
    };
    return (
        <Card sx={{ borderRadius: 0, width: '100%' }}>
            {isProfileOwner ? (
                <CardHeader
                  avatar={(
                        <Avatar {...stringAvatar(author)} />
                    )}
                  title={author}
                  action={(
                    <Box>
                        <IconButton onClick={() => setShowUpdateForm(!showUpdateForm)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={deletePost}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                  )}
                />
            ) : (
                <CardActionArea href={`/profile/${userId}`}>
                    <CardHeader
                      avatar={(
                            <Avatar {...stringAvatar(author)} />
                        )}
                      title={author}
                    />
                </CardActionArea>
            )}
            {showUpdateForm ? (
                <PostForm
                  title={updateTitle}
                  content={updateContent}
                  onClick={updatePost}
                  setTitle={setUpdateTitle}
                  setContent={setUpdateContent}
                />
            ) : <PostContent title={title} content={content} />}

        </Card>
    );
}
