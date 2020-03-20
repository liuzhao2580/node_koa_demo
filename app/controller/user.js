const User = require("../model/user")
class userCtl {
    // 新增用户
    async post_insert(ctx) {
        ctx.verifyParams({
            name: {type: "string", required: true}
        })
        const {body} = ctx.request
        ctx.body = await new User(body).save()
    }
    // 删除用户
    async delete_del(ctx) {
        const {id} = ctx.params
        const user = await User.findByIdAndRemove(id)
        ctx.body = user
    }
    // 更新用户数据
    async patch_updata(ctx) {
        const {id} = ctx.params
        const user = await User.findByIdAndUpdate(id, ctx.request.body)
        ctx.body = user
    }
    // 获取用户
    async get_query(ctx) {
        console.log(ctx)
        ctx.body = await User.find()
    }
    // 获取指定用户信息 
    async get_queryById(ctx) {
        const {id} = ctx.params
        ctx.body = await User.findById(id)
    }
}

module.exports = new userCtl()