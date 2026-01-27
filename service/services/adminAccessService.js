const {UserAdminAccess} = require("../models");

const getAdminAccess = async ({userId, societyId}) =>{
    if(!userId || !societyId) return null;

    return UserAdminAccess.findOne({
        where:{
            userId,
            societyId,
            status:"active",
        }
    })
} 

module.exports = { getAdminAccess};