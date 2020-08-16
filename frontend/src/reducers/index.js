import { combineReducers } from 'redux';
import { postMessage } from './postMessage';

// Combine all reducers in the application
export const reducers = combineReducers({
  postMessage
});