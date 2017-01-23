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

const Article = React.createClass({
  
	getInitialState: function() {
    	return {
    		title: '一个文章',
    		content: '>我还能说什么呢 \n >我还能说什么呢 \n **** \n ``` \n  var x = 1; \n  console.log(x); \n ```',
    		front_pic: 'http://react-etc.net/files/2016-07/logo-578x270.png',
    		author:'hitlxc'
    	};
  	},

  	componentDidMount:function() {
  		var dom = $('#content');
  		dom[0].innerHTML = marked(this.state.content);
  		var id = this.props.params.id;
  		console.log(id);
  		console.log('123')
  	},
  	render: function(){
  		return (
				<div id="article-content-container">
				
					<img id='article-front-img' src={this.state.front_pic} />
			  		
			  		<div className='article-title'>
			  			{this.state.title}
			  		</div>
					
					<div className='article-author'>
			  			{this.state.author}
			  		</div>

					<div id="content" className='article-content markdown-body'>
						{this.state.content}
					</div>
				</div>
		)
	}
});

module.exports = Article;

/*let app = document.createElement('div');
ReactDOM.render(<App  />, app);
document.body.appendChild(app);*/