import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export default function useProfileOwner() {
    const [isProfileOwner, setIsProfileOwner] = useState(false);
    const { profileId } = useParams();
    useEffect(() => {
        const token = Cookies.get('auth-token');
        if (token && profileId) {
            const { _id } = jwtDecode(token);

            if (_id === profileId) {
                setIsProfileOwner(true);
            }
        }
        // eslint-disable-next-line
    }, []);
    return isProfileOwner;
}
