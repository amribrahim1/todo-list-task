import { ActionType } from '../actionTypes';
import { TodoAction } from '../actions'

export default function todos (state : { id: string, title: string, description: string }[] = [], action: TodoAction) {
    switch (action.type) {
        case ActionType.ADD_TODO :
            return action.todo===null ? state : state.concat(action.todo)
        case ActionType.GET_TODOS :
            return action.todos===null ? state : action.todos
        case ActionType.EDIT_TODO :
            if (action.todo===null) {
                return state;
            } else {
                const todos = [...state];
                const itemIndex = state.findIndex(it => it.id === action.todo?.id);
                todos[itemIndex] = {
                    id: action.todo.id,
                    title: action.todo.title,
                    description: action.todo.description
                }
                return todos;
            }
        case ActionType.DELETE_TODO :
            return action.id===null ? state : state.filter(td => td.id !== action.id);
        default :
            return state
    }
} 