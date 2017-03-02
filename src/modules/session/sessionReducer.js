import Immutable from 'immutable';
import { createHandlerReducer } from '../../utils/reducers';

const initialState = Immutable.fromJS({
  user: window.__APP_DATA.user ? window.__APP_DATA.user : null,
  token: window.__APP_DATA.user ? window.__APP_DATA.user.token : null,
});

export default createHandlerReducer({}, initialState);
