/*
    2019/9/6
    资金管理模块
    ymcj
 */
const express = require("express");
const router = express.Router();
const auth = require("../../utils/auth");
const Profile = require("../../modals/Profile");

/*
    url:/api/profiles/create
    type:GET
    description: 创建信息接口
 */
router.post("/create", auth, async (req, res) => {
    const profile = {};
    if (req.body.type) profile.type = req.body.type;
    if (req.body.description) profile.description = req.body.description;
    if (req.body.income) profile.income = req.body.income;
    if (req.body.expend) profile.expend = req.body.expend;
    if (req.body.remark) profile.remark = req.body.remark;
    if (req.body.cash) profile.cash = req.body.cash;
    const result = await Profile.create(profile);
    if (result) {
        return res.json({
            status: true,
            profile: result
        });
    }
    res.json({
        status: false,
        msg: "保存失败!"
    });
});
/*
    url:/api/profiles/
    type:GET
    description: 获取所有信息接口
 */
router.get("/", auth, async (req, res) => {
    try {
        const result = await Profile.find();
        if (!result) {
            return res.status(404).json({
                status: false,
                msg: "没有任何内容!"
            });
        }
        res.json({
            status:true,
            data:result
        });
    } catch (e) {
        res.status(500).json({
            status: false,
            msg: e.toString()
        });
    }
});


/*
    url:/api/profiles/:id
    type:GET
    description: 获取单个信息接口
 */
router.get("/:id", auth, async (req, res) => {
    try {
        const result = await Profile.findById(req.params.id);
        if (!result) {
            return res.status(404).json({
                status: false,
                msg: "没有任何内容!"
            });
        }
        res.json(result);
    } catch (e) {
        res.status(500).json({
            status: false,
            msg: e.toString()
        });
    }
});
/*
    url:/api/profiles/update/:id
    type:PUT
    description: 编辑信息接口
 */
router.put("/update/:id", auth, async (req, res) => {
    const profile = {};
    if (req.body.type) profile.type = req.body.type;
    if (req.body.description) profile.description = req.body.description;
    if (req.body.income) profile.income = req.body.income;
    if (req.body.expend) profile.expend = req.body.expend;
    if (req.body.remark) profile.remark = req.body.remark;
    if (req.body.cash) profile.cash = req.body.cash;
    const result = await Profile.findByIdAndUpdate(req.params.id, profile);
    if (result) {
        return res.json({
            status: true,
            profile: result
        });
    }
    res.json({
        status: false,
        msg: "更新失败!"
    });
});

/*
    url:/api/profiles/delete/:id
    type:DELETE
    description: 删除信息接口
 */
router.delete("/delete/:id", auth, async (req, res) => {
    const result = await Profile.findByIdAndDelete(req.params.id);
    if (result) {
        return res.json({
            status: true,
            profile: result
        });
    }
    res.status(500).json({
        status: false,
        msg: "删除失败!"
    });
});


module.exports = router;