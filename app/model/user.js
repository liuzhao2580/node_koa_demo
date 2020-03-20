const mongoose = require("mongoose")
const { Schema,model } = mongoose
/* 
新建一个用户，姓名是必填项，字符串类型
性别不是必填项,默认是0 代表男性
*/
const UserSchema = Schema({
    name: {type: String,required: true},
    password: {type: String, required: true,select: false},
    gender: {type: String,default: "0"},
    date: {type: Date,default: Date.now()}
})
module.exports = model("UserInfo_database", UserSchema)
