
// const { User, Address, } = require("../models");
// const {
//   getAllUsersService,
//   getUserByIdService,
// } = require("../services/userService");


// // const bcrypt = require("bcrypt");

// const { validationResult } = require("express-validator");
// const { generateRandomPassword } = require("../utils/password");

// const createAddress = async (data) => {
//   await Address.create(data);
// };

// const createSocietyModerator = async (req, res) => {
//   console.log("Create Society Moderator called !");
//   try {
//     const { address, email, ...customerdata } = req.body;

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }
//     const addressData = await Address.create(address);
//     const addressId = addressData.addressId;
//     console.log(addressId);
//     // const password = generateRandomPassword(6);
//     const password = "admin";
//     console.log(customerdata);

//     const result = await User.create({
//       ...customerdata,
//       email,
//       addressId,
//       password,
//       livesHere: true,
//       primaryContact: true,
//       isManagementCommittee: true,
//       managementDesignation: "admin",
//     });

//     res
//       .status(201)
//       .json({ message: "Society Moderator created successfully", result });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: error.message });
//   }
// };


// const createSocietyResident = async (req, res) => {
//   console.log("Create Society Resident called");
//   try {
//     const { address, email, salutation, firstName, lastName, mobileNumber, alternateNumber, roleId } = req.body;

//     const societyId = req.user.societyId; 

//     if (!societyId) {
//       return res.status(403).json({ message: "Unauthorized or invalid society context" });
//     }

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }
//     const addressData = await Address.create(address);
//     const addressId = addressData.id;

//     const password = "himansu"; // Default password

//     const residentDetails = {
//       salutation,
//       firstName,
//       lastName,
//       password,
//       countryCode: address.countryCode || 91,
//       mobileNumber,
//       alternateNumber,
//       email,
//       roleId,
//       livesHere: true,
//       primaryContact: true,
//       isManagementCommittee: false,
//       managementDesignation: "Resident",
//       status: "active",
//       addressId,
//       societyId, // Automatically assign logged-in user's societyId
//     };

//     // Create the resident user
//     const result = await User.create(residentDetails);

//     res
//       .status(201)
//       .json({ message: "Society Resident created successfully", result });
//   } catch (error) {
//     console.error("Error creating society resident:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const getResidentBySocityId = async (req, res) => {
//   console.log("Get Resident By Society ID called");
//   try {
//     const { societyId } = req.params;

//     if (!societyId) {
//       return res.status(400).json({ message: "Society ID is required" });
//     }

//     const residents = await User.findAll({
//       where: {
//         societyId,
//         isManagementCommittee: false,
//       },
//       attributes: [
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
//     });

//     if (!residents || residents.length === 0) {
//       return res.status(404).json({ message: "No residents found for the given Society ID" });
//     }
//     res.status(200).json({ message: "Residents fetched successfully", residents });
//   } catch (error) {
//     console.error("Error fetching residents:", error);
//     res.status(500).json({ error: error.message });
//   }
// };


// const createUser = async (req, res) => {
//   try {
//     const { address, ...customerdata } = req.body;
//     console.log(req.body);

//     const addressData = createAddress(address);
//     const addressId = addressData._id;
//     console.log(address);

//     const result = await User.create({ ...customerdata, addressId });
//     if (result)
//       res.status(201).json({ message: "User created successfully", result });
//     else throw new Error("Error creating user");
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: error });
//   }
// };

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await getAllUsersService();
//     return res.status(200).json(users);
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };

// const getUserById = async (req, res) => {
//   try {
//     const user = await getUserByIdService(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };


// module.exports = {
//   createUser,
//   getAllUsers,
//   getUserById,
//   createSocietyModerator,
//   // createResident,
//   createSocietyResident,
//   getResidentBySocityId,
// };


const { User, Unit } = require("../models");
const { getAllUsersService, getUserByIdService } = require("../services/userService");
//const { createUnit, getUnit, getAllUnits } = require("../controllers/unitController.js");
const addressService = require("../services/addressService");

