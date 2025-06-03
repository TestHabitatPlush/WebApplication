const { Gate, Building, Customer } = require('../models'); // Ensure Customer is included
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response');


exports.createGate = async (req, res) => {
  try {
    let body = req.body;
    if (!Array.isArray(body)) {
      body = [body];
    }

    for (const gate of body) {
      const { societyId, gateName, gateNumber } = gate;
      if (!societyId || !gateName || !gateNumber) {
        return sendErrorResponse(
          res, 
          "Building ID, gate name, and gate number are required for all entries", 
          400
        );
      }
    }

    const createdGates = await Promise.all(
      body.map(gate => {
        return Gate.create({
          societyId: gate.societyId,
          gateName: gate.gateName,
          gateNumber: gate.gateNumber,
        });
      })
    );

    return sendSuccessResponse(
      res, 
      "Gates created successfully", 
      createdGates, 
      201
    );
  } catch (err) {
    console.error("Error creating gates:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};


// exports.createGate = async (req, res) => {
//   try {
//     let body = req.body;

//     // If body is an array, extract the first object
//     if (Array.isArray(body) && body.length > 0) {
//       body = body[0];
//     }

//     const { societyId, gateName, gateNumber } = body;

//     // Validate required fields
//     if (!societyId || !gateName || !gateNumber) {
//       return sendErrorResponse(res, "Building ID, gate name, and gate number are required", 400);
//     }

//     // Check if the society exists
//     // const buildingExist = await Building.findByPk(societyId);
//     // if (!buildingExist) {
//     //   return sendErrorResponse(res, "Building does not exist", 404);
//     // }

//     // Create a new gate
//     const newGate = await Gate.create({
//       societyId,
//       gateName,
//       gateNumber,
//     });

//     return sendSuccessResponse(res, "Gate created successfully", newGate, 201);
//   } catch (err) {
//     console.error("Error creating gate:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };




exports.getGates = async (req, res) => {
  try {
    const gates = await Gate.findAll({
      include: [
        {
          model: Customer,
          attributes: ["customerId", "customerName"], 
        },
      ],
    });

    if (gates.length === 0) {
      return sendErrorResponse(res, "No gates found", 404);
    }

    return sendSuccessResponse(res, "Gates fetched successfully", gates, 200);
  } catch (err) {
    console.error("Error fetching gates:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};






exports.getGatesBySocietyId = async (req, res) => {
  try {
    const { societyId } = req.params;

    if (!societyId) {
      return sendErrorResponse(res, "Society ID is required", 400);
    }

    const gates = await Gate.findAll({
      where: { societyId },
      include: [
        {
          model: Customer,
          attributes: ["customerId", "customerName"],
        },
      ],
    });

    if (gates.length === 0) {
      return sendErrorResponse(res, `No gates found for society ID ${societyId}`, 404);
    }

    return sendSuccessResponse(res, `Gates for society ID ${societyId} fetched successfully`, gates, 200);
  } catch (err) {
    console.error("Error fetching gates by societyId:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.updateGate = async (req, res) => {
  try {
    const { gateId } = req.params;
    const { gateName, gateNumber } = req.body;

    if (!gateName || !gateNumber) {
      return sendErrorResponse(res, "Gate name and gate number are required", 400);
    }

    const gate = await Gate.findByPk(gateId);
    if (!gate) return sendErrorResponse(res, `Gate with ID ${gateId} not found`, 404);

    gate.gateName = gateName;
    gate.gateNumber = gateNumber;
    await gate.save();

    return sendSuccessResponse(res, `Gate with ID ${gateId} updated successfully`, gate, 200);
  } catch (err) {
    console.error("Error updating gate:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.deleteGate = async (req, res) => {
  try {
    const { gateId } = req.params;

    const gate = await Gate.findByPk(gateId);
    if (!gate) return sendErrorResponse(res, `Gate with ID ${gateId} not found`, 404);

    await gate.destroy();
    return sendSuccessResponse(res, `Gate with ID ${gateId} deleted successfully`, gate, 200);
  } catch (error) {
    console.error("Error deleting gate:", error);
    return sendErrorResponse(res, "Internal server error", 500, error.message);
  }
};