const exp = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const http = require("http")

const app = exp()

app.use(exp.static("www"))
app.use(bodyParser.urlencoded({ extended: false }))
// 调用engine方法
// 指定使用art-template渲染.html文件
// .html文件是视图文件，它是展示数据的
// 视图文件要放在views目录里
app.engine(".html", require("express-art-template"))

// 打开网站的首页会向'/'发起GET请求，表示请求打开首页
// 此时会查找index.html，因为它是首页默认的文件名
// 如果在服务端没有向'/'作出响应，那么在浏览器里就看不到首页(报错)
// 向打开首页这个请求作出响应，使用app.get('/')
app.post("/getstatus", (requery, resolut) => {
  // 读取留言内容，再把读到的数据作为视图的数据源进行渲染
  var options = {
    hostname: "localhost",
    port: 3000,
    path: "/message",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }
  let mess = ""
  console.log("请求成功")
  //   resolut.json({ code: "success", data: "好了" })
  resolut.json({ code: "success", data: "请求成功" })
})

app.get("/", (req, res) => {
  res.render("index.html")
})

app.get("/add", (req, res) => {
  console.log("打开添加留言页面")
  res.render("add.html")
})

app.post("/add", (req, res) => {
  console.log("收到了POST请求")
  var filename = "data/messages.txt"
  function saveFile() {
    fs.appendFile(filename, JSON.stringify(req.body) + ",", err => {
      if (err) {
        res.json({ code: "error", message: "留言失败，系统错误" })
      } else {
        // 留言成功，返回成功的消息
        res.json({ code: "success", message: "留言成功" })
      }
    })
  }
  fs.exists("data", exists => {
    if (exists) {
      // 保存留言
      saveFile()
    } else {
      // 同步的创建data目录
      fs.mkdirSync("data")
      // 保存留言
      saveFile()
    }
  })
})

app.listen(3000, () => {
  console.log("服务器启动成功")
})
