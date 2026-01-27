const {getAdminAccess} = require("../services/adminAccessService.js");

const resolveAdmin = async (req,res,next)=>{
if (!req.user?.userId || !req.user?.societId){
    req.user.isAdmin = false;
    return next();
}
const adminAccess = await getAdminAccess({
    userId:req.userId,
    societyId:req.user.societyId
});
if(adminAccess){
    req.user.isAdmin = true;
    req.user.adminType = adminAccess.accessType;
} else{
    req.user.isAdmin = false;
}
next();
}

module.exports = {resolveAdmin};