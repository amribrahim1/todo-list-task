import { Dispatch } from 'redux';
import { ActionType } from "../actionTypes";
import { getTodos, addTodo, editTodo, deleteTodo } from "../utils/firebase";
import { TodoAction } from "../actions";

type Todo = {
    id: string;
    title: string;
    description: string;
};

// function getAllTodos (todos:Todo[] | null, error=null) {
//     return {
//         type: ActionType.GET_TODOS,
//         todos,
//         error
//     }
// }

export function handleGetTodos() {
    return (dispatch: Dispatch<TodoAction>) => {
        return getTodos()
        .then(docs => {
            let todosArr: any = [];
            docs.forEach((td) => {
                todosArr.push({id: td.id, ...td.data()})
            })
            const newArr : Todo[] = todosArr.map((tt:any) => {
                return {
                    id: tt.id,
                    title: tt.title,
                    description: tt.description
                }
            })
            return dispatch({
                type: ActionType.GET_TODOS,
                todos: newArr,
                error: null
            })
        })
        .catch((error) => {
            return dispatch({
                type: ActionType.GET_TODOS,
                todos: null,
                error
            })
        });
    }
}

// function submitNewTodo (todo: Todo | null, error=null) {
//     return {
//         type: ActionType.ADD_TODO,
//         todo,
//         error
//     }
// }

export function handleSubmitNewTodo(title: string, description: string) {
    return (dispatch: Dispatch<TodoAction>) => {
        return addTodo(title, description)
        .then(doc => {
            let td = {id: doc.id, title, description}
            return dispatch({
                type: ActionType.ADD_TODO,
                todo: td,
                error: null
            })
        })
        .catch((error) => {
            return dispatch({
                type: ActionType.ADD_TODO,
                todo: null,
                error
            })
        });
    }
}

// function submitEditTodo (todo: Todo | null, error=null) {
//     return {
//         type: ActionType.EDIT_TODO,
//         todo,
//         error
//     }
// }

export function handleSubmitEditTodo(id: string, title: string, description: string) {
    return (dispatch: Dispatch<TodoAction>) => {
        return editTodo(id, title, description)
        .then(() => {
            return dispatch({
                type: ActionType.EDIT_TODO,
                todo: {id, title, description},
                error: null
            })
        })
        .catch((error) => {
            return dispatch({
                type: ActionType.EDIT_TODO,
                todo: null,
                error
            })
        });
    }
}

type DeleteTodoParams = {
    type: ActionType.DELETE_TODO;
    id: string;
    error: any;
}

function submitDeleteTodo (id: string, error=null): DeleteTodoParams {
    return {
        type: ActionType.DELETE_TODO,
        id,
        error
    }
}

export function handleSubmitDeleteTodo(id:string) {
    return (dispatch: Dispatch<TodoAction>) => {
        return deleteTodo(id)
        .then(() => {
            return dispatch(submitDeleteTodo(id))
        })
        .catch((error) => {
            return dispatch({
                type: ActionType.DELETE_TODO,
                id: null,
                error
            })
        });
    }
}
