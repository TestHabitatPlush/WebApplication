const User = require("../models/User");
const { sendErrorResponse } = require("../utils/response");

exports.visitorapprovalmatrix = async (req, res) => {
  console.log("approval matrix of visitor management");

  try {
    console.log("Visitor get handler");
    console.log(req.query);

    const { societyId } = req.query;

    if (!societyId) {
      return sendErrorResponse(res, "Enter Socity Id", 400);
    }

    //   pagination handler
    const pagination = {
      page: parseInt(req.query.page) || 0,
      pageSize: parseInt(req.query.pageSize) || 10,
    };
    const whereClause = { isManagementCommittee: true };
    // if (disscussionheading) {
    //   whereClause.noticeHeading = { [Op.like]: `%${disscussionheading}%` }; // Case-insensitive search
    // }
    if (societyId) {
      whereClause.societyId = societyId;
    }
    // if (userGroupId) {
    //   whereClause.userGroupId = userGroupId;
    // }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
    });
    const totalPages = Math.ceil(count / pagination.pageSize);
    res.status(200).json({
      message: "Visitor Matrix fetched successfully",
      data: rows,
      total: count,
      totalPages,
    });
  } catch (err) {
    console.error("Error creating notice:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};
