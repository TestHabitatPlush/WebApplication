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
