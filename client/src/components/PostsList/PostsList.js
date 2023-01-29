import InfiniteScroll from 'react-infinite-scroll-component';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Post, SkeletonPost } from '../Post';
import { getPosts } from '../../services/postService';

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        getPosts(1)
            .then((res) => res.data.posts)
            .then((post) => { setPosts(posts.concat(post)); });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchData = async () => {
        const res = await getPosts(page);
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
