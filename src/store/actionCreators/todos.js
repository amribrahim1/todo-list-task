import { getTodos, addTodo, editTodo, deleteTodo } from "../utils/firebase";

export const GET_TODOS = 'GET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';

function getAllTodos (todos, error=null) {
    return {
        type: GET_TODOS,
        todos,
        error
    }
}

export function handleGetTodos() {
    return (dispatch) => {
        return getTodos()
        .then(docs => {
            let todosArr = [];
            docs.forEach((td) => {
                todosArr.push({id: td.id, ...td.data()})
            })
            return dispatch(getAllTodos(todosArr, null))
        })
        .catch((error) => {
            return dispatch(getAllTodos(null, error))
        });
    }
}

function submitNewTodo (todo, error=null) {
    return {
        type: ADD_TODO,
        todo,
        error
    }
}

export function handleSubmitNewTodo(todo) {
    return (dispatch) => {
        return addTodo(todo)
        .then(doc => {
            let td = {id: doc.id, todo}
            return dispatch(submitNewTodo(td))
        })
        .catch((error) => {
            return dispatch(submitNewTodo(null, error))
        });
    }
}

function submitEditTodo (todo, error=null) {
    return {
        type: EDIT_TODO,
        todo,
        error
    }
}

export function handleSubmitEditTodo(id, todo) {
    return (dispatch) => {
        return editTodo(id,todo)
        .then(() => {
            return dispatch(submitEditTodo({id, todo}))
        })
        .catch((error) => {
            return dispatch(submitEditTodo(null, error))
        });
    }
}

function submitDeleteTodo (id, error=null) {
    return {
        type: DELETE_TODO,
        id,
        error
    }
}

export function handleSubmitDeleteTodo(id) {
    return (dispatch) => {
        return deleteTodo(id)
        .then(() => {
            return dispatch(submitDeleteTodo(id))
        })
        .catch((error) => {
            return dispatch(submitDeleteTodo(null, error))
        });
    }
}
