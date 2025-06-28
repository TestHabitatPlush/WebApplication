const { Op } = require("sequelize");
const { Building, Customer } = require("../models");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

// Create Building
exports.createBuilding = async (req, res) => {
  try {
    const { societyId, buildingName } = req.body;

    if (!buildingName) {
      return sendErrorResponse(res, "Building name is required", 400);
    }

    if (!societyId) {
      return sendErrorResponse(res, "Society ID is required", 400);
    }

    const societyExist = await Customer.findByPk(societyId);
    if (!societyExist) {
      return sendErrorResponse(res, "Society does not exist", 404);
    }

    const buildingExist = await Building.findOne({
      where: {
        buildingName,
        societyId,
      },
    });

    if (buildingExist) {
      return sendErrorResponse(res, "Building already exists", 409);
    }

    const result = await Building.create(req.body);
    return sendSuccessResponse(res, "Building created successfully", result, 201);
  } catch (err) {
    console.error("Error creating building:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// Get All Buildings
exports.getBuildings = async (req, res) => {
  try {
    const buildings = await Building.findAll();
    return sendSuccessResponse(res, "Buildings fetched successfully", buildings, 200);
  } catch (err) {
    console.error("Error fetching buildings:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// Get Buildings by Society ID
exports.getBuildingsBySocietyId = async (req, res) => {
  try {
    const { societyId } = req.params;

    if (!societyId) {
      return sendErrorResponse(res, "Society ID is required", 400);
    }

    const buildings = await Building.findAll({ where: { societyId } });

    if (!buildings.length) {
      return sendErrorResponse(res, "No buildings found for this society", 404);
    }

    return sendSuccessResponse(res, "Buildings fetched successfully", buildings, 200);
  } catch (err) {
    console.error("Error fetching buildings by society ID:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// Update Building
exports.updateBuilding = async (req, res) => {
  try {
    const { buildingId } = req.params;
    const { buildingName } = req.body;

    const existingBuilding = await Building.findByPk(buildingId);
    if (!existingBuilding) {
      return sendErrorResponse(res, "Building not found", 404);
    }

    if (buildingName && buildingName !== existingBuilding.buildingName) {
      const conflict = await Building.findOne({
        where: {
          buildingName: { [Op.iLike]: buildingName },
          societyId: existingBuilding.societyId,
          buildingId: { [Op.ne]: buildingId },
        },
      });

      if (conflict) {
        return sendErrorResponse(res, "Building name already exists", 409);
      }
    }

    await existingBuilding.update(req.body);
    return sendSuccessResponse(res, "Building updated successfully", existingBuilding, 200);
  } catch (err) {
    console.error("Error updating building:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// Delete Building
exports.deleteBuilding = async (req, res) => {
  try {
    const { buildingId } = req.params;

    if (!buildingId) {
      return sendErrorResponse(res, "Building ID is required", 400);
    }

    const building = await Building.findByPk(buildingId);
    if (!building) {
      return sendErrorResponse(res, "Building not found", 404);
    }

    await building.destroy();
    return sendSuccessResponse(res, "Building deleted successfully", null, 200);
  } catch (err) {
    console.error("Error deleting building:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};
