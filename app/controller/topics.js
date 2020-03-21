const TopicSchema = require("../model/topics")
const {check_ID,show_select} = require("../config")

class topciCtl {
    // 获取所有话题信息
    async get_Alltopic(ctx) {
        const {page, pn} = ctx.query
        const set_page = Math.max(+page, 1) - 1
        const set_pn = Math.max(+pn, 10)
        const topic_info = await TopicSchema.find({name: new RegExp(ctx.query.q)}).limit(set_pn).skip(set_page * set_pn)
        ctx.body = topic_info
    }
    // 获取指定话题信息
    async get_topicById(ctx) {
        const {id} = ctx.params
        check_ID(ctx,id)
        const select_field = show_select(ctx)
        const get_topic = await TopicSchema.findById(id).select(select_field)
        if(!get_topic) {ctx.throw(403,"没有相关话题")}
        ctx.body = get_topic
    }
    // 添加话题
    async post_insertTopic(ctx) {
        ctx.verifyParams({
            name: {type: "string",required: true},
            introduction: {type: "string",required: false},
            avatar_url: {type: "string",required: false}
        })
        const {body:getBody} = ctx.request
        const existedName = await TopicSchema.findOne({name:getBody.name})
        if(existedName) {ctx.throw(404,"话题已经存在")}
        ctx.body = await new TopicSchema(getBody).save()
    }
    // 删除话题
    async delete_topic(ctx) {
        const {id} = ctx.params
        check_ID(ctx,id)
        const res = await TopicSchema.findByIdAndRemove(id)
        if(res) ctx.body = "删除成功"
    }
    // 修改话题
    async patch_topic(ctx) {
        const {id} = ctx.params
        check_ID(ctx,id)
        ctx.verifyParams({
            name: {type: "string",required: false},
            introduction: {type: "string",required: false},
            avatar_url: {type: "string",required: false}
        })
        const {body:getboyd} = ctx.request
        const res = await TopicSchema.findByIdAndUpdate(id,getboyd)
        if(res) {ctx.body = {status: 200,message: '修改成功'}}
    }
}
module.exports = new topciCtl()