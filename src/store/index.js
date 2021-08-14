// External dependencies
import { createStore } from 'redux';

// internal imports
import rootReducer from './reducers';
import Middleware from './middleware';

export default function initStore() {
    const store = createStore(rootReducer, Middleware);

	return { store };
}
