const jwt = require("jsonwebtoken")
const User = require("../model/user")
const {token_secret} = require("../config")
module.exports = {
    async post_login(ctx) {
        const user = await User.findOne(ctx.request.body)
        if(!user) {
            ctx.throw(404,"用户名或密码不对")
        }
        const {_id,name} = user
        let token
        try {
            token = jwt.sign({_id,name}, token_secret,{expiresIn: "1h"})
        } catch (error) {
            token = error
        }
        ctx.body = {token}
    }
}