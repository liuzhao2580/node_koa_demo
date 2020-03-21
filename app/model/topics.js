const monoose = require("mongoose")

const { Schema,model } = monoose
const topicShcema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    // 话题的名称
    name: {
        type: String,
        required: true
    },
    // 话题图片
    avatar_url: {
        type: String
    },
    // 话题简介
    introduction: {
        type: String,
        select: false
    }
})

module.exports = model("TopicInfo_database", topicShcema)