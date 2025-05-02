const Parking = require('../models/Parking');
const Unit = require('../models/Unit');  
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

exports.parkingBooked = async (req, res) => {
    try {
        const societyId = req.params.societyId;
        console.log("Request body: ", req.body);

        const {
            parkingSlotName,
            parkingSlotType,
            parkingUsage,
            parkingCharge,
            chargeAmount,
            unitName,
            vehicleType,
            vehicleNumber,
            bookingFrom,
            bookingTo,
        } = req.body;

        if (!parkingSlotName || !parkingSlotType || !parkingUsage || !parkingCharge || !chargeAmount) {
            return sendErrorResponse(res, "All fields are required", 400);
        }

        const unitExists = await Unit.findOne({
            where: { unitName, societyId }
        });

        if (!unitExists) {
            return sendErrorResponse(res, "Invalid unitName or does not belong to this society", 400);
        }

        const existingParkingSlot = await Parking.findOne({
            where: {
                parkingSlotName,
                parkingSlotType,
                parkingUsage,
                parkingCharge,
                chargeAmount,
                societyId,
                unitName,
                ...(bookingFrom && { bookingFrom }),
                ...(bookingTo && { bookingTo }),
            }
        });

        if (existingParkingSlot) {
            return sendErrorResponse(res, "Parking Slot Already Booked", 400);
        }

        const parkingSlot = await Parking.create({
            parkingSlotName,
            parkingSlotType,
            parkingUsage,
            parkingCharge,
            chargeAmount,
            unitName,
            vehicleType,
            vehicleNumber,
            bookingFrom,
            bookingTo,
            societyId
        });

        console.log("Parking Slot Created:", parkingSlot);

        return sendSuccessResponse(res, "Parking Slot booked successfully", parkingSlot);

    } catch (error) {
        console.error("Error Creating Parking:", error);
        return sendErrorResponse(res, "Internal server error", 500, error.message);
    }
};

exports.getParkingSlot = async (req,res)=>{
    try{
        const societyId = req.params.societyId;
        if (!societyId){
            return sendErrorResponse(res, "Society ID is required", 400);
        }
        const parkingBook = await Parking.findAll({
            where:{ societyId},
        });
        if(parkingBook.length==0){
            return sendSuccessResponse(res, "No Parking Slot booked yet", parkingBook);
        }
        return sendSuccessResponse(res, "Parking Slot booked successfully", parkingBook);
    }
        catch (error) {
            console.error("Error fetching Parking records:", error);
            return sendErrorResponse(res, "Internal server error", 500, error.message);
    }
}