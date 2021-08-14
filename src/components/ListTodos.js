import { Component } from "react";
import { connect } from 'react-redux';
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import { handleGetTodos } from "../store/actionCreators/todos";

class ListTodos extends Component {
    state = {
        editModal: false,
        deleteModal: false,
        todo: {},
        error: false,
        errMessage: ""
    }

    componentDidMount() {
        this.props.dispatch(handleGetTodos())
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

    openEditModal = todo => {
        this.setState({
            editModal: true,
            todo
        })
    }
    closeEditModal = () => {
        this.setState({
            editModal: false,
            todo: {}
        })
    }

    openDeleteModal = todo => {
        this.setState({
            deleteModal: true,
            todo
        })
    }
    closeDeleteModal = () => {
        this.setState({
            deleteModal: false,
            todo: {}
        })
    }

    render() {
        const { editModal, deleteModal, todo, error, errMessage } = this.state;
        return (
            <>
            <div className="alert alert-danger text-center m-4" role="alert" style={error ? {display: "block"} : {display: "none"}}>
                {errMessage}
            </div>
            <ul className="list-group m-4 text-start">
                {this.props.todos && this.props.todos.map(td => 
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
            <EditModal show={editModal} openEditModal={this.openEditModal} closeEditModal={this.closeEditModal} todo={todo} />
            <DeleteModal show={deleteModal} openDeleteModal={this.openDeleteModal} closeDeleteModal={this.closeDeleteModal} todo={todo} />
           </>
        )
    }
}

function mapStateToProps ({ todos }) {
	return {
		todos
	}
}

export default connect(mapStateToProps)(ListTodos);