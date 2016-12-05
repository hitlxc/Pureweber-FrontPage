import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery'

//import Marker from 'marked';

const Login = React.createClass({

	getInitialState: function() {
    	return {open: false,ac:'',pw:''};
  	},
  	handleOpen: function(){
  		this.setState({open: true});
  	},
  	handleClose: function(){
  		this.setState({open: false});
  	},
  	submit: function(){
  		this.handleClose();
  		$.post('/login',{ac:this.state.ac,pw:this.state.pw},function(result){
  			console.log(result);
  		});
  		
  	},
  	change_ac: function(event){
		this.setState({
  			ac: event.target.value
		});
  	},
  	change_pw: function(event){
		this.setState({
  			pw: event.target.value
		});
  	},
  	render: function(){
  		const actions = [
	  		<FlatButton
	  			label="登陆"
	        	primary={true}
	        	keyboardFocused={true}
	        	onClick={this.submit}
	      	/>
    	]

    	const muiName = 'FlatButton';

  		return ( 	
		  	<div id='login-container'>
		  		
			  		<FlatButton 
			  			label="登陆" 
			  			style={{color:'white' , fontFamily: 'Roboto, sans-serif'}}
			  			onClick={this.handleOpen} 
			  		/>

			        <Dialog
			        	actions={actions}
			          	modal={false}
			          	open={this.state.open}
			          	onRequestClose={this.handleClose}
			        >
			        	账号
				        <TextField
						    hintText="账号"
						    onChange = {this.change_ac}
						/><br />
						密码
				        <TextField
						    hintText="密码"
						    type="password"
						    onChange = {this.change_pw}
						/><br />
			        </Dialog>
				
		    </div>
		)
	}
});

module.exports = Login;
