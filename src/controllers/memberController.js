const req = require("express/lib/request");
const res = require("express/lib/response");
const Member = require('../models/memberModel');


exports.getMembers = async (req, res) => {
    Member.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getMemberById = async (req, res) => {
    Member.findById(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getMemberByName = async (req, res) => {
    // let memberName = req.params.name;
    // req.params.name
    Member.find({
            name: new RegExp(req.params.name)
        }) // { name: /xxxx/}
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};
            
exports.addMember= async (req,res)=>{
    try{
            let member = new Member({
                email:req.body.email,
                password:req.body.password,
                name:req.body.name,
                tel:req.body.tel,
                lineId:req.body.lineId,
                sex:req.body.sex,
                address:req.body.address,
                birthday:req.body.birthday
            });
            member.password = await member.hashPassword(req.body.password);
            let createdMember = await member.save();

            res.status(200).json({
                msg:"Register Success.",
                data:createdMember
            });
        }catch(err){
            console.log(err);
            res.status(500).json({
                error:err
            });
        }
    };

exports.editWholeMember = async (req, res) => {
        let member = {  //ข้อมูลใหม่
            name: req.body.name,
            tel: req.body.tel,
            sex: req.body.sex,
            birthday: req.body.birthday,
            address: req.body.address,
            email: req.body.email,
            lineId : req.body.lineId
        };
        Member.findByIdAndUpdate(req.params.id, member)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
            .exec((err, result) => {
                // findById อีกครั้งเพื่อเอา data ใหม่
                Member.findById(req.params.id)
                    .exec((err, result) => {
                        res.status(200).json({
                            msg: "OK",
                            data: result
                        });
                    });
            });
};

exports.login = async (req, res) => {
    const login = {
        email : req.body.email,
        password : req.body.password
    }
    try {
        let member = await Member.findOne({
            email:login.email
        });
        // console.log(user);
        //check if user exit
        if (!member) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
        let match = await member.compareUserPassword(login.password, member.password);
        if (match) {
            let token = await member.generateJwtToken({
                member
            }, "secret", {
                expiresIn: 604800
            })

            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: member
                })
            }
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Detaisdwsddddwls"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}

    
exports.deleteMember = async (req, res) => {
        Member.findByIdAndDelete(req.params.id)
            .exec((err, result) => {
                res.status(200).json({
                    msg: "Delete OK"
                });
            });
    
};
    
