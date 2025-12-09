
const ref_ticket_status = require("../models/ref_ticket_status");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");


exports.createRefTicketStatus = async (req, res) => {
  try {
    const { ticket_status_description } = req.body;

    if (!ticket_status_description) {
      return sendErrorResponse(res, "Status description required", 400);
    }

    const allowedValues = getEnumValues();
    if (!allowedValues.includes(ticket_status_description)) {
      return sendErrorResponse(
        res,
        `Invalid status. Allowed: ${allowedValues.join(", ")}`,
        400
      );
    }

    const exists = await ref_ticket_status.findOne({
      where: { ticket_status_description },
    });

    if (exists) {
      return sendErrorResponse(res, "Status already exists", 409);
    }

    const newStatus = await ref_ticket_status.create({ ticket_status_description });

    return sendSuccessResponse(res, "Status created", newStatus, 201);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.getRefTicketStatus = async (req, res) => {
  try {
    const all = await ref_ticket_status.findAll();
    return sendSuccessResponse(res, "Statuses fetched", all, 200);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

