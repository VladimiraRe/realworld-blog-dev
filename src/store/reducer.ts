import { combineReducers } from 'redux';

import * as requestsRedcers from './requests/reducer';
import * as articlesReducer from './requests/articles/reducer';
import * as userReducer from './requests/user/reducer';
import hasError from './errors/reducer';

const reducer = combineReducers({
    ...articlesReducer,
    ...userReducer,
    ...requestsRedcers,
    hasError,
});

export default reducer;
