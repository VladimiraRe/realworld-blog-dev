import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/App';
import './index.scss';
import getCookie from './utils/hooks/getCookie';
import { getUser } from './store/requests/action';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    const { token } = getCookie();
    if (token) store.dispatch(getUser(token));

    root.render(
        <Provider store={store}>
            <App token={token} />
        </Provider>
    );
}
