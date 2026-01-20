const { Op } = require("sequelize");
const {
  Software_Ticket_Purpose,
  Software_Ticket_Summary,
  Software_Ticket_Details,
  Software_Ref_Ticket_Status,
  User,
  Software_HelpDesk_Access_Management,
  Role,
} = require("../models");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

const upload = require("../middleware/upload");
// const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

const {
  checkCreatorAccess,
  checkSocietyUpdateAccess,
} = require("../utils/access");

exports.createRefTicketStatus = async (req, res) => {
  try {
    const { purpose_Details, societyId, userId } = req.body;

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

exports.getRefTicketStatus = async (req, res) => {
  try {
    const all = await Software_Ref_Ticket_Status.findAll();
    return sendSuccessResponse(res, "Statuses fetched", all, 200);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.createTicketPurpose = async (req, res) => {
  try {
    const { purpose_Details } = req.body;
    const { societyId, userId } = req.params;
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

exports.getTicketPurpose = async (req, res) => {
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

exports.updateTicketPurpose = async (req, res) => {
  try {
    const { ticket_purpose_Id } = req.params;

    const [updatedRows] = await Software_Ticket_Purpose.update(req.body, {
      where: { ticket_purpose_Id },
    });

    if (!updatedRows) {
      return sendErrorResponse(
        res,
        "Ticket purpose not found or no changes made",
        404
      );
    }

    const updatedPurpose = await Software_Ticket_Purpose.findByPk(
      ticket_purpose_Id
    );

    return sendSuccessResponse(
      res,
      "Ticket purpose updated successfully",
      updatedPurpose,
      200
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};


exports.getTicketListView = async (req, res) => {
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

exports.createTicket = (req, res) => {
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

        const purpose = await Software_Ticket_Purpose.findByPk(
          ticket_purpose_Id
        );
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

        return sendSuccessResponse(
          res,
          "Ticket created successfully",
          summary,
          201
        );
      } catch (error) {
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

exports.getTicketTable = async (req, res) => {
  try {
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

    const canAccess = await checkCreatorAccess(userId);
    if (!canAccess) {
      return sendErrorResponse(res, "User not allowed to view tickets", 403);
    }

    const user = await User.findByPk(userId, {
      include: [{ model: Role, attributes: ["roleCategory"] }],
    });

    if (!user || !user.Role) {
      return sendErrorResponse(res, "User role not found", 403);
    }

    const roleCategory = user.Role.roleCategory;
    const offset = (page - 1) * pageSize;

    // ---------- WHERE condition ----------
    const where = {
      societyId,

      ...(roleCategory === "society_moderator" ||
      roleCategory === "management_committee"
        ? {}
        : { userId }),

      ...(ticketNumber ? { ticket_Id: Number(ticketNumber) } : {}),

      ...(ticketTitle
        ? { ticket_title: { [Op.like]: `%${ticketTitle}%` } }
        : {}),

      ...(startDate && endDate
        ? {
            createdAt: {
              [Op.between]: [
                new Date(`${startDate}T00:00:00`),
                new Date(`${endDate}T23:59:59`),
              ],
            },
          }
        : startDate
        ? { createdAt: { [Op.gte]: new Date(`${startDate}T00:00:00`) } }
        : endDate
        ? { createdAt: { [Op.lte]: new Date(`${endDate}T23:59:59`) } }
        : {}),
    };

    if (status) {
      const statusRow = await Software_Ref_Ticket_Status.findOne({
        where: { ticket_status_description: status },
        attributes: ["ticket_status_Id"],
      });

      if (!statusRow) {
        return sendSuccessResponse(res, "Tickets fetched successfully", {
          rows: [],
          total: 0,
          totalPages: 0,
        });
      }

      where.ticket_status_Id = statusRow.ticket_status_Id;
    }

    const { count, rows } = await Software_Ticket_Summary.findAndCountAll({
      where,
      offset,
      limit: parseInt(pageSize),
      order: [["ticket_Id", "DESC"]],
      distinct: true,

      include: [
        {
          model: Software_Ticket_Details,
          as: "Software_Ticket_Details",
          limit: 1,
          order: [["createdAt", "DESC"]],
          required: false,

          include: [
            {
              model: Software_Ref_Ticket_Status,
              as: "software_ref_ticket_status",
              attributes: ["ticket_status_description"],
            },
            {
              model: User,
              as: "assignedTo",
              attributes: ["firstName", "lastName"],
            },
            {
              model: User,
              as: "updatedBy",
              attributes: ["firstName", "lastName"],
            },
            {
              model: User,
              as: "createdBy",
              attributes: ["firstName", "lastName"],
            },
          ],
        },
      ],
    });

    return sendSuccessResponse(res, "Tickets fetched successfully", {
      rows,
      total: count,
      totalPages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return sendErrorResponse(
      res,
      "Server error fetching tickets",
      500,
      error.message
    );
  }
};

exports.updateTicketStatusAndRemarks = async (req, res) => {
  try {
    const { ticket_Id } = req.params;
    const { userId, assigned_to, ticket_status_description, ticket_comment } =
      req.body;

    if (!ticket_status_description || !userId) {
      return sendErrorResponse(res, "Missing status or userId", 400);
    }

    const canUpdate = await checkSocietyUpdateAccess(userId);
    if (!canUpdate) {
      return sendErrorResponse(
        res,
        "User not allowed to update ticket status",
        403
      );
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

    const currentStatus = await Software_Ref_Ticket_Status.findByPk(
      ticketSummary.ticket_status_Id
    );
    const validTransitions = {
      NEW: ["OPEN"],
      OPEN: ["IN-PROGRESS"],
      "IN-PROGRESS": ["CLOSE"],
      CLOSE: ["REOPEN"],
      REOPEN: ["IN-PROGRESS"],
    };

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

    // Remarks required
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

    await Software_Ticket_Details.create({
      ticket_Id,
      userId,
    });

    const updatedTicket = await Software_Ticket_Summary.findByPk(ticket_Id, {
      include: [
        {
          model: Software_Ticket_Details,
          as: "Software_Ticket_Details",
          include: [
            {
              model: User,
              as: "assignedTo",
              attributes: ["userId", "firstName", "lastName"],
            },
            {
              model: User,
              as: "updatedBy",
              attributes: ["userId", "firstName", "lastName"],
            },
            {
              model: User,
              as: "createdBy",
              attributes: ["userId", "firstName", "lastName"],
            },
            {
              model: Software_Ref_Ticket_Status,
              as: "software_ref_ticket_status",
            },
          ],
        },
        { model: Software_Ticket_Purpose, as: "ticketPurpose" },
      ],
    });

    return sendSuccessResponse(
      res,
      "Ticket updated successfully",
      updatedTicket,
      200
    );
  } catch (err) {
    console.error("Error updating ticket:", err);
    return sendErrorResponse(res, "Failed to update ticket", 500, err.message);
  }
};

exports.createAccessManagementtable = async (req, res) => {
  try {
    const { societyId, userId } = req.params;
    const { approval } = req.body;

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
      "access management created successfully",
      result,
      201
    );
  } catch (error) {
    console.error("Error creating Access Management:", error);
    res
      .status(500)
      .json({ message: "Error creating Access Management", error });
  }
};

exports.getAccessManagementMember = async (req, res) => {
  try {
    console.log(req.query);

    const { societyId } = req.params;

    if (!societyId) {
      return sendErrorResponse(res, "Enter Socity Id", 400);
    }

    const pagination = {
      page: parseInt(req.query.page) || 0,
      pageSize: parseInt(req.query.pageSize) || 10,
    };
    const whereClause = { isManagementCommittee: true };

    if (societyId) {
      whereClause.societyId = societyId;
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
    });
    const totalPages = Math.ceil(count / pagination.pageSize);
    res.status(200).json({
      message: "Visitor Matrix fetched successfully",
      data: rows,
      total: count,
      totalPages,
    });
  } catch (err) {
    console.error("Error creating notice:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};
