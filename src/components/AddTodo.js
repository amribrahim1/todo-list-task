import React, { Component } from "react";
import { connect } from 'react-redux';
import { handleSubmitNewTodo } from "../store/actionCreators/todos";

class AddTodo extends Component {
    state = {
        todo: "",
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
        this.props.dispatch(handleSubmitNewTodo(this.state.todo))
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
        const { todo, error, errMessage } = this.state;
        return (
            <form onSubmit={this.addTodo}>
                <div className="mb-3">
                    <label htmlFor="todo" className="form-label">Add todo item</label>
                    <input type="text" name="todo" className="form-control" id="todo" value={todo} onChange={this.handleOnChange} required />
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