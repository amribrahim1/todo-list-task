import React, { Component } from "react";
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { handleSubmitEditTodo } from "../../store";

class EditModal extends Component {
    state = {
        title: "",
        description: "",
        error: false,
        errMessage: ""
    }

    componentDidUpdate(prevProps) {
        if (this.props.todo !== prevProps.todo)
        this.setState({
            title: this.props.todo.title,
            description: this.props.todo.description
        })
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            errMessage: "",
            error: false
        })
    }

    editTodo = e => {
        e.preventDefault();
        this.setState({
            errMessage: "",
            error: false
        });

        this.props.dispatch(handleSubmitEditTodo(this.props.todo.id,this.state.title, this.state.description))
        .then(result => {
            if (result.error === null) {
                this.props.closeEditModal()
            } else {
                this.setState({
                    errMessage: result.error.message,
                    error: true
                })
            }
        })
    }
    
    render() {
        const { error, errMessage } = this.state;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.show}
                className="modal"
                onHide={this.props.closeEditModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={this.editTodo}>
                    <Modal.Body>
                        <label className="form-label">Edit "{this.props.todo.title}"</label>
                            <div className="mb-1">
                                <input type="text" name="title" className="form-control" value={this.state.title} onChange={this.handleOnChange} required />
                            </div>
                            <div className="mb-3">
                                <input type="text" name="description" className="form-control" value={this.state.description} onChange={this.handleOnChange} required />
                            </div>
                            <div className="alert alert-danger text-center m-4" role="alert" style={error ? {display: "block"} : {display: "none"}}>
                                {errMessage}
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.props.closeEditModal}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default connect()(EditModal);