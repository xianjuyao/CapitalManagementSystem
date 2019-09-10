//权限认证
const jwt = require("jsonwebtoken");
const user = require("../modals/User");
module.exports=async (req, res, next) => {
    try {
        const token = String(req.headers.authorization || "").split(' ').pop();
        if (!token) {
            return res.status(401).json({
                status:false,
            });
        }
            const {id} = jwt.verify(token, require("./secret.js").secretKey);
            req.currentUser=await user.findById(id);
            if (req.currentUser){//如果用户存在就去下一个函数处理
                next();
            }
        if (!user) {
            return res.status(401).json({
                status:false,
            });
        }
    } catch (e) {
        return res.status(401).json({
            status:false,
        });
    }
};