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
  getNoticesByUserId,
  getNoticeBySocietyId,
} = require("../controllers/noticeAnController");

noticeAnnouncementRouter.post("/create/:userId", createNoticeByUserId);
noticeAnnouncementRouter.post('/create/:userId/:societyId', createNoticeBySocietyId);
noticeAnnouncementRouter.put("/update/:noticeId/:userId", updateNoticeById);
noticeAnnouncementRouter.delete("/delete/:noticeId/:userId", deleteNoticeById);
noticeAnnouncementRouter.get("/:userId", getNoticesByUserId);
noticeAnnouncementRouter.get("/society/:societyId", getNoticeBySocietyId);


module.exports = noticeAnnouncementRouter;
