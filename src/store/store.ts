import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import reducer from './reducer';

const preloadedState = {
    listOfArticles: { articles: null, articlesCount: null, offset: null, hasError: null },
    article: { article: null, hasError: null },
    isLoading: false,
    isLoggedIn: false,
};

const store = configureStore({
    reducer,
    preloadedState,
    middleware: [thunk],
});

export default store;
