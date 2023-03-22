import { Link, useHistory } from 'react-router-dom';

import Button from '../Button';

export default function NotLoggedIn() {
    const history = useHistory();

    const signUp = () => history.push('/sign-up');

    return (
        <>
            <Link to='/sign-in'>sign in</Link>
            <Button text='sign up' onClick={signUp} type='accent' />
        </>
    );
}
