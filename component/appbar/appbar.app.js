import React from 'react';

import ReactDOM from 'react-dom'

import MyAppBar from './appbar.entry' 

let app = document.createElement('div');
ReactDOM.render(<MyAppBar  />, app);
document.body.appendChild(app);



