import React from 'react';

import ReactDOM from 'react-dom'


import Invite from './invite.entry' 

let app = document.createElement('div');
ReactDOM.render(<Invite  />, app);
document.body.appendChild(app);



// Enable the tab character onkeypress (onkeydown) inside textarea...
// ... for a textarea that has an `id="my-textarea"`
//enableTab('text-input');