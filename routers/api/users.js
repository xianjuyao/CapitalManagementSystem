/*
    2019/9/5
    login and register
    ymcj
 */
const express = require("express");
const router = express.Router();
const User = require("../../modals/User");
const jwt = require("jsonwebtoken");
const auth = require("../../utils/auth");
const multer = require("multer");
const path = require("path");
const upload = multer({dest: path.join(__dirname, "../../uploads")});

/*
    url:/api/users/register
    type:POST
    description: 注册接口
 */
router.post("/register", async (req, res) => {
    let user = null;
    //查询数据库中是否有该用户名
    user = await User.findOne({username: req.body.username});
    if (user) {//如果用户名存在
        return res.json({
            status: false,
            msg: "用户名已被注册!"
        });
    }
    user = null;//置空
    //查询数据库中是否有邮箱
    user = await User.findOne({email: req.body.email});
    if (user) {//如果邮箱存在
        return res.json({
            status: false,
            msg: "邮箱已被注册!"
        });
    }
    //设置默认的头像
    req.body.avatar = require("../../utils/avatarUrl.js");
    //保存数据
    User.create(req.body)
        .then(user => {
            res.json({
                status: true,
                msg: "注册成功!"
            });
        })
        .catch(err => console.log(err));
});

/*
     url:/api/users/login
     type:POST
     description: 登录接口
     result:token  jwt passport
  */
router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email});//查询邮箱是否存在
    if (!user) {
        return res.json({status: false, msg: "邮箱不存在!"});
    }
    //密码匹配
    try {
        const isVaild = require("bcryptjs").compareSync(password, user.password);
        if (!isVaild) {//密码验证失败
            return res.json({
                status: false,
                msg: "密码错误!"
            });
        }
        //登录成功
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            identity: user.identity
        }, require("../../utils/secret").secretKey, {expiresIn: 3600});
        res.json({
            status: true,
            msg: "登录成功!",
            token: token
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            msg: e
        });
    }
});


/*
    url:/api/users/current
    type:GET
    description: return  current user info
 */

router.get("/current", auth, async (req, res) => {
    res.json({
        status: true,
        id: req.currentUser._id,
        username: req.currentUser.username,
        avatar: req.currentUser.avatar,
        email: req.currentUser.email,
        identity: req.currentUser.identity
    });
});


//图片上传
router.post("/uploads", auth, upload.single("file"), async (req, res) => {
    const file = req.file;
    file.url = `http://127.0.0.1:8888/public/${file.filename}`;
    res.send(file);
});

//更新用户信息
router.put("/update", auth, async (req, res) => {
    let user = {};
    if (req.body.username) {
        user.username = req.body.username;
    }
    if (req.body.avatar) {
        user.avatar = req.body.avatar;
    }
    if (req.body.password) {
        user.password = req.body.password;
    }
    const result = await User.findByIdAndUpdate(req.body.id, user);
    console.log(result);
    if (!result) {
        return res.json({
            status: false,
            msg: "更新失败!"
        });
    }
    res.json({
        status: true,
        msg: "更新成功!"
    });
});

module.exports = router;
