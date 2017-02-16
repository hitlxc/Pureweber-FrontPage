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
    		canEdit : false,

    	};
  	},
  	/*根据state.select获取选取文章的id数组*/
  	getSelect : function(){
  		var array = [];
  		for (var i=0;i<this.state.select.length;i++){
  			if (this.state.select[i]) {
  				array.push(this.props.blogs[i].id);
  			}
  		}
  		return array;
  	},
  	/*时间戳转时间*/
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
	/*选取文章时间*/
	select : function(selectedRows){
		var self = this;
		var len = this.props.blogs.length;
	  	var selected = new Array(len);
	  	for (var i=0;i<selected.length; i++) {
	  		selected[i] = false;
	  	}
	  	/*全部选取*/
		if(selectedRows == 'all'){
			this.setState({
				select:this.state.selectAll,
			})
		}else if(selectedRows == 'none'){
		/*全部不选取*/
			for (var i=0;i<selected.length; i++) {
		  		selected[i] = false;
		  	}
			self.setState({
				select:selected,
			})
		}else{
			if (self.state.selectLast == 'all') {
		/*之前一次全部选取，则当前选取任何文章都为全部不选取*/
				for (var i=0;i<selected.length; i++) {
			  		selected[i] = false;
			  	}
				self.setState({
					select:selected,
				})
			}else{
				for (var i=0;i<selectedRows.length;i++){
		  			selected[selectedRows[i]] = true;
		  		}
				self.setState({
					select : selected
				})
			}
		}
		/*选择多个文章时不能进行编辑*/
		if (this.props.blogs.length > 1 ) {
			if (selectedRows == 'none' ||  selectedRows.length <= 1) {
				self.setState({
					canEdit : false
				})
			}else{
				self.setState({
					canEdit : true
				})
			}
		}
		
		this.setState({selectLast:selectedRows});
	},
	delete : function(){
		console.log(this.state.select)
	},
	edit : function(){
		var select = this.getSelect();

		select.forEach(function(data,index){
			window.open('/blog/edit?id='+data,'edit'+data)
		})
	},
	read : function(){

		var select = this.getSelect();

		select.forEach(function(data,index){
			window.open('/blog/article?id='+data,'read'+data)
		})
		
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
  				minWidth : 1000
  			},
  			id:{
  				width:'8%'
  			},
  			title:{
  				width:'30%'
  			},
  			author:{
				width:'20%'
  			},
  			category:{
				width:'12%'
  			},
  			tag:{
  				width:'20%'
  			},
  			time:{
  				width:'20%'
  			},
  			button:{
  				margin:'10px 15px 10px 15px',
  			}
  		}
  		return ( 	
			<MuiThemeProvider  muiTheme={getMuiTheme()}>
			<div>	
				<div className="tools">
					<RaisedButton label="删除" primary={true} style={style.button} onClick={this.delete}/>
					<RaisedButton label="编辑" primary={true} style={style.button} disabled={this.state.canEdit} onClick={this.edit}/>
					<RaisedButton label="查看" primary={true} style={style.button} onClick={this.read}/>
					<RaisedButton label="分类管理" primary={true} style={style.button}  href='/blog/admin/cat' />
					<RaisedButton label="Tag管理" primary={true} style={style.button}  href='/blog/admin/tag'/>

				</div>
				<Table
					multiSelectable = {true}
					onRowSelection = {this.select}
					style={style.table}
					bodyStyle={{overflow:'visible'}}
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
						        	<TableRowColumn style={style.title} title={data.title}>{data.title} </TableRowColumn>
						        	<TableRowColumn style={style.author} title={data.author}>{data.author}</TableRowColumn>
						        	<TableRowColumn style={style.category} title={data.category}>{data.category}</TableRowColumn>
						        	<TableRowColumn style={style.tag} title={data.tag}>{data.tag} </TableRowColumn>
						        	<TableRowColumn style={style.time} title={this.stampToTime(data.time)}>{this.stampToTime(data.time)}</TableRowColumn>
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

