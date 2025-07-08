const express = require("express");
const discussionRouter = express.Router();
const discussionController = require("../controllers/discussion_forum_Controller");

discussionRouter.post("/society/:societyId", discussionController.createDiscussionBySocietyId);
discussionRouter.post("/user/:userId",discussionController.createDiscussionByUserId);

discussionRouter.get("/society/:societyId",discussionController.getDiscussionBySocietyId);
discussionRouter.get("/user/:userId",discussionController.getDiscussionByUserId);

<<<<<<< HEAD
discussionRouter.get("/:discussionId",discussionController.getDiscussionById);

=======
>>>>>>> e2eb08a5aec9899dc858dd234d25cf2815fa6384
discussionRouter.put("/society/:discussionId",discussionController.updateDiscussionBySocietyId);
discussionRouter.put("/user/:discussionId",discussionController.updateDiscussionByUserId);

discussionRouter.delete("/:discussionId",discussionController.deleteDiscussion);

<<<<<<< HEAD


=======
>>>>>>> e2eb08a5aec9899dc858dd234d25cf2815fa6384
module.exports = discussionRouter;