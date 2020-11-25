import { combineReducers } from 'redux';

import comStore from './company.reducer';
import alert from './alert';
import auth from './auth';

const rootReducer = combineReducers({
    comStore,
    alert,
    auth
});

export default rootReducer;