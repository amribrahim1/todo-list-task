import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { handleLogout, store } from '../store';

interface AddTodoProps extends PropsFromRedux {
    
}

const Navbar: React.FC<AddTodoProps> = (props:AddTodoProps) => {
    const signOut = () => props.handleLogout();
    const authedUser = store.getState().authedUser
    console.log(authedUser)
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">{authedUser['email']}</span>
                <span className="navbar-brand mb-0 h1">TODO list</span>
                <button className="btn btn-dark" onClick={signOut}>
                    Sign out
                </button>
            </div>
        </nav>
    )
}

// export default connect(mapStateToProps)(Navbar);

const connector = connect(null, { handleLogout });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Navbar)