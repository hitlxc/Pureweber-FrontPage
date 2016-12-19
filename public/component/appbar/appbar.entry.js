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

class Login2 extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      /*<FlatButton {...this.props} label="Login" />*/
      <Login {...this.props} />
    );
  }
}


const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    
    	<Invite />

     
    <MenuItem primaryText="编辑新文章" />
    <MenuItem primaryText="管理文章" />
  </IconMenu>
);
Logged.muiName = 'IconMenu';


const MyAppBar = React.createClass({
  getInitialState: function() {
    	return {
    		logged : true,
        open:false,
    	};
  	},
  handleToggle: function(){
    console.log('123')
    this.setState({open: !this.state.open})
  },
  handleClose: function(){
    this.setState({open: false});
  },

  	render: function(){
  		return ( 	
  		  <div>
		  		<AppBar
		  			style={{width:'100%',boxShadow:'none',   position: 'fixed'}}
				    onLeftIconButtonTouchTap={this.handleToggle}
         			iconElementRight={
         				this.state.logged?<Logged/>:<Login/>
         			}
				  />
  			  <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})} //点外部隐藏
          >
            <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
            <FlatButton label="Default"/>
          </Drawer>
        </div>
		)
	}
});

module.exports = MyAppBar;
