import React , { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { handleSignIn, handleNewUser } from '../store';

class Login extends Component {
    state = {
        loginEmail: "",
        loginPass: "",
        signupEmail: "",
        signupPass: "",
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

    login = e => {
        e.preventDefault()
        this.setState({
            errMessage: "",
            error: false
        })
        this.props.dispatch(handleSignIn(this.state.loginEmail, this.state.loginPass))
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

    signup = e => {
        e.preventDefault();
        this.setState({
            errMessage: "",
            error: false
        })
        this.props.dispatch(handleNewUser(this.state.signupEmail, this.state.signupPass))
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

    render() {
        // console.log(this.props)
        const { loginEmail, loginPass, signupEmail, signupPass, error, errMessage } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto p-0">
                        <div className="">
                            <div className="login-box">
                                <div className="login-snip">
                                    <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked />
                                    <label htmlFor="tab-1" className="tab">Login</label>
                                    <input id="tab-2" type="radio" name="tab" className="sign-up" />
                                    <label htmlFor="tab-2" className="tab">Sign Up</label>
                                    <div className="login-space">
                                        <form className="login" onSubmit={this.login}>
                                            <div className="group">
                                                <label htmlFor="loginEmail" className="label">E-mail</label>
                                                <input name="loginEmail" id="loginEmail" type="email" value={loginEmail} className="input" placeholder="Enter your E-mail" onChange={this.handleOnChange} required />
                                            </div>
                                            <div className="group">
                                                <label htmlFor="loginPass" className="label">Password</label>
                                                <input name="loginPass" id="loginPass" type="password" value={loginPass} className="input" data-type="password" placeholder="Enter your password" onChange={this.handleOnChange} required />
                                            </div>
                                            <div className="group">
                                                <input type="submit" className="button" value="Sign In" />
                                            </div>
                                            <div className="hr"></div>
                                        </form>
                                        <form className="sign-up-form" onSubmit={this.signup}>
                                            <div className="group">
                                                <label htmlFor="signupEmail" className="label">Email Address</label>
                                                <input name="signupEmail" id="signupEmail" type="email" value={signupEmail} className="input" placeholder="Enter your email address" onChange={this.handleOnChange} required />
                                            </div>
                                            <div className="group">
                                                <label htmlFor="signupPass" className="label">Password</label>
                                                <input name="signupPass" id="signupPass" type="password" value={signupPass} className="input" data-type="password" placeholder="Create your password" onChange={this.handleOnChange} required />
                                            </div>
                                            <div className="group">
                                                <input type="submit" className="button" value="Sign Up" />
                                            </div>
                                            <div className="hr"></div>
                                            <div className="foot">
                                                <label htmlFor="tab-1">Already Member?</label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="alerts text-center" style={error ? {display: "block"} : {display: "none"}}>
                                    <div className="alert alert-danger" role="alert">
                                        {errMessage}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, loadingBar }) {
	return {
		authedUser, loadingBar
	}
}

export default withRouter(connect(mapStateToProps)(Login));