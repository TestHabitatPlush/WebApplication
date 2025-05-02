const { Op } = require("sequelize");
const Visitor_new_visitentry = require("../models/Visitor_new_visitentry");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const visitorRelationship = require("../models/visitorRelationship");
const { generateQRCodeImage } = require("../utils/qrCode.js");

exports.createVisitorNewVisitEntryController = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const {
      visit_expect_date_of_entry_date,
      visit_name,
      visit_type_Id,
      visit_mobileno,
      visit_porpous,
      visit_location,
      relationship,
      visit_valid_till_date,
      societyId,
      senderId,
    } = req.body;


    if (
      !visit_expect_date_of_entry_date ||
      !visit_name ||
      !visit_type_Id ||
      !visit_mobileno ||
      !visit_porpous ||
      !visit_valid_till_date||
      !societyId ||
      !senderId
    ) {
      return sendErrorResponse(res, "Enter All Details", 400);
    }

    const visitorRelationshipEntry = await visitorRelationship.findOne({
      where: {
        Visit_relation_Id: visit_type_Id,
        societyId: societyId,
      },
    });

    if (!visitorRelationshipEntry) {
      return sendErrorResponse(res, "Invalid Visit Relation Id or SocietyId", 400);
    }

    const newVisitorEntryData = {
      visit_expect_date_of_entry_date,
      visit_name,
      visit_type_Id: parseInt(visit_type_Id),
      visit_mobileno: parseInt(visit_mobileno),
      relationship,
      visit_porpous,
      visit_valid_till_date,
      societyId,
      senderId,
    };

    if (visit_location) {
      newVisitorEntryData.visit_location = visit_location;
    }
    const result = await Visitor_new_visitentry.create(newVisitorEntryData);
    const qrData = {
      visit_entry_Id: result.visit_entry_Id,
      societyId: result.societyId,
      visit_name: result.visit_name,
      visit_mobileno: result.visit_mobileno,
      visit_porpous: result.visit_porpous,
      relationship: result.relationship || null,
      senderId: result.senderId,
      timestamp: new Date().toISOString(),
    };
    const qrCodeBuffer = await generateQRCodeImage(JSON.stringify(qrData));
    await result.update({ qrCodeImage: qrCodeBuffer });
    const qrCodeBase64 = qrCodeBuffer.toString("base64");

    return sendSuccessResponse(
      res,
      "New Visitor Entry created successfully",
      {
        result,
        qrCode: `data:image/png;base64,${qrCodeBase64}`,
      },
      201
    );
  } catch (err) {
    console.error("Error creating visitor entry:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};


exports.newVisitorListTable = async (req, res) => {
  try {
    console.log("Visitor list handler");
    const { societyId, startdate, enddate, status, mobileno } = req.query;

    if (!societyId) {
      return sendErrorResponse(res, "Enter Society Id", 400);
    }

    const whereClause = {};

    const pagination = {
      page: parseInt(req.query.page) || 0,
      pageSize: parseInt(req.query.pageSize) || 10,
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
      whereClause.visit_mobileno = { [Op.like]: `%${mobileno}% `};
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
  }
};

exports.getVisiterEntry = async (req, res) => {
  try {
    const { visit_entry_Id } = req.params;

    if (!visit_entry_Id) {
      return sendErrorResponse(res, "Enter Visit Entry Id", 400);
    }

    const visitEntryId = parseInt(visit_entry_Id);

    if (isNaN(visitEntryId)) {
      return sendErrorResponse(res, "Invalid Visit Entry Id", 400);
    }

    const visitorEntry = await Visitor_new_visitentry.findByPk(visitEntryId, {
      where: { isDeleted: false },
    });

    if (!visitorEntry) {
      return sendErrorResponse(res, "Visitor entry not found", 404);
    }

    const qrData = {
      visit_entry_Id: visitorEntry.visit_entry_Id,
      societyId: visitorEntry.societyId,
      visit_name: visitorEntry.visit_name,
      visit_mobileno: visitorEntry.visit_mobileno,
      visit_porpous: visitorEntry.visit_porpous,
      relationship:visitorEntry.relationship,
      senderId: visitorEntry.senderId,
      timestamp: new Date().toISOString(),
    };

    const qrCodeBuffer = await generateQRCodeImage(JSON.stringify(qrData));
    const qrCodeBase64 = qrCodeBuffer.toString("base64");

    return sendSuccessResponse(
      res,
      "Visitor Entry fetched successfully",
      {
        visitorEntry,
        qrCode:` data:image/png;base64,${qrCodeBase64}`,
      },
      200
    );
  } catch (err) {
    console.error("Error fetching visitor entry:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.deleteVisitorController = async (req, res) => {
  try {
    const { visit_entry_Id } = req.params;

    if (!visit_entry_Id) {
      return res.status(400).json({ message: "Visit Entry ID is required" });
    }

    // Find the visitor entry to be deleted (it should not already be marked as deleted)
    const visitorEntry = await Visitor_new_visitentry.findOne({
      where: { visit_entry_Id, isDeleted: false },
    });

    if (!visitorEntry) {
      return res.status(404).json({ message: "No visitor entry found with the provided ID or it is already deleted" });
    }

    // Update the visitor entry to mark as deleted
    visitorEntry.isDeleted = true;
    await visitorEntry.save();  // This ensures the change is persisted in the database

    res.status(200).json({ message: "Visitor deleted successfully" });
  } catch (err) {
    console.error("Error deleting visitor:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      details: err.message,
    });
  }
};

//VIEW VISITOR DATA BY ID IN VISITOR LIST TABLE

exports.getVisitorById = async (req, res) => {
  try {
    const { visit_entry_Id } = req.params; // Assuming visit_entry_Id is passed in URL as a parameter

    if (!visit_entry_Id) {
      return res.status(400).json({ message: "Visit Entry ID is required" });
    }

    const visitorEntry = await Visitor_new_visitentry.findOne({
      where: { visit_entry_Id, isDeleted: false },
    });

    if (!visitorEntry) {
      return res.status(404).json({ message: "Visitor entry not found or it has been deleted" });
    }

    res.status(200).json({
      message: "Visitor Entry fetched successfully",
      data: visitorEntry,
    });
  } catch (err) {
    console.error("Error fetching visitor entry:", err);
    return res.status(500).json({ message: "Internal Server Error", details: err.message });
  }
};

exports.getQRCode = async (req, res) => {
  try {
    const { visit_entry_Id } = req.params;

    if (!visit_entry_Id) {
      return sendErrorResponse(res, "Please provide Visit Entry Id", 400);
    }

    const visitEntryId = parseInt(visit_entry_Id);

    if (isNaN(visitEntryId)) {
      return sendErrorResponse(res, "Invalid Visit Entry Id", 400);
    }

    const visitorEntry = await Visitor_new_visitentry.findByPk(visitEntryId);

    if (!visitorEntry) {
      return sendErrorResponse(res, "Visitor entry not found", 404);
    }

    if (!visitorEntry.qrCodeImage) {
      return sendErrorResponse(res, "QR Code not generated for this visitor entry", 404);
    }

    const qrCodeBase64 = visitorEntry.qrCodeImage.toString("base64");

    return sendSuccessResponse(
      res,
      "QR Code fetched successfully",
      {
        qrCode: `data:image/png;base64,${qrCodeBase64}`,
      },
      200
    );
  } catch (err) {
    console.error("Error fetching QR Code:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};