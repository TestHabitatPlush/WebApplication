// const { Op, where } = require("sequelize");
// const {
//   Ticket_Purpose,
//   Ticket_Summary,
//   Ticket_Details,
//   ref_ticket_catagorisation,
//   ref_ticket_status,
//   User,
//   Society_HelpDesk_Access_Management,
// } = require("../models");
// const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

// exports.createTicketPurpous = async (req, res) => {
//   try {
//     console.log("create ticket purpous controller");
//     console.log(req.body);
//     const { societyId, userId } = req.body;
//     if (!data || !societyId || !userId) {
//       return sendErrorResponse(res, "Enter All Details", 400);
//     }
//     const result = await Ticket_Purpose.create({
//       purpose_Details: data,
//       ...req.body,
//     });
//     // console.log(result);

//     return sendSuccessResponse(res, "Notice created successfully", result, 201);
//   } catch (err) {
//     console.error("Error creating notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.getTicketPurpous = async (req, res) => {
//   try {
//     console.log("Get Ticket Purpose Controller");
//     console.log(req.query);

//     const { societyId } = req.query;
//     console.log(req.query);

//     if (!societyId) {
//       return sendErrorResponse(res, "Enter Socity Id", 400);
//     }
//     const whereClause = {};

//     const pagination = {
//       page: parseInt(req.query.page) || 0,
//       pageSize: parseInt(req.query.pageSize) || 10,
//     };

//     if (societyId) {
//       whereClause.societyId = societyId;
//     }
//     // if (userGroupId) {
//     //   whereClause.userGroupId = userGroupId;
//     // }

//     const { count, rows } = await Ticket_Purpose.findAndCountAll({
//       where: whereClause,
//       limit: pagination.pageSize,
//       offset: pagination.page * pagination.pageSize,
//     });
//     const totalPages = Math.ceil(count / pagination.pageSize);
//     res.status(200).json({
//       message: "Ticket purpous List fetched successfully",
//       data: rows,
//       total: count,
//       totalPages,
//     });
//   } catch (err) {
//     console.error("Error creating notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.getTicketListView = async (req, res) => {
//   // console.log("get ticketlist view", req.query);
//   try {
//     const { societyId } = req.query;
//     if (!societyId) {
//       return res.status(400).json({ message: "socity_id is required" });
//     }
//     const ticketPurposes = await Ticket_Purpose.findAll({
//       where: { societyId },
//     });
//     return sendSuccessResponse(
//       res,
//       "ticket list sent  successfully",
//       ticketPurposes,
//       201
//     );
//   } catch (err) {
//     console.error("Error creating notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.createTicket = async (req, res) => {
//   console.log(req.body);
//   const {
//     ticketCategorisationId,
//     ticketPurpose,
//     ticketTitle,
//     ticket_details_description,
//     societyId,
//     userId,
//   } = req.body;
//   if (
//     !ticketCategorisationId ||
//     !ticketPurpose ||
//     !ticketTitle ||
//     !ticket_details_description ||
//     !societyId ||
//     !userId
//   ) {
//     return sendErrorResponse(res, "Enter All Details", 400);
//   }

//   const result = await Ticket_Summary.create({
//     ticketCategorisationId,
//     ticketPurpose,
//     ticketTitle,
//     societyId,
//     userId,
//   });
//   console.log(result);
//   const { ticket_Id } = result;
//   console.log(ticket_Id);
//   const resultDetails = await Ticket_Details.create({
//     ticket_status_Id: 1,
//     // Ticket_Desc_Update_User_ID: 1,
//     ticket_details_description,
//     ticket_Id,
//     societyId,
//     userId,
//   });

//   // console.log("resultDetails", resultDetails);

//   // console.log("ticket_Id", ticket_Id);

//   return sendSuccessResponse(
//     res,
//     "Create Ticket created successfully",
//     { result, resultDetails },
//     201
//   );
// };

// exports.updateTicketPurpous = async (req, res) => {
//   // console.log("update ticket porpous", req.params);
//   try {
//     const { ticket_purpose_Id } = req.params;

