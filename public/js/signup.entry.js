import React from 'react';

import ReactDOM from 'react-dom';

import FlatButton from 'material-ui/FlatButton';

import Signup from '../component/signup/signup.entry' 

import Login from '../component/login/login.entry' 

import MyAppBar from '../component/appbar/appbar.entry' 

import Footer from '../component/footer/footer' 

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import $ from 'jquery';

injectTapEventPlugin();

//let appbar = document.getElementById('appbar');
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<FlatButton
			href="/"
      		label="PureWeber"
	      	style={{
	      		height: '64px',
	      		paddingTop:'10px'
	      	}}
	      	labelStyle={{
	      		fontSize:'24px',
	      		color:'rgb(0, 188, 212)',
	      		textTransform: 'none'
	      	}}
		/>
	</MuiThemeProvider>, 
	document.getElementById('backToIndex')
);

ReactDOM.render(
	<MuiThemeProvider  muiTheme={getMuiTheme()}>
		<Signup code={getUrlParam('code')}/>
	</MuiThemeProvider>, 
	document.getElementById('signup')
);



ReactDOM.render(
	<Footer />, 
	document.getElementById('footer')
);

