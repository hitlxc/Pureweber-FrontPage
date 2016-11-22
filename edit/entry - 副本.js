import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import TextField from 'material-ui/TextField';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};


const App = React.createClass({
  render: function(){
  	return (
	  	<div>
	  		<MuiThemeProvider muiTheme={getMuiTheme()}>
	    		<AppBar title={this.props.title} />
	    	</MuiThemeProvider>
	    	<MuiThemeProvider muiTheme={getMuiTheme()}>
	    		<RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
	    			<RadioButton
			        	value="light"
			        	label="Simple"
			        	style={styles.radioButton}
			      	/>
			      	<RadioButton
			        	value="not_light"
			        	label="Selected by default"
			        	style={styles.radioButton}
			      	/>
			      	<RadioButton
			       	 	value="ludicrous"
			        	label="Custom icon"
			       	 	checkedIcon={<ActionFavorite />}
			        	uncheckedIcon={<ActionFavoriteBorder />}
			        	style={styles.radioButton}
			      	/>
			    </RadioButtonGroup>
			</MuiThemeProvider>
	    	<MuiThemeProvider muiTheme={getMuiTheme()}>    
			    <RadioButtonGroup name="shipName" defaultSelected="community">
			      	<RadioButton
			        	value="enterprise"
			        	label="Disabled unchecked"
			        	disabled={true}
			        	style={styles.radioButton}
			      	/>
			      	<RadioButton
			        	value="community"
			        	label="Disabled checked"
			        	disabled={true}
			        	style={styles.radioButton}
			      	/>
			    </RadioButtonGroup>
			</MuiThemeProvider>
	    	<MuiThemeProvider muiTheme={getMuiTheme()}>    
			    <RadioButtonGroup name="notRight" labelPosition="left" style={styles.block}>
			      	<RadioButton
			        	value="reverse"
			        	label="Label on the left"
			        	style={styles.radioButton}
			      	/>
			    </RadioButtonGroup>

	  		</MuiThemeProvider>
	  		
	    </div>
		)
	}
});

let app = document.createElement('div');
ReactDOM.render(<App title={"pureweber"} />, app);
document.body.appendChild(app);