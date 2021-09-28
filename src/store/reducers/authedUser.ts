import { ActionType } from '../action-types';
import { AuthedUserAction } from '../actions';

export default function authedUser (state : { uid: string, email: string, displayName: string } | null = null, action: AuthedUserAction) {
    switch (action.type) {
        case ActionType.SET_AUTHED_USER :
            return action.user;
        default :
            return state
    }
} 