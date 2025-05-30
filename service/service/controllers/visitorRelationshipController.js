const visitorRelationship = require("../models/visitorRelationship");
const { sendErrorResponse } = require("../utils/response");

exports.createVisitorRelation = async (req, resp) => {
  console.log("create visitor relationship");
  try {
    const { Visit_relation_Description, societyId, senderId } = req.body;
    console.log(
      "visitor data",
      societyId,
      Visit_relation_Description,
      senderId
    );

    if (!Visit_relation_Description || !societyId || !senderId) {
      return resp
        .status(400)
        .json({ message: "visit_type_description is required" });
    }

    // const existing_Visit_relation_Description =
    //   await visitorRelationship.findOne({
    //     where: { Visit_relation_Description },
    //   });

    // if (existing_Visit_relation_Description) {
    //   return resp
    //     .status(409)
    //     .json({ message: "existing_visit_type_description already exists" });
    // }

    const new_Visit_relation_Description = await visitorRelationship.create({
      Visit_relation_Description,
      societyId,
      senderId,
    });

    resp.status(201).json({
      message: "RefUserGroup created successfully",
      data: new_Visit_relation_Description,
    });
  } catch (error) {
    console.error("Error creating RefUserGroup:", error);
    resp.status(500).json({ message: "Error creating RefUserGroup", error });
  }
};

exports.getVisitorData = async (req, res) => {
  try {
    console.log("Visitor get handler");
    console.log(req.query);

    const { societyId } = req.query;

    if (!societyId) {
      return sendErrorResponse(res, "Enter Socity Id", 400);
    }

    const pagination = {
      page: parseInt(req.query.page) || 0,
      pageSize: parseInt(req.query.pageSize) || 10,
    };
    const whereClause = { isDeleted: false };
    if (societyId) {
      whereClause.societyId = societyId;
    }

    const { count, rows } = await visitorRelationship.findAndCountAll({
      where: whereClause,
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
    });
    const totalPages = Math.ceil(count / pagination.pageSize);
    res.status(200).json({
      message: "Notice fetched successfully",
      data: rows,
      total: count,
      totalPages,
    });
  } catch (err) {
    console.error("Error creating notice:", err);
    return sendErrorResponse(res, "Internal server error", 500, err.message);
  }
};

exports.deleteVisitorData = async (req, res) => {
  console.log("delete handler new", req.params);
  try {
    const { Visit_relation_Id } = req.params;
    const visitor = await visitorRelationship.findByPk(Visit_relation_Id);
    if (!visitor) {
      return res.status(404).json({ message: "visitor not found" });
    }

    await visitor.update({ isDeleted: true });

    res.status(200).json({ message: "Visitor relation deleted successfully" });
  } catch (err) {
    console.error("Error deleting notice:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", details: err.message });
  }
};

exports.updateVisitorData = async (req, res) => {
  console.log("update param", req.params);



  try {
    const { Visit_relation_Id } = req.params;
    const [updatedRows] = await visitorRelationship.update(req.body, {
      where: { Visit_relation_Id },
    });

    console.log("Number of updated rows:", updatedRows);

    if (updatedRows === 0) {
      return res
        .status(404)
        .json({ error: "Notice not found or no changes were made." });
    }

    return res
      .status(201)
      .json({ message: "Visitor Relationship updated successfully." });
  } catch (error) {
  
    return res.status(400).json({ error: error.message });
  }
};
