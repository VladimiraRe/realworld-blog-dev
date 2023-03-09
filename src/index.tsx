import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import type { appDispatch } from './type';
import store from './store';
import { getArticles } from './store/requests/action';
import App from './components/App';
import './index.scss';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    const { dispatch }: { dispatch: appDispatch } = store;
    dispatch(getArticles());

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
}
