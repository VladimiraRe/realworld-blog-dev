import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import type { storeType } from '../../type';
import Container from '../../containers/Container';
import Header from '../AppHeader';
import ListOfArticles from '../../pages/ListOfArticlesPage';
import FullArticle from '../Article/FullArticle';
import RegistrationPage from '../../pages/RegistrationPage';
import LoginPage from '../../pages/LoginPage';
import EditProfilePage from '../../pages/EditProfilePage';
import Alert, { alertMessage, alertType } from '../Alert';

export default function App() {
    const { loggedIn } = useSelector((state: storeType) => state.user);

    return (
        <div className='app'>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path='/sign-in' exact render={() => (loggedIn ? <Redirect to='/' /> : <LoginPage />)} />
                    <Route
                        path='/profile'
                        exact
                        render={() => (loggedIn ? <EditProfilePage /> : <Redirect to='/sign-in' />)}
                    />
                    <Route path='/sign-up' exact component={RegistrationPage} />
                    <Route path='/articles/:key/:slug' render={() => <Container component={<FullArticle />} />} />
                    <Route
                        path={['/', '/articles', '/articles/?page=']}
                        exact
                        render={() => <Container component={<ListOfArticles />} />}
                    />
                    <Route
                        render={() => <Alert message={alertMessage.notFoundError.page} type={alertType.warning} />}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
}
