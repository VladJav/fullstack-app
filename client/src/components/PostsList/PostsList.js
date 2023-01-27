import InfiniteScroll from 'react-infinite-scroll-component';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Post, SkeletonPost } from '../Post';

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/posts?sort=-created')
            .then((res) => res.data.posts)
            .then((post) => { setPosts(posts.concat(post)); });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:8000/api/v1/posts?page=${page}`);
        const post = res.data.posts;
        if (post.length === 0) {
            setHasMore(false);
            return;
        }
        setPosts(posts.concat(post));
        setPage(page + 1);
    };
    return (
        <Box>
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
                        user,
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
        </Box>
    );
}
