import { SET_DATA } from './actions';

export function rows ( state = [], action ) {
	switch ( action.type ) {
		case SET_DATA:
			return action.rows;
		default:
			return state;
	}
}