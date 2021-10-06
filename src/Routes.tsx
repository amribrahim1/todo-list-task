import React , { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { LoadingBar } from 'react-redux-loading-bar'
import { handleSetAuthedUser, RootState } from './store';

import Login from './pages/Login';
import Home from './pages/Home';

interface ListTodosProps extends PropsFromRedux {
    
}

const Routes:React.FC<ListTodosProps> = (props:ListTodosProps) => {
    const setAuthedUser = props.handleSetAuthedUser
    useEffect(() => {
        setAuthedUser()
    }, [setAuthedUser]);

    if (!props.loadingBar || !Object.keys(props.loadingBar).length || props.loadingBar.default) {
        return (
            <div className="container" style={{ textAlign: 'center', lineHeight: '90vh' }}>
                <LoadingBar />
                <div>Loading</div>
            </div>
        )
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

function mapStateToProps ({ authedUser, loadingBar }: RootState) {
	return {
		authedUser, loadingBar
	}
}

// export default connect(mapStateToProps)(Routes);

const connector = connect(mapStateToProps, { handleSetAuthedUser });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Routes)