import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setLoggedIn } from '../../store/requests/action';
import Button from '../Button';
import Author from '../Author';
import image from '../../assets/images/avatar.svg';

interface ILogin {
    loggedIn: {
        username: string;
        email: string;
        image: string;
    };
}

export default function LoggedIn({ loggedIn }: ILogin) {
    const dispatch = useDispatch();
    const logOut = () => {
        document.cookie = 'token=""; max-age=0';
        dispatch(setLoggedIn(null));
    };

    return (
        <>
            <Link to='/new-article'>
                <Button text='create article' type='accent' />
            </Link>
            <Link to='/profile'>
                <Author data={{ username: loggedIn.username, image: loggedIn.image || image }} />
            </Link>
            <Button text='log out' onClick={logOut} />
        </>
    );
}
