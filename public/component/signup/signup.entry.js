import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Step, Stepper, StepLabel,StepButton,StepContent,} from 'material-ui/Stepper';
import $ from 'jquery';


//import Marker from 'marked';

const Signup = React.createClass({

	getInitialState: function() {
    	return {
    		stepIndex: 0,
    		maxIndex: 3,
    		id : '',
    		name : '',
    		studentId : '',
    		major : '',
    		intro : '',
    		pw : '',
    		pwAgain :''
     	};
  	},
  	handleNext : function(){
  		const stepIndex = this.state.stepIndex;
	    if (stepIndex <= this.state.maxIndex) {
	      this.setState({stepIndex: this.state.stepIndex + 1});
	    }
  	},
  	handlePrev : function(){
		const stepIndex = this.state.stepIndex;
	    if (stepIndex > 0) {
	      this.setState({stepIndex: this.state.stepIndex - 1});
	    }
  	},
  	change : function(event){
  		//console.log(key  +  value)
  		this.setState({[event.target.id]:event.target.value})

  	},
  	submit : function(){
  		console.log(this.state.id +this.state.pwAgain)
  	},
	renderStepActions : function(step) {
	    return (
	    	<div style={{margin: '12px 0'}}>
	    		{step == this.state.maxIndex && (
	    			<RaisedButton
		          		label='提交'
		          		disableTouchRipple={true}
		          		disableFocusRipple={true}
		          		primary={true}
		         		onTouchTap={this.handleNext}
		        		style={{marginRight: 12}}
		        		onClick = {this.submit}

		        	/>
	    		)}
	    		{step < this.state.maxIndex && (
	        	<RaisedButton
	          		label={this.state.stepIndex === this.state.maxIndex ? '提交' : '下一步'}
	          		disableTouchRipple={true}
	          		disableFocusRipple={true}
	          		primary={true}
	         		onTouchTap={this.handleNext}
	        		style={{marginRight: 12}}
	        	/>
	        	)}
	        	{step > 0 && (
	          		<FlatButton
	            		label="上一步"
	            		disableTouchRipple={true}
	            		disableFocusRipple={true}
	            		onTouchTap={this.handlePrev}
	          		/>
	        	)}
	      	</div>
	    );
	},
  	render: function(){
		const style = {
		  marginLeft: 20,
		}
  		return ( 	
		  	<div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
		        <Stepper
		          activeStep={this.state.stepIndex}
		          linear={false}
		          orientation="vertical"
		        >
		          	<Step>
			            <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
			             	基本信息
			            </StepButton>
		            	<StepContent>
			              	<Paper zDepth={2}>
						    	<TextField 
						    		hintText="账号名" 
						    		style={style} 
						    		underlineShow={false} 
						    		onChange = {this.change}
						    		id = 'id'
						    		value={this.state.id}
						    	/>
						    	<Divider />
						    	<TextField 
						    		hintText="姓名" 
						    		style={style} 
						    		underlineShow={false} 
						    		id = 'name'
						    		onChange = {this.change}
						    		value={this.state.name}
						    	/>
						    	<Divider />
						    	<TextField 
						    		hintText="学号" 
						    		style={style} 
						    		underlineShow={false} 
						    		id = 'studentId'
						    		onChange = {this.change}
						    		value={this.state.studentId}
						    	/>
						    	<Divider />
						   	 	<TextField 
						   	 		hintText="专业" 
						   	 		style={style} 
						   	 		underlineShow={false} 
						   	 		id = 'major'
						   	 		onChange = {this.change}
						   	 		value={this.state.major}
						   	 	/>
						    	<Divider />
						    	<TextField 
						    		hintText="个人简介" 
						    		style={style} 
						    		underlineShow={false} 
						    		id = 'intro'
						    		onChange = {this.change}
						    		value={this.state.intro}
						    	/>
						    	<Divider />
						  	</Paper>
		              		{this.renderStepActions(0)}
		            	</StepContent>
		          	</Step>
		          	<Step>
			            <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
			             	上传头像
			            </StepButton>
		            	<StepContent>
			              	<p>
			                	For each ad campaign that you create, you can control how much
			                	you're willing to spend on clicks and conversions, which networks
			                	and geographical locations you want your ads to show on, and more.
			              	</p>
		              		{this.renderStepActions(1)}
		            	</StepContent>
		          	</Step>
		          	<Step>
		            	<StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
		              		创建密码
		            	</StepButton>
		            	<StepContent>
		              		<TextField 
		              			hintText="密码" 
		              			type="password" 
		              			style={style} 
		              			id = 'pw'
		              			onChange = {this.change}
		              			value={this.state.pw}
		              		/>
						    {this.renderStepActions(2)}
		            	</StepContent>
		          	</Step>
		          	<Step>
		            	<StepButton onTouchTap={() => this.setState({stepIndex: 3})}>
		              		确认密码
		            	</StepButton>
		            	<StepContent>
		              		<TextField 
		              			hintText="密码" 
		              			type="password" 
		              			style={style} 
		              			id = 'pwAgain'
		              			onChange = {this.change}
		              			value={this.state.pwAgain}
		              		/>
		              		{this.renderStepActions(3)}
		            	</StepContent>
		          	</Step>
		        </Stepper>
		    </div>
		)
	}
});

module.exports = Signup;
