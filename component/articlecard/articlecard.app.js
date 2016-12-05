import React from 'react';

import ReactDOM from 'react-dom'

import ArticleCard from './articlecard.entry' 

let app = document.createElement('div');
ReactDOM.render(<ArticleCard author='hitlxc' tag='js' avatar='http://p3.wmpic.me/article/2015/03/16/1426483394_eJakzHWr.jpeg' title='文章标题' abstract='文章摘要。。。。。。。。' pic='https://www.baris-sagdic.com/file/2016/06/javascript-1.png' />, app);
document.body.appendChild(app);






