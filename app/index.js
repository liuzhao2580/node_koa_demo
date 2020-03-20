const koa = require("koa")
const koa_body = require("koa-body")
const app = new koa()
const routing = require("./router")
const mongoDBConn = require("./db")
const error = require("koa-json-error")
const parameter = require("koa-parameter")
const { token_secret } = require("./config")
mongoDBConn()
app
.use(error({
    postFormat: (e, {stack,...rest}) =>  process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))
.use(koa_body())
.use(parameter(app))

routing(app)

app.listen(3000,() => console.log("启动 localhost:3000"))