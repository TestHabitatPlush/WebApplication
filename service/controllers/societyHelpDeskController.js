

// const { Op } = require("sequelize");
// const {
//   Ticket_Purpose,
//   Ticket_Summary,
//   Ticket_Details,
//   ref_ticket_status,
//   User,
//   Society_HelpDesk_Access_Management,
//   Role,
// } = require("../models");

// const upload = require("../middleware/upload");
// const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

// const {
//   checkCreatorAccess,
//   checkSoftwareUpdateAccess,
//   checkSocietyUpdateAccess,
// } = require("../utils/access");

// exports.createRefTicketStatus = async (req, res) => {
//   try {
//     const { ticket_status_description } = req.body;
//     if (!ticket_status_description)
//       return sendErrorResponse(res, "Status description required", 400);

//     const exists = await ref_ticket_status.findOne({
//       where: { ticket_status_description },
//     });
//     if (exists) return sendErrorResponse(res, "Status already exists", 409);

//     const newStatus = await ref_ticket_status.create({
//       ticket_status_description,
//     });
//     return sendSuccessResponse(res, "Status created", newStatus, 201);
//   } catch (err) {
//     console.error(err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.getRefTicketStatus = async (req, res) => {
//   try {
//     const all = await ref_ticket_status.findAll();
//     return sendSuccessResponse(res, "Statuses fetched", all, 200);
//   } catch (err) {
//     console.error(err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.createTicketPurpose = async (req, res) => {
//   try {
//     const { purpose_Details } = req.body;
//     const { societyId, userId } = req.params;
//     if (!purpose_Details || !societyId || !userId) {
//       return sendErrorResponse(res, "Enter all details", 400);
//     }

//     const result = await Ticket_Purpose.create({
//       purpose_Details,
//       societyId,
//       userId,
//     });
//     return sendSuccessResponse(
//       res,
//       "Ticket purpose created successfully",
//       result,
//       201
//     );
//   } catch (err) {
//     console.error(err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.getTicketPurpose = async (req, res) => {
//   try {
//     const { societyId } = req.params;
//     const { page = 0, pageSize = 10 } = req.query;
//     if (!societyId) return sendErrorResponse(res, "Enter Society Id", 400);

//     const { count, rows } = await Ticket_Purpose.findAndCountAll({
//       where: { societyId },
//       limit: +pageSize,
//       offset: page * pageSize,
//     });

//     return sendSuccessResponse(
//       res,
//       "Ticket purpose list fetched successfully",
//       {
//         rows,
//         total: count,
//         totalPages: Math.ceil(count / pageSize),
//       }
//     );
//   } catch (err) {
//     console.error(err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.updateTicketPurpose = async (req, res) => {
//   try {
//     const { ticket_purpose_Id } = req.params;
//     const [updatedRows] = await Ticket_Purpose.update(req.body, {
//       where: { ticket_purpose_Id },
//     });

//     if (!updatedRows)
//       return sendErrorResponse(
//         res,
//         "Ticket purpose not found or no changes made",
//         404
//       );

//     return sendSuccessResponse(
//       res,
//       "Ticket purpose updated successfully",
//       null,
//       200
//     );
//   } catch (err) {
//     console.error(err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.getTicketListView = async (req, res) => {
//   try {
//     const { societyId } = req.params;
//     if (!societyId)
//       return sendErrorResponse(res, "Society ID is required", 400);

//     const purposes = await Ticket_Purpose.findAll({
//       where: { societyId, status: "active" },
//       attributes: ["ticket_purpose_Id", "purpose_Details"],
//     });

//     return sendSuccessResponse(
//       res,
//       "Ticket list sent successfully",
//       purposes,
//       200
//     );
//   } catch (err) {
//     console.error(err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.createTicket = (req, res) => {
//   upload.fields([{ name: "ticket_attachment_details" }])(
//     req,
//     res,
//     async (err) => {
//       if (err)
//         return sendErrorResponse(res, "File upload error", 400, err.message);

//       try {
//         const {
//           ticket_title,
//           ticket_description,
//           ticket_purpose_Id,
//           request_type,
//         } = req.body;

//         const { userId, societyId } = req.params;

//         const canAccess = await checkCreatorAccess(userId);
//         if (!canAccess)
//           return sendErrorResponse(
//             res,
//             "User not allowed to create tickets",
//             403
//           );

//         if (!ticket_title || !ticket_description || !ticket_purpose_Id)
//           return sendErrorResponse(res, "All fields are required", 400);

//         const user = await User.findOne({ where: { userId, societyId } });
//         if (!user)
//           return sendErrorResponse(res, "User not found in this society", 404);

//         const purpose = await Ticket_Purpose.findByPk(ticket_purpose_Id);
//         if (!purpose)
//           return sendErrorResponse(res, "Invalid ticket purpose", 400);

