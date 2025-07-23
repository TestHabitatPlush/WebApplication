const { DiscussionForum } = require("../models");
const upload = require("../middleware/upload");
const fs = require("fs");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

// Create discussion by society ID
const createDiscussionBySocietyId = async (req, res) => {
    upload.fields([{ name: 'document' }])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "File upload error", error: err.message });
        }

        try {
            const { discussionTitle, discussionDescription, userGroupId } = req.body;
            const { societyId } = req.params;

            if (!societyId) {
                return res.status(400).json({ message: "societyId is required" });
            }

            const documentPath = req.files?.document ? req.files.document[0].path : null;

            const newDiscussion = await DiscussionForum.create({
                societyId,
                discussionTitle,
                discussionDescription,
                userGroupId,
                document: documentPath
            });

            return res.status(201).json({ message: "Discussion created successfully", data: newDiscussion });
        } catch (err) {
            return res.status(500).json({ message: "Error creating discussion", error: err.message });
        }
    });
};

// Create discussion by user ID
const createDiscussionByUserId = async (req, res) => {
    upload.fields([{ name: 'document' }])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "File upload error", error: err.message });
        }

        try {
            const { discussionTitle, discussionDescription, userGroupId, societyId } = req.body;
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ message: "userId is required" });
            }

            const documentPath = req.files?.document ? req.files.document[0].path : null;

            const newDiscussion = await DiscussionForum.create({
                userId,
                societyId,
                discussionTitle,
                discussionDescription,
                userGroupId,
                document: documentPath
            });

            return res.status(201).json({
                message: "Discussion created successfully",
                data: newDiscussion
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error uploading discussion",
                error: err.message
            });
        }
    });
};

// Get discussions by society ID
const getDiscussionBySocietyId = async (req, res) => {
    try {
        const { societyId } = req.params;
        const discussions = await DiscussionForum.findAll({ where: { societyId } });

        if (!discussions.length) {
            return res.status(404).json({
                message: "No discussion found for this society"
            });
        }

        return res.status(200).json({
            message: "Discussions fetched successfully",
            data: discussions
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to fetch discussions",
            error: err.message
        });
    }
};

// Get discussions by user ID
const getDiscussionByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const discussions = await DiscussionForum.findAll({ where: { userId } });

        if (!discussions.length) {
            return res.status(404).json({
                message: "No discussion found for this user"
            });
        }

        return res.status(200).json({
            message: "Discussions fetched successfully",
            data: discussions
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to fetch discussions",
            error: err.message
        });
    }
};
// Update discussion by society ID
const updateDiscussionBySocietyId = async (req, res) => {
    upload.fields([{ name: 'document' }])(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "File upload error", error: err.message });

        try {
            const { discussionId } = req.params;
            const existingDoc = await DiscussionForum.findByPk(discussionId);

            if (!existingDoc) {
                return res.status(404).json({ message: "Discussion not found" });
            }

            const { discussionTitle, discussionDescription, userGroupId } = req.body;
            let document = existingDoc.document;

            if (req.files?.document) {
                if (document && fs.existsSync(document)) fs.unlinkSync(document);
                document = req.files.document[0].path;
            }

            await existingDoc.update({ discussionTitle, discussionDescription, userGroupId, document });

            return res.status(200).json({ message: "Discussion updated successfully", data: existingDoc });
        } catch (err) {
            return res.status(500).json({ message: "Failed to update discussion", error: err.message });
        }
    });
};

// Update discussion by user ID
const updateDiscussionByUserId = async (req, res) => {
    upload.fields([{ name: 'document' }])(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "File upload error", error: err.message });

        try {
            const { discussionId } = req.params;
            const existingDoc = await DiscussionForum.findByPk(discussionId);

            if (!existingDoc) {
                return res.status(404).json({ message: "Discussion not found" });
            }

            const { discussionTitle, discussionDescription, userGroupId } = req.body;
            let document = existingDoc.document;

            if (req.files?.document) {
                if (document && fs.existsSync(document)) fs.unlinkSync(document);
                document = req.files.document[0].path;
            }

            await existingDoc.update({ discussionTitle, discussionDescription, userGroupId, document });

            return res.status(200).json({ message: "Discussion updated successfully", data: existingDoc });
        } catch (err) {
            return res.status(500).json({ message: "Failed to update discussion", error: err.message });
        }
    });
};
const deleteDiscussion = async (req, res) => {
    try {
        const { discussionId } = req.params;
        const discussion = await DiscussionForum.findByPk(discussionId);

        if (!discussion) {
            return res.status(404).json({ message: "Discussion not found" });
        }

        // Delete the document file if it exists
        if (discussion.document && fs.existsSync(discussion.document)) {
            fs.unlinkSync(discussion.document);
        }

        await discussion.destroy();

        return res.status(200).json({
            message: "Discussion deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to delete discussion",
            error: err.message
        });
    }
};
//View data by Id
const getDiscussionById = async (req, res) => {
    try {
    
      const { discussionId } = req.params;
      const discussion = await DiscussionForum.findOne({ where: { discussionId } });
      
      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found" });
      }
  
      return res.status(200).json(discussion);
    } catch (err) {
      console.error("Error fetching Discussion by ID:", err);
      return res.status(500).json({ message: "Server error" });
    }
  };
module.exports = {
    createDiscussionBySocietyId,
    createDiscussionByUserId,
    getDiscussionBySocietyId,
    getDiscussionByUserId,
    updateDiscussionBySocietyId,
    updateDiscussionByUserId,
    deleteDiscussion,
    getDiscussionById
};
