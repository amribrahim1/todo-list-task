import { Component } from "react";
import { connect, ConnectedProps } from 'react-redux';
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import { handleGetTodos, RootState, store } from "../store";
import { Todo } from '../models'

interface ListTodosProps extends PropsFromRedux {
    
}

interface ListTodosState {
    editModal: boolean;
    deleteModal: boolean;
    error: boolean;
    errMessage: string;
    todo: Todo;
}

class ListTodos extends Component<ListTodosProps, ListTodosState> {
    emptyTodo = {
        id: "",
        title: "",
        description: ""
    }

    state = {
        editModal: false,
        deleteModal: false,
        todo: this.emptyTodo,
        error: false,
        errMessage: ""
    }

    componentDidMount() {
        this.props.handleGetTodos()
        .then(result => {
            if (result.error === null) {
                
            } else {
                this.setState({
                    errMessage: result.error.message,
                    error: true
                })
            }
        })
    }

    openEditModal = (todo:Todo) => {
        this.setState({
            editModal: true,
            todo
        })
    }
    closeEditModal = () => {
        this.setState({
            editModal: false,
            todo: this.emptyTodo
        })
    }

    openDeleteModal = (todo:Todo) => {
        this.setState({
            deleteModal: true,
            todo
        })
    }
    closeDeleteModal = () => {
        this.setState({
            deleteModal: false,
            todo: this.emptyTodo
        })
    }

    render() {
        const { editModal, deleteModal, todo, error, errMessage } = this.state;
        const todos = this.props.todos;
        return (
            <>
            <div className="alert alert-danger text-center m-4" role="alert" style={error ? {display: "block"} : {display: "none"}}>
                {errMessage}
            </div>
            <ul className="list-group m-4 text-start">
                {todos && todos.map((td:Todo) => 
                    <li key={td.id} className="list-group-item d-flex align-items-center justify-content-between">
                        <p className="mb-0">
                            {td.title} <br/>
                            <span style={{fontSize: "0.8rem", color: "gray"}}>{td.description}</span>
                        </p>
                        <div className="">
                            <button type="button" className="btn btn-info mx-2" onClick={() => this.openEditModal(td)}>Edit</button>
                            <button type="button" className="btn btn-danger mx-2" onClick={() => this.openDeleteModal(td)}>Delete</button>
                        </div>
                    </li>
                )}
            </ul>
            <EditModal show={editModal} closeEditModal={this.closeEditModal} todo={todo} />
            <DeleteModal show={deleteModal} closeDeleteModal={this.closeDeleteModal} todo={todo} />
           </>
        )
    }
}

function mapStateToProps ({ todos }: RootState) {
	return {
		todos
	}
}

// export default connect(mapStateToProps)(ListTodos);

const connector = connect(mapStateToProps, { handleGetTodos });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ListTodos)