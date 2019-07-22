var V = {
  router: location.href, // 服务器地址,通过更改V.router可选择配置后端地址
  asyncTrue: null, // 同步异步请求 默认同步
  data: null, // 请求发送的数据,
  header: null, // 请求头默认 "Content": "appliction/x-www-form/urlencoded"
  ajax: true // 限制多次点击请求
}
const proxy = window.V.router // proxy为请求中默认的服务器地址

const route = {
  get: function(url, data, header, async) {
    if (!V.ajax) return // 判断V.ajax是否可以请求,true 可以,false不可以
    V.ajax = false // 点击限制再次点击的时候不允许进行请求
    // promise封装ajax
    return new Promise(function(resolve, reject) {
      V.asyncTrue = async || true // 同步异步
      V.data = data || "" // 判断是否传入数据,需要发送的数据
      var xhr = new XMLHttpRequest() // http请求
      xhr.onreadystatechange = function() {
        // 请求状态，会被调用4次，第4次成功
        if (xhr.readyState == 4 && xhr.status == 200) {
          // 判断是否成功
          resolve(xhr.response) // promise 成功后的回调
          V.ajax = true // 请求成功后解除点击限制
        }
      }
      if (data) {
        // 判断是否传入参数 对data数据处理
        let message = "?" // get发送数据拼接url地址
        for (let i in data) {
          message = message + i + "=" + `"${data[i]}&"` // 拼接对象
        }
        message = message.slice(0, message.length - 2) // 删除最后一个&
        xhr.open("GET", proxy + url + message, V.asyncTrue) // 拼接get参数
      } else {
        xhr.open("GET", proxy + url, asyncTrue) // 不传递参数
      }
      if (header) {
        xhr.setRequestHeader("Content-type", header["Content-type"]) // 使用传入的请求头
      } else {
        xhr.setRequestHeader("Content-type", "appliction/x-www-form/urlencoded") // 使用默认的请求头
      }
      xhr.send()
    })
  },
  post: function(url, data, header, async) {
    if (!V.ajax) return // 判断V.ajax是否可以请求,true 可以,false不可以
    V.ajax = false // 点击限制再次点击的时候不允许进行请求
    return new Promise(function(resolve, reject) {
      V.asyncTrue = async || true // 同步异步
      V.data = data || "" // 判断是否传入数据,需要发送的数据
      var xhr = new XMLHttpRequest() // http请求
      xhr.onreadystatechange = function() {
        // 请求状态，会被调用4次，第4次成功
        if (xhr.readyState == 4 && xhr.status == 200) {
          // 判断是否成功
          resolve(xhr.response) // promise 成功后的回调
          V.ajax = true // 请求成功后解除点击限制
        }
      }
      xhr.open("POST", proxy + url, V.asyncTrue) // 请求类型  请求地址  异步同步
      if (header) {
        xhr.setRequestHeader("Content-type", header["Content-type"]) // 使用传入的请求头
      } else {
        xhr.setRequestHeader("Content-type", "appliction/x-www-form/urlencoded") // 使用默认的请求头
      }
      if (data) {
        xhr.send(JSON.stringify(data))
      } else {
        xhr.send()
      }
    })
  }
}
