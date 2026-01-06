const UserUnit = require("../models/UserUnit");
const User = require("../models/User");
const Unit = require("../models/Unit");

/* ADD EXTRA UNIT */
exports.addUserUnit = async (req, res) => {
    try {
      const { userId, unitId } = req.body;
  
      //  Validate input
      if (!userId || !unitId) {
        return res.status(400).json({
          message: "userId and unitId are required",
        });
      }
  
      //  Check user exists
      const user = await User.findByPk(userId, {
        attributes: ["userId", "societyId"],
      });
  
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      //  Check unit exists
      const unit = await Unit.findByPk(unitId, {
        attributes: ["unitId", "societyId"],
      });
  
      if (!unit) {
        return res.status(404).json({
          message: "Unit not found",
        });
      }
  
      //  Society validation
      if (user.societyId !== unit.societyId) {
        return res.status(403).json({
          message:
            "Unit cannot be assigned. User and Unit belong to different societies.",
        });
      }
  
      //  Prevent duplicate mapping
      const exists = await UserUnit.findOne({
        where: { userId, unitId },
      });
  
      if (exists) {
        return res.status(400).json({
          message: "Unit already linked to user",
        });
      }
  
      //  Create mapping
      const data = await UserUnit.create({
        userId,
        unitId,
      });
  
      return res.status(201).json({
        message: "Unit successfully assigned to user",
        data,
      });
    } catch (err) {
      console.error("addUserUnit error:", err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };

exports.updateUserUnit = async (req, res) => {
  try {
    const { userUnitId } = req.params;
    const { unitId, status } = req.body;

    const record = await UserUnit.findByPk(userUnitId);
    if (!record) {
      return res.status(404).json({
        message: "User-unit mapping not found",
      });
    }
    if (unitId) {
      const unit = await Unit.findByPk(unitId, {
        attributes: ["unitId", "societyId"],
      });

      if (!unit) {
        return res.status(404).json({
          message: "Unit not found",
        });
      }
      const user = await User.findByPk(record.userId, {
        attributes: ["userId", "societyId"],
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      if (user.societyId !== unit.societyId) {
        return res.status(403).json({
          message:
            "Unit cannot be assigned. User and Unit belong to different societies.",
        });
      }
      const exists = await UserUnit.findOne({
        where: {
          userId: record.userId,
          unitId,
        },
      });

      if (exists) {
        return res.status(400).json({
          message: "This unit is already linked to the user",
        });
      }

      record.unitId = unitId;
    }
    if (status !== undefined) {
      record.status = status;
    }

    await record.save();

    return res.status(200).json({
      message: "User unit updated successfully",
      data: record,
    });
  } catch (err) {
    console.error("updateUserUnit error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

  
/* GET ALL UNITS OF USER */
exports.getUserUnits = async (req, res) => {
  try {
    const { userId } = req.params;

    const units = await UserUnit.findAll({ where: { userId } });
    return res.status(200).json({ units });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

/* REMOVE UNIT FROM USER */
exports.removeUserUnit = async (req, res) => {
  try {
    const { userId, unitId } = req.params;

    const deleted = await UserUnit.destroy({
      where: { userId, unitId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Mapping not found" });
    }

    return res.status(200).json({ message: "Unit removed from user" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
