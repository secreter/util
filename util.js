//判断javascript类型
function type(obj) {
	var toString = Object.prototype.toString
	var map = {
	    '[object Boolean]'  : 'boolean', 
	    '[object Number]'   : 'number', 
	    '[object String]'   : 'string', 
	    '[object Function]' : 'function', 
	    '[object Array]'    : 'array', 
	    '[object Date]'     : 'date', 
	    '[object RegExp]'   : 'regExp', 
	    '[object Undefined]': 'undefined',
	    '[object Null]'     : 'null', 
	    '[object Object]'   : 'object',
	    '[object Map]'      : 'map',
	    '[object Set]'      : 'set'
	}
	return map[toString.call(obj)]
}

// random
function random(min,max){
	var step=max-min
	return Math.floor(Math.random()*step+min)
}

//deepClone	

