const Product = require('../models/productModel');

// Get All Products
exports.getProducts = async (req, res) => {
    Product.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

// Get Products By ID
exports.getProductById = async (req, res) => {
    Product.findById(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getProductByPoster = async (req, res) => {
    
    Product.find({
        'poster.name': new RegExp(req.params.name)
    }) // { name: /xxxx/}
    .exec((err, result) => {
        res.status(200).json({
            msg: "Search OK",
            data: result
        });
    });
};


exports.getProductByRequest = async (req, res) => {
    
    Product.find({
        'poster.name': new RegExp(req.params.name)
    }) // { name: /xxxx/}
    .exec((err, result) => {
        res.status(200).json({
            msg: "Search OK",
            data: result
        });
    });
};



// Get PRoducts By Name
exports.getProductByName = async (req, res) => {
    // req.params.name
    Product.find({
            name: new RegExp(req.params.name)
        }) // { name: /xxxx/}
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

// Add Product
exports.addProduct = async (req, res) => {
    // let mongoose add a new product document
    try {
        //กำหนดค่า product ที่ต้องการเพิ่ม
        let product = new Product({
            name: req.body.name,
            details : req.body.details,
            img : req.body.img,
            poster : {
                name : req.body.postName,
                email : req.body.postEmail,
                tel : req.body.postTel
            },
            productStatus : req.body.productStatus,
            category : {
                name : req.body.categoryname
            }
        });
        let createdProduct = await product.save();
        res.status(200).json({
            msg: "Add a product complete.",
            data: createdProduct
        });
    } catch (err) {
        // เมื่อเกิด error จะส่ง error message ออกไปด้วย
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

// Put Products
exports.editWholeProduct = async (req, res) => {
    let product = {  //ข้อมูลใหม่
        name: req.body.name,
        category: req.body.category,
        details: req.body.details,
        img : req.body.img
    };
    Product.findByIdAndUpdate(req.params.id, product)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
        .exec((err, result) => {
            // findById อีกครั้งเพื่อเอา data ใหม่
            Product.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

// Patch Products
exports.editProduct = async (req, res) => {
    let traderRequest = {
        $push: {
            traderRequest :{
                requester : {
                    requestName : req.body.requestName,
                    requestEmail: req.body.requestEmail,
                    requestTel : req.body.requestTel
                },
                itemToTrade : {
                    itemName : req.body.itemName,
                    itemDetails : req.body.itemDetails,
                    img : req.body.img
                }
            }
        }
    };
    Product.findByIdAndUpdate(req.params.id, traderRequest)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
        .exec((err, result) => {
            // findById อีกครั้งเพื่อเอา data ใหม่
            Product.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

exports.editRequest = async (req, res) => {
    let query = {
        _id : req.params.id,
        "traderRequest._id": req.body._id
    }
    let traderRequest = {
        $set: {
            "traderRequest.$.requestDated.status":req.body.status
        }
    };
    Product.updateOne(query , traderRequest)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
        .exec((err, result) => {
            // findById อีกครั้งเพื่อเอา data ใหม่
            Product.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

// Delete Products
exports.deleteProduct = async (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Delete OK"
            });
        });

};

exports.deleteRequest = async (req, res) => {
    Product.updateOne({
        _id:req.params.id
        
    },{
        $pull:{traderRequest:{_id:req.body._id}}
    })
    .exec((err, result) => {
        Product.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
    })
    // Product.findByIdAndDelete(req.params.id)
        

};