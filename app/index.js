const koa = require("koa")
const koa_body = require("koa-body")
const path = require("path")
const app = new koa()
const routing = require("./router")
const mongoDBConn = require("./db")
const error = require("koa-json-error")
const parameter = require("koa-parameter")
const static = require("koa-static")
mongoDBConn()
app
// 用来处理 错误页面
.use(error({
    postFormat: (e, {stack,...rest}) =>  process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))
// 解析post请求，也可以解析文件
.use(koa_body({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname,"/public/upload"),
        keepExtensions: true
    }
}))
.use(parameter(app))
// 将文件托管到网络地址
.use(static(path.join(__dirname,"public")))  

routing(app)

app.listen(3000,() => console.log("启动 localhost:3000"))