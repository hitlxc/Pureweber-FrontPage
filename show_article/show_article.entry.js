import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
//import Marker from 'marked';

const App = React.createClass({
  	jump:function(){
  		console.log('123')
  	},
	
  	render: function(){
  		return ( 	
		  	<div id='show-article-container'>
		  		<MuiThemeProvider  muiTheme={getMuiTheme()}>
			  		<Card
						style = {{width: '50%',  cursor: 'pointer'}}
						onClick = {this.jump}
			  		>
			  			<CardHeader
			  				title={this.props.author}
					      	subtitle={this.props.tag}
					      	avatar={this.props.avatar}
					    />
					    <CardMedia
					      	overlay={<CardTitle title={this.props.title}  />}
					    >
					      	<img src={this.props.pic} />
					    </CardMedia>
					    <CardText>
					      	{this.props.abstract}
					    </CardText>

			  		</Card>
				</MuiThemeProvider>
				
		    </div>
		)
	}
});

let app = document.createElement('div');
ReactDOM.render(<App  author='hitlxc' tag='js' avatar='http://p3.wmpic.me/article/2015/03/16/1426483394_eJakzHWr.jpeg' title='文章标题' abstract='文章摘要。。。。。。。。' pic='https://www.baris-sagdic.com/file/2016/06/javascript-1.png'/>, app);
document.body.appendChild(app);