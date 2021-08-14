import React , { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { handleSetAuthedUser } from './store/actionCreators/authedUser';

import Login from './components/Login';
import Home from './components/Home';

function Routes(props) {
    useEffect(() => {
        props.dispatch(handleSetAuthedUser())
    }, []);
    
    if (!props.loadingBar || !Object.keys(props.loadingBar).length || props.loadingBar.default) {
        return <div>Loading</div>
    } else {
        return (
                <Router>
                    <Switch>
                        {props.authedUser === null
                            ? ( <>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Redirect to="/login" />
                            </>) : ( <>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Redirect to="/" />
                            </>)
                        }
                    </Switch>
                </Router>
        )
    }
}

function mapStateToProps ({ authedUser, loadingBar }) {
	return {
		authedUser, loadingBar
	}
}

export default connect(mapStateToProps)(Routes);