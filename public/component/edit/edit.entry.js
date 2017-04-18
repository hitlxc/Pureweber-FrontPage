import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';
import marked from 'marked';
import cookie from '../../js/cookie/cookie';

require('./md-edit.css');
require('./github-markdown.css');
require('./monokai_sublime.min.css'); 

require("babel-core/register");
require("babel-polyfill");

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
	getInitialState:function() {
		var uid = cookie.getCookie('userid');
		console.log(uid);
		if(this.props.article){
			//console.log(this.props.article)
			return {
				title: this.props.article.title,
				content: this.props.article.content,
				cat:this.props.article.cid,
				update:true,
				preview:'',
				allCats:[],
				cover:'',
				uid:uid,
				update:true,
				tag:[],
				allTags:{},
			};
		}
		return {
			title: '',
			content: '',
			preview:'',
			cat:0 ,
			allCats:[],
			cover:'',
			uid:uid,
			update:false,
			tag:[],
			allTags:{},
		};
	},
	/*markdown转HTML*/
	HTMLtoMarked: function(value){
		document.getElementById('preview').innerHTML = marked(value);
	},
	changeContent: function(event){
		this.setState({
			content: event.target.value,
			preview:  marked(event.target.value)
		});
		this.HTMLtoMarked(event.target.value);
		//document.getElementById('preview').innerHTML = marked(event.target.value);
		//this.preview = Marker(event.target.value)
	},
	/*标题更改*/
	title_change:function(event){
		this.setState({
			title: event.target.value
		});

	},
  	/*上传文件成功后在文本中添加文件链接*/
	addFileString:async function(str){
		var suffix = str.split('.')[str.split('.').length-1];
		/*若上传附件为图片图片*/
		if(suffix == 'jpg' || suffix == 'png' || suffix == 'gif' || suffix == 'jprg' || suffix == 'bmp' ){
			var newcontent = this.state.content + "["+str+"](/upload/"+str+")";
			await this.setState({
				content : newcontent
			})
			this.HTMLtoMarked(newcontent);
		} else {
		/*其他文件格式*/
			var newcontent = this.state.content + "<a href='/upload/" + str + "' download=''>" + str + "</a>";
			await this.setState({
				content : newcontent
			})
			this.HTMLtoMarked(newcontent);
		}
	
	},
	/*上传封面*/
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
	/*上传文件*/
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
				self.addFileString(result.msg);			
			}
		});
	},
	/*提交*/
	submit:function(){
		if(this.state.update){
			$.post('/blog/update',
			{title:this.state.title , content:this.state.content , cid:this.state.cat ,cover:this.state.cover ,id:this.props.article.id,tag:this.state.tag},
			function(result){
				console.log(result);
			});
		}
		if(!this.state.update){
			$.post('/blog/save',
			{title:this.state.title , content:this.state.content , cid:this.state.cat ,cover:this.state.cover, uid:this.state.uid,tag:this.state.tag},
			function(result){
				console.log(result);
			});
		}
	},
  	/*监听cat变化*/
  	cat_change:function(event, index, value){
  		this.setState({cat:value});
  	},
  	tag_change:function(value, dataSource){
  		
  		var tags = value.split(";")
  		this.state.tag = tags
  		console.log(this.state.tag)
  	},
  	/*编辑文章可以使用tab键进行缩进*/
  	enableTab : function() {
  		var el = ReactDOM.findDOMNode(this.refs.textInput);
	    el.onkeydown = function(e) {
	        if (e.keyCode === 9) { // tab 键
	            var val = event.target.value;
	            var start = event.target.selectionStart;
	            var end = event.target.selectionEnd;
	            event.target.value = val.substring(0, start) + '\t' + val.substring(end);
	            event.target.selectionStart = event.target.selectionEnd = start + 1;
	            return false;
	        }
	    };
    },
  	componentDidMount:async function(){
  		this.enableTab();
  		document.getElementById('preview').innerHTML = marked(this.state.content);
  		var self = this;
  		$.get('/cat/getAll',function(cats){
  			$.get('/tag/getAll',function(tags){
				self.setState({
					allCats : cats,
					allTags : tags
				})
			})
		})
  		//allTags
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
  			<MuiThemeProvider  muiTheme={getMuiTheme()}>
		  	<div id='edit-container'>
		  		<div id="edit-title-container">
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
				</div>

				<div id="edit-header-container">
					<FlatButton label="上传封面" labelPosition="before">
						<input type="file" style={fileInput} name="cover" id="cover" onChange={this.uploadCover}/>
					</FlatButton>

			        <FlatButton label="选择附件" labelPosition="before">
						<input type="file" style={fileInput} name="file" id="file" onChange={this.uploadFile}/>
					</FlatButton>

					<SelectField
				        value={this.state.cat}
				        onChange={this.cat_change}
				        maxHeight={200} 
				        style={{width: 150}}
				    >	
				    	{
				    		this.state.allCats.map((data, i) => {
							    return (
							      	<MenuItem value={data.id} primaryText={data.name} key={i}/>
								);  // 多行箭头函数需要加括号和return
					    	})
				        }
				    </SelectField>

				    <AutoComplete
          				hintText="Tag标签"
          				dataSource={[1,2,3]}
          				onUpdateInput={this.tag_change}
          				style={{
          					width:150,
          					marginLeft:10
          				}}
          				textFieldStyle={{
          					width:150,
          					marginLeft:10
          				}}
        			/>

				    <FlatButton 
						label="提交"
						primary={true} 
						onClick = {this.submit}
					/>
				</div>

				<div id="edit-content-container">		
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
		      				onChange={this.changeContent}
		      				fullWidth={true}
		    			/>
		    		</Card>
					<Card style = {{width: '50%'}}>
					    <CardText 
					        id = "preview"
					        className = "markdown-body"
					    	style = {{height:'354px',overflow: 'auto'}}
					    >
					    </CardText>
					</Card>
				</div>
		    </div>
		    </MuiThemeProvider>
		)
	}
});

module.exports = Edit;
