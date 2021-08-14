import React, { Component } from "react";
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { handleSubmitDeleteTodo } from "../../store/actionCreators/todos";

class DeleteModal extends Component {
    state = {
        error: false,
        errMessage: ""
    }

    deleteTodo = () => {
        this.setState({
            errMessage: "",
            error: false
        })

        this.props.dispatch(handleSubmitDeleteTodo(this.props.todo.id))
        .then(result => {
            if (result.error === null) {
                this.props.closeDeleteModal()
            } else {
                this.setState({
                    errMessage: result.error.message,
                    error: true
                })
            }
        })
    }

    render() {
        // console.log(this.props)
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.show}
                className="t-modal delete-modal"
                onHide={this.props.closeDeleteModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-3 px-4 mt-3">
                    <h3>Are you sure to delete "{this.props.todo.todo}"</h3>
                    <div className="alert alert-danger text-center m-4" role="alert" style={this.state.error ? {display: "block"} : {display: "none"}}>
                        {this.state.errMessage}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={this.props.closeDeleteModal}>
                        Close
                    </button>
                    <button className="btn btn-danger" onClick={this.deleteTodo}>
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect()(DeleteModal);