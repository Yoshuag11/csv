function makeActionCreator ( type, ...argNames ) {
	return function ( ...args ) {
		const action = { type };

		argNames.forEach( ( arg, index ) => {
			action[ argNames[ index ] ] = args[ index ];
		} );
		return action;
	};
}

export const FETCH_DATA = 'FETCH_DATA';

export const fetchData = makeActionCreator( FETCH_DATA, 'query', 'criteria' );