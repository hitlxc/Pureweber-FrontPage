import React from 'react';

import ReactDOM from 'react-dom';

import Invite from '../component/invite/invite.entry' 

import ArticleCard from '../component/articlecard/articlecard.entry' 

import Login from '../component/login/login.entry' 

import MyAppBar from '../component/appbar/appbar.entry' 

import Footer from '../component/footer/footer' 

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import getUrlParam from './getUrlParam/getUrlParam';

import cookie from './cookie/cookie';

import $ from 'jquery';

injectTapEventPlugin();

//let appbar = document.getElementById('appbar');

//var logged = ( $('#appbar').attr('logged') == 'true' ? true:false) ;



ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<MyAppBar />
	</MuiThemeProvider>, 
	document.getElementById('appbar')
	);


var cat = getUrlParam('cat');

if (cat){
	$.get('/cat/getBycid',{
		cid:cat,
		num:10,
		page:1
	},function(res){
		for(var i=0;i<res.length;i++){
			var app = document.createElement('div');
			app.style.width = '46%';
			ReactDOM.render(
			<MuiThemeProvider  muiTheme={getMuiTheme()}>
				<ArticleCard article = {res[i]} />
			</MuiThemeProvider>, 
			app
			);
			document.getElementById('articles').appendChild(app);
		}

	});
} else {
	$.get('blog/getCurt',{
		num:10,
		page:1
	},function(res){
		for(var i=0;i<res.length;i++){
			var app = document.createElement('div');
			app.style.width = '46%';
			ReactDOM.render(
			<MuiThemeProvider  muiTheme={getMuiTheme()}>
				<ArticleCard article = {res[i]} />
			</MuiThemeProvider>, 
			app
			);
			document.getElementById('articles').appendChild(app);
		}
	});
}

ReactDOM.render(
	<Footer />, 
	document.getElementById('footer')
);

// Enable the tab character onkeypress (onkeydown) inside textarea...
// ... for a textarea that has an `id="my-textarea"`
//enableTab('text-input');