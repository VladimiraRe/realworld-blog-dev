import { combineReducers } from 'redux';

import * as requestsRedcers from './requests/reducer';
import hasError from './errors/reducer';

const reducer = combineReducers({
    ...requestsRedcers,
    hasError,
});

export default reducer;
