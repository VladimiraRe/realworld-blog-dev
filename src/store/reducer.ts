import { combineReducers } from 'redux';

import * as requestsRedcers from './requests/reducer';

const reducer = combineReducers({
    ...requestsRedcers,
});

export default reducer;
