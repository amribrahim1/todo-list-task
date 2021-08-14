import { connect } from 'react-redux';
import { handleLogout } from '../store/actionCreators/authedUser';

function Navbar(props) {
    const signOut = () => props.dispatch(handleLogout());
    // console.log(props.authedUser)
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">{props.authedUser.email}</span>
                <span className="navbar-brand mb-0 h1">TODO list</span>
                <button className="btn btn-dark" onClick={signOut}>
                    Sign out
                </button>
            </div>
        </nav>
    )
}

function mapStateToProps ({ authedUser }) {
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(Navbar);