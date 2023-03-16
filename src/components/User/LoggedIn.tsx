import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setLoggedIn } from '../../store/requests/action';
import Button from '../Button';
import Author from '../Author';

interface ILogin {
    loggedIn: {
        username: string;
        email: string;
        image: string;
    };
}

export default function LoggedIn({ loggedIn }: ILogin) {
    const dispatch = useDispatch();
    const logOut = () => dispatch(setLoggedIn(null));

    return (
        <>
            <Button text='create article' type='accent' />
            <Link to='/profile'>
                <Author data={{ username: loggedIn.username, image: loggedIn.image }} />
            </Link>
            <Button text='log out' onClick={logOut} />
        </>
    );
}
