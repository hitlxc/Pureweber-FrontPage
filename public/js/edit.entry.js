import React from 'react';

import ReactDOM from 'react-dom';

//import Invite from '../component/invite/invite.entry' 

//import ArticleCard from '../component/articlecard/articlecard.entry' 

import Login from '../component/login/login.entry' 

import MyAppBar from '../component/appbar/appbar.entry' 

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Edit from '../component/edit/edit.entry' ;

import Footer from '../component/footer/footer' ;

import $ from 'jquery';

injectTapEventPlugin();

var logged = ( $('#appbar').attr('logged') == 'true' ? true:false) ;

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

var id = getUrlParam('id');

/*编辑空白页*/
if (!id) {
	ReactDOM.render(
		<Edit className="edit" article={null}/>, 
	document.getElementById('edit')
	);
} else {
/*更新已有文章*/
	$.get("/blog/show?id="+id,function(res){
		console.log(res)
		ReactDOM.render(
			<Edit className="edit" article={res[0]}/>, 
		document.getElementById('edit')
		);
	})
}




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
// Enable the tab character onkeypress (onkeydown) inside textarea...
// ... for a textarea that has an `id="my-textarea"`
//enableTab('text-input');