//     const [updatedRows] = await Ticket_Purpose.update(req.body, {
//       where: { ticket_purpose_Id },
//     });

//     // Log how many rows were updated
//     console.log("Number of updated rows:", updatedRows);

//     // Check if any rows were updated
//     if (updatedRows === 0) {
//       return res
//         .status(404)
//         .json({ error: "Ticket not found or no changes were made." });
//     }

//     // Send a success response if updated
//     return res
//       .status(201)
//       .json({ message: "Ticket purpous updated successfully." });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };

// exports.getTicketTable = async (req, res) => {
//   try {
//     console.log(req.query);

//     const { societyId } = req.query;

//     if (!societyId) {
//       return sendErrorResponse(res, "Enter Socity Id", 400);
//     }

//     const pagination = {
//       page: parseInt(req.query.page) || 0,
//       pageSize: parseInt(req.query.pageSize) || 10,
//     };
//     const whereClause = {};

//     if (societyId) {
//       whereClause.societyId = societyId;
//     }
//     const { count, rows } = await Ticket_Summary.findAndCountAll({
//       where: whereClause,
//       limit: pagination.pageSize,
//       offset: pagination.page * pagination.pageSize,
//     });
//     const totalPages = Math.ceil(count / pagination.pageSize);
//     console.log(rows);

//     const result = await Promise.all(
//       rows.map(async (el) => {
//         const { ticket_Id } = el.dataValues;
//         console.log(el);

//         const ticketResult = await Ticket_Details.findOne({
//           where: { ticket_Id },
//           include: [{ model: ref_ticket_status }],
//         });

//         return {
//           ...el.dataValues,
//           ticketDetails: ticketResult ? ticketResult.dataValues : null,
//         };
//       })
//     );

//     res.status(200).json({
//       message: "Notice fetched successfully",
//       data: result,
//       total: count,
//       totalPages,
//     });
//   } catch (err) {
//     console.error("Error creating notice:", err);
//     return sendErrorResponse(res, "Internal server error", 500, err.message);
//   }
// };

// exports.createrequestType = async (req, res) => {
//   console.log("create ref ticket catagorisation");
//   try {
//     const { ticket_catagorisation_type } = req.body;
//     if (!ticket_catagorisation_type) {
//       return res
//         .status(400)
//         .json({ message: "ticket catagorisation is required" });
//     }

//     const existingTicketCatagorisation =
//       await ref_ticket_catagorisation.findOne({
//         where: { ticket_catagorisation_type },
//       });
//     if (existingTicketCatagorisation) {
//       return res
//         .status(409)
//         .json({ message: "status description is already exists" });
//     }
//     const newTicketCatagorisation = await ref_ticket_catagorisation.create({
//       ticket_catagorisation_type,
//     });

//     // Send success response
//     res.status(201).json({
//       message: "newStatusDescription created successfully",
//       data: newTicketCatagorisation,
//     });
//   } catch (error) {
//     console.error("Error creating RefUserGroup:", error);
//     res.status(500).json({ message: "Error creating RefUserGroup", error });
//   }
// };

// exports.getrequestType = async (req, res) => {
//   console.log("get request type");
//   try {
//     const result = await ref_ticket_catagorisation.findAll();
//     // console.log(result);
//     res.status(201).json({
//       message: "newStatusDescription get successfully",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error creating RefUserGroup:", error);
//     res.status(500).json({ message: "Error creating RefUserGroup", error });
//   }
// };

// exports.getAccessManagementMember = async (req, res) => {
//   console.log("Access Management controller call");
//   try {
//     console.log(req.query);
//     const { societyId } = req.query;
//     if (!societyId) {
//       return sendErrorResponse(res, "Enter Socity Id", 400);
//     }

//     const pagination = {
//       page: parseInt(req.query.page) || 0,
//       pageSize: parseInt(req.query.pageSize) || 10,
//     };
//     const whereClause = { isManagementCommittee: true };
//     // if (disscussionheading) {
//     //   whereClause.noticeHeading = { [Op.like]: `%${disscussionheading}%` }; // Case-insensitive search
//     // }
//     if (societyId) {
//       whereClause.societyId = societyId;
//     }
//     // if (userGroupId) {
//     //   whereClause.userGroupId = userGroupId;
//     // }

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

