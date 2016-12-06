import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
//import Marker from 'marked';

const ArticleCard = React.createClass({
  	jump:function(){
  		console.log('123')
  	},
	
  	render: function(){
  		return ( 	
		  	
			  		<Card
						style = {{width: '100%',  cursor: 'pointer'}}
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
				
		)
	}
});


module.exports = ArticleCard;

