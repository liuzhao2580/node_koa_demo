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

### 接口说明
1. 新增用户接口的时候需要保证输入的用户名在数据库中不存在，并且用户名和密码必须是字母数字下划线 5-16位

### 实现 获取用户关注列表 关注功能 取消关注功能
1. 首先得在`Schema`中添加`follow`的字段，并且和`UserInfo_database`关联起来,使用到参考文档 [mongoose 连接文档](http://www.mongoosejs.net/docs/populate.html)
代码实现
```js
const mongoose = require("mongoose")
const {Schema,model} = mongoose
const UserSchema = new Schema({
    // 姓名
    name: {
        type: String,
        required: true
    },
    follow : {
        type: [{ type: Schema.Types.ObjectId, ref: 'UserInfo_database' }],
        select: false
    }
})
module.exports = model("UserInfo_database", UserSchema)
```
2. 获取用户关注列表 使用的请求方式`GET` 使用的地址`localhost:3000/user/:id/follow`，这里其实应该获取用户名来代替用户id，本人只是为了方便使用postman进行演示
3. 关注某用户 使用的请求方式`PUT` 请求地址`localhost:3000/user/follow/:id`
4. 取消关注某用户 使用的请求方式`DELETE` 请求地址`localhost:3000/user/follow/:id`

### 设置数据的分页
1. 使用`.limit().skip()`的方法
2. 具体使用  请求传递的地址`localhost:3000/user?page=1?pn=10`
```js
const {page, pn} = ctx.query
const set_page = Math.max(+page, 1) - 1
const set_pn = Math.max(+pn, 10)
ctx.body = await User.find().limit(set_pn).skip(set_page * set_pn)
```