// exports.createAccessManagementtable = async (req, res) => {
//   console.log("create Access Management table");
//   try {
//     console.log("Access management table created table", req.body);
//     const { societyId, userId, approval } = req.body;
//     if (!societyId || !userId || !approval) {
//       return res.status(400).json({ message: "All Fields are required" });
//     }
//     const result = await Socity_HelpDesk_Access_Management.create({
//       societyId: societyId,
//       userId: userId,
//       module_Access: approval,
//       Update_User_Id: userId,
//     });
//     // console.log(result);

//     return sendSuccessResponse(res, "Notice created successfully", result, 201);
//   } catch (error) {
//     console.error("Error creating RefUserGroup:", error);
//     res.status(500).json({ message: "Error creating RefUserGroup", error });
//   }
// };

// Corrected Help Desk Controller & Router based on provided Sequelize Models

const { Op } = require("sequelize");
const {
  Ticket_Purpose,
  Ticket_Summary,
  Ticket_Details,
  ref_ticket_categorisation,
  ref_ticket_status,
  User,
  Society_HelpDesk_Access_Management,
} = require("../models");

const upload = require("../middleware/upload");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

// 1. Create Ticket Purpose
exports.createTicketPurpose = async (req, res) => {
  try {
    const { purpose_Details} = req.body;
    const { societyId, userId } = req.params;
    if (!purpose_Details || !societyId || !userId) {
      return sendErrorResponse(res, "Enter all details", 400);
    }

    const result = await Ticket_Purpose.create({ purpose_Details, societyId, userId });
    return sendSuccessResponse(res, "Ticket purpose created successfully", result, 201);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// 2. Get Ticket Purpose List
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

    return sendSuccessResponse(res, "Ticket purpose list fetched successfully", {
      rows,
      total: count,
      totalPages: Math.ceil(count / pageSize),
    });
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// 3. Update Ticket Purpose
exports.updateTicketPurpose = async (req, res) => {
  try {
    const { ticket_purpose_Id } = req.params;
    const [updatedRows] = await Ticket_Purpose.update(req.body, {
      where: { ticket_purpose_Id },
    });

    if (!updatedRows)
      return sendErrorResponse(res, "Ticket purpose not found or no changes made", 404);

    return sendSuccessResponse(res, "Ticket purpose updated successfully", null, 200);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// 4. Get Ticket Purpose for Dropdown
exports.getTicketListView = async (req, res) => {
  try {
    const { societyId } = req.params;
    if (!societyId) return sendErrorResponse(res, "Society ID is required", 400);

    const purposes = await Ticket_Purpose.findAll({
      where: { societyId, status: "active" },
      attributes: ["ticket_purpose_Id", "purpose_Details"],
    });

    return sendSuccessResponse(res, "Ticket list sent successfully", purposes, 200);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// 5. Create Ticket
exports.createTicket = async (req, res) => {
  upload.fields([{ name: "ticket_attachment_details" }])(req, res, async (err) => {
    if (err) {
      return sendErrorResponse(res, "File upload error", 400, err.message);
    }

    try {
      const {
        societyId,
        userId,
        ticket_purpose_Id,
        ticket_categorisation_Id,
        request_type = "suggestion",
        ticket_title,
        ticket_description,
      } = req.body;

      if (!societyId || !userId || !ticket_purpose_Id || !ticket_title || !ticket_description) {
        return sendErrorResponse(res, "All required fields must be provided", 400);
      }

      // Create ticket summary
      const summary = await Ticket_Summary.create({
        societyId,
        userId,
        ticket_purpose_Id,
        ticket_categorisation_Id: ticket_categorisation_Id || null,
        request_type,
        ticket_title,
        ticket_description,
        ticket_attachment_details: req.files?.ticket_attachment_details?.[0]?.filename || null,
      });

      // Create first detail with NEW status
      const detail = await Ticket_Details.create({
        societyId,
        userId,
        ticket_Id: summary.ticket_Id,
        ticket_status_Id: 1, // assuming 1 = NEW
        ticket_details_description: ticket_description,
        ticket_attachment_details: req.files?.ticket_attachment_details?.[0]?.filename || null,
      });

      // Update summary with latest detail reference
      await summary.update({ ticket_description_max_Id: detail.ticket_details_Id });

      return sendSuccessResponse(res, "Ticket created successfully", { ticketId: summary.ticket_Id }, 201);
    } catch (error) {
      console.error(error);
      return sendErrorResponse(res, "Internal server error", 500, error.message);
    }
  });
};


// 6. Get Ticket Table View
exports.getTicketTable = async (req, res) => {
  try {
    const { societyId } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const { count, rows } = await Ticket_Summary.findAndCountAll({
      where: { societyId },
      limit: parseInt(pageSize),
      offset: parseInt(offset),
      include: [
        { model: Ticket_Purpose, attributes: ["purpose_Details"] },
        { model: ref_ticket_categorisation, attributes: ["ticket_categorisation_type"] },
        {
          model: Ticket_Details,
          as: "latestDetail",
          include: [
            { model: ref_ticket_status, attributes: ["ticket_status_description"] },
            { model: User, as: "creator", attributes: ["userName"] },
            { model: User, as: "assignedTo", attributes: ["userName"] },
          ],
        },
      ],
    });

    return sendSuccessResponse(res, "Ticket list fetched", {
      total: count,
      totalPages: Math.ceil(count / pageSize),
      rows,
    });
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};


// 7. Create Ticket Categorisation
exports.createRequestType = async (req, res) => {
  try {
    const { ticket_categorisation_type } = req.body;
    if (!ticket_categorisation_type) return sendErrorResponse(res, "Categorisation type is required", 400);

    const exists = await ref_ticket_categorisation.findOne({ where: { ticket_categorisation_type } });
    if (exists) return sendErrorResponse(res, "Categorisation already exists", 409);

    const result = await ref_ticket_categorisation.create({ ticket_categorisation_type });
    return sendSuccessResponse(res, "Request type created", result, 201);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// 8. Get Request Types
exports.getRequestType = async (req, res) => {
  try {
    const result = await ref_ticket_categorisation.findAll();
    return sendSuccessResponse(res, "Request types fetched", result, 200);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// 9. Get Access Management Members
exports.getAccessManagementMember = async (req, res) => {
  try {
    const { societyId } = req.params;
    const { page = 0, pageSize = 10 } = req.query;
    if (!societyId) return sendErrorResponse(res, "Enter Society Id", 400);

    const { count, rows } = await User.findAndCountAll({
      where: { societyId, isManagementCommittee: true },
      limit: +pageSize,
      offset: page * pageSize,
    });

    return sendSuccessResponse(res, "Management members fetched", {
      rows,
      total: count,
      totalPages: Math.ceil(count / pageSize),
    });
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// 10. Create Access Management Entry
exports.createAccessManagementTable = async (req, res) => {
  try {
    const { societyId, userId, module_Access, updaterId } = req.body;
    if (!societyId || !userId || !module_Access || !updaterId) {
      return sendErrorResponse(res, "All fields are required", 400);
    }

    const result = await Society_HelpDesk_Access_Management.create({
      societyId,
      userId,
      module_Access,
      Update_User_Id: updaterId,
    });

    return sendSuccessResponse(res, "Access management entry created", result, 201);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

// 11. Update Access Management Entry
exports.updateAccessManagementTable = async (req, res) => {
  try {
    const { societyId, userId } = req.params;
    const { module_Access, updaterId } = req.body;

    if (!societyId || !userId || !module_Access || !updaterId) {
      return sendErrorResponse(res, "All fields are required", 400);
    }

    const result = await Society_HelpDesk_Access_Management.update(
      { module_Access, Update_User_Id: updaterId },
      { where: { societyId, userId } }
    );

    return sendSuccessResponse(res, "Access management entry updated", result, 200);
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};
