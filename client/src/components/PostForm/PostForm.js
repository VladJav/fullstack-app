import {
 Button, Card, CardActions, CardContent, TextareaAutosize,
} from '@mui/material';
import TextField from '@mui/material/TextField';

export default function PostForm(props) {
    const {
 title, content, onClick, setTitle, setContent,
} = props;
    return (
        <Card>
            <CardContent>
                <TextField defaultValue={title} onChange={(e) => { setTitle(e.currentTarget.value); }} sx={{ width: '100%' }} inputProps={{ maxLength: 60 }} />
                <TextareaAutosize defaultValue={content} onChange={(e) => { setContent(e.currentTarget.value); }} style={{ width: '100%' }} minRows={10} />
            </CardContent>
            <CardActions>
                <Button onClick={onClick}>Submit</Button>
            </CardActions>
        </Card>
    );
}
