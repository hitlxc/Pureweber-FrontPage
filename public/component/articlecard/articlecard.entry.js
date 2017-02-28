import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
//import Marker from 'marked';
require('./article-card.css');

const ArticleCard = React.createClass({
  	open:function(){
  		window.open('/blog/article?id='+this.props.article.id);
  	},
	
  	render: function(){
  		return ( 	
		  	
			  		<Card
						style = {{width: '100%',  cursor: 'pointer'}}
						onClick = {this.open}
			  		>
			  			<CardHeader
			  				title={this.props.article.author}
					      	subtitle={this.props.article.category}
					      	avatar={'/img/user/avatar/'+this.props.article.avatar}

					    />
					    <CardMedia
					      	overlay={<CardTitle title={this.props.article.title}  />}
					      	
					      	overlayContainerStyle={{
					      		padding:8
					      	}}

					    >
					    	<div className={this.props.article.cover?'article-front-img':'article-front-no-img'} style={{
								background:'url(/img/cover/'+this.props.article.cover+') no-repeat center center',
								backgroundSize: 'cover',
							}}	>
							</div>
					    </CardMedia>
					    <CardText>
					      	{this.props.article.content}
					    </CardText>

			  		</Card>
				
		)
	}
});


module.exports = ArticleCard;

