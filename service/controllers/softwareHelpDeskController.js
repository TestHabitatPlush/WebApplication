<<<<<<< HEAD
const { Op, where } = require("sequelize");
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

exports.createTicketPurpous = async (req, res) => {
  try {
    console.log("create ticket purpous controller");
    console.log(req.body);
    const { societyId, userId } = req.body;
    if (!data || !societyId || !userId) {
      return sendErrorResponse(res, "Enter All Details", 400);
=======

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
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
    }
    const result = await Ticket_Purpose.create({
      purpose_Details: data,
      ...req.body,
    });
    // console.log(result);

<<<<<<< HEAD
    return sendSuccessResponse(res, "Notice created successfully", result, 201);
=======
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
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

<<<<<<< HEAD
exports.getTicketPurpous = async (req, res) => {
  try {
    console.log("Get Ticket Purpose Controller");
    console.log(req.query);

    const { societyId } = req.query;
    console.log(req.query);

    if (!societyId) {
      return sendErrorResponse(res, "Enter Socity Id", 400);
    }
    const whereClause = {};

    const pagination = {
      page: parseInt(req.query.page) || 0,
      pageSize: parseInt(req.query.pageSize) || 10,
    };

    if (societyId) {
      whereClause.societyId = societyId;
    }
    // if (userGroupId) {
    //   whereClause.userGroupId = userGroupId;
    // }

    const { count, rows } = await Ticket_Purpose.findAndCountAll({
      where: whereClause,
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
    });
    const totalPages = Math.ceil(count / pagination.pageSize);
    res.status(200).json({
      message: "Ticket purpous List fetched successfully",
      data: rows,
      total: count,
      totalPages,
    });
=======
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
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

<<<<<<< HEAD
exports.getTicketListView = async (req, res) => {
  // console.log("get ticketlist view", req.query);
  try {
    const { societyId } = req.query;
    if (!societyId) {
      return res.status(400).json({ message: "socity_id is required" });
    }
    const ticketPurposes = await Ticket_Purpose.findAll({
      where: { societyId },
    });
    return sendSuccessResponse(
      res,
      "ticket list sent  successfully",
      ticketPurposes,
      201
=======
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
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

<<<<<<< HEAD
exports.createTicket = async (req, res) => {
  console.log(req.body);
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
    return sendErrorResponse(res, "Enter All Details", 400);
  }

  const result = await Ticket_Summery.create({
    ticketCategorisationId,
    ticketPurpose,
    ticketTitle,
    societyId,
    userId,
  });
  console.log(result);
  const { ticket_Id } = result;
  console.log(ticket_Id);
  const resultDetails = await Ticket_Details.create({
    ticket_status_Id: 1,
    // Ticket_Desc_Update_User_ID: 1,
    ticket_details_description,
    ticket_Id,
    societyId,
    userId,
  });

  // console.log("resultDetails", resultDetails);

  // console.log("ticket_Id", ticket_Id);

  return sendSuccessResponse(
    res,
    "Create Ticket created successfully",
    { result, resultDetails },
    201
  );
};

exports.updateTicketPurpous = async (req, res) => {
  // console.log("update ticket porpous", req.params);
  try {
    const { ticket_purpose_Id } = req.params;

    const [updatedRows] = await Ticket_Purpose.update(req.body, {
      where: { ticket_purpose_Id },
    });

    // Log how many rows were updated
    console.log("Number of updated rows:", updatedRows);

    // Check if any rows were updated
    if (updatedRows === 0) {
      return res
        .status(404)
        .json({ error: "Ticket not found or no changes were made." });
    }

    // Send a success response if updated
    return res
      .status(201)
      .json({ message: "Ticket purpous updated successfully." });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getTicketTable = async (req, res) => {
  try {
    console.log(req.query);

    const { societyId } = req.query;

    if (!societyId) {
      return sendErrorResponse(res, "Enter Socity Id", 400);
    }

    const pagination = {
      page: parseInt(req.query.page) || 0,
      pageSize: parseInt(req.query.pageSize) || 10,
    };
    const whereClause = {};

    if (societyId) {
      whereClause.societyId = societyId;
    }
    const { count, rows } = await Ticket_Summery.findAndCountAll({
      where: whereClause,
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
    });
    const totalPages = Math.ceil(count / pagination.pageSize);
    console.log(rows);

    const result = await Promise.all(
      rows.map(async (el) => {
        const { ticket_Id } = el.dataValues;
        console.log(el);

        const ticketResult = await Ticket_Details.findOne({
          where: { ticket_Id },
          include: [{ model: ref_ticket_status }],
        });

        return {
          ...el.dataValues,
          ticketDetails: ticketResult ? ticketResult.dataValues : null,
        };
      })
    );

    res.status(200).json({
      message: "Notice fetched successfully",
      data: result,
      total: count,
      totalPages,
    });
  } catch (err) {
    console.error("Error creating notice:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.createrequestType = async (req, res) => {
  console.log("create ref ticket catagorisation");
  try {
    const { ticket_catagorisation_type } = req.body;
    if (!ticket_catagorisation_type) {
      return res
        .status(400)
        .json({ message: "ticket catagorisation is required" });
    }

    const existingTicketCatagorisation =
      await ref_ticket_catagorisation.findOne({
        where: { ticket_catagorisation_type },
      });
    if (existingTicketCatagorisation) {
      return res
        .status(409)
        .json({ message: "status description is already exists" });
    }
    const newTicketCatagorisation = await ref_ticket_catagorisation.create({
      ticket_catagorisation_type,
    });

    // Send success response
    res.status(201).json({
      message: "newStatusDescription created successfully",
      data: newTicketCatagorisation,
    });
  } catch (error) {
    console.error("Error creating RefUserGroup:", error);
    res.status(500).json({ message: "Error creating RefUserGroup", error });
  }
};

exports.getrequestType = async (req, res) => {
  console.log("get request type");
  try {
    const result = await ref_ticket_catagorisation.findAll();
    // console.log(result);
    res.status(201).json({
      message: "newStatusDescription get successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating RefUserGroup:", error);
    res.status(500).json({ message: "Error creating RefUserGroup", error });
=======
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
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
  }
};

exports.getAccessManagementMember = async (req, res) => {
  try {
<<<<<<< HEAD
    console.log(req.query);
    const { societyId } = req.query;
    if (!societyId) {
      return sendErrorResponse(res, "Enter Socity Id", 400);
    }

    const pagination = {
      page: parseInt(req.query.page) || 0,
      pageSize: parseInt(req.query.pageSize) || 10,
    };
    const whereClause = { isManagementCommittee: true };
    // if (disscussionheading) {
    //   whereClause.noticeHeading = { [Op.like]: `%${disscussionheading}%` }; // Case-insensitive search
    // }
    if (societyId) {
      whereClause.societyId = societyId;
    }
    // if (userGroupId) {
    //   whereClause.userGroupId = userGroupId;
    // }

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
      totalPages: Math.ceil(count / pageSize),
    }, 200);
  } catch (err) {
    console.error("Error creating notice:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.createAccessManagementtable = async (req, res) => {
  console.log("create Access Management table");
  try {
    console.log("Access management table created table", req.body);
    const { societyId, userId, approval } = req.body;
    if (!societyId || !userId || !approval) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const result = await Socity_HelpDesk_Access_Management.create({
      societyId: societyId,
      userId: userId,
      module_Access: approval,
      Update_User_Id: userId,
    });
    // console.log(result);

    return sendSuccessResponse(res, "Notice created successfully", result, 201);
  } catch (error) {
    console.error("Error creating RefUserGroup:", error);
    res.status(500).json({ message: "Error creating RefUserGroup", error });
=======
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
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
  }
};
