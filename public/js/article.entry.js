import React from 'react';

import ReactDOM from 'react-dom';

import { Router , Route, browserHistory, hashHistory} from 'react-router';

import Login from '../component/login/login.entry' 

import MyAppBar from '../component/appbar/appbar.entry' 

import Article from '../component/article/article.entry' ;

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Footer from '../component/footer/footer' ;

import marked from 'marked';

import getUrlParam from './getUrlParam/getUrlParam';

import cookie from './cookie/cookie';

import $ from 'jquery';

injectTapEventPlugin();

//let appbar = document.getElementById('appbar');

//var logged = ( $('#appbar').attr('logged') == 'true' ? true:false) ;
var id = getUrlParam('id');

$.get("/blog/show?id="+id,function(res){
	console.log(res);
	ReactDOM.render(
	<Article article={res[0]}/>, 
	document.getElementById('article')
	);
})

ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<MyAppBar logged={logged}  />
	</MuiThemeProvider>, 
	document.getElementById('appbar')
	);

ReactDOM.render(
	<Footer />, 
	document.getElementById('footer')
	);
