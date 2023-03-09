import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import reducer from './reducer';

const preloadedState = {
    articles: { articles: [], articlesCount: 0, offset: 0 },
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
