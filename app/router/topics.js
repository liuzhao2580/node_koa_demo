const Router = require("koa-router")
const router = new Router()
const topciCtl = require("../controller/topics")
router.get("/topic", topciCtl.get_Alltopic)
router.get("/topic/:id", topciCtl.get_topicById)
router.post("/topic", topciCtl.post_insertTopic)
router.delete("/topic/:id", topciCtl.delete_topic)
router.patch("/topic/:id", topciCtl.patch_topic)

module.exports = router