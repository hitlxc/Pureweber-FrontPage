import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

const MyAppBar = React.createClass({
  	render: function(){
  		return ( 	
		  	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		  		<AppBar
		  			title="Title"
				    iconClassNameRight="muidocs-icon-navigation-expand-more"
				/>
			</MuiThemeProvider>
		)
	}
});

module.exports = MyAppBar;
