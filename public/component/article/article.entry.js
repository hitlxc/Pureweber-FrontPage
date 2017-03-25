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
    		
    	};
  	},

  	componentDidMount:function() {
  		var dom = $('#content');
  		dom[0].innerHTML = marked(this.props.article.content);
  	},
  	render: function(){
  		return (
				<div id="article-content-container">
					<div id={this.props.article.cover?'article-front-img':'article-front-no-img'} style={{
						background:'url(/img/cover/'+this.props.article.cover+') no-repeat center center',
						backgroundSize: 'cover',
					}}	>	
						
					</div>
			  		
			  		<div className='article-title'>
			  			{this.props.article.title}
			  		</div>
					
					<div className='article-author'>
			  			{this.props.article.author}
			  		</div>

					<div id="content" className='article-content markdown-body'>
						{this.props.article.content}
					</div>
				</div>
		)
	}
});

module.exports = Article;

/*let app = document.createElement('div');
ReactDOM.render(<App  />, app);
document.body.appendChild(app);*/