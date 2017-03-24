import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Login from '../login/login.entry';
import Invite from '../invite/invite.entry' 
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import cookie from '../../js/cookie/cookie';
import $ from 'jquery';

let DateTimeFormat;

if (areIntlLocalesSupported(['zh-Hans-CN'])) {
	DateTimeFormat = global.Intl.DateTimeFormat;
} else {
	const IntlPolyfill = require('intl');
	DateTimeFormat = IntlPolyfill.DateTimeFormat;
	require('intl/locale-data/jsonp/zh-Hans-CN');
}

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
		const minDate = new Date();
		const maxDate = new Date();
		minDate.setFullYear(minDate.getFullYear() - 1);
		minDate.setHours(0, 0, 0, 0);
		maxDate.setFullYear(maxDate.getFullYear() + 1);
		maxDate.setHours(0, 0, 0, 0);

		const years = [];
		for (let i = 2017; i < 2027; i++ ) {
  			years.push(<MenuItem value={i} key={i} primaryText={i} />);
		}

		const months = [];
		for (let i = 1; i < 13; i++ ) {
  			months.push(<MenuItem value={i} key={i} primaryText={i} />);
		}

		return {
			logged : logged,
			open:false,
			openMenu:true,
			cats:[],
			minDate: minDate,
      		maxDate: maxDate,
      		From: null,
      		To : null,
      		years : years,
      		yearSelect : null,
      		months : months,
      		monthSelect : null,
		};
	},
	handleToggle: function(){
		this.setState({open: !this.state.open})
	},
	handleClose: function(){
		this.setState({open: false});
	},
	handleChangeYearSingle : function(event , date){
		console.log(date);
	},
	handleChangeYear : function(event ,  index, value){
		console.log(value);
		var self = this;
		if(this.state.monthSelect){

		}
		this.setState({
			yearSelect : value
		})
	},
	handleChangeMonth : function(event ,  index, value){
		console.log(value);
		var self = this;
		if(this.state.yearSelect){
			
		}
		this.setState({
			monthSelect : value
		})
	},
	handleChangeDateSite:function(event , date){
		console.log(date);
	},
	handleChangeFrom :function(event, date){
		if(this.state.To){
			console.log(this.state.From ,this.state.To )
		}
		this.setState({
			minDate: date,
			From: date,
		});
	},
	handleChangeTo :function(event, date){
		if(this.state.From){
			console.log(this.state.From ,this.state.To )
		}
		this.setState({
			maxDate: date,
			To: date,
		});
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
						);  
					})
				}
				<Divider />
				<ListItem
					primaryText="按时间过滤"
					initiallyOpen={false}
					primaryTogglesNestedList={true}
					nestedItems={[
						<ListItem
							key={1}
							primaryText="按年选取"
							initiallyOpen={false}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem key={8}>
									<DropDownMenu maxHeight={300}  onChange={this.handleChangeYearSingle} style={{width : 200}}>
								        {this.state.years}
								    </DropDownMenu>
								</ListItem>
							]}
						/>,
						<ListItem
							key={2}
							primaryText="按月选取"
							initiallyOpen={false}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem key={7}>
									<DropDownMenu maxHeight={300}  value={this.state.yearSelect} onChange={this.handleChangeYear} style={{width : 200}}>
								        {this.state.years}
								    </DropDownMenu>
								    <DropDownMenu maxHeight={300}  value={this.state.monthSelect} onChange={this.handleChangeMonth} style={{width : 200}}>
								        {this.state.months}
								    </DropDownMenu>
								</ListItem>
							]}
						/>,
						<ListItem
							key={3}
							primaryText="按日期选取"
							initiallyOpen={false}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem key={6}>
								<DatePicker 
									hintText="选取时间" 
									textFieldStyle={{
										width:150
									}}
									DateTimeFormat={DateTimeFormat}
									okLabel="确定"
									cancelLabel="取消"
									locale="zh-Hans-CN"
									onChange={this.handleChangeDateSite}
								/>
								</ListItem>
							]}
						/>,
						<ListItem
							key={4}
							primaryText="按时间段选取"
							initiallyOpen={false}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem key={5}>
									<DatePicker 
										key={3}
										hintText="FROM" 
										textFieldStyle={{
											width:150
										}}
										DateTimeFormat={DateTimeFormat}
										okLabel="确定"
										cancelLabel="取消"
										locale="zh-Hans-CN"
										maxDate={this.state.maxDate}
										onChange={this.handleChangeFrom}
									/>
									<DatePicker 
										key={4}
										hintText="TO" 
										textFieldStyle={{
											width:150
										}}
										DateTimeFormat={DateTimeFormat}
										okLabel="确定"
										cancelLabel="取消"
										locale="zh-Hans-CN"
										minDate={this.state.minDate}
										onChange={this.handleChangeTo}
									/>
								</ListItem>
							]}
						/>
					]}
				/>
				<Divider />
				<MenuItem onTouchTap={this.handleClose} primaryText="关于我们"></MenuItem>
				
				
				
				
				</Drawer>
			</div>
		)
	}
});

module.exports = MyAppBar;
