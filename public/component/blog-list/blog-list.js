import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

//import Marker from 'marked';

require('./blog-list.css');

const BlogList = React.createClass({
	getInitialState: function() {
    	return {
    		selectLast :'',
    		selectAll: [],
    		select:[],
    		
    	};
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
	selectAll : function(selectedRows){
		var self = this
		var len = this.props.blogs.length;
	  	var selected = new Array(len);

	  	for (var i=0;i<selected.length; i++) {
	  		selected[i] = false;
	  	}
		if(selectedRows == 'all'){
			this.setState({
				select:this.state.selectAll
			})
		}else if(selectedRows == 'none'){
			for (var i=0;i<selected.length; i++) {
		  		selected[i] = false;
		  	}
			self.setState({
				select:selected
			})
		}else{
			if (self.state.selectLast == 'all') {
				for (var i=0;i<selected.length; i++) {
			  		selected[i] = false;
			  	}
				self.setState({
					select:selected
				})
				return false;
			}
	  		for (var i=0;i<selectedRows.length;i++){
	  			selected[selectedRows[i]] = true;
	  		}
			//console.log(select)
			self.setState({
				select : selected
			})
		}
		this.setState({selectLast:selectedRows});
		console.log(selectedRows)
	},
	delete : function(){
		console.log(this.state.select)
	},
	componentDidMount:function(){
  		var len = this.props.blogs.length;
  		var init_select = new Array(len);
  		var all_select = new Array(len);
  		for (var i = init_select.length - 1; i >= 0; i--) {
  			init_select[i] = false;
  			all_select[i] = true;
  		}
		this.setState({
			select:init_select,
			selectAll:all_select
		})
		
  	},
  	render: function(){
  		const blogs = this.props.blogs;
  		const style={
  			table:{

  			},
  			id:{
  				width:30
  			},
  			title:{
  				width:150
  			},
  			author:{
				width:60
  			},
  			category:{
				width:60
  			},
  			tag:{
  				width:60
  			},
  			time:{
  				width:150
  			},
  			button:{
  				margin:'10px 15px 10px 15px'
  			}
  		}
  		return ( 	
			<MuiThemeProvider  muiTheme={getMuiTheme()}>
			<div>	
				<div className="tools">
					<RaisedButton label="删除" primary={true} style={style.button} onClick={this.delete}/>
					<RaisedButton label="编辑" primary={true} style={style.button} />
				</div>
				<Table
					multiSelectable = {true}
					onRowSelection = {this.selectAll}
				>
    				<TableHeader
    					enableSelectAll = {true}
    				>
	      				<TableRow>
	        				<TableHeaderColumn style={style.id}>ID</TableHeaderColumn>
	        				<TableHeaderColumn style={style.title}>标题</TableHeaderColumn>
	        				<TableHeaderColumn style={style.author}>作者</TableHeaderColumn>
	        				<TableHeaderColumn style={style.category}>分类</TableHeaderColumn>
	        				<TableHeaderColumn style={style.tag}>tag</TableHeaderColumn>
	        				<TableHeaderColumn style={style.time}>时间</TableHeaderColumn>
	      				</TableRow>
    				</TableHeader>
    				<TableBody
    					deselectOnClickaway = {false}
    				>
				      	{
							blogs.map((data, i) => {
						    return (
								<TableRow key={i}>
						        	<TableRowColumn style={style.id}>{data.id}</TableRowColumn>
						        	<TableRowColumn style={style.title} href={'/blog/article?id='+data.id} >{data.title} </TableRowColumn>
						        	<TableRowColumn style={style.author}>{data.author}</TableRowColumn>
						        	<TableRowColumn style={style.category}>{data.category}</TableRowColumn>
						        	<TableRowColumn style={style.tag}>{data.tag} </TableRowColumn>
						        	<TableRowColumn style={style.time}>{this.stampToTime(data.time)}</TableRowColumn>
						      	</TableRow>
							);  // 多行箭头函数需要加括号和return
						})
					}
    				</TableBody>
  				</Table>

			</div>
			</MuiThemeProvider>
		)
	}
});

module.exports = BlogList;

