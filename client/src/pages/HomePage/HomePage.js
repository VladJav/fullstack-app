import {
    Container,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Header } from '../../components/Header';
import { Post, SkeletonPost } from '../../components/Post';

export default function HomePage() {
    const [posts, setPosts] = useState();
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/posts')
            .then((res) => res.data.posts)
            .then((post) => { setPosts(post); });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
        <Header />
        <Box sx={{
            marginTop: '5%',
        }}
        >
            <Container maxWidth="sm">
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
                >
                    {posts ? (posts.map((e) => {
                        const { title, content, user } = e;
                        const { _id: id } = user;
                        return (
                            <Post
                              userId={id}
                              title={title}
                              content={content}
                              author={user.email}
                            />
                        );
                    })
                    ) : Array.from(new Array(2)).map(() => <SkeletonPost />)}
                </Box>
            </Container>
        </Box>
        </>
    );
}
