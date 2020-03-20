const Router = require("koa-router")
const router = new Router()
const login = require("../controller/login")
router.post("/login", login.post_login)

module.exports = router