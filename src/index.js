// import '../node_modules/bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap.css';
import 'typeface-roboto';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';

const sagasMiddleware = createSagaMiddleware();
const app = combineReducers( reducers );
const store = createStore(
	app,
	applyMiddleware( sagasMiddleware )
);

sagasMiddleware.run( saga );

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById( 'root' )
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
