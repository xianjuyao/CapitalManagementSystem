/*
    2019/9/5
    profile model
    ymcj
 */
const mongoose=require("../utils/db");
const Schema=mongoose.Schema;

//创建模型
const ProfileSchema=new Schema({
    //类型
    type:{
      type:String,
    },
    description:{
        type:String,
    },
    income:{
        type:Number,
        required:true,
    },
    expend:{
        type:Number,
        required:true,
    },
    cash:{
        type:Number,
        required:true
    },
    remark:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    },
});

module.exports=mongoose.model("Profile",ProfileSchema,"profiles");