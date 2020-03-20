const Router = require("koa-router")
const router = new Router()
const homeCtl = require("../controller/home")
router.get("/", homeCtl.get_index)

module.exports = router