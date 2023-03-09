import './AppHeader.scss';
import Login from '../Login';

export default function AppHeader() {
    return (
        <header className='appHeader'>
            <span className='appHeader__logo'>Realworld Blog</span>
            <Login />
        </header>
    );
}
