const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name : {
       type : String,
       required : true
    },
    tel : String,
    sex : String,
    // date : { timestamps: true },
    birthday : String,
    date: { type: Date, default: Date.now },
    address : String,
    email : String,
    lineId : String,
    password : String
});

memberSchema.methods.hashPassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
}
memberSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}
memberSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
}
module.exports = mongoose.model("Member", memberSchema);
memberSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});

