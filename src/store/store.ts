import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import reducer from './reducer';

const preloadedState = {
    listOfArticles: { articles: null, articlesCount: null, offset: null, hasError: null },
    article: { article: null, hasError: null, isChanged: false, isCreated: false },
    user: { isRegistered: false, loggedIn: null, hasError: null },
    isLoading: false,
    isDataUpdate: null,
    hasError: null,
};

const store = configureStore({
    reducer,
    preloadedState,
    middleware: [thunk],
});

export default store;
