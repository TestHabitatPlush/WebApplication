const { ChatRoomMember, ChatMessage } = require("../models");
const { getIO } = require("../utils/socket");

// ---------- ADMIN CHECK ----------
const isAdmin = async (chatRoomId, userId) => {
  return ChatRoomMember.findOne({
    where: { chatRoomId, userId, isAdmin: true },
  });
};

// ---------- KICK USER ----------
const kickUser = async (req, res) => {
  const { chatRoomId, userId } = req.params;

  if (!(await isAdmin(chatRoomId, req.user.userId))) {
    return res.status(403).json({ message: "Admin only" });
  }

  if (Number(userId) === req.user.userId) {
    return res.status(400).json({ message: "Admin cannot kick self" });
  }

  await ChatRoomMember.destroy({
    where: { chatRoomId, userId },
  });

  // 🔥 REAL-TIME EVENT
  const io = getIO();
  io.to(`room_${chatRoomId}`).emit("userKicked", { userId });

  res.json({ message: "User kicked" });
};

// ---------- BAN USER ----------
const banUser = async (req, res) => {
  const { chatRoomId, userId } = req.params;

  if (!(await isAdmin(chatRoomId, req.user.userId))) {
    return res.status(403).json({ message: "Admin only" });
  }

  await ChatRoomMember.update(
    { isBanned: true },
    { where: { chatRoomId, userId } }
  );

  // 🔥 REAL-TIME EVENT
  const io = getIO();
  io.to(`room_${chatRoomId}`).emit("userBanned", { userId });

  res.json({ message: "User banned" });
};

// ---------- PIN MESSAGE ----------
const pinMessage = async (req, res) => {
  const { chatRoomId, messageId } = req.params;

  if (!(await isAdmin(chatRoomId, req.user.userId))) {
    return res.status(403).json({ message: "Admin only" });
  }

  await ChatMessage.update(
    { isPinned: false },
    { where: { chatRoomId } }
  );

  await ChatMessage.update(
    { isPinned: true },
    { where: { messageId } }
  );

  // 🔥 REAL-TIME EVENT
  const io = getIO();
  io.to(`room_${chatRoomId}`).emit("messagePinned", { messageId });

  res.json({ message: "Message pinned" });
};

module.exports = { kickUser, banUser, pinMessage };
