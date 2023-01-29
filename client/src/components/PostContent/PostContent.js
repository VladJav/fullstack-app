import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardContent } from '@mui/material';
import { useState } from 'react';

export default function PostContent(props) {
    const {
        title, content,
    } = props;
    const [showMore, setShowMore] = useState(false);
    return (
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {showMore || content.length < 100 ? content : `${content.substring(0, 100)}...`}
                {content.length > 100 ? (
                    <Button size="small" color="primary" onClick={() => { setShowMore(!showMore); }}>
                        {showMore ? 'Less' : 'More'}
                    </Button>
                ) : ''}
            </Typography>
        </CardContent>
    );
}
