const express = require("express");
const familyRouter = express.Router();
const familyController = require("../controllers/userFamilyController.js");
const { checkAuth } = require("../middleware/authMiddleware"); 

familyRouter.post("/create", checkAuth, familyController.createMemberBySocietyId);
familyRouter.get("/", checkAuth, familyController.getMembersByOwner);
familyRouter.put("/:familyMemberId", checkAuth, familyController.updateMember);
familyRouter.delete("/:familyMemberId", checkAuth, familyController.deleteMember);
familyRouter.get("/myunits/members",checkAuth,familyController.getMyUnitMembers);
//  familyRouter.get( "/my-units/members",checkAuth,familyController.getMyUnitMembersGrouped);
  

module.exports = familyRouter;
