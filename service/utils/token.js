const crypto = require('crypto');
const { Model } = require('sequelize');

const generateToken = () =>{
    const token = crypto.randomBytes(32).toString('hex');
    return token;
}

Model.exports = { generateToken };