//         const initialStatus = await ref_ticket_status.findOne({
//           where: { ticket_status_description: "NEW" },
//         });
//         if (!initialStatus)
//           return sendErrorResponse(res, "Initial status not configured", 500);

//         const attachmentFile =
//           req.files?.ticket_attachment_details?.[0] || null;

//         const summary = await Ticket_Summary.create({
//           ticket_title,
//           ticket_description,
//           ticket_purpose_Id,
//           request_type,
//           userId,
//           societyId,
//           ticket_attachment_details: attachmentFile?.filename || null,
//         });

//         await Ticket_Details.create({
//           ticket_details_description: ticket_description,
//           ticket_status_Id: initialStatus.ticket_status_Id,
//           ticket_Id: summary.ticket_Id,
//           userId,
//           societyId,
//           ticket_comment: "Ticket created successfully",
//           ticket_attachment_details: attachmentFile?.filename || null,
//         });

//         return sendSuccessResponse(res, summary, "Ticket created successfully");
//       } catch (error) {
//         return sendErrorResponse(
//           res,
//           "Failed to create ticket",
//           500,
//           error.message
//         );
//       }
//     }
//   );
// };

// exports.getTicketTable = async (req, res) => {
//   const { userId, societyId } = req.params;
//   const {
//     page = 1,
//     pageSize = 10,
//     ticketNumber,
//     ticketTitle,
//     startDate,
//     endDate,
//     status,
//   } = req.query;

//   const canAccess = await checkCreatorAccess(userId);
//   if (!canAccess)
//     return sendErrorResponse(res, "User not allowed to view tickets", 403);

//   // fetch user role
//   const user = await User.findByPk(userId, {
//     include: [{ model: Role, attributes: ["roleCategory"] }],
//   });
//   if (!user || !user.Role) {
//     return sendErrorResponse(res, "User role not found", 403);
//   }

//   const roleCategory = user.Role.roleCategory;

//   const offset = (page - 1) * pageSize;

//   const where = {
//     societyId,
//     ...(roleCategory === "society_moderator" ||
//     roleCategory === "management_committee"
//       ? {}
//       : { userId }),
//     ...(ticketNumber ? { ticket_Id: Number(ticketNumber) } : {}),
//     ...(ticketTitle ? { ticket_title: { [Op.like]: `%${ticketTitle}%` } } : {}),
//     ...(startDate && endDate
//       ? {
//           createdAt: {
//             [Op.between]: [
//               new Date(startDate + "T00:00:00"),
//               new Date(endDate + "T23:59:59"),
//             ],
//           },
//         }
//       : startDate
//       ? {
//           createdAt: {
//             [Op.gte]: new Date(startDate + "T00:00:00"),
//           },
//         }
//       : endDate
//       ? {
//           createdAt: {
//             [Op.lte]: new Date(endDate + "T23:59:59"),
//           },
//         }
//       : {}),
//   };

//   try {
//     const tickets = await Ticket_Summary.findAndCountAll({
//       where,
//       offset,
//       limit: parseInt(pageSize),
//       include: [
//         {
//           model: Ticket_Purpose,
//           attributes: ["ticket_purpose_Id", "purpose_Details"],
//         },
//         {
//           model: Ticket_Details,
//           include: [
//             {
//               model: ref_ticket_status,
//               attributes: ["ticket_status_Id", "ticket_status_description"],
//               ...(status
//                 ? { where: { ticket_status_description: status } }
//                 : {}),
//             },
//             {
//               model: User,
//               as: "assignedUser",
//               attributes: ["userId", "firstName", "lastName"],
//             },
//             {
//               model: User,
//               as: "updatedUser",
//               attributes: ["userId", "firstName", "lastName"],
//             },
//           ],
//         },
//       ],
//       distinct: true,
//       order: [["ticket_Id", "DESC"]],
//     });

//     res.status(200).json({ success: true, data: tickets });
//   } catch (error) {
//     console.error("Error fetching tickets:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// exports.updateTicketStatusAndRemarks = async (req, res) => {
//   try {
//     const { ticket_Id } = req.params;
//     const { userId, assigned_to, ticket_status_description, ticket_comment } =
//       req.body;

//     if (!ticket_status_description || !userId) {
//       return sendErrorResponse(res, "Missing status or userId", 400);
//     }

//     const canUpdate = await checkUpdateAccess(userId);
//     if (!canUpdate) {
//       return sendErrorResponse(
//         res,
//         "User not allowed to update ticket status",
//         403
//       );
//     }

//     const ticketSummary = await Ticket_Summary.findByPk(ticket_Id);
//     if (!ticketSummary) {
//       return sendErrorResponse(res, "Ticket not found", 404);
//     }

