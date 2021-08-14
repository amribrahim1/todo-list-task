import React, { Component } from "react";
import { connect } from 'react-redux';
import { handleSubmitNewTodo } from "../store/actionCreators/todos";

class AddTodo extends Component {
    state = {
        title: "",
        description: "",
        error: false,
        errMessage: ""
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            errMessage: "",
            error: false
        })
    }

    addTodo = e => {
        e.preventDefault();
        this.setState({
            errMessage: "",
            error: false
        })
        this.props.dispatch(handleSubmitNewTodo(this.state.title, this.state.description))
        .then(result => {
            if (result.error === null) {
                this.setState({todo: ""})
            } else {
                this.setState({
                    errMessage: result.error.message,
                    error: true
                })
            }
        })
    }
    
    render() {
        const { title, description, error, errMessage } = this.state;
        return (
            <form onSubmit={this.addTodo}>
                <label className="form-label">Add todo item</label>
                <div className="mb-1">
                    <input type="text" name="title" className="form-control" value={title} onChange={this.handleOnChange} placeholder="Title" required />
                </div>
                <div className="mb-3">
                    <input type="text" name="description" className="form-control" value={description} onChange={this.handleOnChange} placeholder="Description" required />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
                <div className="alert alert-danger text-center m-4" role="alert" style={error ? {display: "block"} : {display: "none"}}>
                    {errMessage}
                </div>
            </form>
        )
    }
}

export default connect()(AddTodo);