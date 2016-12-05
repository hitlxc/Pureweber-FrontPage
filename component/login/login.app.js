import React from 'react';

import ReactDOM from 'react-dom'

import Login from './login.entry' 

import injectTapEventPlugin from 'react-tap-event-plugin';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

let app = document.createElement('div');
ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<Login  />
	</MuiThemeProvider>	, app);
document.body.appendChild(app);