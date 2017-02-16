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

require('./cat-list.css');

const CatList = React.createClass({
	getInitialState: function() {
		var self = this;
		var cats = this.props.cats;
    	return {
    		select:[],
    		cats:cats,
    		oldCats:'',
    		open:false,
    		addCat:'',
    	};
  	},
  	change : function(event){
  		var cats = this.state.cats;
  		cats[event.target.id].name=event.target.value
  		this.setState({
	      	cats : cats,
	    });
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
		
		
		
		this.setState({select:selectedRows[0]});
		//console.log(selectedRows)
	},
	/*删除事件*/
	delete : function(){
		var cid = this.props.cats[this.state.select].id;
		console.log(cid)
		$.post('/cat/delete',{cid:cid},function(res){
			console.log(res)
			if(res.serverStatus == 2){
				window.location.reload();
			}
		})
		
	},
	/*查看*/
	read : function(){

		var select = this.getSelect();

		select.forEach(function(data,index){
			window.open('/blog/article?id='+data,'read'+data)
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
		var newCats = this.state.cats;
		var oldCats = this.state.oldCats;
		var self = this;
		if (newCats.length != oldCats.length) {return false}
		for(let i=0;i<newCats.length;i++){
			if (newCats[i].name != oldCats[i].name) {
				$.get('/cat/updateBycid',{name:newCats[i].name , cid:newCats[i].id},function(res){
					if(res.serverStatus == 2){
						oldCats[i].name = newCats[i].name;
						var tempCats = $.parseJSON(JSON.stringify(oldCats))
						self.setState({
							cats : tempCats
						})

					}
				})
				
			}
		}
		$('#edit-box').slideUp();
	},
	/*打开新增分类面板*/
	handleOpen: function(){
  		this.setState({open: true});
  	},
  	/*关闭新增分类面板*/
  	handleClose: function(){
  		this.setState({open: false});
  	},
  	/*键盘事件*/
  	keyDown: function(event){
        var keynum;
        keynum = window.event ? event.keyCode : event.which;
        if (keynum == 13 ) {
            this.addCat();
        }
    },
    /*增加新分类*/
  	addCat : function(){
  		this.handleClose();
  		
  		$.post('/cat/add',{name:this.state.addCat},function(res){
  			console.log(res);
  			if (res.serverStatus == 2) {
  				window.location.reload();
  			}
  			//
  		})
  		//console.log(this.state.addCat);
  	},
  	/*监听dialog中输入框的变化*/
  	changeAddCat: function(event){
		this.setState({
  			addCat: event.target.value
		});
  	},
	componentDidMount:function(){
  		var len = this.props.cats.length;
  		var init_select = new Array(len);
  		var all_select = new Array(len);
  		for (var i = init_select.length - 1; i >= 0; i--) {
  			init_select[i] = false;
  			all_select[i] = true;
  		}
  		var self = this;
  		//oldCats = self.props.cats;
  		var cats = $.parseJSON(JSON.stringify(self.props.cats))
  		var oldCats = $.parseJSON(JSON.stringify(self.props.cats))
		this.setState({
			select:init_select,
			selectAll:all_select,
			oldCats:oldCats,
			cats:self.props.cats
		})
  	},
  	
  	render: function(){
  		const cats = this.props.cats;
  		/*dialog的提交按钮*/
  		const actions = [
	  		<FlatButton
	  			label="提交"
	        	primary={true}
	        	keyboardFocused={true}
	        	onClick={this.addCat}
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
					<RaisedButton label="添加分类" primary={true} style={style.button} onClick={this.handleOpen}/>
					<RaisedButton label="文章管理" primary={true} style={style.button}  href='/blog/admin' />
					<RaisedButton label="Tag管理" primary={true} style={style.button}  href='/blog/admin/tag'/>

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
						<div style={style.editHeader}>分类</div>
						<div style={style.editHeader}>数量</div>
						{
							this.props.cats.map((data , i) => {
								return (
									<div className='edit-list' id={i} key={i} style={{
										width : '100%',

									}}>
										<TextField
									      	disabled={true}
									      	defaultValue={data.id}
									      	style={style.editCell}
									      	id={'cid'+i}

									    />
									    <TextField
									    	disabled={i==0}
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

				<Table
					onRowSelection = {this.select}
					style={style.table}
					bodyStyle={{overflow:'visible'}}
				>
    				<TableHeader>
	      				<TableRow>
	      					<TableHeaderColumn style={style.id}>ID</TableHeaderColumn>
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
									<TableRowColumn style={style.id}>{data.id}</TableRowColumn>
						        	<TableRowColumn style={style.name}>{data.name}</TableRowColumn>
						        	<TableRowColumn style={style.times}  >{data.times} </TableRowColumn>
						      	</TableRow>
							);  // 多行箭头函数需要加括号和return
						})
					}
    				</TableBody>
  				</Table>
  					<Dialog
			        	actions={actions}
			          	modal={false}
			          	open={this.state.open}
			          	onRequestClose={this.handleClose}
			        >
			        	
				        <TextField
						    hintText="分类名"
						    onChange = {this.changeAddCat}
						    onKeyDown={this.keyDown}
						/>
				        
			    	</Dialog>
			</div>
			</MuiThemeProvider>
		)
	}
});

module.exports = CatList;

