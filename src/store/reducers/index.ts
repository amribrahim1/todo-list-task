import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authedUser from './authedUser';
import todos from './todos';

export default combineReducers({
    authedUser,
    todos,
    loadingBar: loadingBarReducer,
}) 
