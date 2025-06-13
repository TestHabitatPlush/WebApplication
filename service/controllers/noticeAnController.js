// const { Op } = require("sequelize");
// const { Notice, User, Role } = require("../models");
// const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

// exports.createNotice = async (req, res) => {
//   try {
//     console.log("Notice Announcement is working");
//     console.log(req.body);

//     const {
//       noticeHeading,
//       noticeDescription,
//       noticeExpireDate,
//       userGroupId,
//       societyId,
//       senderId,
//     } = req.body;

//     // Validate all required fields, including societyId
//     if (
//       !noticeHeading ||
//       !noticeDescription ||
//       !noticeExpireDate ||
//       !userGroupId ||
//       !societyId ||
//       !senderId
//     ) {
//       return sendErrorResponse(res, "Enter All Details", 400);
//     }

//     const result = await Notice.create(req.body);
//     // console.log(result);

//     return sendSuccessResponse(res, "Notice created successfully", result, 201);
//   } catch (err) {
//     console.error("Error creating notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.getNotice = async (req, res) => {
//   try {
//     console.log("notification get handler");
//     console.log(req.query);

//     const { disscussionheading = "", societyId, userGroupId } = req.query;

//     if (!societyId) {
//       return sendErrorResponse(res, "Enter Socity Id", 400);
//     }

//     //   pagination handler
//     const pagination = {
//       page: parseInt(req.query.page) || 0,
//       pageSize: parseInt(req.query.pageSize) || 10,
//     };
//     const whereClause = {};
//     if (disscussionheading) {
//       whereClause.noticeHeading = { [Op.like]: `%${disscussionheading}%` }; // Case-insensitive search
//     }
//     if (societyId) {
//       whereClause.societyId = societyId;
//     }
//     if (userGroupId) {
//       whereClause.userGroupId = userGroupId;
//     }

//     const { count, rows } = await Notice.findAndCountAll({
//       where: whereClause,
//       limit: pagination.pageSize,
//       offset: pagination.page * pagination.pageSize,
//     });
//     const totalPages = Math.ceil(count / pagination.pageSize);
//     res.status(200).json({
//       message: "Notice fetched successfully",
//       data: rows,
//       total: count,
//       totalPages,
//     });
//   } catch (err) {
//     console.error("Error creating notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.deleteNoticeById = async (req, res) => {
//   console.log("delete handler is called");
//   // console.log(req.params);
//   try {
//     const { noticeId } = req.params;
//     const notice = await Notice.findByPk(noticeId);
//     if (!notice) {
//       return res.status(404).json({ message: "Notice not found" });
//     }

//     await notice.destroy();
//     res.status(200).json({ message: "Notice deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting notice:", err);
//     return res
//       .status(500)
//       .json({ message: "Internal server error", details: err.message });
//   }
// };

// exports.updateNoticeById = async (req, res) => {
//   try {
//     const noticeId = req.params.noticeId;

//     // Perform the update operation using Sequelize
//     const [updatedRows] = await Notice.update(req.body, {
//       where: { noticeId },
//     });

//     // Log how many rows were updated
//     console.log("Number of updated rows:", updatedRows);

//     // Check if any rows were updated
//     if (updatedRows === 0) {
//       return res
//         .status(404)
//         .json({ error: "Notice not found or no changes were made." });
//     }

//     // Send a success response if updated
//     return res.status(201).json({ message: "Notice updated successfully." });
//   } catch (error) {
//     // Handle any errors during the update process
//     return res.status(400).json({ error: error.message });
//   }
// };


const { Notice, User, Role } = require("../models");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const { Op } = require("sequelize");

