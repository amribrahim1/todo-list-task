import { SET_AUTHED_USER, NEW_USER } from '../actionCreators/authedUser';

export default function authedUser (state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER :
            return action.user
        case NEW_USER :
            return action
        default :
            return state
    }
} 