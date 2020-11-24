import { combineReducers } from 'redux';

import  comStore  from './company.reducer';

const rootReducer = combineReducers({
  comStore
});

export default rootReducer;