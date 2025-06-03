const { Op } = require("sequelize");
const Unit = require("../models/Unit");
const Building = require("../models/Building");
const Floor = require("../models/Floor");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

exports.UserUnitListTable = async (req, res) => {
  try {
    console.log("Unit list handler");
    const { societyId, UnitName, buildingName, floorName } = req.query;

    if (!societyId) {
      return sendErrorResponse(res, "Enter Society Id", 400);
    }

    const whereClause = {};

    const pagination = {
      page: Math.max(parseInt(req.query.page) || 0, 0), // Ensure non-negative page number
      pageSize: Math.max(parseInt(req.query.pageSize) || 5, 1), // Ensure non-zero page size
    };

    // Setting up Sequelize query includes (joins)
    const include = [
      {
        model: Building,
        as: 'building',  // Assuming the alias in the Unit model is "building"
        where: buildingName ? { name: { [Op.like]: `%${buildingName}%` } } : {}, // Filter buildingName if provided
        required: false, // Makes sure it's an outer join
      },
      {
        model: Floor,
        as: 'floor',  // Assuming the alias in the Unit model is "floor"
        where: floorName ? { name: { [Op.like]: `%${floorName}%` } } : {}, // Filter floorName if provided
        required: false, // Makes sure it's an outer join
      }
    ];

    if (UnitName) {
      whereClause.UnitName = { [Op.like]: `%${UnitName}%` };  // Filter UnitName if provided
    }

    if (societyId) {
      whereClause.societyId = societyId;
    }

    const { count, rows } = await Unit.findAndCountAll({
      where: whereClause,
      include, // This will join Building and Floor models
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
    });

    const totalPages = Math.ceil(count / pagination.pageSize);

    res.status(200).json({
      message: "Unit List fetched successfully",
      data: rows,
      total: count,
      totalPages,
    });
  } catch (err) {
    console.error("Error fetching Unit list:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// Visitor List Table
exports.newVisitorListTable = async (req, res) => {
  try {
    console.log("Visitor list handler");
    const { societyId, startdate, enddate, status, mobileno } = req.query;

    if (!societyId) {
      return sendErrorResponse(res, "Enter Society Id", 400);
    }

    const whereClause = {};

    const pagination = {
      page: Math.max(parseInt(req.query.page) || 0, 0), // Ensure non-negative page number
      pageSize: Math.max(parseInt(req.query.pageSize) || 10, 1), // Ensure non-zero page size
    };

    if (startdate && enddate) {
      whereClause.visit_expect_date_of_entry_date = {
        [Op.between]: [startdate, enddate],
      };
    } else if (startdate) {
      whereClause.visit_expect_date_of_entry_date = {
        [Op.gte]: startdate,
      };
    } else if (enddate) {
      whereClause.visit_expect_date_of_entry_date = {
        [Op.lte]: enddate,
      };
    }

    if (status) {
      whereClause.status = { [Op.like]: `%${status}%` };
    }

    if (mobileno) {
      whereClause.visit_mobileno = { [Op.like]: `%${mobileno}%` };
    }

    if (societyId) {
      whereClause.societyId = societyId;
    }

    const { count, rows } = await Visitor_new_visitentry.findAndCountAll({
      where: whereClause,
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
    });

    const totalPages = Math.ceil(count / pagination.pageSize);

    res.status(200).json({
      message: "Visitor List fetched successfully",
      data: rows,
      total: count,
      totalPages,
    });
  } catch (err) {
    console.error("Error fetching visitor list:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  };
}
