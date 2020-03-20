### 使用 `koa` 的`NodeJS`框架

1. 用到的中间件
    - `koa-router` 用于路由
    - `koa-body` 用于解析`post`请求发送的数据,还可以解析文件，但是需要配置
    - `mongoose` 用于连接 云`mongoDB` 数据库 [mongoose中文文档](http://www.mongoosejs.net/docs/guide.html)
    - `koa-jwt` 用来解析 `token` 
    - `koa-parameter` 用来校验传递的参数
    - `koa-json-error` 用来检验 错误的页面

### 编写的接口基于`RESTful API` 规范
1. 增加的接口`POST`方式
2. 删除的接口`DELETE`方式
3. 修改的接口`PATCH` 方式 这里的方式会修改部分的数据,但是使用`PUT`方式更新数据会将整个数据全部修改
4. 查询的接口`GET`方式,类似于`localhost:3000/user/1`
5. 字段过滤也是`GET`方式, 使用的是在查询的接口上面拼接`fields` 类似于`localhost:3000/user/1?fields=name;gender`,说明过滤到的是姓名和性别的数据