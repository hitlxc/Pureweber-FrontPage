import React from 'react';

import {render} from 'react-dom';

import Invite from '../component/invite/invite.entry' 

import ArticleCard from '../component/articlecard/articlecard.entry' 

import Login from '../component/login/login.entry' 

let app = document.createElement('div');
render(<Invite  />, app);
document.body.appendChild(app);



// Enable the tab character onkeypress (onkeydown) inside textarea...
// ... for a textarea that has an `id="my-textarea"`
//enableTab('text-input');