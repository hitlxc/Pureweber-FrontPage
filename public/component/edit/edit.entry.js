import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';
import marked from 'marked';

require('./md-edit.css');
require('./github-markdown.css');
require('./monokai_sublime.min.css'); 
//var FileUpload = require('react-fileupload');


//import Marker from 'marked';



//var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

const Edit = React.createClass({
  
	getInitialState: function() {
    	return {
    		title: '',
    		content: '',
    		preview:'',
    		tag:1 ,
    		cover:'',
    	};
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
  	addFileString:function(str){
  		var newcontent = this.state.content + "["+str+"](/upload/"+str+")";
  		this.setState({
  			content : newcontent
  		})
  	},
  	uploadCover:function(){
  		var data = new FormData();
		var files = $("#cover")[0].files;
		if(files) {
			data.append("file", files[0]);
		}
		var self = this;
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: '/file/upload',
			data: data,
			contentType: false,
			processData: false,
			success: function(result) {
				var cover = result.msg;
				self.setState({
					cover:cover
				})		
			}
		});
  	},
  	uploadFile:function(){
  		var data = new FormData();
		var files = $("#file")[0].files;
		if(files) {
			data.append("file", files[0]);
		}
		var self = this;
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: '/file/upload',
			data: data,
			contentType: false,
			processData: false,
			success: function(result) {
				
				console.log(result);
				//console.log(result.code);
				//console.log(result.msg);
				//console.log(data);
				self.addFileString(result.msg);			
			}
		});
  	},
  	submit:function(){
  		$.post('/blog/save',
  			{title:this.state.title , content:this.state.content , cid:this.state.tag ,cover:this.state.cover},
  			 function(result){
  			console.log(result);
  		});
  	},
  	tag_change:function(event, index, value){
  		this.setState({tag:value});
  	},
  	enableTab : function() {
  		var el = ReactDOM.findDOMNode(this.refs.textInput);
  		//var el = document.getElementById(id);
	    el.onkeydown = function(e) {
	        if (e.keyCode === 9) { // tab was pressed

	            // get caret position/selection
	            var val = event.target.value,
	                start = event.target.selectionStart,
	                end = event.target.selectionEnd;

	            // set textarea value to: text before caret + tab + text after caret
	            event.target.value = val.substring(0, start) + '\t' + val.substring(end);
				///console.log(val)
	            //console.log(event.target.value)
	            // put caret at right position again
	            event.target.selectionStart = event.target.selectionEnd = start + 1;

	            // prevent the focus lose
	            return false;

	        }
	    };
    },
  	componentDidMount:function(){
  		this.enableTab();
  	},
  	render: function(){
  		const fileInput = {
		    cursor: 'pointer',
		    position: 'absolute',
		    top: 0,
		    bottom: 0,
		    right: 0,
		    left: 0,
		    width: '100%',
		    opacity: 0,
		}
  		return (
		  	<div id='edit-container'>
		  		<div id="edit-title-container">
			  		<MuiThemeProvider  muiTheme={getMuiTheme()}>
			  					<TextField
			  						
									hintText="在这里编辑题目"
			      					floatingLabelText="在这里编辑题目"
									value = {this.state.title}
									onChange = {this.title_change}
									fullWidth = {true}
									style = {{width: '100%'/*,transform: 'translateX(50%)'*/}}
									inputStyle = {{'textAlign': 'center'}}
									hintStyle = {{'textAlign': 'center'}}
									floatingLabelStyle = {{'textAlign': 'center'}}
									floatingLabelFocusStyle = {{'textAlign': 'center'}}
								/>
					</MuiThemeProvider>
				</div>

				<div id="edit-header-container">
					<FlatButton label="上传封面" labelPosition="before">
						<input type="file" style={fileInput} name="cover" id="cover" onChange={this.uploadCover}/>
					</FlatButton>

			        <FlatButton label="选择附件" labelPosition="before">
						<input type="file" style={fileInput} name="file" id="file" onChange={this.uploadFile}/>
					</FlatButton>
					{/*<FlatButton
						label="上传"
						primary={true}
						id="upload"
						name="upload"
						onClick={this.uploadFile}
					/>*/}

					<MuiThemeProvider  muiTheme={getMuiTheme()}>

						<SelectField
				          	value={this.state.tag}
				          	onChange={this.tag_change}
				          	maxHeight={200} 
				          	style={{width: 150}}
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
				      		value={this.state.content}
				     	 	multiLine={true}
				      		rows={14}
				      		rowsMax={14}
				      		type="textarea"
				      		id="text-input"
				      		ref="textInput"
				      		hintText="在这里编辑内容"
		      				floatingLabelText="在这里编辑内容"
		      				onChange={this.marked}
		      				fullWidth={true}
		    			/>
		    		</Card>
				</MuiThemeProvider>
				<MuiThemeProvider  muiTheme={getMuiTheme()}>
					<Card style = {{width: '50%'}}>
						
					    <CardText 
					        id = "preview"
					        className = "markdown-body"
					    	style = {{height:'354px',overflow: 'auto'}}
					    >
					    </CardText>
					</Card>
				</MuiThemeProvider>
				</div>
				
		    </div>
		)
	}
});

module.exports = Edit;

/*let app = document.createElement('div');
ReactDOM.render(<App  />, app);
document.body.appendChild(app);*/