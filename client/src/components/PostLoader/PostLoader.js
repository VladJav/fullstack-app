import { SkeletonPost } from '../Post';
import { useProfileOwner } from '../../hooks';

export default function PostLoader(props) {
    const { posts } = props;
    const isProfileOwner = useProfileOwner();
    // eslint-disable-next-line no-nested-ternary
    return (!posts.length ? (
        isProfileOwner ? 'OWNer' : 'No'
    ) : <SkeletonPost />);
}
