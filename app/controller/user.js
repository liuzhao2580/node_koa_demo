const User = require("../model/user")
const Node_path = require("path")
class userCtl {
    // 校验是否是该用户
    async checkOwn(ctx,next) {
        const { user } = ctx.state
        const { id } = ctx.params
        if(id !== user._id) {ctx.throw(403,"只可以处理自己的数据")}
        await next()
    }
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
        ctx.verifyParams({
            name: {type: "string", required: false},
            password: {type: "string",required: false},
            gender: {type: "string",required: false},
            avatar_url: {type: "string",required: false},
            locations: {type: "array",itemType: "string",required: false},
            education: {type: "array",itemType: "object",required: false}
        })
        const {id} = ctx.params
        const user = await User.findByIdAndUpdate(id, ctx.request.body)
        ctx.body = user
    }
    // 获取用户
    async get_query(ctx) {
        ctx.body = await User.find()
    }
    // 获取指定用户信息 
    async get_queryById(ctx) {
        const {fields} = ctx.query
        let getselect
        if(fields) {
            getselect = fields.split(";").filter(f => f).map(item => `+${item} `).join("")
            getselect = getselect.slice(0,getselect.length -1)
        }
        else {
            getselect = ''
        }
        const {id} = ctx.params
        ctx.body = await User.findById(id).select(getselect)
    }
    // 上传图片
    async post_userUpload(ctx) {
        const { path } = ctx.request.files.filename
        const basename = Node_path.basename(path)
        const file_path =  `${ctx.origin}/upload/${basename}`
        ctx.body = file_path
    }
}

module.exports = new userCtl()