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

// 生成格式化时间
function getDate (timestamp = new Date()) {
  // 简单的一句代码
  let date = new Date(timestamp) // 获取一个时间对象

  /**
   1. 下面是获取时间日期的方法，需要什么样的格式自己拼接起来就好了
   2. 更多好用的方法可以在这查到 -> http://www.w3school.com.cn/jsref/jsref_obj_date.asp
   */
  let y = date.getFullYear()  // 获取完整的年份(4位,1970)
  let m = date.getMonth() + 1  // 获取月份(0-11,0代表1月,用的时候记得加上1)
  let d = date.getDate()  // 获取日(1-31)
  date.getTime()  // 获取时间(从1970.1.1开始的毫秒数)
  let h = date.getHours()  // 获取小时数(0-23)
  let M = date.getMinutes()  // 获取分钟数(0-59)
  let s = date.getSeconds()  // 获取秒数(0-59)
  return `${y}-${m}-${d}`
}
// get bgcolor

// cookies

// indexDB

