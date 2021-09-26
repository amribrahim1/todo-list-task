// External dependencies
import { createStore } from 'redux';

// internal imports
import rootReducer from './reducers/index';
import Middleware from './middleware';

export const store = createStore(rootReducer, Middleware);

export *  from './actionCreators/todos';

