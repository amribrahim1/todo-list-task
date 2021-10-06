// External dependencies
import { createStore } from 'redux';

// internal imports
import rootReducer from './reducers';
import Middleware from './middleware';

export const store = createStore(rootReducer, Middleware);

export * from './actionCreators';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatchStore = store.dispatch as typeof store.dispatch;
