import React from 'react';

import ReactDOM from 'react-dom'

import Login from './login.entry' 

let app = document.createElement('div');
ReactDOM.render(<Login  />, app);
document.body.appendChild(app);