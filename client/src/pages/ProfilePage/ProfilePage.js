import Box from '@mui/material/Box';
import { Container } from '@mui/material';

import { Header } from '../../components/Header';

import CreatePostButton from '../../components/CreatePostButton/CreatePostButton';
import { UserPosts } from '../../components/UserPosts';

export default function ProfilePage() {
    return (
        <>
            <Header />
            <Box sx={{
                marginTop: '5%',
            }}
            >
                <Container maxWidth="sm">
                    <Box>
                        <CreatePostButton />
                        <UserPosts />
                    </Box>
                </Container>
            </Box>
        </>
);
}