//     const status = await ref_ticket_status.findOne({
//       where: { ticket_status_description },
//     });
//     if (!status) {
//       return sendErrorResponse(res, "Invalid ticket status", 400);
//     }

//     const currentStatus = await ref_ticket_status.findByPk(
//       ticketSummary.ticket_status_Id
//     );

//     const validTransitions = {
//       NEW: ["OPEN"],
//       OPEN: ["IN-PROGRESS"],
//       "IN-PROGRESS": ["CLOSE"],
//       CLOSE: ["REOPEN"],
//       REOPEN: ["IN-PROGRESS"],
//     };

//     if (
//       currentStatus &&
//       !validTransitions[currentStatus.ticket_status_description]?.includes(
//         ticket_status_description
//       )
//     ) {
//       return sendErrorResponse(
//         res,
//         `Invalid status transition: ${currentStatus.ticket_status_description} → ${ticket_status_description}`,
//         400
//       );
//     }

//     if (!ticket_comment || ticket_comment.trim() === "") {
//       return sendErrorResponse(
//         res,
//         "Remarks are required for status update",
//         400
//       );
//     }

//     const assignedToFinal = assigned_to ?? ticketSummary.assigned_to ?? null;

//     ticketSummary.assigned_to = assignedToFinal;
//     ticketSummary.ticket_status_Id = status.ticket_status_Id;
//     ticketSummary.updated_by_user_id = userId;
//     await ticketSummary.save();

//     const newDetail = await Ticket_Details.create({
//       ticket_Id,
//       userId,
//       societyId: ticketSummary.societyId,
//       ticket_status_Id: status.ticket_status_Id,
//       ticket_comment,
//       assigned_to: assignedToFinal,
//       updated_by_user_id: userId,
//       ticket_details_description: ticket_comment,
//     });

//     return sendSuccessResponse(
//       res,
//       "Ticket updated successfully",
//       {
//         summary: ticketSummary,
//         details_log: newDetail,
//       },
//       200
//     );
//   } catch (err) {
//     console.error(err);
//     return sendErrorResponse(res, "Failed to update ticket", 500, err.message);
//   }
// };

// exports.getAccessManagementMember = async (req, res) => {
//   try {
//     console.log(req.query);

//     const { societyId } = req.params;

//     if (!societyId) {
//       return sendErrorResponse(res, "Enter Socity Id", 400);
//     }

//     //   pagination handler
//     const pagination = {
//       page: parseInt(req.query.page) || 0,
//       pageSize: parseInt(req.query.pageSize) || 10,
//     };
//     const whereClause = { isManagementCommittee: true };

//     if (societyId) {
//       whereClause.societyId = societyId;
//     }

//     const { count, rows } = await User.findAndCountAll({
//       where: whereClause,
//       limit: pagination.pageSize,
//       offset: pagination.page * pagination.pageSize,
//     });
//     const totalPages = Math.ceil(count / pagination.pageSize);
//     res.status(200).json({
//       message: "Visitor Matrix fetched successfully",
//       data: rows,
//       total: count,
//       totalPages,
//     });
//   } catch (err) {
//     console.error("Error creating notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// // exports.getAccessManagementMember = async (req, res) => {
// //   try {
// //     const { societyId, page = 0, pageSize = 10 } = req.query;
// //     if (!societyId) return sendErrorResponse(res, "Enter Society Id", 400);

// //     const { count, rows } = await User.findAndCountAll({
// //       where: { isManagementCommittee: true, societyId },
// //       limit: +pageSize,
// //       offset: page * pageSize,
// //     });

// //     return sendSuccessResponse(res, "Management members fetched", {
// //       rows,
// //       total: count,
// //       totalPages: Math.ceil(count / pageSize),
// //     }, 200);
// //   } catch (err) {
// //     console.error(err);
// //     return sendErrorResponse(res, "Internal server error", 500, err.message);
// //   }
// // };

// exports.createAccessManagementtable = async (req, res) => {
//   console.log("create Access Management table");
//   try {
//     console.log("Access management table created table", req.body);
//     const { societyId, userId, approval } = req.body;
//     if (!societyId || !userId || !approval) {
//       return res.status(400).json({ message: "All Fields are required" });
//     }
//     const result = await Society_HelpDesk_Access_Management.create({
//       societyId: societyId,
//       userId: userId,
//       module_Access: approval,
//       Update_User_Id: userId,
//     });

//     return sendSuccessResponse(
//       res,
//       "access management created successfully",
//       result,
//       201
//     );
//   } catch (error) {
//     console.error("Error creating RefUserGroup:", error);
//     res.status(500).json({ message: "Error creating RefUserGroup", error });
//   }
// };



const { Op } = require("sequelize");
const {
  Ticket_Purpose,
  Ticket_Summary,
  Ticket_Details,
  ref_ticket_status,
  User,
  Society_HelpDesk_Access_Management,
  Role,
} = require("../models");

