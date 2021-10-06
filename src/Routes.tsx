import React , { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { handleSetAuthedUser, RootState } from './store';

import Login from './components/Login';
import Home from './components/Home';

interface ListTodosProps extends PropsFromRedux {
    
}

const Routes:React.FC<ListTodosProps> = (props:ListTodosProps) => {
    useEffect(() => {
        props.handleSetAuthedUser()
    }, []);
    
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

function mapStateToProps ({ authedUser, loadingBar }: RootState) {
	return {
		authedUser, loadingBar
	}
}

// export default connect(mapStateToProps)(Routes);

const connector = connect(mapStateToProps, { handleSetAuthedUser });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Routes)