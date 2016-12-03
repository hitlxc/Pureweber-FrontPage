import React from 'react';

import {render} from 'react-dom';

import Invite from './appbar.entry' 

let app = document.createElement('div');
ReactDOM.render(<MyAppBar  />, app);
document.body.appendChild(app);