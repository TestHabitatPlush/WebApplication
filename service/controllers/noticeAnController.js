const { Op } = require("sequelize");
const { Notice, User, Role } = require("../models");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

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



// const { Op } = require("sequelize");
// const { Notice, User, Role } = require("../models");
// const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

// // Create notice by Super Admin (no societyId)
// exports.createByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const {
//       noticeHeading,
//       noticeDescription,
//       noticeExpireDate,
//       userGroupId,
//       senderId,
//     } = req.body;

//     if (!noticeHeading || !noticeDescription || !noticeExpireDate || !userGroupId || !senderId) {
//       return sendErrorResponse(res, "Please provide all required fields", 400);
//     }

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role || role.roleCategory !== "super_admin") {
//       return sendErrorResponse(res, "Only Super Admin can create this notice", 403);
//     }

//     const notice = await Notice.create({
//       noticeHeading,
//       noticeDescription,
//       noticeExpireDate,
//       userGroupId,
//       senderId,
//       societyId: null,
//     });

//     return sendSuccessResponse(res, "Notice created successfully", notice, 201);
//   } catch (error) {
//     console.error("Create Error:", error);
//     return sendErrorResponse(res, "Internal server error", 500, error.message);
//   }
// };

// // Create notice by Admin (with societyId)
// exports.createNotice = async (req, res) => {
//   try {
//     const {
//       noticeHeading,
//       noticeDescription,
//       noticeExpireDate,
//       userGroupId,
//       societyId,
//       senderId,
//     } = req.body;

//     if (!noticeHeading || !noticeDescription || !noticeExpireDate || !userGroupId || !societyId || !senderId) {
//       return sendErrorResponse(res, "Enter All Details", 400);
//     }

//     const result = await Notice.create(req.body);
//     return sendSuccessResponse(res, "Notice created successfully", result, 201);
//   } catch (err) {
//     console.error("Error creating notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// // Get all Super Admin notices
// exports.getNoticesForSuperAdmin = async (req, res) => {
//   try {
//     const { noticeHeading = "", userGroupId } = req.query;

//     const whereClause = { societyId: null };
//     if (noticeHeading) {
//       whereClause.noticeHeading = { [Op.like]: `%${noticeHeading}%` };
//     }
//     if (userGroupId) {
//       whereClause.userGroupId = userGroupId;
//     }

//     const page = parseInt(req.query.page) || 0;
//     const pageSize = parseInt(req.query.pageSize) || 10;

//     const { count, rows } = await Notice.findAndCountAll({
//       where: whereClause,
//       limit: pageSize,
//       offset: page * pageSize,
//     });

//     const totalPages = Math.ceil(count / pageSize);
//     return sendSuccessResponse(res, "Notices fetched successfully", {
//       data: rows,
//       total: count,
//       totalPages,
//     });
//   } catch (error) {
//     console.error("Read Error:", error);
//     return sendErrorResponse(res, "Internal server error", 500, error.message);
//   }
// };

// // Get society-based notices
// exports.getNotice = async (req, res) => {
//   try {
//     const { noticeHeading = "", societyId, userGroupId } = req.query;

//     if (!societyId) {
//       return sendErrorResponse(res, "Enter Society Id", 400);
//     }

//     const page = parseInt(req.query.page) || 0;
//     const pageSize = parseInt(req.query.pageSize) || 10;

//     const whereClause = {
//       societyId,
//     };

//     if (noticeHeading) {
//       whereClause.noticeHeading = { [Op.like]: `%${noticeHeading}%` };
//     }

//     if (userGroupId) {
//       whereClause.userGroupId = userGroupId;
//     }

//     const { count, rows } = await Notice.findAndCountAll({
//       where: whereClause,
//       limit: pageSize,
//       offset: page * pageSize,
//     });

//     const totalPages = Math.ceil(count / pageSize);
//     return sendSuccessResponse(res, "Notice fetched successfully", {
//       data: rows,
//       total: count,
//       totalPages,
//     });
//   } catch (err) {
//     console.error("Error fetching notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// // Get single notice by ID
// exports.getNoticeById = async (req, res) => {
//   try {
//     const { noticeId } = req.params;
//     const notice = await Notice.findByPk(noticeId);
//     if (!notice) return sendErrorResponse(res, "Notice not found", 404);
//     return sendSuccessResponse(res, "Notice fetched successfully", notice);
//   } catch (error) {
//     console.error("Fetch by ID Error:", error);
//     return sendErrorResponse(res, "Internal server error", 500, error.message);
//   }
// };

// // Update notice
// exports.updateNoticeById = async (req, res) => {
//   try {
//     const { noticeId } = req.params;
//     const [updatedRows] = await Notice.update(req.body, {
//       where: { noticeId },
//     });

//     if (updatedRows === 0) {
//       return sendErrorResponse(res, "Notice not found or no changes made", 404);
//     }

//     return sendSuccessResponse(res, "Notice updated successfully");
//   } catch (error) {
//     console.error("Update Error:", error);
//     return sendErrorResponse(res, "Internal server error", 500, error.message);
//   }
// };

// // Delete notice
// exports.deleteNoticeById = async (req, res) => {
//   try {
//     const { noticeId } = req.params;
//     const notice = await Notice.findByPk(noticeId);
//     if (!notice) {
//       return sendErrorResponse(res, "Notice not found", 404);
//     }

//     await notice.destroy();
//     return sendSuccessResponse(res, "Notice deleted successfully");
//   } catch (error) {
//     console.error("Delete Error:", error);
//     return sendErrorResponse(res, "Internal server error", 500, error.message);
//   }
// };
