import { combineReducers } from 'redux';

import * as requestsRedcers from './requests/reducer';
import errors from './errors/reducer';

const reducer = combineReducers({
    ...requestsRedcers,
    errors,
});

export default reducer;
