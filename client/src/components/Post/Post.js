import {
 Card, CardActionArea, CardContent, CardHeader,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { stringAvatar } from '../../utils';

export default function Post(props) {
    const {
 title, content, author, userId,
} = props;
    const [showMore, setShowMore] = useState(false);
    return (
        <Card sx={{ borderRadius: 0, width: '100%' }}>
            <CardActionArea href={`/profile/${userId}`}>
                <CardHeader
                  avatar={(
                        <Avatar {...stringAvatar(author)} />
                    )}
                  title={author}
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {showMore ? content : `${content.substring(0, 100)}...`}
                    {content.length > 100 ? (
                        <Button size="small" color="primary" onClick={() => { setShowMore(!showMore); }}>
                            {showMore ? 'Less' : 'More'}
                        </Button>
                    ) : ''}
                </Typography>
            </CardContent>
        </Card>
    );
}
