// 判断javascript类型
function type (obj) {
  var toString = Object.prototype.toString
  var map = {
	    '[object Boolean]': 'boolean',
	    '[object Number]': 'number',
	    '[object String]': 'string',
	    '[object Function]': 'function',
	    '[object Array]': 'array',
	    '[object Date]': 'date',
	    '[object RegExp]': 'regExp',
	    '[object Undefined]': 'undefined',
	    '[object Null]': 'null',
	    '[object Object]': 'object',
	    '[object Map]': 'map',
	    '[object Set]': 'set'
  }
  return map[toString.call(obj)]
}

// random
function random (min, max) {
  var step = max - min
  return Math.floor(Math.random() * step + min)
}

// getUrlParamObj
function getUrlParamObj () {
  let str = location.search.substr(1)
  let o = {}
  let strArr = str.split('&')
  strArr.forEach((item) => {
    item = item.split('=')
    o[decodeURIComponent(item[0])] = decodeURIComponent(item[1])
  })
  return o
}
// deepClone
// 深拷贝
function deepCopy (des, src) {
  for (var key in src) {
    let prop = src[key]
    if (prop !== null && typeof prop === 'object') {
      des[key] = des[key] || {}
      deepCopy(des[key], prop)
    } else {
      des[key] = src[key]
    }
  }
  return des
}

// get bgcolor

// cookies

// indexDB

