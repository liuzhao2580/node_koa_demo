module.exports = {
    token_secret: "node_koa_project",
    mongoDB_USER_STR: "mongodb+srv://root:root@cluster0-qzqaj.mongodb.net/test?retryWrites=true&w=majority",
    check_ID(ctx,id) {
        if(id.length != 24) ctx.throw(400,"用户ID输入长度为24位")
    },
    // 显示隐藏的 select
    show_select(ctx) {
        const { fields } = ctx.query
        let select_field
        if(fields) {
            const RUL_str = fields.split(";").filter(f => f).map(item => ` +${item}`).join("")
            select_field = RUL_str
        }
        return select_field
    },
    // 设置分页
    set_page(ctx) {
        console.log(ctx.query)
    }
}