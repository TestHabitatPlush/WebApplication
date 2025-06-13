// const {
//   createNotice,
//   getNotice,
//   deleteNoticeById,
//   updateNoticeById,
// } = require("../controllers/noticeAnController");

// const noticeAnnouncementRouter = require("express").Router();

// noticeAnnouncementRouter.post("/", createNotice).get("/", getNotice);

// noticeAnnouncementRouter.delete("/:noticeId", deleteNoticeById);
// noticeAnnouncementRouter.put("/:noticeId", updateNoticeById);

// module.exports = noticeAnnouncementRouter;


const express = require("express");
const noticeAnnouncementRouter = express.Router();
const {
  createNoticeByUserId,
  createNoticeBySocietyId,
  updateNoticeById,
  deleteNoticeById,
  getNotices,
} = require("../controllers/noticeAnController");

// CREATE notice by userId
noticeAnnouncementRouter.post("/create/:userId", createNoticeByUserId);

noticeAnnouncementRouter.post('/create/:userId/:societyId', createNoticeBySocietyId);

// UPDATE notice by noticeId and userId
noticeAnnouncementRouter.put("/update/:noticeId/:userId", updateNoticeById);

// DELETE notice by noticeId and userId
noticeAnnouncementRouter.delete("/delete/:noticeId/:userId", deleteNoticeById);

// GET notices for a user with optional filters
noticeAnnouncementRouter.get("/list/:userId", getNotices);

module.exports = noticeAnnouncementRouter;
