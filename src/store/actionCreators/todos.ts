import { ActionType } from "../action-types";
import { getTodos, addTodo, editTodo, deleteTodo } from "../utils/firebase";
import { Dispatch } from 'redux';
import { TodoAction } from "../actions";

type Todo = {
    id: string;
    title: string;
    description: string;
};

function getAllTodos (todos:Todo[] | null, error=null) {
    return {
        type: ActionType.GET_TODOS,
        todos,
        error
    }
}

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

function submitNewTodo (todo: Todo | null, error=null) {
    return {
        type: ActionType.ADD_TODO,
        todo,
        error
    }
}

export function handleSubmitNewTodo(title: string, description: string) {
    return (dispatch: Dispatch) => {
        return addTodo(title, description)
        .then(doc => {
            let td = {id: doc.id, title, description}
            return dispatch(submitNewTodo(td))
        })
        .catch((error) => {
            return dispatch(submitNewTodo(null, error))
        });
    }
}

function submitEditTodo (todo: Todo | null, error=null) {
    return {
        type: ActionType.EDIT_TODO,
        todo,
        error
    }
}

export function handleSubmitEditTodo(id: string, title: string, description: string) {
    return (dispatch: Dispatch) => {
        return editTodo(id, title, description)
        .then(() => {
            return dispatch(submitEditTodo({id, title, description}))
        })
        .catch((error) => {
            return dispatch(submitEditTodo(null, error))
        });
    }
}

function submitDeleteTodo (id: string | null, error=null) {
    return {
        type: ActionType.DELETE_TODO,
        id,
        error
    }
}

export function handleSubmitDeleteTodo(id:string) {
    return (dispatch: Dispatch) => {
        return deleteTodo(id)
        .then(() => {
            return dispatch(submitDeleteTodo(id))
        })
        .catch((error) => {
            return dispatch(submitDeleteTodo(null, error))
        });
    }
}
