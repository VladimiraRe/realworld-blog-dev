import { useSelector } from 'react-redux';

import type { storeType } from '../../type';

import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';
import './User.scss';

export default function User() {
    const { loggedIn } = useSelector((state: storeType) => state.user);
    const className = ['user'];
    if (loggedIn) className.push('user--loggedIn');

    let content = <NotLoggedIn />;
    if (loggedIn) content = <LoggedIn loggedIn={loggedIn} />;

    return <div className={className.join(' ')}>{content}</div>;
}
