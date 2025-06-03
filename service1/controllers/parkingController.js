const Parking = require("../models/Parking");
const { Vehicle, Customer, User } = require("../models");
const Unit = require("../models/Unit");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

exports.parkingBooked = async (req, res) => {
  try {
    const societyId = req.params.societyId;
    console.log("Request body: ", req.body);

    const {
      parkingSlotName,
      parkingSlotType,
      parkingUsage,
      parkingCharges,
      chargeAmount,
      unitName,
      vehicleType,
      vehicleNumber,
      bookingFrom,
      bookingTo,
    } = req.body;

    const allowedSlotTypes = ["PublicUsage", "PrivateUsage"];
    const allowedUsageTypes = ["Hourly", "Days"];
    const allowedChargeTypes = ["Free", "Paid"];

    if (!parkingSlotName || !parkingSlotType || !parkingUsage || !parkingCharges || chargeAmount === undefined) {
      return sendErrorResponse(res, "All fields are required", 400);
    }

    if (!allowedSlotTypes.includes(parkingSlotType.trim())) {
      return sendErrorResponse(res, "Invalid parkingSlotType. Allowed values: PublicUsage, PrivateUsage", 400);
    }
    if (!allowedUsageTypes.includes(parkingUsage.trim())) {
      return sendErrorResponse(res, "Invalid parkingUsage. Allowed values: Hourly, Days", 400);
    }
    if (!allowedChargeTypes.includes(parkingCharges.trim())) {
      return sendErrorResponse(res, "Invalid parkingCharges. Allowed values: Free, Paid", 400);
    }

    const unitExists = await Unit.findOne({ where: { unitName, societyId } });
    if (!unitExists) {
      return sendErrorResponse(res, "Invalid unitName or does not belong to this society", 400);
    }

    const existingParkingSlot = await Parking.findOne({
      where: {
        parkingSlotName,
        parkingSlotType,
        parkingUsage,
        parkingCharges,
        chargeAmount,
        societyId,
        unitName,
        bookingFrom,
        bookingTo,
      },
    });

    if (existingParkingSlot) {
      return sendErrorResponse(res, "Parking Slot Already Booked", 400);
    }

    const parkingSlot = await Parking.create({
      parkingSlotName,
      parkingSlotType,
      parkingUsage,
      parkingCharges,
      chargeAmount,
      unitName,
      vehicleType,
      vehicleNumber,
      bookingFrom,
      bookingTo,
      societyId,
    });

    console.log("Parking Slot Created:", parkingSlot);
    return sendSuccessResponse(res, "Parking Slot booked successfully", parkingSlot);
  } catch (error) {
    console.error("Error Creating Parking:", error);
    return sendErrorResponse(res, "Internal server error", 500, error.message);
  }
};

exports.getParkingSlot = async (req, res) => {
  try {
    const { societyId } = req.params;
    if (!societyId) return sendErrorResponse(res, "Society ID is required", 400);

    const parkingBook = await Parking.findAll({ where: { societyId } });
    return sendSuccessResponse(res, "Parking Slot fetched successfully", parkingBook);
  } catch (error) {
    console.error("Error fetching Parking records:", error);
    return sendErrorResponse(res, "Internal server error", 500, error.message);
  }
};

exports.updateParking = async (req, res) => {
  try {
    const { societyId, parkingId } = req.params;
    const {
      parkingSlotName,
      parkingSlotType,
      parkingUsage,
      parkingCharges,
      chargeAmount,
      unitName,
      vehicleType,
      vehicleNumber,
      bookingFrom,
      bookingTo,
    } = req.body;

    if (!societyId || !parkingId) {
      return sendErrorResponse(res, "Society ID and Parking ID are required", 400);
    }

    const parking = await Parking.findOne({ where: { parkingId, societyId } });
    if (!parking) return sendErrorResponse(res, "Parking Slot not found", 404);

    await Parking.update(
      {
        parkingSlotName,
        parkingSlotType,
        parkingUsage,
        parkingCharges,
        chargeAmount: parkingCharges === "Free" ? 0 : parseFloat(chargeAmount),
        unitName,
        vehicleType,
        vehicleNumber,
        bookingFrom,
        bookingTo,
      },
      { where: { parkingId, societyId } }
    );

    const updatedParking = await Parking.findOne({ where: { parkingId, societyId } });
    return sendSuccessResponse(res, "Parking Updated Successfully", updatedParking);
  } catch (error) {
    console.error("Error updating Parking:", error);
    return sendErrorResponse(res, "Internal server error", 500, error.message);
  }
};

exports.createVehicleBySocietyId = async (req, res) => {
  try {
    const { societyId } = req.params;
    const { vehicleNumber, fastagNumber, vehicleType, ownerName, ownerContact } = req.body;

    if (!vehicleNumber || !vehicleType || !ownerName || !ownerContact) {
      return res.status(400).json({ message: "All fields are required except fastagNumber" });
    }

    const existingVehicle = await Vehicle.findOne({ where: { vehicleNumber, societyId } });
    if (existingVehicle) {
      return res.status(400).json({ message: "Vehicle already exists in this society" });
    }

    const newVehicle = await Vehicle.create({
      vehicleNumber,
      fastagNumber,
      vehicleType,
      ownerName,
      ownerContact,
      societyId,
    });

    return res.status(201).json({
      message: "Vehicle created successfully for Society",
      vehicle: newVehicle,
    });
  } catch (err) {
    console.error("Error creating vehicle:", err);
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: err.errors.map((e) => e.message),
      });
    }
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
exports.createVehicleByUserId = async (req, res) => {
  try {
      const { vehicleNumber, fastagNumber, vehicleType, ownerName, ownerContact, userId, societyId } = req.body;

      if (!vehicleNumber || !fastagNumber || !vehicleType || !ownerName || !ownerContact || !userId || !societyId) {
          return res.status(400).json({ message: 'All fields are required' });
      }

     
      const society = await Customer.findByPk(societyId);
      if (!society) {
          return res.status(404).json({ message: "Society Not Found" });
      }

      
      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(404).json({ message: "User Not Found" });
      }
      const existingVehicle = await Vehicle.findOne({
          where: { vehicleNumber, userId, societyId }
      });

      if (existingVehicle) {
          return res.status(400).json({ message: "Vehicle already registered under this user in the society" });
      }
      const newVehicle = await Vehicle.create({
          vehicleNumber,
          fastagNumber,
          vehicleType,
          ownerName,
          ownerContact,
          userId,
          societyId
      });

      return res.status(201).json({
          message: 'Vehicle created successfully for User in the Society',
          vehicle: newVehicle
      });

  } catch (err) {
      console.error("Error creating vehicle:", err);
      return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

exports.getVehicleBySocietyId = async (req, res) => {
  try {
    const { societyId } = req.params;

    const vehicles = await Vehicle.findAll({
      where: { societyId },
      // include: [{ model: Unit, attributes: ["unitName"] }],
    });

    if (!vehicles.length) {
      return res.status(404).json({ message: "No vehicles found for this society" });
    }

    res.status(200).json({ vehicles });
  } catch (error) {
    console.error("Error fetching vehicles by societyId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getVehicleByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const vehicles = await Vehicle.findAll({
      where: { userId },
    });

    if (!vehicles.length) {
      return res
        .status(404)
        .json({ message: "No vehicles found for this user" });
    }

    res.status(200).json({ vehicles });
  } catch (error) {
    console.error("Error fetching vehicles by userId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};