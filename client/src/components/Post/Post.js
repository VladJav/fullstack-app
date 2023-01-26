import {
 Card, CardActionArea, CardHeader,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { stringAvatar } from '../../utils';
import { PostContent } from '../PostContent';

export default function Post(props) {
    const {
 title, content, author, userId,
} = props;
    // eslint-disable-next-line no-unused-vars
    const [isProfileOwner, setIsProfileOwner] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const { profileId } = useParams();
    useEffect(() => {
        const token = Cookies.get('auth-token');
        if (token && profileId) {
            const { _id } = jwtDecode(token);
            if (_id === profileId) {
                setIsProfileOwner(true);
            }
        }
        // eslint-disable-next-line
    }, []);
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
                        <EditIcon />
                        <EditIcon />
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
            <PostContent title={title} content={content} />
        </Card>
    );
}
