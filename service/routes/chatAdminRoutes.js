const router = require("express").Router();
const adminCtrl = require("../controllers/chatAdminController");
const { checkAuth } = require("../middleware/authMiddleware");

router.delete("/group/:chatRoomId/kick/:userId", checkAuth, adminCtrl.kickUser);
router.put("/group/:chatRoomId/ban/:userId", checkAuth, adminCtrl.banUser);
router.put("/group/:chatRoomId/pin/:messageId", checkAuth, adminCtrl.pinMessage);

module.exports = router;
