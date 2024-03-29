import React from 'react';
// import { Form, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from  '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
// import { serialize } from '../../utilities'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

const styles = theme => ( {
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200
	},
	textField: {
		marginTop: theme.spacing.unit * 2,
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200
	}
} );
const columns = [
	{
		Header: 'Type',
		accessor: 'type'
	},
	{
		Header: 'Direction',
		accessor: 'direction'
	},
	{
		Header: 'From',
		accessor: 'from'
	},
	{
		Header: 'To',
		accessor: 'to'
	},
	{
		Header: 'Extension',
		accessor: 'extension'
	},
	{
		Header: 'Forwarded To',
		accessor: 'forwarded to'
	},
	{
		Header: 'Name',
		accessor: 'name'
	},
	{
		Header: 'Date',
		id: 'date',
		accessor: d => moment( d.date ).format( 'YY-MMM-DD' )
	},
	{
		Header: 'Time',
		accessor: 'time'
	},
	{
		Header: 'Action',
		accessor: 'action'
	},
	{
		Header: 'Action Result',
		accessor: 'action result'
	},
	{
		Header: 'Result Description',
		accessor: 'result description'
	},
	{
		Header: 'Duration',
		accessor: 'duration'
	},
	{
		Header: 'Included',
		accessor: 'included'
	},
	{
		Header: 'Purchased',
		accessor: 'purchased'
	},
];
const columnNames = [
	"Type", "Direction", "From", "To", "Extension", "Forwarded To", "Name", "Date",
	"Time", "Action", "Action Result", "Result Description", "Duration", "Included",
	"Purchased"
];

class Search extends React.Component {
	state = {
		query: '',
		criteria: '',
		validated: false,
		tableData: null
	};
	constructor ( props ) {
		super( props );

		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}
	async handleSubmit ( event ) {
		const form = event.currentTarget;

		event.preventDefault();
		event.stopPropagation();

		if ( form.checkValidity() === true ) {
			const { query, criteria } = this.state;
			console.log( 'here' );
			console.log( 'this.props.fetchData', this.props.fetchData );
			console.log( 'query', query );
			console.log( 'criteria', criteria );
			this.props.fetchData( query, criteria );
			// const url = `query?${ serialize( { query, criteria } ) }`;
			// const response = await fetch( url );
			// const data = await response.json();

			// console.log( data );

			// this.setState( {
			// 	tableData: data
			// } );
		}

		this.setState( { validated: true } );
	}
	handleChange ( event ) {
		// debugger;
		const { target } = event;
		let state;

		if ( target.name === 'criteria' ) {
			state = { criteria: target.value };
		} else {
			state = { query: target.value };
		}

		this.setState( { ...state } );
	}
	render () {
		const {
			handleSubmit,
			handleChange,
			state: { query, validated, criteria },
			props: { classes, rows }
		} = this;
		// let data = [];

		// if ( tableData && tableData.rows ) {
		// 	data = tableData.rows;
		// }
		return (
			<>
				<br />
				<Form
					noValidate
					validated={ validated }
					onSubmit={ handleSubmit }
				>
					{/* <FormControl required> */}
					<TextField
						required
						id='query'
						label='String to lookup'
						margin='normal'
						className={ classes.textField }
						onChange={ handleChange }
						value={ query }
					/>
					<FormControl
						margin='normal'
						required
					>
						<InputLabel htmlFor='criteria'>Criteria</InputLabel>
						<Select
							value={ criteria }
							onChange={ handleChange }
							name='criteria'
							inputProps= { {
								id: 'criteria'
							} }
							className={ classes.selectEmpty }
						>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
							{ columnNames.map( ( key, index ) => {
								return <MenuItem key={ index} value={ key }>{key}</MenuItem>;
							} ) }
						</Select>
					</FormControl>
					<br />
					<Button
						type='submit'
						variant='contained'
					>
						Search
					</Button>
				</Form>
				<br />
				<ReactTable
					data={ rows }
					columns={ columns }
				/>
			</>
		);
	}
}

Search.propTypes = {
	rows: PropTypes.array.isRequired,
	fetchData: PropTypes.func.isRequired
}

export default withStyles( styles )( Search );