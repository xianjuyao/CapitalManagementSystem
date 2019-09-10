/*
    time:2019/9/4
    description:项目启动文件
    author:ymcj
 */
const express=require("express");//导入express
const app=express();//实例化express
const users=require("./routers/api/users");//用户登录注册功能模块
const profile=require("./routers/api/profiles");
const bodyParser=require("body-parser");
const path=require("path");
//开放静态资源
app.use("/public/",express.static(path.join(__dirname,"./uploads")));

//使用body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.use(require("cors")());//解决跨域问题
app.use("/api/users",users);
app.use("/api/profiles",profile);



//监听8888端口
app.listen(8888,()=>{
    console.log("server is running at http://127.0.0.1:8888");
});




