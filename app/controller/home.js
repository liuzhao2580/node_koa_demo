class homeCtl {
    get_index(ctx) {
        ctx.body = "hello world"
    }
}

module.exports = new homeCtl()