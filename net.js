ajax({
	url:'http://localhost:3000/ajax',
	dataType:'json',
	method:'GET',
	data:{},
	success:function(a,b){
		console.log(a,b)
	},
	error:function(e){
		console.log(e)
	},
})
function ajax(option){
	option=option||{}
	option.method = (option.method || "GET").toUpperCase()
	option.dataType=option.dataType||'json'
	let param=formatParam(option.data)
	let xhr=null
	
	//创建 - 非IE6 - 第一步
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest()
	}else{
		//IE6及其以下版本浏览器
		xhr = new ActiveXObject('Microsoft.XMLHTTP')
	}
	//接收 - 第三步
	xhr.onreadystatechange=function(){
		if (xhr.readystate == 4) {
			let status = xhr.status
			if (status >= 200 && status <300 ) {
				option.success && option.success(xhr.responseText, xhr.responseXML)
			} else {
				option.error && option.error(status)
			}
		}
	}
	//连接 和 发送 - 第二步
	if (option.method == 'GET') {
		xhr.open('GET',option.url + '?' +param,true)
		xhr.send(null)
	}else{
		xhr.open('POST',option.url,true)
		//设置表单提交时的内容类型
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send(param)
	}


}
function formatParam(obj){
	let arr=[]
	for(let key in obj){
		arr.push(encodeURIComponent(key)+'='+encodeURIComponent(obj[key]))
	}
	arr.push(("v=" + Math.random()).replace(".",''))
	return arr.join('&')
}