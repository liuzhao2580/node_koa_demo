### 使用 `koa` 的`NodeJS`框架

1. 用到的中间价
    - `koa-router` 用于路由
    - `koa-body` 用于解析`post`请求发送的数据,还可以解析文件，但是需要配置
    - `mongoose` 用于连接 云`mongoDB` 数据库 [mongoose中文文档](http://www.mongoosejs.net/docs/guide.html)
    - `koa-jwt` 用来解析 `token` 
    - `koa-parameter` 用来校验传递的参数
    - `koa-json-error` 用来检验 错误的页面