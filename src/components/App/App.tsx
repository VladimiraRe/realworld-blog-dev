import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.scss';
import Header from '../AppHeader';
import ListOfArticles from '../../pages/ListOfArticlesPage';
import FullArticle from '../Article/FullArticle';
import Error, { errorMessage, errorType } from '../Error';

export default function App() {
    return (
        <div className='app'>
            <Header />
            <div className='app__container'>
                <BrowserRouter>
                    <Switch>
                        <Route path='/articles/:key/:slug' component={FullArticle} />
                        <Route path={['/', '/articles']} component={ListOfArticles} />
                        <Route
                            render={() => <Error message={errorMessage.notFound.article} type={errorType.warning} />}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );
}
