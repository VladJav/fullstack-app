import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Post, SkeletonPost } from '../../components/Post';
import CreatePostButton from '../../components/CreatePostButton/CreatePostButton';

export default function ProfilePage() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(2);
    const [user, setUser] = useState();
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const { profileId } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/users/${profileId}`)
            .then((res) => res.data.user)
            .then((user2) => {
                setUser(user2);
                setPosts(posts.concat(user2.posts));
                console.log(user2);
            })
            .catch(() => {
                navigate('/');
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:8000/api/v1/users/${profileId}?page=${page}`);
        const post = res.data.user.posts;
        if (post.length === 0) {
            setHasMore(false);
            return;
        }
        setPosts(posts.concat(post));
        setPage(page + 1);
    };
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
                        {!posts.length && user ? (
                            ''
                        ) : (
                            <InfiniteScroll
                              next={fetchData}
                              hasMore={hasMore}
                              loader={<SkeletonPost />}
                              dataLength={posts.length}
                            >
                        {posts.map((e) => {
                            const {
                            title,
                            content,
                            _id: postId,
                        } = e;
                            const { _id: id } = user;
                            return (
                            <Post
                              key={postId}
                              userId={id}
                              title={title}
                              content={content}
                              author={user.email}
                            />
                            );
                        })}
                            </InfiniteScroll>
)}
                    </Box>
                </Container>
            </Box>
        </>
);
}
