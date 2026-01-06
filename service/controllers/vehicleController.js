

const { Vehicle, Customer, User } = require("../models");
const Unit = require("../models/Unit.js")
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");


exports.createVehicleBySocietyId = async (req, res) => {
  try {
    const { societyId } = req.params;
    const {
      vehicleNumber,
      fastagNumber,
      vehicleType,
      ownerName,
      ownerContact,
      unitName,
    } = req.body;

    if (!vehicleNumber || !vehicleType || !ownerName || !ownerContact || !unitName) {
      return res.status(400).json({
        message: "All fields are required except fastagNumber",
      });
    }
    const unit = await Unit.findOne({
      where: { unitName, societyId },
      attributes: ["unitId", "unitName"],
    });

    if (!unit) {
      return res.status(404).json({
        message: "Unit not found in this society",
      });
    }

    const exists = await Vehicle.findOne({
      where: { vehicleNumber, societyId },
    });

    if (exists) {
      return res.status(400).json({
        message: "Vehicle already exists in this society",
      });
    }

    const vehicle = await Vehicle.create({
      vehicleNumber,
      fastagNumber: fastagNumber || null,
      vehicleType,
      ownerName,
      ownerContact,
      societyId,
      unitId: unit.unitId, 
    });

    return res.status(201).json({
      message: "Vehicle created successfully",
      vehicle: {
        ...vehicle.toJSON(),
        unitName: unit.unitName,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.createVehicleByUserId = async (req, res) => {
  try {
    const { userId, unitId } = req.params;
    const { vehicleNumber, fastagNumber, vehicleType, ownerName, ownerContact, societyId } = req.body;

    if (!vehicleNumber || !vehicleType || !ownerName || !ownerContact || !societyId) {
      return res.status(400).json({ message: "All fields are required except fastagNumber" });
    }

    const society = await Customer.findByPk(societyId);
    if (!society) return res.status(404).json({ message: "Society not found" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const unit = await Unit.findOne({
      where: { unitId, societyId },
      attributes: ["unitId", "unitName"],
    });

    if (!unit) {
      return res.status(404).json({ message: "Unit not found in this society" });
    }

    const exists = await Vehicle.findOne({
      where: { vehicleNumber, userId, societyId },
    });

    if (exists) {
      return res.status(400).json({
        message: "Vehicle already registered under this user in the society",
      });
    }

    const vehicle = await Vehicle.create({
      vehicleNumber,
      fastagNumber: fastagNumber || null,
      vehicleType,
      ownerName,
      ownerContact,
      userId,
      societyId,
      unitId,
    });

    return res.status(201).json({
      message: "Vehicle created successfully for User",
      vehicle: { ...vehicle.toJSON(), unitName: unit.unitName },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateVehicleBySocietyId = async (req, res) => {
  try {
    const { societyId, vehicleId } = req.params;
    const { vehicleNumber, fastagNumber, vehicleType, ownerName, ownerContact, userId, unitId } = req.body;

    const vehicle = await Vehicle.findOne({ where: { vehicleId, societyId } });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    if (vehicleNumber && vehicleNumber !== vehicle.vehicleNumber) {
      const exists = await Vehicle.findOne({ where: { vehicleNumber, societyId } });
      if (exists) return res.status(400).json({ message: "Vehicle number already exists" });
    }

    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
    }

    if (unitId) {
      const unit = await Unit.findOne({ where: { unitId, societyId } });
      if (!unit) return res.status(404).json({ message: "Unit not found in this society" });
    }

    await vehicle.update({
      vehicleNumber: vehicleNumber ?? vehicle.vehicleNumber,
      fastagNumber: fastagNumber ?? vehicle.fastagNumber,
      vehicleType: vehicleType ?? vehicle.vehicleType,
      ownerName: ownerName ?? vehicle.ownerName,
      ownerContact: ownerContact ?? vehicle.ownerContact,
      userId: userId ?? vehicle.userId,
      unitId: unitId ?? vehicle.unitId,
    });

    return res.status(200).json({ message: "Vehicle updated successfully", vehicle });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getVehicleBySocietyId = async (req, res) => {
    try {
      const { societyId } = req.params;
  
      const vehicles = await Vehicle.findAll({
        where: { societyId },
        include: [
          {
            model: Unit,
            as: "unit",         
            attributes: ["unitName"],
          },
        ],
      });
  
      if (!vehicles.length) {
        return res.status(404).json({
          message: "No vehicles found for this society",
        });
      }
  
      return res.status(200).json({ vehicles });
    } catch (error) {
      console.error("Error fetching vehicles by societyId:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

exports.getVehicleByUserId = async (req, res) => {
  const vehicles = await Vehicle.findAll({ where: { userId: req.params.userId } });
  if (!vehicles.length) return res.status(404).json({ message: "No vehicles found" });
  res.status(200).json({ vehicles });
};

exports.getVehicleDataByIdForview = async (req, res) => {
  const vehicle = await Vehicle.findByPk(req.params.vehicleId);
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
  res.status(200).json(vehicle);
};


// exports.createVehicleBySocietyId = async (req, res) => {
//     try {
//       const { societyId } = req.params;
//       const {
//         vehicleNumber,
//         fastagNumber,
//         vehicleType,
//         ownerName,
//         ownerContact,
//         unitId,
//       } = req.body;
  
//       if (!vehicleNumber || !vehicleType || !ownerName || !ownerContact || !unitId) {
//         return res.status(400).json({
//           message: "All fields are required except fastagNumber",
//         });
//       }
  
//       const unit = await Unit.findOne({
//         where: { unitId, societyId },
//         attributes: ["unitId", "unitName"],
//       });
  
//       if (!unit) {
//         return res.status(404).json({ message: "Unit not found in this society" });
//       }
  
//       const existingVehicle = await Vehicle.findOne({
//         where: { vehicleNumber, societyId },
//       });
  
//       if (existingVehicle) {
//         return res.status(400).json({
//           message: "Vehicle already exists in this society",
//         });
//       }
  
//       const vehicle = await Vehicle.create({
//         vehicleNumber,
//         fastagNumber: fastagNumber || null,
//         vehicleType,
//         ownerName,
//         ownerContact,
//         societyId,
//         unitId,
//       });
  
//       return res.status(201).json({
//         message: "Vehicle created successfully",
//         vehicle: {
//           ...vehicle.toJSON(),
//           unitName: unit.unitName, 
//         },
//       });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };
  
//   exports.createVehicleByUserId = async (req, res) => {
//     try {
//       const { userId, unitId } = req.params;
//       const {
//         vehicleNumber,
//         fastagNumber,
//         vehicleType,
//         ownerName,
//         ownerContact,
//         societyId,
//       } = req.body;
  
//       if (
//         !vehicleNumber ||
//         !vehicleType ||
//         !ownerName ||
//         !ownerContact ||
//         !userId ||
//         !societyId ||
//         !unitId
//       ) {
//         return res.status(400).json({
//           message: "All fields are required except fastagNumber",
//         });
//       }
//       const society = await Customer.findByPk(societyId);
//       if (!society) {
//         return res.status(404).json({ message: "Society not found" });
//       }
//       const user = await User.findByPk(userId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       const unit = await Unit.findOne({
//         where: { unitId, societyId },
//         attributes: ["unitId", "unitName"],
//       });
  
//       if (!unit) {
//         return res.status(404).json({
//           message: "Unit not found in this society",
//         });
//       }
//       const existingVehicle = await Vehicle.findOne({
//         where: { vehicleNumber, userId, societyId },
//       });
  
//       if (existingVehicle) {
//         return res.status(400).json({
//           message: "Vehicle already registered under this user in the society",
//         });
//       }
  
//       const vehicle = await Vehicle.create({
//         vehicleNumber,
//         fastagNumber: fastagNumber || null,
//         vehicleType,
//         ownerName,
//         ownerContact,
//         userId,
//         societyId,
//         unitId, 
//       });
  
//       return res.status(201).json({
//         message: "Vehicle created successfully for User in the Society",
//         vehicle: {
//           ...vehicle.toJSON(),
//           unitName: unit.unitName, 
//         },
//       });
//     } catch (err) {
//       console.error("Error creating vehicle:", err);
//       return res.status(500).json({
//         message: "Internal server error",
//         error: err.message,
//       });
//     }
//   };
  
//   exports.updateVehicleBySocietyId = async (req, res) => {
//     try {
//       const { societyId, vehicleId } = req.params;
//       const { vehicleNumber, fastagNumber, vehicleType, ownerName, ownerContact , userId} = req.body;
  
//       const vehicle = await Vehicle.findOne({
//         where: { vehicleId, societyId },
//       });
  
//       if (!vehicle) {
//         return res.status(404).json({ message: "Vehicle not found in this society" });
//       }
//       if (vehicleNumber && vehicleNumber !== vehicle.vehicleNumber) {
//         const exists = await Vehicle.findOne({
//           where: { vehicleNumber, societyId },
//         });
//         if (exists) {
//           return res.status(400).json({ message: "Vehicle number already exists in this society" });
//         }
//       }
  
//       await vehicle.update({
//         vehicleNumber: vehicleNumber ?? vehicle.vehicleNumber,
//         fastagNumber: fastagNumber ?? vehicle.fastagNumber,
//         vehicleType: vehicleType ?? vehicle.vehicleType,
//         ownerName: ownerName ?? vehicle.ownerName,
//         ownerContact: ownerContact ?? vehicle.ownerContact,
//         userId:userId?? vehicle.userId,
//       });
  
//       return res.status(200).json({
//         message: "Vehicle updated successfully (Society)",
//         vehicle,
//       });
//     } catch (err) {
//       console.error("updateVehicleBySocietyId error:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };
  
//   exports.updateVehicleByVehicleId = async (req, res) => {
//     try {
//       const { vehicleId } = req.params;
//       const {
//         vehicleNumber,
//         fastagNumber,
//         vehicleType,
//         ownerName,
//         ownerContact,
//       } = req.body;
  
//       if (!vehicleId) {
//         return res.status(400).json({
//           message: "vehicleId is required",
//         });
//       }
  
//       const vehicle = await Vehicle.findByPk(vehicleId);
  
//       if (!vehicle) {
//         return res.status(404).json({
//           message: "Vehicle not found",
//         });
//       }
  
//       await vehicle.update({
//         vehicleNumber: vehicleNumber ?? vehicle.vehicleNumber,
//         fastagNumber: fastagNumber ?? vehicle.fastagNumber,
//         vehicleType: vehicleType ?? vehicle.vehicleType,
//         ownerName: ownerName ?? vehicle.ownerName,
//         ownerContact: ownerContact ?? vehicle.ownerContact,
//       });
  
//       return res.status(200).json({
//         message: "Vehicle updated successfully",
//         vehicle,
//       });
//     } catch (err) {
//       console.error("updateVehicleByVehicleId error:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };
  
  
  
//   exports.getVehicleBySocietyId = async (req, res) => {
//     try {
//       const { societyId } = req.params;
  
//       const vehicles = await Vehicle.findAll({
//         where: { societyId },
//         // include: [{ model: Unit, attributes: ["unitName"] }],
//       });
  
//       if (!vehicles.length) {
//         return res.status(404).json({ message: "No vehicles found for this society" });
//       }
  
//       res.status(200).json({ vehicles });
//     } catch (error) {
//       console.error("Error fetching vehicles by societyId:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };
  
//   exports.getVehicleByUserId = async (req, res) => {
//     try {
//       const { userId } = req.params;
  
//       const vehicles = await Vehicle.findAll({
//         where: { userId },
//       });
  
//       if (!vehicles.length) {
//         return res
//           .status(404)
//           .json({ message: "No vehicles found for this user" });
//       }
  
//       res.status(200).json({ vehicles });
//     } catch (error) {
//       console.error("Error fetching vehicles by userId:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };
//   exports.getVehicleDataByIdForview = async (req, res) => {
//     try {
//       const { vehicleId } = req.params;
//       const vehicle = await Vehicle.findOne({ where: { vehicleId } });
  
//       if (!vehicle) {
//         return res.status(404).json({ message: "vehicle not found" });
//       }
  
//       return res.status(200).json(vehicle);
//     } catch (err) {
//       console.error("Error fetching vehicle by ID:", err);
//       return res.status(500).json({ message: "Server error" });
//     }
//   };