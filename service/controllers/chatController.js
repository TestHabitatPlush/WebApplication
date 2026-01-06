const {
  ChatRoom,
  ChatRoomMember,
  ChatMessage,
  MessageReaction,
} = require("../models");
const { Op } = require("sequelize");
const { getIO } = require("../utils/socket");

const createPrivateChat = async (req, res) => {
  try {
    const { receiverId, societyId } = req.body;
    const senderId = req.user.userId;

    let room = await ChatRoom.findOne({
      where: { type: "private", societyId },
      include: [{
        model: ChatRoomMember,
        where: { userId: [senderId, receiverId] },
      }],
    });

    if (!room) {
      room = await ChatRoom.create({
        societyId,
        type: "private",
        createdBy: senderId,
      });

      await ChatRoomMember.bulkCreate([
        { chatRoomId: room.chatRoomId, userId: senderId },
        { chatRoomId: room.chatRoomId, userId: receiverId },
      ]);
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const sendMessage = async (req, res) => {
  try {
    const msg = await ChatMessage.create({
      chatRoomId: req.params.chatRoomId,
      senderId: req.user.userId,
      message: req.body.message,
      replyToMessageId: req.body.replyToMessageId || null,
    });
    const io = getIO();
    io.to(`room_${req.params.chatRoomId}`).emit("receiveMessage", msg);

    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMessages = async (req, res) => {
  const messages = await ChatMessage.findAll({
    where: { chatRoomId: req.params.chatRoomId },
    order: [["createdAt", "ASC"]],
    include:[
      {
        model: ChatMessage,
        as : "replyTo",
        attributes:[
          "messageId",
          "message",
          "senderId",
          "createdAt"
        ]
      }
    ]
  });
  res.json(messages);
};
const editMessage = async (req, res) => {
  await ChatMessage.update(
    { message: req.body.message, editedAt: new Date() },
    {
      where: {
        messageId: req.params.messageId,
        senderId: req.user.userId,
      },
    }
  );

  const io = getIO();
  io.emit("messageEdited", {
    messageId: req.params.messageId,
    message: req.body.message,
  });

  res.json({ message: "Message edited" });
};

const deleteMessage = async (req, res) => {
  await ChatMessage.update(
    { isDeleted: true },
    { where: { messageId: req.params.messageId } }
  );

  const io = getIO();
  io.emit("messageDeleted", { messageId: req.params.messageId });

  res.json({ message: "Message deleted" });
};

const reactMessage = async (req, res) => {
  const reaction = await MessageReaction.create({
    messageId: req.params.messageId,
    userId: req.user.userId,
    reaction: req.body.reaction,
  });

  const io = getIO();
  io.emit("messageReaction", reaction);

  res.json({ message: "Reaction added" });
};

const markRead = async (req, res) => {
  await ChatMessage.update(
    { isRead: true },
    {
      where: {
        chatRoomId: req.params.chatRoomId,
        senderId: { [Op.ne]: req.user.userId },
      },
    }
  );
  res.json({ message: "Read updated" });
};

module.exports = {
  createPrivateChat,
  sendMessage,
  getMessages,
  editMessage,
  deleteMessage,
  reactMessage,
  markRead,
};
