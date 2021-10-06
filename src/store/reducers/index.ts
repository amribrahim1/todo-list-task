import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authedUser from './authedUser';
import todos from './todos';

const rootReducer = combineReducers({
    authedUser,
    todos,
    loadingBar: loadingBarReducer,
})

export default rootReducer;
// export type RootState = ReturnType<typeof rootReducer>