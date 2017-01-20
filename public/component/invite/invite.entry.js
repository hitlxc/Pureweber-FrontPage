import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import Paper from 'material-ui/Paper';
import $ from 'jquery';

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
  		var emList = this.state.em.split(';')
  		for (var i=0;i<emList.length;i++){
  			var email = emList[i];
  			if (this.IsEmail(email)) {
	  		//this.handleClose();
	  		var tomail = this.state.em;
	  		$.post('/users/intro',{email:tomail},
	  			function(result){
	  			console.log(result);
	  			$.post('/mail/signup',{
	  				code:result.acode,
	  				id:result.id,
	  				tomail:tomail
	  			},function(result){
	  				console.log(result);
	  				this.setState({
				      	snackbar_success_open: true,
				    });
	  			})
	  		});
	  		
  		}else{
  			this.setState({
		      	snackbar_error_open: true,
		    });
  		}
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
  		
    	const paper_style = {
		  	height: 50,
		  	width: '100%',
		  	textAlign: 'center',
		  	
		}
		const preview_style = {
			padding: '10px',
			height: 300,
		  	width: '100%',
		  	marginTop: '30px'
		}
  		return ( 
  			<div>	
			  	<Paper 
			  		style={paper_style} 
			  		zDepth={2} 
			  	>
					<TextField
						hintText="邮箱"
						onChange = {this.change_ac}
						style={{float: 'left',marginLeft:'5px',width:'60%'}}
					/>

					<FlatButton
			  			label="邀请"
			        	primary={true}
			        	keyboardFocused={true}
			        	onClick={this.submit}
			        	style={{float: 'right',marginRight:'5px',marginTop:'5px'}}
			      	/>
			  	</Paper>
			  	<Paper 
			  		style={preview_style} 
			  		zDepth={2} 
			  	>
					欢迎来到pureweber，成为正义的一员，点击链接加入我们
			  	</Paper>
			</div>
		)
	}
});

module.exports = Invite;
