/*
    2019/9/5
    users model
    ymcj
 */
const mongoose=require("../utils/db");
const Schema=mongoose.Schema;

//创建用户模型
const UserSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        set(value) {
            return require("bcryptjs").hashSync(value,10);
        }
    },
    email:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    },
    identity:{
        type:Number,
        default: 0
    }
});

module.exports=mongoose.model("User",UserSchema,"users");