const { Customer, UnitType,Unit } = require("../models");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
exports.createUnitType = async (req, res) => {
  try {
    console.log("Create UnitType controller called");
    const { societyId, unitTypeName } = req.body;
    console.log(req.body);
    if (!societyId) {
      return sendErrorResponse(res, "Society ID is not found", 400);
    }
    const societyExist = await Customer.findByPk(societyId);
    if (!societyExist) {
      return sendErrorResponse(res, "Society does not exist", 404);
    }
    const unitTypeExists = await UnitType.findOne({
      where: {
        unitTypeName,
        societyId,
      },
    });
    if (unitTypeExists) {
      return sendErrorResponse(res, "Unit Type Exists", 400);
    }
    const result = await UnitType.create(req.body);
    return sendSuccessResponse(res, "Floor created successfully", result, 201);
  } catch (err) {
    console.error("Error creating building:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};
exports.getUnitType = async (req, res) => {
  console.log(req.query);
  try {
    const buildings = await UnitType.findAll();
    return sendSuccessResponse(
      res,
      "Unit Types fetched successfully",
      buildings,
      200
    );
  } catch (err) {
    console.error("Error fetching buildings:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};
exports. getUnit = async (req, res) => {
  const { unitId, customerId } = req.query; // `customerId` represents `societyId`
  if (!customerId || !unitId) {
    return res.status(400).json({
      message: "Both Customer ID (Society ID) and Unit ID are required.",
    });
  }
  try {
    const unit = await Unit.findOne({
      where: {
        id: unitId, // Ensure this matches your model field for unit ID
        societyId: customerId, // Ensure this matches your model field for society ID
      },
      include: [
        { model: UnitType, attributes: ["unitTypeId", "unitTypeName"] },
        { model: Floor, attributes: ["floorId", "floorName"] },
      ],
    });
    if (!unit) {
      return res.status(404).json({
        message: `No unit found with unitId ${unitId} and customerId (societyId) ${customerId}.`,
      });
    }
    return res.status(200).json({ message: "Unit found.", data: unit });
  } catch (error) {
    console.error("Error fetching unit:", error);
    return res.status(500).json({ message: "Error fetching unit." });
  }
};

exports.getUnitTypeBySocityId = async(req,res)=>{
  try {
    const {societyId}=req.params;
    if( !societyId ) {
      return sendErrorResponse(res, "SocityId not specified",400);
    }
    console.log("Featching Unit for Society Id: ", societyId);

    const unitType = await UnitType.findAll({
     where: {societyId},
    });
    if(!unitType || unitType.length == 0) {
      return sendErrorResponse(res, "No Unit Type found for this Society", 404);
    }
    return sendSuccessResponse(res, "Unit Types fetched successfully", unitType,200);
  }
  catch (error) {
    console.error("Error fetching Unit Type by Society Id: ", error);
    return sendErrorResponse(res, "Internal server error", 500, error.message);
  }
}

exports.updateUnitType = async(req,res)=>{
  try{
    const { unitTypeId } = req.params;
    const { unitTypeName } = req.body;

    if(!unitTypeId) {
      return sendErrorResponse(res, "Unit Type Id not specified", 400);
    }

    const unitType = await UnitType.findByPk(unitTypeId);
    if(!unitType) {
      return sendErrorResponse(res, "No Unit Type found with this Id", 404);
    }

    await unitType.update({ unitTypeName });

    return sendSuccessResponse(res, "Unit Type updated successfully", unitType, 200);

  } catch (error){
    console.error("Error updating Unit Type: ", error);
    return sendErrorResponse(res, "Internal server error", 500, error.message);
  }
}

exports.deleteUnitType = async (req,res)=>{
  try{
    const {unitTypeId} = req.params;
    if(!unitTypeId){
      return sendErrorResponse(res, "Floor Id is Require", 400);
    }

    const unitType = await UnitType.findByPk(unitTypeId);
    if(!unitType){
      return sendErrorResponse(res, "No Unit Type found with this Id", 404);
    }

    const deletedUnitType = await unitType.destroy();

    return sendErrorResponse(res,"unitType Deleete successfully",null,200);

  } catch (error){
    console.error("Error deleting Unit Type: ", error);
    return sendErrorResponse(res, "Internal server error", 500, error.message);
  }
}