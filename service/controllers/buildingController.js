const { where, Op } = require("sequelize");
const { Building, Customer } = require("../models");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

exports.createBuilding = async (req, res) => {
  try {
    console.log("Create Building controller called");
    // console.log("result", req.body);

    const { societyId, buildingName } = req.body;

    if (!buildingName) {
      return sendErrorResponse(res, "Building name is not found", 400);
    }

    if (!societyId) {
      return sendErrorResponse(res, "Society ID is not found", 400);
    }

    const societyExist = await Customer.findByPk(societyId);
    if (!societyExist) {
      return sendErrorResponse(res, "Society does not exist", 404);
    }

    const buildingExist = await Building.findOne({
      where: {
        buildingName,
        //     {
        //   [Op.iLike]: buildingName,
        // },
        societyId,
      },
    });

    if (buildingExist) {
      return sendErrorResponse(res, "Building exist", 404);
    }

    const result = await Building.create(req.body);
    return sendSuccessResponse(
      res,
      "Building created successfully",
      result,
      201
    );
  } catch (err) {
    console.error("Error creating building:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.getBuildings = async (req, res) => {
  console.log(req.query);
  try {
    const buildings = await Building.findAll();
    return sendSuccessResponse(
      res,
      "Buildings fetched successfully",
      buildings,
      200
    );
  } catch (err) {
    console.error("Error fetching buildings:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.getBuildingsBySocietyId = async (req, res, next) => {
  try {
    const { societyId } = req.params;

    if (!societyId) {
      return sendErrorResponse(res, "Society ID is required", 400); // Updated validation
    }

    console.log("Fetching buildings for Society ID:", societyId); // Debugging log

    const buildings = await Building.findAll({ where: { societyId } });

    if (!buildings || buildings.length === 0) { // Corrected validation
      return sendErrorResponse(res, "No buildings found for this society", 404);
    }

    return sendSuccessResponse(
      res,
      "Buildings fetched successfully",
      buildings,
      200
    );
  } catch (err) {
    console.error("Error fetching buildings by society ID:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