const upload = require("../middleware/upload");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

const {
  checkCreatorAccess,
  checkSocietyUpdateAccess,
} = require("../utils/access");

exports.createRefTicketStatus = async (req, res) => {
  try {
    const { ticket_status_description } = req.body;
    if (!ticket_status_description)
      return sendErrorResponse(res, "Status description required", 400);

    const exists = await ref_ticket_status.findOne({
      where: { ticket_status_description },
    });
    if (exists) return sendErrorResponse(res, "Status already exists", 409);

    const newStatus = await ref_ticket_status.create({
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
    const all = await ref_ticket_status.findAll();
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
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.getTicketPurpose = async (req, res) => {
  try {
    const { societyId } = req.params;
    const { page = 0, pageSize = 10 } = req.query;
    if (!societyId) return sendErrorResponse(res, "Enter Society Id", 400);

    const { count, rows } = await Ticket_Purpose.findAndCountAll({
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

exports.updateTicketPurpose = async (req, res) => {
  try {
    const { ticket_purpose_Id } = req.params;
    const [updatedRows] = await Ticket_Purpose.update(req.body, {
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

exports.getTicketListView = async (req, res) => {
  try {
    const { societyId } = req.params;
    if (!societyId)
      return sendErrorResponse(res, "Society ID is required", 400);

    const purposes = await Ticket_Purpose.findAll({
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

        const purpose = await Ticket_Purpose.findByPk(ticket_purpose_Id);
        if (!purpose)
          return sendErrorResponse(res, "Invalid ticket purpose", 400);

        const initialStatus = await ref_ticket_status.findOne({
          where: { ticket_status_description: "NEW" },
        });
        if (!initialStatus)
          return sendErrorResponse(res, "Initial status not configured", 500);

        const attachmentFile =
          req.files?.ticket_attachment_details?.[0] || null;

        const summary = await Ticket_Summary.create({
          ticket_title,
          ticket_description,
          ticket_purpose_Id,
          request_type,
          userId,
          societyId,
          ticket_attachment_details: attachmentFile?.filename || null,
        });

        await Ticket_Details.create({
          ticket_details_description: ticket_description,
          ticket_status_Id: initialStatus.ticket_status_Id,
          ticket_Id: summary.ticket_Id,
          userId,
          societyId,
          ticket_comment: "Ticket created successfully",
          ticket_attachment_details: attachmentFile?.filename || null,
        });

        return sendSuccessResponse(res, summary, "Ticket created successfully");
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
  if (!canAccess)
    return sendErrorResponse(res, "User not allowed to view tickets", 403);

  const user = await User.findByPk(userId, {
    include: [{ model: Role, attributes: ["roleCategory"] }],
  });
  if (!user || !user.Role) {
    return sendErrorResponse(res, "User role not found", 403);
  }

  const roleCategory = user.Role.roleCategory;

  const offset = (page - 1) * pageSize;

  const where = {
    societyId,
    ...(roleCategory === "society_moderator" ||
    roleCategory === "management_committee"
      ? {}
      : { userId }),
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
          createdAt: {
            [Op.gte]: new Date(startDate + "T00:00:00"),
          },
        }
      : endDate
      ? {
          createdAt: {
            [Op.lte]: new Date(endDate + "T23:59:59"),
          },
        }
      : {}),
  };

  try {
    const tickets = await Ticket_Summary.findAndCountAll({
      where,
      offset,
      limit: parseInt(pageSize),
      include: [
        {
          model: Ticket_Purpose,
          attributes: ["ticket_purpose_Id", "purpose_Details"],
        },
        {
          model: Ticket_Details,
          include: [
            {
              model: ref_ticket_status,
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

    const ticketSummary = await Ticket_Summary.findByPk(ticket_Id);
    if (!ticketSummary) {
      return sendErrorResponse(res, "Ticket not found", 404);
    }

    const status = await ref_ticket_status.findOne({
      where: { ticket_status_description },
    });
    if (!status) {
      return sendErrorResponse(res, "Invalid ticket status", 400);
    }

    const currentStatus = await ref_ticket_status.findByPk(
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

    const newDetail = await Ticket_Details.create({
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
      {
        summary: ticketSummary,
        details_log: newDetail,
      },
      200
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Failed to update ticket", 500, err.message);
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

exports.createAccessManagementtable = async (req, res) => {
  console.log("create Access Management table");
  try {
    console.log("Access management table created table", req.body);
    const { societyId, userId, approval } = req.body;
    if (!societyId || !userId || !approval) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const result = await Society_HelpDesk_Access_Management.create({
      societyId: societyId,
      userId: userId,
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
    console.error("Error creating RefUserGroup:", error);
    res.status(500).json({ message: "Error creating RefUserGroup", error });
  }
};
