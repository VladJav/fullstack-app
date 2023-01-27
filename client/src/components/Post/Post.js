import {
 Card, CardActionArea, CardHeader,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { stringAvatar } from '../../utils';
import { PostContent } from '../PostContent';
import { useProfileOwner } from '../../hooks';

export default function Post(props) {
    const {
 title, content, author, userId,
} = props;
    // eslint-disable-next-line no-unused-vars
    const isProfileOwner = useProfileOwner();
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
