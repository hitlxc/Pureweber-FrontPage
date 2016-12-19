import React from 'react';

import ReactDOM from 'react-dom'

import ArticleCard from './articlecard.entry' 

import $ from 'jquery';

let app = document.createElement('div');
ReactDOM.render(<ArticleCard author='hitlxc' tag='js' avatar='http://p3.wmpic.me/article/2015/03/16/1426483394_eJakzHWr.jpeg' title='文章标题' abstract='文章摘要。。。。。。。。' pic='https://www.baris-sagdic.com/file/2016/06/javascript-1.png' />, app);
document.body.appendChild(app);

$.get("http://localhost:3000/blog/gets",{
	num:5,
	page:1
},function(result){
		console.log(result);
		for (var i = result.length - 1; i >= 0; i--) {
			var tit = result[i].title;
			var author = result[i].uid.toString();
			console.log(author);

			let app = document.createElement('div');
		
			ReactDOM.render(<ArticleCard author={result[i].uid} tag={result[i].cid} avatar='http://p3.wmpic.me/article/2015/03/16/1426483394_eJakzHWr.jpeg'  title={result[i].title} abstract={result[i].content} pic='https://www.baris-sagdic.com/file/2016/06/javascript-1.png' />, app);
			document.body.appendChild(app);

		}

})

// hitlxc
// let app = document.createElement('div');
// ReactDOM.render(<ArticleCard author='hitlxc' tag='js' avatar='http://p3.wmpic.me/article/2015/03/16/1426483394_eJakzHWr.jpeg' title='文章标题' abstract='文章摘。。' pic='https://www.baris-sagdic.com/file/2016/06/javascript-1.png' />, app);
// document.body.appendChild(app);





