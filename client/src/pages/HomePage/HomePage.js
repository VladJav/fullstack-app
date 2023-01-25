import {
    Container,
} from '@mui/material';
import Box from '@mui/material/Box';
import { Header } from '../../components/Header';
import { PostsList } from '../../components/PostsList';

export default function HomePage() {
    return (
        <>
        <Header />
        <Box sx={{
            marginTop: '5%',
        }}
        >
            <Container maxWidth="sm">
                <PostsList />
            </Container>
        </Box>
        </>
    );
}
