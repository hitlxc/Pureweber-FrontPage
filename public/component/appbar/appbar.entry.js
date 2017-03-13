import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Login from '../login/login.entry';
import Invite from '../invite/invite.entry' 
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import cookie from '../../js/cookie/cookie';
import $ from 'jquery';



class Logged extends Component {
  	static muiName = 'IconMenu';
  	logout = () => {
    	cookie.deleteCookieUser('userid');
    	//window.location.reload();
    	this.props.changeLogged();
  	};
  	render() {
    	return (
      		<div
				style={{display: 'flex'}}
			>
				<IconMenu
					{...this.props}
					iconButtonElement={
						<IconButton><MoreVertIcon /></IconButton>
					}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				>
					    
					<MenuItem primaryText="邀请新成员"
						href="/users/invite"
					/>
					<MenuItem primaryText="编辑新文章"
						href="/blog/edit"
					/>
					<MenuItem primaryText="管理文章" 
						href="/blog/admin"
					/>
					<MenuItem primaryText="退出" 
						onClick={this.logout}
					/>
				</IconMenu>
			</div>
    	);
  	}
}

const MyAppBar = React.createClass({
	getInitialState: function() {
		var logged = cookie.getCookie('userid') ? true : false ;
		return {
			logged : logged,
			open:false,
			openMenu:true,
			cats:[],
		};
	},
	handleToggle: function(){
		this.setState({open: !this.state.open})
	},
	handleClose: function(){
		this.setState({open: false});
	},
	changeLogged: function(){
		this.setState({logged: !this.state.logged})
	},
	componentDidMount: function(){
		var self = this;
		$.get('/cat/getNames',function(res){
			self.setState({
				cats:res
			})
		})
	},
	render: function(){
		return ( 	
			<div>
				<AppBar
					style={{width:'100%',boxShadow:'none',   position: 'fixed'}}
					onLeftIconButtonTouchTap={this.handleToggle}
					iconElementRight={
						this.state.logged?<Logged changeLogged={this.changeLogged.bind(null,this)} />:<Login changeLogged={this.changeLogged.bind(null,this)} />
					}
				/>
				<Drawer
					docked={false}
					width={300}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})} //点外部隐藏
				>
				<MenuItem onTouchTap={this.handleClose} primaryText="PureWeber"
					href='/'
					style={{
						height:'64px',
						color:'white',
						backgroundColor: 'rgb(0, 188, 212)',
						lineHeight: '64px',
						fontWeight: '300',
						fontSize:'24px',
						cursor: 'pointer',
					}}
				/>
				{
					this.state.cats.map((data, i) => {
						return (
							<MenuItem href={'/?cat='+data.id} key={i} onTouchTap={this.handleClose} primaryText={data.name}></MenuItem>
						);  // 多行箭头函数需要加括号和return
					})
				}

				
				
				<FlatButton label="Default"/>
				</Drawer>
			</div>
		)
	}
});

module.exports = MyAppBar;
