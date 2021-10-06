import { Action } from 'redux';
import { ActionType } from '../action-types';

interface GetTodos {
    type: ActionType.GET_TODOS,
    todos: { id: string, title: string, description: string }[] | null,
    error: any
}

interface AddTodo {
    type: ActionType.ADD_TODO,
    todo: { id: string, title: string, description: string } | null,
    error: any
}

interface EditTodo {
    type: ActionType.EDIT_TODO,
    todo: { id: string, title: string, description: string } | null,
    error: any
}

interface DeleteTodo {
    type: ActionType.DELETE_TODO,
    id: string | null,
    error: any
}

interface AuthUser {
    type: ActionType.SET_AUTHED_USER,
    user: { uid: string | undefined, email: string | null | undefined, displayName: string | null | undefined } | null,
    error: any
}

export type TodoAction = GetTodos | AddTodo | DeleteTodo | EditTodo
export type AuthedUserAction = AuthUser
export type LoadingAction = Action