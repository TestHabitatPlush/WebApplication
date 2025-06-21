// const { Notice } = require("../models");
const { Op } = require("sequelize");
const { Notice } = require("../models");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

// exports.createNotice = async (req, res) => {
//   try {
//     console.log("Notice Announcement is working");
//     const { noticeHeading, noticeDescription, noticeExpireDate, userGroupId } =
//       req.body;
//     if (
//       !noticeHeading ||
//       !noticeDescription ||
//       !noticeExpireDate ||
//       !userGroupId
//     ) {
//       return sendErrorResponse(res, "Enter All Details", 400);
//     }

//     const result = await Notice.create(req.body);
//     return sendSuccessResponse(res, "Notice created successfully", result, 201);
//   } catch (err) {
//     console.error("Error creating building:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

exports.createNotice = async (req, res) => {
  try {
    console.log("Notice Announcement is working");
    console.log(req.body);

    const {
      noticeHeading,
      noticeDescription,
      noticeExpireDate,
      userGroupId,
      societyId,
      senderId,
    } = req.body;

    // Validate all required fields, including societyId
    if (
      !noticeHeading ||
      !noticeDescription ||
      !noticeExpireDate ||
      !userGroupId ||
      !societyId ||
      !senderId
    ) {
      return sendErrorResponse(res, "Enter All Details", 400);
    }

    const result = await Notice.create(req.body);
    // console.log(result);

    return sendSuccessResponse(res, "Notice created successfully", result, 201);
  } catch (err) {
    console.error("Error creating notice:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.getNotice = async (req, res) => {
  try {
    console.log("notification get handler");
    console.log(req.query);

    const { disscussionheading = "", societyId, userGroupId } = req.query;

    if (!societyId) {
      return sendErrorResponse(res, "Enter Socity Id", 400);
    }

    //   pagination handler
    const pagination = {
      page: parseInt(req.query.page) || 0,
      pageSize: parseInt(req.query.pageSize) || 10,
    };
    const whereClause = {};
    if (disscussionheading) {
      whereClause.noticeHeading = { [Op.like]: `%${disscussionheading}%` }; // Case-insensitive search
    }
    if (societyId) {
      whereClause.societyId = societyId;
    }
    if (userGroupId) {
      whereClause.userGroupId = userGroupId;
    }

    const { count, rows } = await Notice.findAndCountAll({
      where: whereClause,
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
    });
    const totalPages = Math.ceil(count / pagination.pageSize);
    res.status(200).json({
      message: "Notice fetched successfully",
      data: rows,
      total: count,
      totalPages,
    });
  } catch (err) {
    console.error("Error creating notice:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.deleteNoticeById = async (req, res) => {
  console.log("delete handler is called");
  // console.log(req.params);
  try {
    const { noticeId } = req.params;
    const notice = await Notice.findByPk(noticeId);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    await notice.destroy();
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (err) {
    console.error("Error deleting notice:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", details: err.message });
  }
};

exports.updateNoticeById = async (req, res) => {
  try {
    const noticeId = req.params.noticeId;

    // Perform the update operation using Sequelize
    const [updatedRows] = await Notice.update(req.body, {
      where: { noticeId },
    });

    // Log how many rows were updated
    console.log("Number of updated rows:", updatedRows);

    // Check if any rows were updated
    if (updatedRows === 0) {
      return res
        .status(404)
        .json({ error: "Notice not found or no changes were made." });
    }

    // Send a success response if updated
    return res.status(201).json({ message: "Notice updated successfully." });
  } catch (error) {
    // Handle any errors during the update process
    return res.status(400).json({ error: error.message });
  }
};




// const { Notice, User, Role } = require("../models");
// const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");

// // Create Notice by Society ID (Admin/Moderator)
// const createNoticeBySocietyId = async (req, res) => {
//   try {
//     const { societyId, userId } = req.params;
//     const {
//       noticeHeading,
//       noticeDescription,
//       noticeExpireDate,
//       visibilityOption,
//     } = req.body;

//     if (
//       !societyId ||
//       !userId ||
//       !noticeHeading ||
//       !noticeDescription ||
//       !noticeExpireDate ||
//       !visibilityOption
//     ) {
//       return sendErrorResponse(res, "Missing required fields", 400);
//     }

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "Role not found", 404);

//     if (user.societyId?.toString() !== societyId.toString()) {
//       return sendErrorResponse(
//         res,
//         "You can only create notices for your own society",
//         403
//       );
//     }

//     const allowedRoles = ["society_moderator", "management_committee"];
//     if (!allowedRoles.includes(role.roleCategory)) {
//       return sendErrorResponse(res, "Permission denied", 403);
//     }

//     const visibilityMap = {
//       owner: ["society_owner", "society_owner_family"],
//       tenant: ["society_tenant", "society_tenant_family"],
//       all: [
//         "society_owner",
//         "society_owner_family",
//         "society_tenant",
//         "society_tenant_family",
//       ],
//       primary: ["primary_member"],
//     };

//     const roleCategories = visibilityMap[visibilityOption];
//     if (!roleCategories) {
//       return sendErrorResponse(res, "Invalid visibility option", 400);
//     }

//     const notice = await Notice.create({
//       noticeHeading,
//       noticeDescription,
//       noticeExpireDate,
//       societyId,
//       userId,
//       roleId: user.roleId,
//       roleCategories,
//     });

//     return sendSuccessResponse(res, "Notice created successfully", notice, 201);
//   } catch (err) {
//     console.error("Error creating notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// // Get Notices for a Society
// const getNoticesBySocietyId = async (req, res) => {
//   try {
//     const { societyId, userId } = req.params;

//     if (!societyId || !userId) {
//       return sendErrorResponse(res, "societyId and userId are required", 400);
//     }

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "User role not found", 404);

//     if (user.societyId?.toString() !== societyId.toString()) {
//       return sendErrorResponse(
//         res,
//         "You can only view notices from your own society",
//         403
//       );
//     }

//     const userCategory = role.roleCategory?.toLowerCase();
//     const isPrimary = user.primaryMember === true;

//     const allowedCategories = [
//       "society_owner",
//       "society_tenant",
//       "society_moderator",
//       "management_committee",
//     ];

//     if (!allowedCategories.includes(userCategory)) {
//       return sendErrorResponse(res, "Permission denied", 403);
//     }

//     const allNotices = await Notice.findAll({
//       where: { societyId },
//       order: [["createdAt", "DESC"]],
//     });

//     const matchedNotices = allNotices.filter((notice) => {
//       const categories = Array.isArray(notice.roleCategories)
//         ? notice.roleCategories.map((c) => c.toLowerCase())
//         : [];

//       if (categories.includes("primary_member") && isPrimary) return true;
//       if (categories.includes(userCategory)) return true;
//       if (categories.length === 0) return true;

//       return false;
//     });

//     return sendSuccessResponse(
//       res,
//       "Notices fetched successfully",
//       matchedNotices
//     );
//   } catch (err) {
//     console.error("Error fetching society notices:", err);
//     return sendErrorResponse(res, "Internal Server Error", 500, err.message);
//   }
// };

// // Create Notice by User ID (Only for Super Admin & Super Admin IT)
// const createNoticeByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { noticeHeading, noticeDescription, noticeExpireDate } = req.body;

//     if (!noticeHeading || !noticeDescription || !noticeExpireDate) {
//       return sendErrorResponse(res, "Missing required fields", 400);
//     }

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "Role not found", 404);

//     const allowedRoles = ["super_admin", "super_admin_it"];
//     if (!allowedRoles.includes(role.roleCategory)) {
//       return sendErrorResponse(
//         res,
//         "Only Super Admins can create notices",
//         403
//       );
//     }

//     const notice = await Notice.create({
//       noticeHeading,
//       noticeDescription,
//       noticeExpireDate,
//       userId: user.userId,
//       roleId: user.roleId,
//       roleCategories: [], // Empty or add your default categories if needed
//     });

//     return sendSuccessResponse(res, "Notice created successfully", notice, 201);
//   } catch (err) {
//     console.error("Error creating notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// // Get All Notices by User ID
// const getNoticesByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "User role not found", 404);

//     const allowedRoles = [
//       "super_admin",
//       "super_admin_it",
//       "society_moderator",
//       "management_committee",
//       "owner",
//       "owner_family",
//       "tenant",
//       "tenant_family",
//       "security_guard",
//       "security_supervisor",
//       "security_manager",
//     ];

//     if (!allowedRoles.includes(role.roleCategory)) {
//       return sendErrorResponse(
//         res,
//         "Permission denied to view notices",
//         403
//       );
//     }

//     const notices = await Notice.findAll({
//       where: { userId },
//       order: [["createdAt", "DESC"]],
//     });

//     return sendSuccessResponse(res, "User notices retrieved", notices);
//   } catch (error) {
//     console.error("Error fetching user notices:", error);
//     return sendErrorResponse(res, "Internal Server Error", 500, error.message);
//   }
// };

// // Update Notice
// const updateNoticeById = async (req, res) => {
//   try {
//     const { noticeId } = req.params;
//     const updateData = req.body;

//     const notice = await Notice.findByPk(noticeId);
//     if (!notice) return sendErrorResponse(res, "Notice not found", 404);

//     // Optionally check for user permission here

//     await notice.update(updateData);
//     return sendSuccessResponse(res, "Notice updated successfully", notice);
//   } catch (err) {
//     console.error("Error updating notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// // Delete Notice
// const deleteNoticeById = async (req, res) => {
//   try {
//     const { noticeId } = req.params;

//     const notice = await Notice.findByPk(noticeId);
//     if (!notice) return sendErrorResponse(res, "Notice not found", 404);

//     // Optionally check for user permission here

//     await notice.destroy();
//     return sendSuccessResponse(res, "Notice deleted successfully");
//   } catch (err) {
//     console.error("Error deleting notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// module.exports = {
//   createNoticeByUserId,
//   createNoticeBySocietyId,
//   updateNoticeById,
//   deleteNoticeById,
//   getNoticesBySocietyId,
//   getNoticesByUserId,
// };
