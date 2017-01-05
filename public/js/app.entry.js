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


for (var i = 0; i < 10; i++) {
	var app = document.createElement('div');
	app.style.width = '46%';
	ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<ArticleCard author='hitlxc' tag='js' avatar='http://p3.wmpic.me/article/2015/03/16/1426483394_eJakzHWr.jpeg' title='文章标题' abstract='文章摘要。。。。。。。。' pic='https://www.baris-sagdic.com/file/2016/06/javascript-1.png' />
	</MuiThemeProvider>, 
	app
	);

	document.getElementById('articles').appendChild(app);
}

var app = document.createElement('div');
	app.style.width = '46%';
	ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<ArticleCard author='hitlxc' tag='js' avatar='http://p3.wmpic.me/article/2015/03/16/1426483394_eJakzHWr.jpeg' title='文章标题' abstract='文章摘要。。。。。。。。' pic='https://upload.wikimedia.org/wikipedia/commons/e/e1/Io.js_logo.png' />
	</MuiThemeProvider>, 
	app
	);

	document.getElementById('articles').appendChild(app);

var app = document.createElement('div');
	app.style.width = '46%';
	ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<ArticleCard author='hitlxc' tag='js' avatar='http://p3.wmpic.me/article/2015/03/16/1426483394_eJakzHWr.jpeg' title='文章标题' abstract='文章摘要。。。。。。。。' pic='https://davidwalsh.name/demo/nodejs.png?preview' />
	</MuiThemeProvider>, 
	app
	);

	document.getElementById('articles').appendChild(app);


var app = document.createElement('div');
	app.style.width = '46%';
	ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<ArticleCard author='hitlxc' tag='js' avatar='http://p3.wmpic.me/article/2015/03/16/1426483394_eJakzHWr.jpeg' title='文章标题' abstract='文章摘要。。。。。。。。' pic='https://risingstack-blog.s3.amazonaws.com/2016/Jun/Node_js_logo_svg-1466683930347.png' />
	</MuiThemeProvider>, 
	app
	);

	document.getElementById('articles').appendChild(app);

	

var app = document.createElement('div');
	app.style.width = '46%';
	ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<ArticleCard author='hitlxc' tag='js' avatar='http://p3.wmpic.me/article/2015/03/16/1426483394_eJakzHWr.jpeg' title='文章标题' abstract='文章摘要。。。。。。。。' pic='https://sophosnews.files.wordpress.com/2016/04/js-640.png?w=640' />
	</MuiThemeProvider>, 
	app
	);

	document.getElementById('articles').appendChild(app);
	
var app = document.createElement('div');
	app.style.width = '46%';
	ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<ArticleCard author='hitlxc' tag='js' avatar='http://p3.wmpic.me/article/2015/03/16/1426483394_eJakzHWr.jpeg' title='文章标题' abstract='文章摘要。。。。。。。。' pic='https://sophosnews.files.wordpress.com/2016/04/js-640.png?w=640' />
	</MuiThemeProvider>, 
	app
	);

	document.getElementById('articles').appendChild(app);

ReactDOM.render(
	<Footer />, 
	document.getElementById('footer')
);

// Enable the tab character onkeypress (onkeydown) inside textarea...
// ... for a textarea that has an `id="my-textarea"`
//enableTab('text-input');