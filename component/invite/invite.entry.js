import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Snackbar from 'material-ui/Snackbar';
import $ from 'jquery';
injectTapEventPlugin();
//import Marker from 'marked';

const Invite = React.createClass({
  	IsEmail:function(email){
  		var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  		return myreg.test(email);
  	},
	getInitialState: function() {
    	return {
    		open: false,
    		em:'',
    		snackbar_success_open:false,
    		snackbar_error_open:false
    	};
  	},
  	handleOpen: function(){
  		this.setState({open: true});
  	},
  	handleClose: function(){
  		this.setState({open: false});
  	},
  	handleSnackbarClose:function(){
		this.setState({
			snackbar_success_open: false,
			snackbar_error_open: false
		});
  	},
  	submit: function(){
  		if (this.IsEmail(this.state.em)) {
	  		this.handleClose();
	  		var tomail = this.state.em;
	  		$.post('http://localhost:3000/users/intro',{email:tomail},
	  			function(result){
	  			console.log(result);
	  			$.post('http://localhost:3000/mail/signup',{
	  				code:result.acode,
	  				id:result.id,
	  				tomail:tomail
	  			},function(result){
	  				console.log(result);
	  			})
	  		});
	  		this.setState({
		      	snackbar_success_open: true,
		    });
  		}else{
  			this.setState({
		      	snackbar_error_open: true,
		    });
  		}
  	},
  	change_ac: function(event){
		this.setState({
  			em: event.target.value
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
	  			label="邀请"
	        	primary={true}
	        	keyboardFocused={true}
	        	onClick={this.submit}
	      	/>
    	]
  		return ( 	
		  	<div id='login-container'>
		  		<MuiThemeProvider  muiTheme={getMuiTheme()}>
		  			<div>
				  		<RaisedButton label="邀请新成员" onClick={this.handleOpen} />

				        <Dialog
				        	actions={actions}
				          	modal={false}
				          	open={this.state.open}
				          	onRequestClose={this.handleClose}
				        >
				        	
					        <TextField
							    hintText="邮箱"
							    onChange = {this.change_ac}
							/><br />
							
				        </Dialog>

				        <Snackbar
				        	open={this.state.snackbar_success_open}
				          	message="邀请成功"
				          	autoHideDuration={2000}
				          	onRequestClose={this.handleSnackbarClose}
				        />

				        <Snackbar
				        	open={this.state.snackbar_error_open}
				          	message="请输入正确的邮箱"
				          	autoHideDuration={2000}
				          	onRequestClose={this.handleSnackbarClose}
				        />
			        </div>
				</MuiThemeProvider>
				
		    </div>
		)
	}
});

module.exports = Invite;
