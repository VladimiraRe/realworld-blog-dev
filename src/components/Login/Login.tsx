import { useSelector } from 'react-redux';

import type { storeType } from '../../type';
import Button from '../Button';
import './Login.scss';

export default function Login() {
    const isLoggedIn = useSelector((state: storeType) => state.isLoggedIn);
    return <div className='login'>{createContent(isLoggedIn)}</div>;
}

function createContent(isLoggedIn: boolean) {
    return (
        <>
            <span>sign in</span>
            <Button text='sign up' type='accent' />
        </>
    );
}
