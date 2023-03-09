import { BrowserRouter, Route } from 'react-router-dom';

import './App.scss';
import Header from '../AppHeader';
import ArticlesPage from '../../pages/ArticlesPage';

export default function App() {
    return (
        <div className='app'>
            <Header />
            <div className='app__container'>
                <BrowserRouter>
                    <Route path={['/', '/articles/:page?']} component={ArticlesPage} />
                </BrowserRouter>
            </div>
        </div>
    );
}
