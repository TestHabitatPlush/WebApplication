const {
  createNotice,
  getNotice,
  deleteNoticeById,
  updateNoticeById,
} = require("../controllers/noticeAnController");

const noticeAnnouncementRouter = require("express").Router();

noticeAnnouncementRouter.post("/", createNotice).get("/", getNotice);

noticeAnnouncementRouter.delete("/:noticeId", deleteNoticeById);
noticeAnnouncementRouter.put("/:noticeId", updateNoticeById);

module.exports = noticeAnnouncementRouter;



// const express = require("express");
// const noticeAnnouncementRouter = express.Router();

// const {
//   createByUserId,             
//   createNotice,               
//   getNoticesForSuperAdmin,    
//   getNotice,                  
//   getNoticeById,              
//   updateNoticeById,           
//   deleteNoticeById,           
// } = require("../controllers/noticeAnController");

// // Super Admin: Create a notice (no societyId)
// noticeAnnouncementRouter.post("/superadmin/:userId", createByUserId);

// // Admin: Create a society-based notice
// noticeAnnouncementRouter.post("/", createNotice);

// // Super Admin: Get global notices (societyId null)
// noticeAnnouncementRouter.get("/superadmin", getNoticesForSuperAdmin);

// // Admin: Get society-based notices
// noticeAnnouncementRouter.get("/", getNotice);

// // Get single notice by ID
// noticeAnnouncementRouter.get("/:noticeId", getNoticeById);

// // Update notice
// noticeAnnouncementRouter.put("/:noticeId", updateNoticeById);

// // Delete notice
// noticeAnnouncementRouter.delete("/:noticeId", deleteNoticeById);

// module.exports = noticeAnnouncementRouter;
