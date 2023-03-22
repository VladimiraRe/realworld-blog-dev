import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

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
    const { push } = useHistory();

    const logOut = () => {
        document.cookie = 'token=""; max-age=0';
        dispatch(setLoggedIn(null));
    };

    return (
        <>
            <Button text='create article' type='accent' onClick={() => push('/new-article')} />
            <Link to='/profile'>
                <Author data={{ username: loggedIn.username, image: loggedIn.image || image }} />
            </Link>
            <Button text='log out' onClick={logOut} />
        </>
    );
}
