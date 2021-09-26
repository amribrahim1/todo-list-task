import { ActionType } from '../action-types';

interface GetTodos {
    type: ActionType.GET_TODOS,
    todos: { id: string, title: string, description: string }[] | null,
    error: any
}

interface AddTodo {
    type: ActionType.ADD_TODO,
    todo: { id: string, title: string, description: string },
    error: any
}

interface EditTodo {
    type: ActionType.EDIT_TODO,
    todo: { id: string, title: string, description: string },
    error: any
}

interface DeleteTodo {
    type: ActionType.DELETE_TODO,
    id: string,
    error: any
}

export type TodoAction = GetTodos | AddTodo | DeleteTodo | EditTodo