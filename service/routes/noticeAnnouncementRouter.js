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
<<<<<<< HEAD
} = require("../controllers/noticeController");
=======
} = require("../controllers/noticeAnController");
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6

router.post("/create/:societyId/:userId", createNoticeBySocietyId);
router.get("/get/:societyId/:userId", getNoticesBySocietyId);
router.post("/create/:userId", createNoticeByUserId);
router.get("/user/:userId", getNoticesByUserId);
router.put("/update/:noticeId", updateNoticeById);
router.delete("/delete/:noticeId", deleteNoticeById);

module.exports = router;
