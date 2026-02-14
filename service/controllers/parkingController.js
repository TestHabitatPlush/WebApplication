const Parking = require("../models/Parking");
const { Vehicle, Customer, User } = require("../models");
const Unit = require("../models/Unit");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

exports.parkingBooked = async (req, res) => {
  try {
    const societyId = req.params.societyId;

    const {
      parkingSlotName,
      parkingSlotType,
      parkingUsage,
      parkingCharges,
      chargeAmount,
      unitName, // Input is unitName
      vehicleType,
      vehicleNumber,
      bookingFrom,
      bookingTo,
    } = req.body;

    const allowedSlotTypes = ["PublicUsage", "PrivateUsage"];
    const allowedUsageTypes = ["Hourly", "Days"];
    const allowedChargeTypes = ["Free", "Paid"];

    if (
      !parkingSlotName ||
      !parkingSlotType ||
      !parkingUsage ||
      !parkingCharges ||
      chargeAmount === undefined ||
      !unitName
    ) {
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

    //  Get unitId from unitName + societyId
    const unit = await Unit.findOne({ where: { unitName, societyId } });
    if (!unit) {
      return sendErrorResponse(res, "Invalid unitName or does not belong to this society", 400);
    }

    //  Use unitId in all queries
    const existingParkingSlot = await Parking.findOne({
      where: {
        parkingSlotName,
        parkingSlotType,
        parkingUsage,
        parkingCharges,
        chargeAmount,
        societyId,
        unitId: unit.unitId,
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
      unitId: unit.unitId, //  Use unitId, not unitName
      vehicleType,
      vehicleNumber,
      bookingFrom,
      bookingTo,
      societyId,
    });

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
exports.getParkingDataById = async (req, res) => {
  try {
    const { parkingId } = req.params;
    const parking = await Parking.findOne({ where: { parkingId } });

    if (!parking) {
      return res.status(404).json({ message: "Parking not found" });
    }

    return res.status(200).json(parking);
  } catch (err) {
    console.error("Error fetching Parking by ID:", err);
    return res.status(500).json({ message: "Server error" });
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



// ####### Vehicle Create ###############




