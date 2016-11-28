import React from 'react';

import {render} from 'react-dom';

import App from './edit.entry' 

let app = document.createElement('div');
render(<App  />, app);
document.body.appendChild(app);