import React from 'react';

import ReactDOM from 'react-dom'

import MyAppBar from './appbar.entry' 

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

let app = document.createElement('div');
ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<MyAppBar  />
	</MuiThemeProvider>
	, app);
document.body.appendChild(app);



