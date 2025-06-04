const { User, Unit, Role } = require("../models");
const { getAllUsersService, getUserByIdService } = require("../services/userService");
//const { createUnit, getUnit, getAllUnits } = require("../controllers/unitController.js");
const addressService = require("../services/addressService");
const XLSX = require("xlsx");
const fs = require("fs");
const bcrypt = require("bcrypt");

const createSocietyModerator = async (req, res) => {
  try {
    const { address, email, ...customerData } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const addressData = await addressService.createAddress(address);
    const addressId = addressData.addressId;

    const password = "admin";

    const result = await User.create({
      ...customerData,
      email,
      addressId,
      password,
      livesHere: true,
      primaryContact: true,
      isManagementCommittee: true,
      managementDesignation: "admin",
    });

    res.status(201).json({
      message: "Society Moderator created successfully",
      result,
    });
  } catch (error) {
    console.error("Error creating society moderator:", error);
    res.status(500).json({ error: error.message });
  }
};
const createSocietyResident = async (req, res) => {
  try {
    const { address, email, salutation, firstName, lastName, mobileNumber, alternateNumber, roleId, unitId } = req.body;
    const { societyId } = req.params;

    if (!societyId) {
      return res.status(400).json({ message: "Society ID is required in the URL" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const addressData = await addressService.createAddress(address);
    const addressId = addressData.addressId;

    const password = "Himansu"; // Replace with a secure password strategy

    let unit = null;
    if(unitId) {
      unit = await Unit.findByPk(unitId);
      if(!unit){
        return res.status(400).json({ message: "Invalid unit ID" });
      }
    }

    const residentDetails = {
      salutation,
      firstName,
      lastName,
      password,
      countryCode: address.countryCode || 91,
      mobileNumber,
      alternateNumber,
      email,
      roleId,
      livesHere: true,
      primaryContact: true,
      isManagementCommittee: false,
      managementDesignation: "Resident",
      status: "active",
      addressId,
      societyId,
     unitId: unit ? unit.unitId : null,
    };

    const result = await User.create(residentDetails);

    res.status(201).json({
      message: "Society Resident created successfully",
      result,
    });
  } catch (error) {
    console.error("Error creating society resident:", error);
    res.status(500).json({ error: error.message });
  }
};

//BulkCreateResidents

const bulkCreateResidents = async (req, res) => {
  try {
    const { societyId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const created = [];
    const skipped = [];

    for (const row of data) {
      const {
        salutation,
        firstName,
        lastName,
        countryCode,
        alternateCountryCode,
        mobileNumber,
        alternateNumber,
        email,
        roleId,
        unitId,
        "address.street": street,
        "address.city": city,
        "address.state": state,
        "address.zipCode": zipCode,
        "address.address1": address1,
        "address.address2": address2,
      } = row;

      if (!email || !firstName || !lastName || !unitId || !roleId || !mobileNumber) {
        skipped.push({ email, reason: "Missing required fields" });
        continue;
      }

      const exists = await User.findOne({ where: { email } });
      if (exists) {
        skipped.push({ email, reason: "Email already exists" });
        continue;
      }

      const role = await Role.findByPk(roleId);
      if (!role) {
        skipped.push({ email, reason: "Role not found" });
        continue;
      }

      const addressData = await addressService.createAddress({
        street,
        city,
        state,
        zipCode,
        address1,
        address2,
      });

      // const plainPassword = row.password || "Himansu1";
      // const hashedPassword = await bcrypt.hash(plainPassword, 10);
      const password = "Himansu1";

      const user = await User.create({
        salutation,
        firstName,
        lastName,
        countryCode: countryCode || 91,
        alternateCountryCode,
        mobileNumber,
        alternateNumber,
        email,
        //  password: hashedPassword,
        password,
        roleId,
        unitId,
        societyId,
        addressId: addressData.addressId,
        livesHere: true,
        primaryContact: true,
        inManagementCommittee: false,
        managementDesignation: "Resident",
        status: "active",
      });

      created.push(user);
    }

    fs.unlinkSync(req.file.path); // Clear uploaded file

    res.status(201).json({
      message: "Residents bulk uploaded successfully",
      createdCount: created.length,
      skipped,
    });
  } catch (error) {
    console.error("Bulk resident creation failed:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

      ///////////////////////////////////////////////////////////////

const getResidentBySocietyId = async (req, res) => {
  try {
   const { societyId } = req.params;
    if (!societyId) {
      return res.status(400).json({ message: "Society ID is required" });
    }

    const residents = await User.findAll({
      where: {
        societyId,
        isManagementCommittee: false,
         isDeleted:0,
        status: "active",
      },
      attributes: [
        "userId",
        "salutation",
        "firstName",
        "lastName",
        "email",
        "mobileNumber",
        "roleId",
        "status",
        "addressId",
        "primaryContact",
        "livesHere",
      ],
    });

    if (!residents || residents.length === 0) {
      return res.status(404).json({ message: "No residents found for the given Society ID" });
    }

    res.status(200).json({
      message: "Residents fetched successfully",
      residents,
    });
  } catch (error) {
    console.error("Error fetching residents:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateResidentBySocietyId = async (req, res) => {
  try {
    const { societyId } = req.params;
    const { userId, salutation, firstName, lastName, mobileNumber, alternateNumber, roleId, unitId, status } = req.body;

    if (!societyId) {
      return res.status(400).json({ message: "Society ID is required in the URL" });
    }
    if (!userId) {
      return res.status(400).json({ message: "User ID is required in the request body" });
    }

    const resident = await User.findOne({ where: { userId, societyId, isManagementCommittee: false } });

    if (!resident) {
      return res.status(404).json({ message: "Resident not found in the given society" });
    }

    let unit = null;
    if (unitId) {
      unit = await Unit.findByPk(unitId);
      if (!unit) {
        return res.status(400).json({ message: "Invalid unit ID" });
      }
    }

    await resident.update({
      salutation,
      firstName,
      lastName,
      mobileNumber,
      alternateNumber,
      roleId,
      status,
      unitId: unit ? unit.unitId : resident.unitId,
    });

    res.status(200).json({ message: "Resident updated successfully", resident });
  } catch (error) {
    console.error("Error updating resident:", error);
    res.status(500).json({ error: error.message });
  }
};


const createUser = async (req, res) => {
  try {
    const { address, ...customerData } = req.body;
    const addressData = await addressService.createAddress(address);
    const addressId = addressData.addressId;

    const result = await User.create({ ...customerData, addressId });

    if (result) {
      res.status(201).json({
        message: "User created successfully",
        result,
      });
    } else {
      throw new Error("Error creating user");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const getSocietyModerator = async (req, res) => {
//   try {
//     const societyId = req.params.societyId;
//     if (!societyId) {
//       return res.status(400).json({ message: "Society ID is required" });
//     }
//     const moderator = await User.findAll({
//       where: {
//         societyId,
//         isManagementCommittee: true,
//         isDeleted: 0,
//         status: "active",
//       },
//       attributes: [
//         "userId",
//         "salutation",
//         "firstName",
//         "lastName",
//         "email",
//         "mobileNumber",
//         "roleId",
//         "status",
//         "addressId",
//         "primaryContact",
//         "livesHere",
//       ],
//     })
//     if (!moderator || moderator.length === 0) {
//       return res.status(404).json({ message: "No society moderator found for the given Society ID" });
//     }
//     res.status(200).json({
//       message: "Society Moderator fetched successfully",
//       moderator,
//     });
//   }
//   catch (error) {
//     console.error("Error fetching society moderator:", error);
//     res.status(500).json({ error: error.message });
//   }
// }

const getManagement_committee = async (req, res) => {
  try{
    const societyId = req.params.societyId;
    if(!societyId) {
      return res.status(400).json({ message: "Society ID is required" });
    }
    const allowedCategories = ["management_committee","society_moderator"];
    const roles = await Role.findAll({
      where: {
        roleCategory: allowedCategories,
      }
    });

    const roleIds = roles.map(role => role.roleId);
    const members = await User.findAll({
      where: {
        societyId,
        roleId: roleIds,
      },
      include: [
        {model: Role, as:"role"},
        // {model: Address, as: "address"},
      ],
    });
    res.status(200).json({
      message: "Management committee members fetched successfully",
      members,
    });
  }
  catch (error) {
    console.error("Error fetching management committee:", error);
    res.status(500).json({ error: error.message });
}
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  createSocietyModerator,
  createSocietyResident,
  bulkCreateResidents,
  getResidentBySocietyId,
  updateResidentBySocietyId,
  //getSocietyModerator,
  getManagement_committee,
};