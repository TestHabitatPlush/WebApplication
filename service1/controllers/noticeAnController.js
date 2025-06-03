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
