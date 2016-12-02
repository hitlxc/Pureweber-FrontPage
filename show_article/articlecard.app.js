import React from 'react';

import {render} from 'react-dom';

import Invite from './articlecard.entry' 

let app = document.createElement('div');
ReactDOM.render(<ArticleCard  />, app);
document.body.appendChild(app);