const fs = require("fs")
module.exports = (app) => {
    const files = fs.readdirSync(__dirname)
    files.forEach(file => {
        if (file === "index.js") return
        const router = require(`./${file}`)
        app.use(router.routes()).use(router.allowedMethods())
    })
}