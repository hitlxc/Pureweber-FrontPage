import React from 'react';

import ReactDOM from 'react-dom'

import Invite from './invite.entry' 

import injectTapEventPlugin from 'react-tap-event-plugin';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();
let app = document.createElement('div');
ReactDOM.render(<MuiThemeProvider  muiTheme={getMuiTheme()}>
	<Invite  />
	</MuiThemeProvider>, app);
document.body.appendChild(app);



// Enable the tab character onkeypress (onkeydown) inside textarea...
// ... for a textarea that has an `id="my-textarea"`
//enableTab('text-input');