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
    // 查找用户是否存在
    async isExisted(ctx,next) {
        const {id} = ctx.params
        if(id.length != 24) {
            ctx.throw(400,"用户ID输入长度为24位")
        }
        const get_user = await User.findOne({"_id": id})
        if(!get_user) {
            ctx.throw(404,"用户不存在")
        }
        await next()
    }
    // 新增用户
    async post_insert(ctx) {
        ctx.verifyParams({
            name: {type:"string" , required: true,format: /^[0-9a-zA-Z_]{5,16}$/,message:"必须是字母数字下划线5-16位"},
            password: {type:"string" , required: true,format: /^[0-9a-zA-Z_]{5,16}$/,message:"必须是字母数字下划线5-16位"}
        })
        const {body: getBody} = ctx.request
        const existedName = await User.findOne({name: getBody.name})
        if(existedName) {
            ctx.body = ctx.throw(403,"用户已经存在")
        } else {
            ctx.body = await new User(getBody).save()
        }
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
        const {page, pn} = ctx.query
        const set_page = Math.max(+page, 1) - 1
        const set_pn = Math.max(+pn, 10)
        ctx.body = await User.find().limit(set_pn).skip(set_page * set_pn)
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
    // 获取用户的所有关注的对象
    async get_listFollow(ctx) {
        const {id} = ctx.params
        const user = await User.findById(id).select("+follow").populate("follow")
        ctx.body = user.follow
    }
    // 关注用户
    async put_follow(ctx) {
        if(ctx.state.user._id == ctx.params.id) {
            return ctx.body = "不可以关注自己"
        }
        const get_owen = await User.findById(ctx.state.user._id).select("+follow")
        const {follow} = get_owen
        // 说明当前的用户没有被关注
        if(!follow.map(item => item.toString()).includes(ctx.params.id)) {
            follow.push(ctx.params.id)
            get_owen.save()
            ctx.body = "关注成功"
        } else {
            ctx.body = "该用户已经被关注"
        }
    }
    // 取消关注
    async delete_unfollow(ctx) {
        if(ctx.state.user._id == ctx.params.id) {
            return ctx.body = "不可以操作自己"
        }
        const get_owen = await User.findById(ctx.state.user._id).select("+follow")
        const {follow} = get_owen
        const find_index = follow.indexOf(ctx.params.id)
        // 说明当前的用户没有被关注
        if(find_index > -1) {
            follow.splice(find_index,1)
            get_owen.save()
            ctx.body = "取消关注成功"
        } else {
            ctx.body = "该用户已经被取消关注"
        }
    }
}

module.exports = new userCtl()