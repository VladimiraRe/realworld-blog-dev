import { Link } from 'react-router-dom';

import './AppHeader.scss';
import User from '../User';

export default function AppHeader() {
    return (
        <header className='appHeader'>
            <Link to='/' className='appHeader__logo'>
                realworld blog
            </Link>
            <User />
        </header>
    );
}
