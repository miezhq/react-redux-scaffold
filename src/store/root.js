import { combineReducers } from 'redux-immutable';

import session from '../modules/session/sessionReducer';
import { reducer as asyncReducer } from '../utils/store';

// combine all rootReducer into a root rootReducer
export default combineReducers({
  domain: asyncReducer,
  session,
});
