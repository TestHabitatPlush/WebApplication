const { UserGroup } = require("../models");
const { sendSuccessResponse } = require("../utils/response");

exports.createRefUserGroup = async (req, resp) => {
  console.log("ref user group");

  try {
    const { userGroupName } = req.body;

    // Check if userGroupName is provided
    if (!userGroupName) {
      return resp.status(400).json({ message: "userGroupName is required" });
    }

    // Check if the userGroupName already exists
    const existingUserGroup = await UserGroup.findOne({
      where: { userGroupName },
    });

    if (existingUserGroup) {
      return resp.status(409).json({ message: "UserGroupName already exists" });
    }

    // If it doesn't exist, create a new UserGroup
    const newUserGroup = await UserGroup.create({
      userGroupName,
    });

    // Send success response
    resp.status(201).json({
      message: "RefUserGroup created successfully",
      data: newUserGroup,
    });
  } catch (error) {
    console.error("Error creating RefUserGroup:", error);
    resp.status(500).json({ message: "Error creating RefUserGroup", error });
  }
};

exports.getUserGroupNotice = async (req, res) => {
  console.log("getuser", req.query);

  const response = await UserGroup.findAll();
  // console.log("response", response);

  if (response) {
    return sendSuccessResponse(
      res,
      "user group fetched successfully",
      response,
      201
    );
  }
};
