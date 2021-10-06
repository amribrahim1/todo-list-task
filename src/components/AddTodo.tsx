import React, { Component } from "react";
import { connect, ConnectedProps } from 'react-redux';
import { handleSubmitNewTodo } from "../store";

interface AddTodoProps extends PropsFromRedux {
    
}

interface AddTodoState {
    title: string;
    description: string;
    error: boolean;
    errMessage: string;
}

class AddTodo extends Component<AddTodoProps, AddTodoState> {
    state = {
        title: "",
        description: "",
        error: false,
        errMessage: ""
    }

    handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value,
            errMessage: "",
            error: false
        } as Pick<AddTodoState, keyof AddTodoState>)
    }

    addTodo = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({
            errMessage: "",
            error: false
        })
        this.props.handleSubmitNewTodo(this.state.title, this.state.description)
        .then(result => {
            if (result.error === null) {
                this.setState({
                    errMessage: "",
                    error: false
                })
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

// export default connect()(AddTodo);

const connector = connect(null, { handleSubmitNewTodo });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AddTodo)