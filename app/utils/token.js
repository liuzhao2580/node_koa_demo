const jwt = require("jsonwebtoken")
module.exports = {
    async set_token(payload,secret,expiresIn = "1h") {
        let token
        try {
            token = await jwt.sign(payload,secret,expiresIn)
        } catch (error) {
            token = await error
        }
        console.log(token)
        return token
    },
    verify_token() {

    }
}