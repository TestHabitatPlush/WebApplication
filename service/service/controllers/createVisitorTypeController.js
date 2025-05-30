const { ref_visitor_type } = require("../models");

exports.createVisitorType = async (req, resp) => {
  console.log("create visitor type");

  try {
    const { visit_type_Description } = req.body;
    if (!visit_type_Description) {
      return resp
        .status(400)
        .json({ message: "visit_type_description is required" });
    }

    const existing_visit_type_Description = await ref_visitor_type.findOne({
      where: { visit_type_Description },
    });

    if (existing_visit_type_Description) {
      return resp
        .status(409)
        .json({ message: "existing_visit_type_description already exists" });
    }

    const new_visit_type_Description = await ref_visitor_type.create({
      visit_type_Description,
    });

    // Send success response
    resp.status(201).json({
      message: "RefUserGroup created successfully",
      data: new_visit_type_Description,
    });
  } catch (error) {
    console.error("Error creating RefUserGroup:", error);
    resp.status(500).json({ message: "Error creating RefUserGroup", error });
  }
};

exports.getVisitorType = async (req, res) => {
  // console.log("recuring and one type");

  try {
    const result = await ref_visitor_type.findAll();
    // console.log("result", result);

    res.status(200).json({
      message: "RefUserGroup created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating RefUserGroup:", error);
    res.status(500).json({ message: "Error creating RefUserGroup", error });
  }
};
