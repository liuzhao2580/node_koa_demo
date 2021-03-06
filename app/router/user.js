const Router = require("koa-router")
const koa_jwt = require("koa-jwt")
const router = new Router()
const userCtl = require("../controller/user")
const {token_secret} = require("../config")
const user_token = koa_jwt({secret:token_secret})
router.get("/user", userCtl.get_query)
router.post("/user", userCtl.post_insert)
router.get("/user/:id",userCtl.isExisted,userCtl.get_queryById)
router.patch("/user/:id",user_token, userCtl.checkOwn, userCtl.patch_updata)
router.delete("/user/:id",user_token, userCtl.checkOwn, userCtl.delete_del)
router.post("/userUpload", userCtl.post_userUpload)
// 获取关注列表
router.get("/:id/follow", userCtl.isExisted, userCtl.get_listFollow)
// 关注
router.put("/follow/:id", user_token, userCtl.put_follow)
// 取消关注
router.delete("/follow/:id", user_token, userCtl.delete_unfollow)

module.exports = router