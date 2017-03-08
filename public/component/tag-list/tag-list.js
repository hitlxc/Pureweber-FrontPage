import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import $ from 'jquery';


//import Marker from 'marked';

require('./tag-list.css');

const TagList = React.createClass({
	getInitialState: function() {
		var self = this;
		var tags = this.props.tags;
    	return {
    		select:[],
    		tags:tags,
    		oldTags:'',
    		open:false,
    		addTag:'',

    		selectLast :'',
    		selectAll: [],
    		select:[],
    		canEdit : false,
    	};
  	},
  	change : function(event){
  		var tags = this.state.tags;
  		tags[event.target.id].name=event.target.value
  		this.setState({
	      	tags : tags,
	    });
  	},
  	/*根据state.select获取选取文章的id数组*/
  	getSelect : function(){
  		var array = [];
  		for (var i=0;i<this.state.select.length;i++){
  			if (this.state.select[i]) {
  				array.push(this.props.tags[i].id);
  			}
  		}
  		return array;
  	},
	/*选取事件*/
	select : function(selectedRows){
		var self = this;
		var len = this.props.tags.length;
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
		if (this.props.tags.length > 1 ) {
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
	/*删除*/
	delete :function(){
		var select = this.getSelect().join(',');
		console.log(select);
		var self = this;
		$.post('/tag/delete',{tid:select},function(res){
			console.log(res);
			

			//self.render();
		})
		window.location.reload();
	},
	/*查看*/
	read : function(){

		var select = this.getSelect();

		select.forEach(function(data,index){
			window.open('/blog/tag?tid='+data,'read'+data)
		})

		
	},
	/*打开编辑面板*/
	showEditBoard : function(){
		$('#edit-box').slideToggle();
	},
	/*取消编辑*/
	cancelEdit :  function(){
		$('#edit-box').slideUp();
	},
	/*保存更改*/
	save :function(){
		var newTags = this.state.tags;
		var oldTags = this.state.oldTags;
		var self = this;
		if (newTags.length != oldTags.length) {return false}
		for(let i=0;i<newTags.length;i++){
			if (newTags[i].name != oldTags[i].name) {
				$.get('/tag/updateBytid',{name:newTags[i].name , tid:newTags[i].id},function(res){
					if(res.serverStatus == 2){
						oldTags[i].name = newTags[i].name;
						var tempTags = $.parseJSON(JSON.stringify(oldTags))
						self.setState({
							tags : tempTags
						})

					}
				})
				
			}
		}
		$('#edit-box').slideUp();
	},
	/*打开新增Tag面板*/
	handleOpen: function(){
  		this.setState({open: true});
  	},
  	/*关闭新增Tag面板*/
  	handleClose: function(){
  		this.setState({open: false});
  	},
  	/*键盘事件*/
  	keyDown: function(event){
        var keynum;
        keynum = window.event ? event.keyCode : event.which;
        if (keynum == 13 ) {
            this.addTag();
        }
    },
    /*增加新Tag*/
  	addTag : function(){
  		this.handleClose();
  		
  		$.post('/tag/add',{name:this.state.addTag},function(res){
  			console.log(res);
  			if (res.serverStatus == 2) {
  				window.location.reload();
  			}
  			//
  		})
  		//console.log(this.state.addCat);
  	},
  	/*监听dialog中输入框的变化*/
  	changeAddTag: function(event){
		this.setState({
  			addTag: event.target.value
		});
  	},
	componentDidMount:function(){
  		var len = this.props.tags.length;
  		var init_select = new Array(len);
  		var all_select = new Array(len);
  		for (var i = init_select.length - 1; i >= 0; i--) {
  			init_select[i] = false;
  			all_select[i] = true;
  		}
  		var self = this;
  		//oldTags = self.props.tags;
  		var tags = $.parseJSON(JSON.stringify(self.props.tags))
  		var oldTags = $.parseJSON(JSON.stringify(self.props.tags))
		this.setState({
			select:init_select,
			selectAll:all_select,
			oldTags:oldTags,
			tags:self.props.tags
		})
  	},
  	
  	render: function(){
  		const tags = this.props.tags;
  		/*dialog的提交按钮*/
  		const actions = [
	  		<FlatButton
	  			label="提交"
	        	primary={true}
	        	keyboardFocused={true}
	        	onClick={this.addTag}
	      	/>
    	]
  		const style={
  			table:{
  				minWidth : 500
  			},
  			id:{
  			},
  			name:{
  			},
  			times:{
  			},
  			button:{
  				margin:'10px 15px 10px 15px',
  			},
  			editHeader:{
  				width : '30%',
  				margin : '1.6%',
  				color: 'rgb(158, 158, 158)',
  				fontSize : 12,
  				textAlign : 'center',
				display: 'inline-block',
  			},
  			editCell:{
  				margin : '1.6%',
  				width : '30%'
  			},
  			editCellInner:{
  				
  			}
  		}
  		return ( 	
			<MuiThemeProvider  muiTheme={getMuiTheme()}>

			<div>	
				<div className="tools">
					<RaisedButton label="删除" primary={true} style={style.button} onClick={this.delete}/>
					<RaisedButton label="编辑" primary={true} style={style.button} onClick={this.showEditBoard}/>
					<RaisedButton label="查看" primary={true} style={style.button} onClick={this.read}/>
					<RaisedButton label="添加Tag" primary={true} style={style.button} onClick={this.handleOpen}/>
					<RaisedButton label="文章管理" primary={true} style={style.button}  href='/blog/admin' />
					<RaisedButton label="分类管理" primary={true} style={style.button}  href='/blog/admin/cat'/>

				</div>
				<div id="edit-box" style={{
					display : 'none',
					width : '100%',
					marginBottom : 10
				}}>
					<Card style = {{
						width: '96%',
						marginLeft:'2%',
						marginRight:'2%'
					}}>
						<div style={style.editHeader}>ID</div>
						<div style={style.editHeader}>Tag</div>
						<div style={style.editHeader}>数量</div>
						{
							this.props.tags.map((data , i) => {
								return (
									<div className='edit-list' id={i} key={i} style={{
										width : '100%',

									}}>
										<TextField
									      	disabled={true}
									      	defaultValue={data.id}
									      	style={style.editCell}
									      	id={'tid'+i}

									    />
									    <TextField
									      	defaultValue={data.name}
									      	style={style.editCell}
									      	id={i.toString()}
									      	onChange={this.change}
									    />
									    <TextField
									      	disabled={true}
									      	defaultValue={data.times}
									      	style={style.editCell}
									      	id={'times'+i}
									    />
								    </div>
								)
							})
						
						}
						<div style={{
							width : 240,
							margin: 'auto'
						}}>
							<RaisedButton label="保存更改" style={style.button} onClick={this.save}/>
							<RaisedButton label="取消" style={style.button} onClick={this.cancelEdit}/>
						</div>
					</Card>
				</div>
			{/*显示面板*/}
				<Table
					onRowSelection = {this.select}
					style={style.table}
					bodyStyle={{overflow:'visible'}}
					multiSelectable = {true}
					bodyStyle={{overflow:'visible'}}
				>
    				<TableHeader
    					enableSelectAll = {true}
    				>
	      				<TableRow>
	      					<TableHeaderColumn style={style.id}>ID</TableHeaderColumn>
	        				<TableHeaderColumn style={style.name}>Tag</TableHeaderColumn>
	        				<TableHeaderColumn style={style.times}>数量</TableHeaderColumn>
	      				</TableRow>
    				</TableHeader>
    				<TableBody
    					deselectOnClickaway = {false}
    				>
				      	{
							tags.map((data, i) => {
						    return (
								<TableRow key={i}>
									<TableRowColumn style={style.id}>{data.id}</TableRowColumn>
						        	<TableRowColumn style={style.name}>{data.name}</TableRowColumn>
						        	<TableRowColumn style={style.times}  >{data.times} </TableRowColumn>
						      	</TableRow>
							);  // 多行箭头函数需要加括号和return
						})
					}
    				</TableBody>
  				</Table>
  			{/*新增面板*/}
  					<Dialog
			        	actions={actions}
			          	modal={false}
			          	open={this.state.open}
			          	onRequestClose={this.handleClose}
			        >
			        	
				        <TextField
						    hintText="Tag名"
						    onChange = {this.changeAddTag}
						    onKeyDown={this.keyDown}
						/>
				        
			    	</Dialog>
			</div>
			</MuiThemeProvider>
		)
	}
});

module.exports = TagList;

