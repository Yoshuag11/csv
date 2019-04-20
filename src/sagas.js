import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { setData, FETCH_DATA } from './actions';
import { serialize } from './utilities'

const PUT = 'PUT';
const GET = 'GET';

function* performRequest ( uri, method = GET, body = {} ) {
	let requestOptions = {};

	if ( method !== GET ) {
		requestOptions = {
			method,
			body
		}
	}
	const response = yield fetch( uri, requestOptions );
	// console.log( 'response', response );
	return response;
};
function* uploadFile ( action ) {
	const formData = new FormData();

	formData.append( 'file', action.file );

	const response = yield call( performRequest, 'file', PUT, formData );

	console.log( 'response', response );

	if ( response.ok ) {
		const data = yield response.json();

		this.setState( {
			validated: true,
			searchForm: true
		} );
	} else {
		this.setState( {
			validated: true
		} );
	}
}
function* fetchData ( action ) {
	const { query, criteria } = action;
	const url = `query?${ serialize( { query, criteria } ) }`;
	const response = yield call( performRequest, url );
	const data = yield response.json();
	// console.log( 'data', data );
	yield put( setData( data.rows ))
}
function* saga () {
	yield takeLatest( FETCH_DATA, fetchData );
}

export default saga;