import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
//import Marker from 'marked';



var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

const App = React.createClass({
  
	getInitialState: function() {
    	return {title: '',content: '',preview:'',tag:1};
  	},

  	marked: function(event){
  		this.setState({
  			content: event.target.value,
      		preview:  marked(event.target.value)
		});
		document.getElementById('preview').innerHTML = marked(event.target.value);
  		//this.preview = Marker(event.target.value)
  	},

  	title_change:function(event){
  		this.setState({
  			title: event.target.value
		});

  	},
  	submit:function(){
  		$.post('/save',{title:this.state.title , content:this.state.content , tag:this.state.tag }, function(result){
  			console.log(result);
  		});
  	},
  	tag_change:function(event, index, value){
  		this.setState({tag:value});
  	},
  	render: function(){
  		return (
		  	<div id='edit-container'>
		  		<div id="edit-title-container">
			  		<MuiThemeProvider  muiTheme={getMuiTheme()}>
			  					<TextField
			  						
									hintText="在这里编辑题目000"
			      					floatingLabelText="在这里编辑题目"
									value = {this.state.title}
									onChange = {this.title_change}
									fullWidth = {true}
									style = {{width: '50%',transform: 'translateX(50%)'}}
									inputStyle = {{'textAlign': 'center'}}
									hintStyle = {{'textAlign': 'center'}}
									floatingLabelStyle = {{'textAlign': 'center'}}
									floatingLabelFocusStyle = {{'textAlign': 'center'}}
								/>
					</MuiThemeProvider>
				</div>
				<div id="edit-submit-container">
				
					<MuiThemeProvider  muiTheme={getMuiTheme()}>

						<SelectField
				          	value={this.state.tag}
				          	onChange={this.tag_change}
				          	maxHeight={200}
				        >
				          	<MenuItem value={1} primaryText="前端" />
				          	<MenuItem value={2} primaryText="后端" />
				          	<MenuItem value={3} primaryText="数据库" />
				          	<MenuItem value={4} primaryText="运维" />
				          	<MenuItem value={5} primaryText="杂谈" />
				        </SelectField>
				    </MuiThemeProvider>
				    <MuiThemeProvider  muiTheme={getMuiTheme()}>
						<FlatButton 
							label="提交"
							primary={true} 
							onClick = {this.submit}
						/>

					</MuiThemeProvider>
				</div>
				<div id="edit-content-container">
		  		<MuiThemeProvider  muiTheme={getMuiTheme()}>
		  					
			  		<Card style = {{width: '50%'}}>
							
							<br/>
			    		<TextField
				      		content={this.state.content}
				     	 	multiLine={true}
				      		rows={12}
				      		rowsMax={14}
				      		type="textarea"
				      		id="text-input"
				      		hintText="在这里编辑内容"
		      				floatingLabelText="在这里编辑内容"
		      				onChange={this.marked}
		      				fullWidth={true}

		    			/>
		    		</Card>
				</MuiThemeProvider>
				<MuiThemeProvider  muiTheme={getMuiTheme()}>
					<Card style = {{width: '50%'}}>
						
					    <CardText id="preview"
					    	style = {{height:'354px',overflow: 'scroll'}}
					    >
					    </CardText>
					</Card>
				</MuiThemeProvider>
				</div>
				
		    </div>
		)
	}
});

module.exports = App;

/*let app = document.createElement('div');
ReactDOM.render(<App  />, app);
document.body.appendChild(app);*/