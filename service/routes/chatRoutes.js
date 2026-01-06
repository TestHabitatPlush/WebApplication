const router = require("express").Router();
const chatCtrl = require("../controllers/chatController");
const { checkAuth } = require("../middleware/authMiddleware");

router.post("/private", checkAuth, chatCtrl.createPrivateChat);
router.post("/:chatRoomId/message", checkAuth, chatCtrl.sendMessage);
router.get("/:chatRoomId/messages", checkAuth, chatCtrl.getMessages);
router.put("/message/:messageId", checkAuth, chatCtrl.editMessage);
router.delete("/message/:messageId", checkAuth, chatCtrl.deleteMessage);
router.post("/message/:messageId/react", checkAuth, chatCtrl.reactMessage);
router.put("/:chatRoomId/read", checkAuth, chatCtrl.markRead);

module.exports = router;
