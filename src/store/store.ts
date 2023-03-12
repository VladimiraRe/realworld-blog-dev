import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import reducer from './reducer';

const preloadedState = {
    listOfArticles: { articles: null, articlesCount: null, offset: null },
    article: null,
    isLoading: false,
    errors: { fetchArticleError: 0 },
    isLoggedIn: false,
};

const store = configureStore({
    reducer,
    preloadedState,
    middleware: [thunk],
});

export default store;
