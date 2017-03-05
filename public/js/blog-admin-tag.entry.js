import React from 'react';

import ReactDOM from 'react-dom';

import Login from '../component/login/login.entry' 

import MyAppBar from '../component/appbar/appbar.entry' 

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Edit from '../component/edit/edit.entry' ;

import Footer from '../component/footer/footer' ;

import TagList from '../component/tag-list/tag-list' ;

import Divider from 'material-ui/Divider';

import $ from 'jquery';

injectTapEventPlugin();

//let appbar = document.getElementById('appbar');


ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<MyAppBar />
	</MuiThemeProvider>, 
	document.getElementById('appbar')
	);

var page = 1;
var numPerPage = 10;

$.get('/tag/getAll',function(res){
	//console.log(res);
	ReactDOM.render(
		<TagList tags={res} />, 
	document.getElementById('tag-list')
	);
});






ReactDOM.render(
	<Footer />, 
	document.getElementById('footer')
	);