const mongoose = require("mongoose")
const {
    Schema,
    model
} = mongoose
/* 
新建一个用户，姓名是必填项，字符串类型
性别不是必填项,默认是0 代表男性
*/
const UserSchema = Schema({
    // 姓名
    name: {
        type: String,
        required: true
    },
    // 密码 select ：false 指定该用户在查询的时候不显示
    password: {
        type: String,
        required: true,
        select: false
    },
    // 性别 默认为男性
    gender: {
        type: String,
        default: "0"
    },
    // 日期 默认为当前时间
    date: {
        type: Date,
        default: Date.now()
    },
    // 用户头像地址
    avatar_url: {
        type: String,
        select: false
    },
    // 用户长居地址 指定地址传递的是一个数组，数组里面的元素是字符串
    locations: {
        type: [{
            type: String
        }],
        select: false
    },
    // 指定传递的数据是一个数组，数组中又是对象，指定对象的值为字符串
    educations: {
        type: [{
            school: {
                type: String
            },
            // 入校时间
            admission: {
                type: Number
            },
            // 毕业时间
            graduction: {
                type: Number
            }
        }],
        select: false
    },
    // 用户的关注
    follow : {
        type: [{ type: Schema.Types.ObjectId, ref: 'UserInfo_database' }],
        select: false
    }
})
module.exports = model("UserInfo_database", UserSchema)