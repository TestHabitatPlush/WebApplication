const express = require("express");
const discussionRouter = express.Router();
const discussionController = require("../controllers/discussion_forum_Controller");

discussionRouter.post("/society/:societyId", discussionController.createDiscussionBySocietyId);
discussionRouter.post("/user/:userId",discussionController.createDiscussionByUserId);

discussionRouter.get("/society/:societyId",discussionController.getDiscussionBySocietyId);
discussionRouter.get("/user/:userId",discussionController.getDiscussionByUserId);

discussionRouter.put("/society/:discussionId",discussionController.updateDiscussionBySocietyId);
discussionRouter.put("/user/:discussionId",discussionController.updateDiscussionByUserId);

discussionRouter.delete("/:discussionId",discussionController.deleteDiscussion);

module.exports = discussionRouter;