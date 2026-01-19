
const express = require("express");
const router = express.Router();

const {
  createNoticeByUserId,
  createNoticeBySocietyId,
  getNoticesBySocietyId,
  getNoticesByUserId,
  updateNoticeById,
  deleteNoticeById,
} = require("../controllers/noticeController");

router.post("/create/:societyId/:userId", createNoticeBySocietyId);
router.get("/get/:societyId/:userId", getNoticesBySocietyId);
router.post("/create/:userId", createNoticeByUserId);
router.get("/user/:userId", getNoticesByUserId);
router.put("/update/:noticeId", updateNoticeById);
router.delete("/delete/:noticeId", deleteNoticeById);

module.exports = router;
