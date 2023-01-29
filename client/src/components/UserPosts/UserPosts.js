import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Post, SkeletonPost } from '../Post';
import { getUserService } from '../../services/usersService';

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(2);
    const [user, setUser] = useState();
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const { profileId = '' } = useParams();
    useEffect(() => {
        getUserService(profileId)
            .then((res) => res.data.user)
            .then((user2) => {
                setUser(user2);
                setPosts(posts.concat(user2.posts));
            })
            .catch(() => {
                navigate('/');
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchData = async () => {
        const res = await getUserService(profileId, page);
        const post = res.data.user.posts;
        if (post.length === 0) {
            setHasMore(false);
            return;
        }
        setPosts(posts.concat(post));
        setPage(page + 1);
    };
    return (
        !posts.length && user ? (
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
                          postId={postId}
                          title={title}
                          content={content}
                          author={user.email}
                        />
                    );
                })}
            </InfiniteScroll>
        )
    );
}
