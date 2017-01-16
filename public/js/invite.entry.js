import React from 'react';

import ReactDOM from 'react-dom';

import Invite from '../component/invite/invite.entry' 

import Login from '../component/login/login.entry' 

import MyAppBar from '../component/appbar/appbar.entry' 

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Footer from '../component/footer/footer' ;

import $ from 'jquery';

injectTapEventPlugin();

//let appbar = document.getElementById('appbar');

var logged = ( $('#appbar').attr('logged') == 'true' ? true:false) ;

ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<MyAppBar logged={logged}  />
	</MuiThemeProvider>, 
	document.getElementById('appbar')
	);

ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<Invite className="invite"/>
	</MuiThemeProvider>, 
	document.getElementById('invite')
	);

ReactDOM.render(
	<Footer />, 
	document.getElementById('footer')
	);

// Enable the tab character onkeypress (onkeydown) inside textarea...
// ... for a textarea that has an `id="my-textarea"`
//enableTab('text-input');