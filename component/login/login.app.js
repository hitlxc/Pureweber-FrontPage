import React from 'react';

import {render} from 'react-dom';

import Invite from './login.entry' 

let app = document.createElement('div');
ReactDOM.render(<Login  />, app);
document.body.appendChild(app);