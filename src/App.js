import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import configureStore from './store';
import Routes from './Routes';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

// Configure redux store
const { store } = configureStore();

function App() {
	return (
		<Provider store={store}>
			<LoadingBar />
			<Routes />
		</Provider>
	);
}

export default App;
