const Category = require('../models/categoryModel');
const req = require("express/lib/request");
const res = require('express/lib/response');

exports.getCategory = async (req, res) => {
    Category.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getCategoryById = async (req, res) => {
    Category.findById(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getCategoryByName = async (req, res) => {
     req.params.name
    Category.find({
            name: new RegExp(req.params.name)
        }) // { name: /xxxx/}
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

 exports.addCategory= async (req,res)=>{
     try{
      
             let category = new Category({
                 categoryId : req.body.categoryId,
                 name:req.body.name
             });
             let createdCategory = await category.save();
             res.status(200).json({
                 msg:"Category Success.",
                 data:createdCategory
             });
         }catch(err){
             console.log(err);
             res.status(500).json({
                 error:err
             });
         }
     };

exports.editCetegory = async (req, res) => {
        let category = {  //ข้อมูลใหม่
            categoryId: req.body.categoryId,
            name : req.body.name
        };
        Category.findByIdAndUpdate(req.params.id, category)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
            .exec((err, result) => {
                // findById อีกครั้งเพื่อเอา data ใหม่
                Category.findById(req.params.id)
                    .exec((err, result) => {
                        res.status(200).json({
                            msg: "OK",
                            data: result
                        });
                    });
            });
};

exports.deleteCategory = async (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Delete OK"
            });
        });

};