// CREATE NOTICE
const createNoticeByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      noticeHeading,
      noticeDescription,
      noticeExpireDate,
      userGroupId,
      societyId: inputSocietyId,
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    if (!noticeHeading || !noticeDescription || !noticeExpireDate || !userGroupId) {
      return sendErrorResponse(res, "Missing required fields", 400);
    }

    let societyIdToUse = null;

    if (["super_admin", "super_admin_it"].includes(role.roleCategory)) {
      societyIdToUse = inputSocietyId || null;
    } else if (["society_moderator", "management_committee"].includes(role.roleCategory)) {
      if (inputSocietyId && inputSocietyId.toString() !== user.societyId?.toString()) {
        return sendErrorResponse(res, "You can only create notice for your own society", 403);
      }
      societyIdToUse = user.societyId;
    } else {
      return sendErrorResponse(res, "You do not have permission to create notices", 403);
    }

    const notice = await Notice.create({
      noticeHeading,
      noticeDescription,
      noticeExpireDate,
      userGroupId,
      societyId: societyIdToUse,
      userId: user.userId,
    });

    return sendSuccessResponse(res, "Notice created successfully", notice, 201);
  } catch (err) {
    console.error("Error creating notice:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};


const createNoticeBySocietyId = async (req, res) => {
  try {
    const { userId, societyId } = req.params;
    const {
      noticeHeading,
      noticeDescription,
      noticeExpireDate,
      userGroupId,
    } = req.body;

    // Validate required fields
    if (!noticeHeading || !noticeDescription || !noticeExpireDate || !userGroupId) {
      return sendErrorResponse(res, "Missing required fields", 400);
    }

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    // Only allow society_moderator and management_committee
    if (!["society_moderator", "management_committee"].includes(role.roleCategory)) {
      return sendErrorResponse(res, "You do not have permission to create notices", 403);
    }

    // Ensure the user is creating a notice for their own society
    if (!user.societyId || user.societyId.toString() !== societyId) {
      return sendErrorResponse(res, "You can only create notice for your own society", 403);
    }

    const notice = await Notice.create({
      noticeHeading,
      noticeDescription,
      noticeExpireDate,
      userGroupId,
      societyId: user.societyId,
      userId: user.userId,
    });

    return sendSuccessResponse(res, "Notice created successfully", notice, 201);
  } catch (err) {
    console.error("Error creating notice:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};




// UPDATE NOTICE
const updateNoticeById = async (req, res) => {
  try {
    const { noticeId, userId } = req.params;
    const updateData = req.body;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    const notice = await Notice.findByPk(noticeId);
    if (!notice) return sendErrorResponse(res, "Notice not found", 404);

    const isSuperAdmin = ["super_admin", "super_admin_it"].includes(role.roleCategory);
    const isSameSocietyAdmin =
      ["society_moderator", "management_committee"].includes(role.roleCategory) &&
      notice.societyId?.toString() === user.societyId?.toString();

    if (isSuperAdmin || isSameSocietyAdmin) {
      await notice.update(updateData);
      return sendSuccessResponse(res, "Notice updated successfully", notice);
    }

    return sendErrorResponse(res, "You do not have permission to update this notice", 403);
  } catch (err) {
    console.error("Error updating notice:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// DELETE NOTICE
const deleteNoticeById = async (req, res) => {
  try {
    const { noticeId, userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    const notice = await Notice.findByPk(noticeId);
    if (!notice) return sendErrorResponse(res, "Notice not found", 404);

    const isSuperAdmin = ["super_admin", "super_admin_it"].includes(role.roleCategory);
    const isSameSocietyAdmin =
      ["society_moderator", "management_committee"].includes(role.roleCategory) &&
      notice.societyId?.toString() === user.societyId?.toString();

    if (isSuperAdmin || isSameSocietyAdmin) {
      await notice.destroy();
      return sendSuccessResponse(res, "Notice deleted successfully");
    }

    return sendErrorResponse(res, "You do not have permission to delete this notice", 403);
  } catch (err) {
    console.error("Error deleting notice:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// GET NOTICES
const getNotices = async (req, res) => {
  try {
    const { userId } = req.params;
    const { noticeHeading = "", userGroupId } = req.query;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    const whereClause = {};

    if (noticeHeading) {
      whereClause.noticeHeading = { [Op.like]: `%${noticeHeading}%` };
    }

    if (["super_admin", "super_admin_it"].includes(role.roleCategory)) {
      
    } else if (user.societyId) {
      whereClause.societyId = user.societyId; 
    }

    if (userGroupId) {
      whereClause.userGroupId = userGroupId;
    }

    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const { count, rows } = await Notice.findAndCountAll({
      where: whereClause,
      limit: pageSize,
      offset: page * pageSize,
      order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / pageSize);
    return sendSuccessResponse(res, "Notices fetched successfully", {
      data: rows,
      total: count,
      totalPages,
    });
  } catch (err) {
    console.error("Error fetching notices:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

module.exports = {
  createNoticeByUserId,
  createNoticeBySocietyId,
  updateNoticeById,
  deleteNoticeById,
  getNotices,
};
