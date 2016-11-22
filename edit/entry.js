import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
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
    	return {title: '',content: '',preview:''};
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

  	render: function(){
  		return (
		  	<div id='edit-container'>
		  		<MuiThemeProvider  muiTheme={getMuiTheme()}>
			  		<Card style = {{width: '50%'}}>
							<TextField
								hintText="在这里编辑题目"
		      					floatingLabelText="在这里编辑题目"
								value = {this.state.title}
								onChange = {this.title_change}
								fullWidth = {true}
								style = {{width: '100%'}}
							/>
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
						<CardHeader
					      	title = {this.state.title}
					      	subtitle = "预览"
					    />
					    <CardText id="preview">
					    </CardText>
					</Card>
				</MuiThemeProvider>
		    </div>
		)
	}
});

let app = document.createElement('div');
ReactDOM.render(<App  />, app);
document.body.appendChild(app);