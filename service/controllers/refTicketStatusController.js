const { ref_ticket_status } = require("../models");
const { sendSuccessResponse } = require("../utils/response");

exports.createRefTicketStatus = async (req, res) => {
  console.log("create ref status");
  try {
    const { ticket_status_description } = req.body;
    if (!ticket_status_description) {
      return res
        .status(400)
        .json({ message: "status description is required" });
    }

    const existingstatus = await ref_ticket_status.findOne({
      where: { ticket_status_description },
    });
    if (existingstatus) {
      return res
        .status(409)
        .json({ message: "status description is already exists" });
    }
    const newStatusDescription = await ref_ticket_status.create({
      ticket_status_description,
    });

    // Send success response
    res.status(201).json({
      message: "newStatusDescription created successfully",
      data: newStatusDescription,
    });
  } catch (error) {
    console.error("Error creating RefUserGroup:", error);
    res.status(500).json({ message: "Error creating RefUserGroup", error });
  }
};

exports.getRefTicketStatus = async (req, res) => {
  console.log("get ticket status list");
  try {
    const result = await ref_ticket_status.findAll();
    // console.log(result);
    res.status(201).json({
      message: "newStatusDescription get successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating RefUserGroup:", error);
    res.status(500).json({ message: "Error creating RefUserGroup", error });
  }
};
