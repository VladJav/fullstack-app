import {
 Card, CardContent, CardHeader, Skeleton, Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';

export default function SkeletonPost() {
    return (
        <Card sx={{ borderRadius: 0, width: '100%' }}>

                <CardHeader
                  avatar={(
                        <Skeleton variant="circular">
                            <Avatar />
                        </Skeleton>
                    )}
                  title={(
                        <Skeleton width="70%">
                            <Typography>.</Typography>
                        </Skeleton>
                    )}
                />
                <CardContent>
                    <Skeleton width="50%">
                        <Typography gutterBottom variant="h5" component="div">
                            .
                        </Typography>
                    </Skeleton>

                    <Skeleton width="100%" height="100px" variant="rectangular">
                        <Typography gutterBottom variant="h5" component="div">
                            .
                        </Typography>
                    </Skeleton>
                </CardContent>
        </Card>
    );
}
