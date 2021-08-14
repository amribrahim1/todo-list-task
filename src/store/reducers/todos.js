import { GET_TODOS, ADD_TODO, EDIT_TODO, DELETE_TODO } from '../actionCreators/todos';

export default function todos (state = [], action) {
    switch (action.type) {
        case ADD_TODO :
            return action.todo===null ? state : state.concat(action.todo)
        case GET_TODOS :
            return action.todos===null ? state : action.todos
            case EDIT_TODO :
                if (action.todo===null) {
                    return state;
                } else {
                    let item = state.find(td => td.id === action.todo.id)
                    item.title = action.todo.title;
                    item.description = action.todo.description;
                    return state;
                }
            case DELETE_TODO :
                return action.id===null ? state : state.filter(td => td.id !== action.id);
        default :
            return state
    }
} 