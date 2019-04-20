import Search from '../../components/search/Search';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';

const mapStateToProps = state => ( {
	rows: state.rows
} );
const mapDispatchToProps = dispatch => ( {
	fetchData: ( query, criteria ) => dispatch( fetchData( query, criteria ) )
} );

const SearchContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Search );

export default SearchContainer;