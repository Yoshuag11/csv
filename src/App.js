import React, { Component } from 'react';
import './App.css';
import Search from './components/search/Search';
import { Form } from 'react-bootstrap';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const drawerWidth = 240;
const styles = theme => ( {
	root: {
		display: 'flex'
	},
	input: {
		display: 'none'
	},
	list: {
		width: '20%',
		maxWidth: 250,
		backgroundColor: theme.palette.background.paper
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3
	}
} );

class App extends Component {
	state = {
		validated: false,
		file: null,
		searchForm: false,
	};
	constructor ( props ) {
		super( props );

		this.handleSubmit = this.handleSubmit.bind( this );
		this.handleChange = this.handleChange.bind( this );
	}
	handleChange ( event ) {
		const file = event.target.files[ 0 ];

		if ( file ) {
			this.setState( { file } );
		}
	}
	async handleSubmit ( event ) {
		const form = event.currentTarget;

		event.preventDefault();
		event.stopPropagation();

		if ( form.checkValidity() === true ) {
			const formData = new FormData();

			formData.append( 'file', this.state.file );

			const response = await fetch( 'files', {
				method: 'PUT',
				body: formData
			} );

			if ( response.ok ) {
				const data = await response.json();
	
				this.setState( {
					validated: true,
					searchForm: true
				} );
			} else {
				this.setState( {
					validated: true
				} );
			}
		} else {
			this.setState( { validated: true } );
		}

	}
	render() {
		const { validated, searchForm } = this.state;
		const { classes } = this.props;
		return (
			<div className={ classes.root }>
				<Drawer
					className={ classes.drawer }
					variant='permanent'
					anchor='left'
					classes={ {
						paper: classes.drawerPaper
					}}
				>
					<List component='nav'>
						<ListItem button>
							<ListItemText primary='Lookup data' />
						</ListItem>
						<ListItem button>
							<ListItemText primary='Upload CSV file' />
						</ListItem>
					</List>
				</Drawer>
				<main className={ classes.content }>
				<h1 className='text-success'>CSV File Loader</h1>
				<Form
					noValidate
					validated={ validated }
					onSubmit={ this.handleSubmit }
				>
					<Form.Group controlId='text-file'>
						<Form.Label>Select a file&nbsp;</Form.Label>
						<input
							accept='*.csv'
							id='fileInput'
							type='file'
							onChange={ this.handleChange }
							className={ classes.input }
						/>
						<label htmlFor='fileInput'>
							<Button
								variant='contained'
								component='span'
							>
								Upload
							</Button>
						</label>
					</Form.Group>
					<Button
						color='primary'
						variant='contained'
						type='submit'
					>
						Send
					</Button>
				</Form>
				<Search />
				</main>
			</div>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles( styles )( App );