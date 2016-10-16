/*
cookie 是每次都要带到服务端的数据，最大4k，一般不超过20个
JS 原生的 API提供了获取cookie的方法：document.cookie（注意，这个方法只能获取非 HttpOnly 类型的cookie）。
每个cookie都有一定的属性，如什么时候失效，要发送到哪个域名，哪个路径等等。这些属性是通过cookie选项来设置的，cookie选项包括：expires、domain、path、secure、HttpOnly。在设置任一个cookie时都可以设置相关的这些属性，当然也可以不设置，这时会使用这些属性的默认值。在设置这些属性时，属性之间由一个分号和一个空格隔开
"key=name; expires=Thu, 25 Feb 2016 04:18:00 GMT; domain=ppsc.sankuai.com; path=/; secure; HttpOnly"
expires选项用来设置“cookie 什么时间内有效”。expires其实是cookie失效日期，expires必须是 GMT 格式的时间（可以通过 new Date().toGMTString()或者 new Date().toUTCString() 来获得）
如expires=Thu, 25 Feb 2016 04:18:00 GMT表示cookie讲在2016年2月25日4:18分之后失效，对于失效的cookie浏览器会清空。如果没有设置该选项，则默认有效期为session，即会话cookie。这种cookie在浏览器关闭后就没有了。

expires 是 http/1.0协议中的选项，在新的http/1.1协议中expires已经由 max-age 选项代替，两者的作用都是限制cookie 的有效时间。expires的值是一个时间点（cookie失效时刻= expires），而max-age 的值是一个以秒为单位时间段（cookie失效时刻= 创建时刻+ max-age）。

domain 和 path

domain是域名，path是路径，两者加起来就构成了 URL，domain和path一起来限制 cookie 能被哪些 URL 访问。
所以domain和path2个选项共同决定了cookie何时被浏览器自动添加到请求头部中发送出去。如果没有设置这两个选项，则会使用默认值。domain的默认值为设置该cookie的网页所在的域名，path默认值为设置该cookie的网页所在的目录。

httpOnly

这个选项用来设置cookie是否能通过 js 去访问。默认情况下，cookie不会带httpOnly选项(即为空)，所以默认情况下，客户端是可以通过js代码去访问（包括读取、修改、删除等）这个cookie的。当cookie带httpOnly选项时，客户端则无法通过js代码去访问（包括读取、修改、删除等）这个cookie。

在客户端是不能通过js代码去设置一个httpOnly类型的cookie的，这种类型的cookie只能通过服务端来设置。

服务端设置 cookie
不管你是请求一个资源文件（如 html/js/css/图片），还是发送一个ajax请求，服务端都会返回response。而response header中有一项叫set-cookie，是服务端专门用来设置cookie的。如下图所示，服务端返回的response header中有5个set-cookie字段，每个字段对应一个cookie（注意不能将多个cookie放在一个set-cookie字段中），set-cookie字段的值就是普通的字符串，每个cookie还设置了相关属性选项。

最简单的设置多个cookie的方法就在重复执行document.cookie = "key=name"
修改 cookie
要想修改一个cookie，只需要重新赋值就行，旧的值会被新的值覆盖。但要注意一点，在设置新cookie时，path/domain这几个选项一定要旧cookie 保持一样。否则不会修改旧值，而是添加了一个新的 cookie。

删除 cookie
删除一个cookie 也挺简单，也是重新赋值，只要将这个新cookie的expires 选项设置为一个过去的时间点就行了。但同样要注意，path/domain/这几个选项一定要旧cookie 保持一样。


cookie其实是个字符串，但这个字符串中逗号、分号、空格被当做了特殊符号。所以当cookie的 key 和 value 中含有这3个特殊字符时，需要对其进行额外编码，一般会用escape进行编码，读取时用unescape进行解码；当然也可以用encodeURIComponent/decodeURIComponent或者encodeURI/decodeURI

如果max-age为负数，则表示该cookie仅在本浏览器窗口以及本窗口打开的子窗口内有效，关闭窗口后该cookie即失效。max-age为负数的Cookie，为临时性cookie，不会被持久化，不会被写到cookie文件中。cookie信息保存在浏览器内存中，因此关闭浏览器该cookie就消失了。cookie默认的max-age值为-1。

‍如果max-age为0，则表示删除该cookie。cookie机制没有提供删除cookie的方法，因此通过设置该cookie即时失效实现删除cookie的效果。失效的Cookie会被浏览器从cookie文件或者内存中删除。

如果不设置expires或者max-age这个cookie默认是Session的，也就是关闭浏览器该cookie就消失了。
*/

class Cookie {
	//增，改
	set(obj){
		if(obj.name===undefined){
			console.error('name can\'t be null')
		}
		if(obj.value===undefined){
			console.error('value can\'t be null')
		}
		obj.name=encodeURIComponent(obj.name)
		obj.value=encodeURIComponent(obj.value)
		var str=obj.name+'='+obj.value+'; '
		if(obj.maxAge!==undefined){
			str+='max-age='+obj.maxAge+'; '
		}
		if(obj.domain!==undefined){
			str+='domain='+obj.domain+'; '
		}
		//注意，这里的path如果url路径中没有就设置不成功
		if(obj.path!==undefined){
			str+='path='+obj.path+'; '
		}
		if(obj.secure!==undefined){
			str+='secure='+obj.secure+'; '
		}
		console.log(str)
		//每次都是追加一个cookie，除了同名的不会覆盖
		document.cookie=str
	}
	//查
	get(name){
		var obj={},c=document.cookie
		if(!name){
			return c
		}
		obj=this.getObj()
		return obj[name]
	}
	//删
	remove(name){
		name=encodeURIComponent(name)
		var obj=this.getObj()
		if(obj[name]===undefined) return false
		//max-age<0,session;=0,remove;>0,持久化时间
		this.set({name:name,value:obj[name],maxAge:0})
		return true
	}
	//把cookie转换为一个对象
	getObj(){
		var obj={}
		var arr=document.cookie.split('; ')
		arr.forEach((a)=>{
			a=a.split('=')
			obj[decodeURIComponent(a[0])]=decodeURIComponent(a[1])
		})
		return obj
	}
}