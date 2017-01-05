import React from 'react';

import ReactDOM from 'react-dom'

import $ from 'jquery';

require('./footer.css');
//import Marker from 'marked';

const Footer = React.createClass({
  	render: function(){
	  	return (
	  		<footer>© 2016 哈尔滨工业大学PureWeber团队</footer>
	  	)
  	}
});

module.exports = Footer;
