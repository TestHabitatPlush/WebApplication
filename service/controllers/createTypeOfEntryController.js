const { ref_visitor_type_of_entry } = require("../models");
// const { sendSuccessResponse } = require("../utils/response");

exports.createTypeOfEntryController = async (req, resp) => {
  console.log("createTypeOfEntryController");

  try {
    const { entry_Description } = req.body;
    if (!entry_Description) {
      return resp
        .status(400)
        .json({ message: "entry_Description is required" });
    }

    const existing_entry_Description = await ref_visitor_type_of_entry.findOne({
      where: { entry_Description },
    });

    if (existing_entry_Description) {
      return resp
        .status(409)
        .json({ message: "existing_entry_Description already exists" });
    }

    const new_entry_Description = await ref_visitor_type_of_entry.create({
      entry_Description,
    });

    // Send success response
    resp.status(201).json({
      message: "RefUserGroup created successfully",
      data: new_entry_Description,
    });
  } catch (error) {
    console.error("Error creating RefUserGroup:", error);
    resp.status(500).json({ message: "Error creating RefUserGroup", error });
  }
};
