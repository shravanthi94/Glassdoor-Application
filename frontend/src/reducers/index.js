import { combineReducers } from 'redux';

import comStore from './company.reducer';
import alert from './alert';

const rootReducer = combineReducers({
    comStore,
    alert
});

export default rootReducer;