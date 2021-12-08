import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import taskReducer from './taskReducer'

export default combineReducers({
  alert,
  auth,
  taskReducer
});
