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
import Alert from '../Alert';
import useNetworkError from '../../errors/useNetworkError';
import CreateArticlePage from '../../pages/CreateArticlePage';
import EditArticlePage from '../../pages/EditArticlePage';
import { alertMessage, alertType } from '../../utils/helpers/alert.helpers';
import useFirstLoading from '../../utils/hooks/useFirstLoading';

export default function App() {
    const { loggedIn } = useSelector((state: storeType) => state.user);
    const firstLoading = useFirstLoading();
    const networkError = useNetworkError();

    if (firstLoading) return firstLoading;
    if (networkError) return networkError;

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
                    <Route path='/articles/:slug/edit' exact component={EditArticlePage} />
                    <Route path='/articles/:slug' render={() => <Container component={<FullArticle />} />} />
                    <Route
                        path={['/', '/articles', '/articles/?page=']}
                        exact
                        render={() => <Container component={<ListOfArticles />} />}
                    />
                    <Route path='/new-article' exact component={CreateArticlePage} />
                    <Route
                        render={() => (
                            <Container
                                component={<Alert message={alertMessage.notFoundError.page} type={alertType.warning} />}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
}
