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
const noticeController = require("../controllers/noticeAnController");

router.post("/society/:societyId/user/:userId", noticeController.createNoticeBySocietyId);
router.post("/user/:userId", noticeController.createNoticeByUserId);
router.put("/:noticeId/user/:userId", noticeController.updateNoticeById);
router.delete("/:noticeId/user/:userId", noticeController.deleteNoticeById)
router.get("/society/:societyId/user/:userId", noticeController.getNoticesBySocietyId);
router.get("/user/:userId", noticeController.getNoticesByUserId);

module.exports = router;
