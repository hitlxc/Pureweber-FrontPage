const cookie = {
	getCookie: function(c_name){
		if (document.cookie.length>0){　　//先查询cookie是否为空，为空就return ""
			var c_start=document.cookie.indexOf(c_name + "=")　　//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
			if (c_start!=-1){ 
				c_start=c_start + c_name.length+1　　//获取cookie值的开始位置
				var c_end=document.cookie.indexOf(";",c_start)　　
				if (c_end==-1) c_end=document.cookie.length　　
				return unescape(document.cookie.substring(c_start,c_end))　　
			} 
		}
		return ""
	},
	setCookieUser: function(c_name, value, expiredays){
　　　　var exdate=new Date();
　　　　exdate.setDate(exdate.getDate() + expiredays);
　　　　document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
　　},

}

/*参考W3C*/
module.exports = cookie;