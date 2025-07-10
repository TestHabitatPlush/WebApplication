const { Facility } = require("../models");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

exports.createFacilityManagement = async (req, res) => {
    try {
        const { societyId } = req.params;
        const {
            facilityName,
            facilityType,
            facilityUsage,
            facilityCharge,
            chargeAmount,
            bookingFrom,
            bookingTo,
        } = req.body;

        if (!facilityName || !facilityType || !facilityUsage || !facilityCharge) {
            return sendErrorResponse(res, "All fields except chargeAmount are required", 400);
        }

        if (facilityCharge === "Paid" && (chargeAmount == null || isNaN(parseFloat(chargeAmount)))) {
            return sendErrorResponse(res, "chargeAmount is required for Paid facilities and must be a valid number", 400);
        }

        const facilityData = {
            facilityName,
            facilityType,
            facilityUsage,
            facilityCharge,
            chargeAmount: facilityCharge === "Free" ? 0 : parseFloat(chargeAmount),
            bookingFrom,
            bookingTo,
            societyId,
        };

        const existingFacility = await Facility.findOne({
            where: { facilityName, facilityType, facilityUsage, facilityCharge, societyId },
        });

        if (existingFacility) {
            return sendErrorResponse(res, "Facility already exists", 400);
        }

        const facility = await Facility.create(facilityData);
        return sendSuccessResponse(res, "Facility created successfully", facility);
    } catch (error) {
        console.error("Error creating facility:", error);
        return sendErrorResponse(res, "Internal server error", 500, error.message);
    }
};

exports.getFacilityRecord = async (req, res) => {
    try {
        const { societyId } = req.params;

        if (!societyId) {
            return sendErrorResponse(res, "Please provide a societyId", 400);
        }

        const facilities = await Facility.findAll({ where: { societyId } });

        if (!facilities.length) {
            return sendErrorResponse(res, "No facilities found for the provided societyId", 404);
        }

        return sendSuccessResponse(res, "Facility records fetched successfully", facilities);
    } catch (error) {
        console.error("Error fetching facility records:", error);
        return sendErrorResponse(res, "Internal server error", 500, error.message);
    }
};

exports.updateFacilityRecord = async (req, res) => {
    try {
        const { societyId, facilityId } = req.params;
        const { facilityName, facilityType, facilityUsage, facilityCharge, chargeAmount, bookingFrom, bookingTo } = req.body;

        if (!societyId || !facilityId) {
            return sendErrorResponse(res, "Please provide both societyId and facilityId", 400);
        }

        const facility = await Facility.findOne({ where: { facilityId, societyId } });

        if (!facility) {
            return sendErrorResponse(res, "Facility not found for the provided societyId and facilityId", 404);
        }

        const validFacilityTypes = ["PublicUsage", "PrivateUsage"];
        const validFacilityUsage = ["Hourly", "Daily"];
        const validFacilityCharge = ["Free", "Paid"];

        if (facilityType && !validFacilityTypes.includes(facilityType)) {
            return sendErrorResponse(res, `Invalid facilityType. Allowed values are ${validFacilityTypes.join(", ")}`, 400);
        }

        if (facilityUsage && !validFacilityUsage.includes(facilityUsage)) {
            return sendErrorResponse(res, `Invalid facilityUsage. Allowed values are ${validFacilityUsage.join(", ")}`, 400);
        }

        if (facilityCharge && !validFacilityCharge.includes(facilityCharge)) {
            return sendErrorResponse(res, `Invalid facilityCharge. Allowed values are ${validFacilityCharge.join(", ")}`, 400);
        }

        if (facilityCharge === "Paid" && (chargeAmount == null || isNaN(parseFloat(chargeAmount)))) {
            return sendErrorResponse(res, "chargeAmount is required for Paid facilities and must be a valid number", 400);
        }

        await Facility.update(
            {
                facilityName,
                facilityType,
                facilityUsage,
                facilityCharge,
                chargeAmount: facilityCharge === "Free" ? 0 : parseFloat(chargeAmount),
                bookingFrom,
                bookingTo,
            },
            { where: { facilityId, societyId } }
        );

        const updatedFacility = await Facility.findOne({ where: { facilityId, societyId } });

        return sendSuccessResponse(res, "Facility updated successfully", updatedFacility);
    } catch (error) {
        console.error("Error updating facility:", error);
        return sendErrorResponse(res, "Internal server error", 500, error.message);
    }
};

exports.deleteFacilityRecord = async (req, res) => {
    try {
        const { facilityId } = req.params;

        if (!facilityId || isNaN(parseInt(facilityId))) {
            return sendErrorResponse(res, "Invalid facilityId", 400);
        }

        const facility = await Facility.findOne({ where: { facilityId } });

        if (!facility) {
            return sendErrorResponse(res, "Facility not found", 404);
        }

        await Facility.destroy({ where: { facilityId } });

        return sendSuccessResponse(res, "Facility deleted successfully", facility);
    } catch (error) {
        console.error("Error deleting facility:", error);
        return sendErrorResponse(res, "Internal server error", 500, error.message);
    }
};
exports.getFacilityDataById = async (req, res) => {
    try {
      const { facilityId } = req.params;
      const facility = await Facility.findOne({ where: { facilityId } });
  
      if (!facility) {
        return res.status(404).json({ message: "Facility not found" });
      }
  
      return res.status(200).json(facility);
    } catch (err) {
      console.error("Error fetching Facility by ID:", err);
      return res.status(500).json({ message: "Server error" });
    }
  };
