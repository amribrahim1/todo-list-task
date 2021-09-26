import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { store } from './store/index';
import Routes from './Routes';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
	return (
		<Provider store={store}>
			<LoadingBar />
			<Routes />
		</Provider>
	);
}

export default App;