const createSocietyModerator = async (req, res) => {
  try {
    const { address, email, ...customerData } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const addressData = await addressService.createAddress(address);
    const addressId = addressData.addressId;

    const password = "admin"; // Default password

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

// const getResidentBySocietyId = async (req, res) => {
  // try {
    // const { societyId } = req.params;
// 
    // if (!societyId) {
      // return res.status(400).json({ message: "Society ID is required" });
    // }
// 
    // const residents = await User.findAll({
      // where: {
        // societyId,
        // isManagementCommittee: false,
      // },
      // attributes: [
        // "salutation",
        // "firstName",
        // "lastName",
        // "email",
        // "mobileNumber",
        // "roleId",
        // "status",
        // "addressId",
        // "primaryContact",
        // "livesHere",
        // "unitId",
        // "userId",
      // ],
    // include:[
      // {
        // model:Unit,
        // attributes:["unitId","unitName","unitNumber","unitsize"],
      // },
    // ],
  // });
// 
    // if (!residents || residents.length === 0){
      // return res.status(404).json({ message: "No residents found for the given Society ID" });
    // }
// 
    // if (!residents || residents.length === 0) {
      // return res.status(404).json({ message: "No residents found for the given Society ID" });
    // }
// 
    // res.status(200).json({
      // message: "Residents fetched successfully",
      // residents,
    // });
  // } catch (error) {
    // console.error("Error fetching residents:", error);
    // res.status(500).json({ error: error.message });
  // }
// };

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
const approveUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    user.status = "active"; 
    user.isDeleted=1;
    await user.save();

    res.status(200).json({ message: "User approved successfully", user });
  } catch (err) {
    console.error("Error approving user:", err.message);
    res.status(500).json({ error: "Failed to approve user", details: err.message });
  }
};

// Reject User
const rejectUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.status = "inactive";
    //user.unitId = null;
     user.isDeleted=0;
    await user.save();

    res.status(200).json({ message: "User rejected successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to reject user", details: err.message });
  }
};

const getAllApprovedUsers = async (req, res) => {
  try {
     const { societyId } = req.params;
 
     if (!societyId) {
       return res.status(400).json({ message: "societyId is required" });
     }
 
     
     const activeUsers = await User.findAll({
       where: {
         societyId,  
         status:"approveUser",
         status: "active",  
         isDeleted:1,
         //unitId: { [Op.ne]: null },  
         managementDesignation: "Resident", 
       },
     });
 
     if (activeUsers.length === 0) {
       return res.status(404).json({ message: "No approved users found" });
     }
 
     return res.status(200).json(activeUsers);
   } catch (error) {
     console.error("Error fetching approved users:", error);
     return res.status(500).json({ error: error.message || "Internal Server Error" });
   }
 };

 const getAllDeactiveUsers = async (req, res) => {
  const { societyId } = req.params; 

  try {
    if (!societyId) {
      return res.status(400).json({ error: "Society ID is required" });
    }
    const deactiveUsers = await User.findAll({
      where: {
        status: "inactive", 
        societyId: societyId,   
      },
    });

    // Check if any users were found
    if (deactiveUsers.length === 0) {
      return res.status(404).json({ message: "No deactivated users found for this society" });
    }

    // Respond with the retrieved users
    res.status(200).json({
      message: "Deactivated users retrieved successfully",
      users: deactiveUsers.map(user => ({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId,
        mobileNumber: user.mobileNumber,
        status: user.status,
      })),
    });
  } catch (err) {
    console.error("Error retrieving deactivated users:", err);
    res.status(500).json({ error: "Failed to retrieve deactivated users", details: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  createSocietyModerator,
  createSocietyResident,
  getResidentBySocietyId,
  approveUser,
  rejectUser,
  getAllApprovedUsers,
  getAllDeactiveUsers,
};
