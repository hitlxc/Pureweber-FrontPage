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
    		canEdit : true
    	};
  	},
  	/*根据state.select获取选取文章的id数组*/
  	getSelect : function(){
  		var array = [];
  		for (var i=0;i<this.state.select.length;i++){
  			if (this.state.select[i]) {
  				array.push(this.props.cats[i].id);
  			}
  		}
  		return array;
  	},
	/*选取事件*/
	select : function(selectedRows){
		var self = this;
		var len = this.props.cats.length;
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
		if (this.props.cats.length > 1 ) {
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
		console.log(selectedRows)
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
  		var len = this.props.cats.length;
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
  		const cats = this.props.cats;
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
					<RaisedButton label="文章管理" primary={true} style={style.button}  href='/blog/admin' />
					<RaisedButton label="Tag管理" primary={true} style={style.button}  href='/blog/admin/tag'/>

				</div>
				<Table
					multiSelectable = {true}
					onRowSelection = {this.select}
				>
    				<TableHeader
    					enableSelectAll = {true}
    				>
	      				<TableRow>
	        				<TableHeaderColumn style={style.name}>分类</TableHeaderColumn>
	        				<TableHeaderColumn style={style.times}>数量</TableHeaderColumn>
	      				</TableRow>
    				</TableHeader>
    				<TableBody
    					deselectOnClickaway = {false}
    				>
				      	{
							cats.map((data, i) => {
						    return (
								<TableRow key={i}>
						        	<TableRowColumn style={style.name}>{data.name}</TableRowColumn>
						        	<TableRowColumn style={style.times}  >{data.times} </TableRowColumn>
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

