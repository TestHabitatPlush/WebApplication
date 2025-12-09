
const { Op } = require("sequelize");
const upload = require("../middleware/upload");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const { checkCreatorAccess, checkSoftwareUpdateAccess } = require("../utils/access");

const {
  Software_Ticket_Purpose,
  Software_Ticket_Summary,
  Software_Ticket_Details,
  Software_Ref_Ticket_Status,
  Software_HelpDesk_Access_Management,
  User,
  Role,
} = require("../models");

// ------------------- Ticket Status -------------------
exports.createSoftwareRefTicketStatus = async (req, res) => {
  try {
    const { ticket_status_description } = req.body;
    if (!ticket_status_description)
      return sendErrorResponse(res, "Status description required", 400);

    const exists = await Software_Ref_Ticket_Status.findOne({
      where: { ticket_status_description },
    });
    if (exists) return sendErrorResponse(res, "Status already exists", 409);

    const newStatus = await Software_Ref_Ticket_Status.create({
      ticket_status_description,
    });
    return sendSuccessResponse(res, "Status created", newStatus, 201);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.getSoftwareRefTicketStatus = async (req, res) => {
  try {
    const all = await Software_Ref_Ticket_Status.findAll();
    return sendSuccessResponse(res, "Statuses fetched", all, 200);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// ------------------- Ticket Purpose -------------------
exports.createSoftwareTicketPurpose = async (req, res) => {
  try {
    const { purpose_Details } = req.body;
    const { societyId, userId } = req.params;
    if (!purpose_Details || !societyId || !userId) {
      return sendErrorResponse(res, "Enter all details", 400);
    }

    const result = await Software_Ticket_Purpose.create({
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
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.getSoftwareTicketPurpose = async (req, res) => {
  try {
    const { societyId } = req.params;
    const { page = 0, pageSize = 10 } = req.query;
    if (!societyId) return sendErrorResponse(res, "Enter Society Id", 400);

    const { count, rows } = await Software_Ticket_Purpose.findAndCountAll({
      where: { societyId },
      limit: +pageSize,
      offset: page * pageSize,
    });

    return sendSuccessResponse(
      res,
      "Ticket purpose list fetched successfully",
      {
        rows,
        total: count,
        totalPages: Math.ceil(count / pageSize),
      }
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.updateSoftwareTicketPurpose = async (req, res) => {
  try {
    const { ticket_purpose_Id } = req.params;
    const [updatedRows] = await Software_Ticket_Purpose.update(req.body, {
      where: { ticket_purpose_Id },
    });

    if (!updatedRows)
      return sendErrorResponse(
        res,
        "Ticket purpose not found or no changes made",
        404
      );

    return sendSuccessResponse(
      res,
      "Ticket purpose updated successfully",
      null,
      200
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.getSoftwareTicketListView = async (req, res) => {
  try {
    const { societyId } = req.params;
    if (!societyId)
      return sendErrorResponse(res, "Society ID is required", 400);

    const purposes = await Software_Ticket_Purpose.findAll({
      where: { societyId, status: "active" },
      attributes: ["ticket_purpose_Id", "purpose_Details"],
    });

    return sendSuccessResponse(
      res,
      "Ticket list sent successfully",
      purposes,
      200
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// ------------------- Create Ticket -------------------
exports.createSoftwareTicket = (req, res) => {
  upload.fields([{ name: "ticket_attachment_details" }])(
    req,
    res,
    async (err) => {
      if (err)
        return sendErrorResponse(res, "File upload error", 400, err.message);

      try {
        const {
          ticket_title,
          ticket_description,
          ticket_purpose_Id,
          request_type,
        } = req.body;

        const { userId, societyId } = req.params;

        const canAccess = await checkCreatorAccess(userId);
        if (!canAccess)
          return sendErrorResponse(
            res,
            "User not allowed to create tickets",
            403
          );

        if (!ticket_title || !ticket_description || !ticket_purpose_Id)
          return sendErrorResponse(res, "All fields are required", 400);

        const user = await User.findOne({ where: { userId, societyId } });
        if (!user)
          return sendErrorResponse(res, "User not found in this society", 404);

        const purpose = await Software_Ticket_Purpose.findByPk(ticket_purpose_Id);
        if (!purpose)
          return sendErrorResponse(res, "Invalid ticket purpose", 400);

        const initialStatus = await Software_Ref_Ticket_Status.findOne({
          where: { ticket_status_description: "NEW" },
        });
        if (!initialStatus)
          return sendErrorResponse(res, "Initial status not configured", 500);

        const attachmentFile =
          req.files?.ticket_attachment_details?.[0] || null;

        const summary = await Software_Ticket_Summary.create({
          ticket_title,
          ticket_description,
          ticket_purpose_Id,
          request_type,
          userId,
          societyId,
          ticket_status_Id: initialStatus.ticket_status_Id, 
          ticket_attachment_details: attachmentFile?.filename || null,
        });

        await Software_Ticket_Details.create({
          ticket_details_description: ticket_description,
          ticket_status_Id: initialStatus.ticket_status_Id,
          ticket_Id: summary.ticket_Id,
          userId,
          societyId,
          ticket_comment: "Ticket created successfully",
          ticket_attachment_details: attachmentFile?.filename || null,
        });

        return sendSuccessResponse(res, "Ticket created successfully", summary); 
      } catch (error) {
        console.error(error);
        return sendErrorResponse(
          res,
          "Failed to create ticket",
          500,
          error.message
        );
      }
    }
  );
};

// ------------------- Ticket Table -------------------
exports.getSoftwareTicketTable = async (req, res) => {
  const { userId, societyId } = req.params;
  const {
    page = 1,
    pageSize = 10,
    ticketNumber,
    ticketTitle,
    startDate,
    endDate,
    status,
  } = req.query;

  const offset = (page - 1) * pageSize;

  const where = {
    societyId,
    userId,
    ...(ticketNumber ? { ticket_Id: Number(ticketNumber) } : {}),
    ...(ticketTitle ? { ticket_title: { [Op.like]: `%${ticketTitle}%` } } : {}),
    ...(startDate && endDate
      ? {
          createdAt: {
            [Op.between]: [
              new Date(startDate + "T00:00:00"),
              new Date(endDate + "T23:59:59"),
            ],
          },
        }
      : startDate
      ? {
          createdAt: { [Op.gte]: new Date(startDate + "T00:00:00") },
        }
      : endDate
      ? {
          createdAt: { [Op.lte]: new Date(endDate + "T23:59:59") },
        }
      : {}),
  };

  try {
    const tickets = await Software_Ticket_Summary.findAndCountAll({
      where,
      offset,
      limit: parseInt(pageSize),
      include: [
        {
          model: Software_Ticket_Purpose,
          attributes: ["ticket_purpose_Id", "purpose_Details"],
        },
        {
          model: Software_Ticket_Details,
          include: [
            {
              model: Software_Ref_Ticket_Status,
              attributes: ["ticket_status_Id", "ticket_status_description"],
              ...(status
                ? { where: { ticket_status_description: status } }
                : {}),
            },
            {
              model: User,
              as: "assignedUser",
              attributes: ["userId", "firstName", "lastName"],
            },
            {
              model: User,
              as: "updatedUser",
              attributes: ["userId", "firstName", "lastName"],
            },
          ],
        },
      ],
      distinct: true,
      order: [["ticket_Id", "DESC"]],
    });

    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ------------------- Ticket Update -------------------
exports.updateSoftwareTicketStatusAndRemarks = async (req, res) => {
  try {
    const { ticket_Id } = req.params;
    const { userId, assigned_to, ticket_status_description, ticket_comment } =
      req.body;

    const canUpdate = await checkSoftwareUpdateAccess(userId);
    if (!canUpdate) {
      return sendErrorResponse(res, "Not allowed to update ticket", 403);
    }

    if (!ticket_status_description || !userId) {
      return sendErrorResponse(res, "Missing status or userId", 400);
    }

    const ticketSummary = await Software_Ticket_Summary.findByPk(ticket_Id);
    if (!ticketSummary) {
      return sendErrorResponse(res, "Ticket not found", 404);
    }

    const status = await Software_Ref_Ticket_Status.findOne({
      where: { ticket_status_description },
    });
    if (!status) {
      return sendErrorResponse(res, "Invalid ticket status", 400);
    }

    let currentStatus = null;
    if (ticketSummary.ticket_status_Id) {
      currentStatus = await Software_Ref_Ticket_Status.findByPk(
        ticketSummary.ticket_status_Id
      );
    }

    const validTransitions = {
      NEW: ["OPEN"],
      OPEN: ["IN-PROGRESS"],
      "IN-PROGRESS": ["CLOSE"],
      CLOSE: ["REOPEN"],
      REOPEN: ["IN-PROGRESS"],
    };

    if (
      currentStatus &&
      !validTransitions[currentStatus.ticket_status_description]?.includes(
        ticket_status_description
      )
    ) {
      return sendErrorResponse(
        res,
        `Invalid status transition: ${currentStatus.ticket_status_description} → ${ticket_status_description}`,
        400
      );
    }

    if (!ticket_comment || ticket_comment.trim() === "") {
      return sendErrorResponse(
        res,
        "Remarks are required for status update",
        400
      );
    }

    const assignedToFinal = assigned_to ?? ticketSummary.assigned_to ?? null;

    ticketSummary.assigned_to = assignedToFinal;
    ticketSummary.ticket_status_Id = status.ticket_status_Id;
    ticketSummary.updated_by_user_id = userId;
    await ticketSummary.save();

    const newDetail = await Software_Ticket_Details.create({
      ticket_Id,
      userId,
      societyId: ticketSummary.societyId,
      ticket_status_Id: status.ticket_status_Id,
      ticket_comment,
      assigned_to: assignedToFinal,
      updated_by_user_id: userId,
      ticket_details_description: ticket_comment,
    });

    return sendSuccessResponse(
      res,
      "Ticket updated successfully",
      { summary: ticketSummary, details_log: newDetail },
      200
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Failed to update ticket", 500, err.message);
  }
};

// ------------------- Access Management -------------------
exports.createSoftwareAccessManagement = async (req, res) => {
  try {
    const { societyId, userId, approval } = req.body;

    const canUpdate = await checkSoftwareUpdateAccess(userId);
    if (!canUpdate) {
      return sendErrorResponse(res, "Not allowed to manage access", 403);
    }

    if (!societyId || !userId || !approval) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const result = await Software_HelpDesk_Access_Management.create({
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
    console.error("Error creating Software Access:", error);
    res.status(500).json({ message: "Error creating Software Access", error });
  }
};

exports.getAccessManagementMember = async (req, res) => {
  try {
    const { societyId } = req.params;

    if (!societyId) {
      return sendErrorResponse(res, "Enter Society Id", 400);
    }

    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const whereClause = { societyId, isManagementCommittee: true }; // ✅ FIX: Ensure both applied

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      limit: pageSize,
      offset: page * pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);

    return sendSuccessResponse(res, "Members fetched successfully", {
      rows,
      total: count,
      totalPages,
    });
  } catch (err) {
    console.error("Error fetching access members:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};
