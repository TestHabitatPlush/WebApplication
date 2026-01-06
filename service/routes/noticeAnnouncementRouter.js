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
const router = express.Router();

const {
  createNoticeByUserId,
  createNoticeBySocietyId,
  getNoticesBySocietyId,
  getNoticesByUserId,
  updateNoticeById,
  deleteNoticeById,
} = require("../controllers/noticeAnController");

router.post("/create/:societyId/:senderId", createNoticeBySocietyId);
router.get("/get/:societyId/:userId", getNoticesBySocietyId);
router.post("/create/:senderId", createNoticeByUserId);
router.get("/user/:userId", getNoticesByUserId);
router.put("/update/:noticeId", updateNoticeById);
router.delete("/delete/:noticeId", deleteNoticeById);

module.exports = router;

