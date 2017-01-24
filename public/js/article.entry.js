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

import $ from 'jquery';

injectTapEventPlugin();

//let appbar = document.getElementById('appbar');

var logged = ( $('#appbar').attr('logged') == 'true' ? true:false) ;

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

var id = getUrlParam('id');

$.get("/blog/show?id="+id,function(res){
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

/*ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Article} />
	</Router>, 
	document.getElementById('article')
	);*/

/*ReactDOM.render(
	<Route path="inbox/messages/:id" component={Article} />
		<Article className="article" />
, 
	document.getElementById('article')
	);*/

ReactDOM.render(
	<Footer />, 
	document.getElementById('footer')
	);
