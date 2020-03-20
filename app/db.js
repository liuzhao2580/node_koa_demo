const mongoose = require("mongoose")
const {
    mongoDB_USER_STR
} = require("./config")
module.exports = () => {
    // 连接 MongoDB 数据库
    mongoose.connect(mongoDB_USER_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log("连接MongoDB成功"))
    const mongoDB = mongoose.connection
    mongoDB.on("error", console.error)
}