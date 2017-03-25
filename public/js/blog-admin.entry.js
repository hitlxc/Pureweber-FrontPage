import React from 'react';

import ReactDOM from 'react-dom';

import Login from '../component/login/login.entry' 

import MyAppBar from '../component/appbar/appbar.entry' 

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Edit from '../component/edit/edit.entry' ;

import Footer from '../component/footer/footer' ;

import BlogList from '../component/blog-list/blog-list' ;

import Divider from 'material-ui/Divider';

import cookie from './cookie/cookie';

import $ from 'jquery';

injectTapEventPlugin();

//let appbar = document.getElementById('appbar');

var logged = ( $('#appbar').attr('logged') == 'true' ? true:false) ;

ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<MyAppBar />
	</MuiThemeProvider>, 
	document.getElementById('appbar')
	);

var page = 1;
var numPerPage = 10;

$.get('/blog/gets',{
	num:numPerPage,
	page:page
},function(res){
	//console.log(res);
	
	ReactDOM.render(
		<BlogList blogs={res} />, 
	document.getElementById('blog-list')
	);
});






ReactDOM.render(
	<Footer />, 
	document.getElementById('footer')
	);