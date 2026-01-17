const { Op } = require("sequelize");
const {
  Ticket_Purpose,
  Ticket_Summery,
  Ticket_Details,
  ref_ticket_catagorisation,
  ref_ticket_status,
  User,
  Socity_HelpDesk_Access_Management,
} = require("../models");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

/* =======================
   Ticket Purpose
======================= */

exports.createTicketPurpous = async (req, res) => {
  try {
    const { purpose_Details, societyId, userId } = req.body;

    if (!purpose_Details || !societyId || !userId) {
      return sendErrorResponse(res, "Enter all details", 400);
    }

    const result = await Ticket_Purpose.create({
      purpose_Details,
      societyId,
      userId,
    });

    return sendSuccessResponse(
      res,
      "Ticket purpose created successfully",
      result,
      201
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500);
  }
};

exports.getTicketPurpous = async (req, res) => {
  try {
    const { societyId } = req.query;
    if (!societyId) {
      return sendErrorResponse(res, "Enter Society Id", 400);
    }

    const pagination = {
      page: parseInt(req.query.page) || 0,
      pageSize: parseInt(req.query.pageSize) || 10,
    };

    const { count, rows } = await Ticket_Purpose.findAndCountAll({
      where: { societyId },
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
    });

    res.status(200).json({
      message: "Ticket purpose list fetched successfully",
      data: rows,
      total: count,
      totalPages: Math.ceil(count / pagination.pageSize),
    });
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500);
  }
};

exports.getTicketListView = async (req, res) => {
  try {
    const { societyId } = req.params;
    if (!societyId) {
      return sendErrorResponse(res, "Society Id is required", 400);
    }

    const result = await Ticket_Purpose.findAll({
      where: { societyId },
    });

    return sendSuccessResponse(
      res,
      "Ticket purpose dropdown fetched successfully",
      result,
      200
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500);
  }
};

exports.updateTicketPurpous = async (req, res) => {
  try {
    const { ticket_purpose_Id } = req.params;

    const [updated] = await Ticket_Purpose.update(req.body, {
      where: { ticket_purpose_Id },
    });

    if (!updated) {
      return sendErrorResponse(res, "Ticket purpose not found", 404);
    }

    return sendSuccessResponse(
      res,
      "Ticket purpose updated successfully",
      null,
      200
    );
  } catch (error) {
    return sendErrorResponse(res, error.message, 400);
  }
};

/* =======================
   Ticket
======================= */

exports.createTicket = async (req, res) => {
  try {
    const {
      ticketCategorisationId,
      ticketPurpose,
      ticketTitle,
      ticket_details_description,
      societyId,
      userId,
    } = req.body;

    if (
      !ticketCategorisationId ||
      !ticketPurpose ||
      !ticketTitle ||
      !ticket_details_description ||
      !societyId ||
      !userId
    ) {
      return sendErrorResponse(res, "Enter all details", 400);
    }

    const ticketSummary = await Ticket_Summery.create({
      ticketCategorisationId,
      ticketPurpose,
      ticketTitle,
      societyId,
      userId,
    });

    const ticketDetails = await Ticket_Details.create({
      ticket_Id: ticketSummary.ticket_Id,
      ticket_status_Id: 1,
      ticket_details_description,
      societyId,
      userId,
    });

    return sendSuccessResponse(
      res,
      "Ticket created successfully",
      { ticketSummary, ticketDetails },
      201
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500);
  }
};

exports.getTicketTable = async (req, res) => {
  try {
    const { societyId } = req.query;
    if (!societyId) {
      return sendErrorResponse(res, "Enter Society Id", 400);
    }

    const pagination = {
      page: parseInt(req.query.page) || 0,
      pageSize: parseInt(req.query.pageSize) || 10,
    };

    const { count, rows } = await Ticket_Summery.findAndCountAll({
      where: { societyId },
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
    });

    const result = await Promise.all(
      rows.map(async (el) => {
        const details = await Ticket_Details.findOne({
          where: { ticket_Id: el.ticket_Id },
          include: [{ model: ref_ticket_status }],
        });

        return {
          ...el.dataValues,
          ticketDetails: details,
        };
      })
    );

    res.status(200).json({
      message: "Ticket list fetched successfully",
      data: result,
      total: count,
      totalPages: Math.ceil(count / pagination.pageSize),
    });
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500);
  }
};

/* =======================
   Request Type
======================= */

exports.createrequestType = async (req, res) => {
  try {
    const { ticket_catagorisation_type } = req.body;
    if (!ticket_catagorisation_type) {
      return sendErrorResponse(res, "Request type is required", 400);
    }

    const exists = await ref_ticket_catagorisation.findOne({
      where: { ticket_catagorisation_type },
    });

    if (exists) {
      return sendErrorResponse(res, "Request type already exists", 409);
    }

    const result = await ref_ticket_catagorisation.create({
      ticket_catagorisation_type,
    });

    return sendSuccessResponse(
      res,
      "Request type created successfully",
      result,
      201
    );
  } catch (error) {
    return sendErrorResponse(res, "Internal server error", 500);
  }
};

exports.getrequestType = async (req, res) => {
  try {
    const result = await ref_ticket_catagorisation.findAll();
    return sendSuccessResponse(
      res,
      "Request type list fetched successfully",
      result,
      200
    );
  } catch (error) {
    return sendErrorResponse(res, "Internal server error", 500);
  }
};

/* =======================
   Access Management
======================= */

exports.getAccessManagementMember = async (req, res) => {
  try {
    const { societyId } = req.query;
    if (!societyId) {
      return sendErrorResponse(res, "Enter Society Id", 400);
    }

    const result = await User.findAll({
      where: {
        societyId,
        isManagementCommittee: true,
      },
    });

    return sendSuccessResponse(
      res,
      "Access management members fetched",
      result,
      200
    );
  } catch (err) {
    return sendErrorResponse(res, "Internal server error", 500);
  }
};

exports.createAccessManagementtable = async (req, res) => {
  try {
    const { societyId, userId, approval } = req.body;

    if (!societyId || !userId || !approval) {
      return sendErrorResponse(res, "All fields are required", 400);
    }

    const result = await Socity_HelpDesk_Access_Management.create({
      societyId,
      userId,
      module_Access: approval,
      Update_User_Id: userId,
    });

    return sendSuccessResponse(
      res,
      "Access management created successfully",
      result,
      201
    );
  } catch (error) {
    return sendErrorResponse(res, "Internal server error", 500);
  }
};
