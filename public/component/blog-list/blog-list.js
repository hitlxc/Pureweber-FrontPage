import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
//import Marker from 'marked';

require('./blog-list.css');

const BlogList = React.createClass({
  	jump:function(){
  		console.log('123')
  	},
	stampToTime : function(stamp){
		var date = new Date(stamp);
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = (date.getDate()+1 < 10 ? '0'+(date.getDate()+1) : date.getDate()+1) + ' ';
		var h = (date.getHours()+1 < 10 ? '0'+(date.getHours()+1) : date.getHours()+1) + ':';
		var m = (date.getMinutes()+1 < 10 ? '0'+(date.getMinutes()+1) : date.getMinutes()+1) + ':';
		var s = (date.getSeconds()+1 < 10 ? '0'+(date.getSeconds()+1) : date.getSeconds()+1) ;
		var time = Y+M+D+h+m+s;
		return time;
	},
  	render: function(){
  		const blogs = this.props.blogs;
  		return ( 	
			<MuiThemeProvider  muiTheme={getMuiTheme()}>
				<List>
				    <Subheader>博文列表</Subheader>
					{
						blogs.map((data, i) => {

						    return (
						        <ListItem
						        	href = {"/blog/show?id="+data.id}
						        >
								    <span className="blog-title"> {data.title} </span>
								    <span className="blog-time"> {this.stampToTime(data.time)}</span>
								    <span className="blog-author"> <a href={"/member?id="+data.cid}> {data.author} </a> </span>
								</ListItem>
							);  // 多行箭头函数需要加括号和return
						})
					}
				</List>
			</MuiThemeProvider>
		)
	}
});

module.exports = BlogList;

