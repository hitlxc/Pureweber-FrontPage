import React from 'react';

import ReactDOM from 'react-dom';

import Login from '../component/login/login.entry' 

import MyAppBar from '../component/appbar/appbar.entry' 

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Edit from '../component/edit/edit.entry' ;

import Footer from '../component/footer/footer' ;

import CatList from '../component/cat-list/cat-list' ;

import Divider from 'material-ui/Divider';

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

var page = 1;
var numPerPage = 10;

$.get('/cat/getAll',function(res){
	//console.log(res);
	ReactDOM.render(
		<CatList cats={res} />, 
	document.getElementById('cat-list')
	);
});






ReactDOM.render(
	<Footer />, 
	document.getElementById('footer')
	);