// const { User, Unit, Role } = require("../models");
// const { getAllUsersService, getUserByIdService } = require("../services/userService");
// //const { createUnit, getUnit, getAllUnits } = require("../controllers/unitController.js");
// const addressService = require("../services/addressService");
// const XLSX = require("xlsx");
// const fs = require("fs");
// const bcrypt = require("bcrypt");
// const upload = require("../middleware/upload");
// const { Op } = require("sequelize");
// // const createSocietyModerator = async (req, res) => {
// //   try {
// //     const { address, email, roleId, ...customerData } = req.body;

// //     const existingUser = await User.findOne({ where: { email } });
// //     if (existingUser) {
// //       return res.status(400).json({ message: "Email already in use" });
// //     }

// //     const addressData = await addressService.createAddress(address);
// //     const addressId = addressData.addressId;

// //     const role = await Role.findByPk(roleId);
// //     if (!role) {
// //       return res.status(400).json({ message: "Invalid role ID" });
// //     }

// //     const managementDesignation = role.roleName;

// //     const password = "admin"; 
// //     const result = await User.create({
// //       ...customerData,
// //       email,
// //       roleId,
// //       addressId,
// //       password,
// //       livesHere: true,
// //       primaryContact: true,
// //       isManagementCommittee: true,
// //       managementDesignation,
// //     });

// //     res.status(201).json({
// //       message: "Society Moderator created successfully",
// //       result,
// //     });
// //   } catch (error) {
// //     console.error("Error creating society moderator:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // const createSocietyModerator = async (req, res) => {
// //   try {
// //     const { address, email, roleId, ...customerData } = req.body;

// //     const existingUser = await User.findOne({ where: { email } });
// //     if (existingUser) {
// //       return res.status(400).json({ message: "Email already in use" });
// //     }

// //     const addressData = await addressService.createAddress(address);
// //     const addressId = addressData.addressId;

// //     const role = await Role.findByPk(roleId);
// //     if (!role) {
// //       return res.status(400).json({ message: "Invalid role ID" });
// //     }

// //     const password = "admin"; // Default password
// //     const managementDesignation = role.roleName;

// //     const result = await User.create({
// //       ...customerData,
// //       email,
// //       roleId,
// //       addressId,
// //       password,
// //       livesHere: true,
// //       primaryContact: true,
// //       isManagementCommittee: true,
// //       managementDesignation,
// //       status: "pending", 
// //     });

// //     res.status(201).json({
// //       message: "Society Moderator created successfully",
// //       result,
// //     });
// //   } catch (error) {
// //     console.error("Error creating society moderator:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// //  };

// const createSocietyModerator = async (req, res) => {
//   upload.fields([{ name: "photo" }])(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: "File upload error", error: err.message });
//     }

//     try {
//       const { address, email, roleId, ...customerData } = req.body;
//       const existingUser = await User.findOne({ where: { email } });
//       if (existingUser) {
//         return res.status(400).json({ message: "Email already in use" });
//       }
//       const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
//       const addressData = await addressService.createAddress(parsedAddress);
//       const addressId = addressData.addressId;
//       const role = await Role.findByPk(roleId);
//       if (!role) {
//         return res.status(400).json({ message: "Invalid role ID" });
//       }
//       const photoPath = req.files?.photo?.[0]?.path || null;

//       const password = "admin";
//       const managementDesignation = role.roleName;

//       const result = await User.create({
//         ...customerData,
//         email,
//         roleId,
//         addressId,
//         password, 
//         photo: photoPath,
//         livesHere: true,
//         primaryContact: true,
//         isManagementCommittee: true,
//         managementDesignation,
//         status: "pending",
//       });

//       res.status(201).json({
//         message: "Society Moderator created successfully",
//         result,
//       });
//     } catch (error) {
//       console.error("Error creating society moderator:", error);
//       res.status(500).json({ error: error.message });
//     }
//   });
// };

// // const updateSocietyModerator = async (req, res) => {
// //   upload.fields([{ name: "photo" }])(req, res, async (err) => {
// //     if(err){
// //       return res.status(400).json({ message: "File upload error", error: err.messag});
// //     }
// //     try{
// //       const { userId} = req.params;
// //       const { address, roleId,email, ...updateData } = req.body;

// //       const existingUser = await User.findByPk(userId);
// //       if (!existingUser) {
// //         return res.status(404).json({ message: "User not found" });
// //       }

// //       if(address){
// //         const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
// //         if(existingUser.adressId){
// //           await addressService.updateAddress(existingUser.addressId, parsedAddress);
// //         } else {
// //           const newAdress = await addressService.createAddress(parsedAddress);
// //           updateData.addressId = newAdress.addressId;
// //         }
// //       }

// //       const photoPath = req.files?.photo?.[0]?.path;
// //       if (photoPath) {
// //         updateData.photo = photoPath;
// //       }

// //       if (roleId) {
// //         const role = await Role.findByPk(roleId);
// //         if (!role) {
// //           return res.status(400).json({ message: "Invalid role ID" });
// //         }
// //         updateData.roleId = roleId;
// //         updateData.managementDesignation = role.roleName;
// //       }

// //       if(email && email !== existingUser.email){
// //         const emailExists = await User.findOne({ where: { email } });
// //         if(emailExists){
// //           return res.status(400).json({ message: "Email already in use" });
// //         }
// //         updateData.email = email;
// //       }

// //       await existingUser.update(updateData);

// //     } catch(error){
// //       console.error("Error updating society moderator:", error);
// //       res.status(500).json({ error: error.message });
// //     }
// //   })
// //   }
// const updateSocietyModerator = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { address, roleId, email, ...updateData } = req.body;

//     const existingUser = await User.findByPk(userId);
//     if (!existingUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Address handling
//     if (address) {
//       const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
//       if (existingUser.addressId) {
//         await addressService.updateAddress(existingUser.addressId, parsedAddress);
//       } else {
//         const newAddress = await addressService.createAddress(parsedAddress);
//         updateData.addressId = newAddress.addressId;
//       }
//     }

//     // Photo upload
//     const photoPath = req.files?.photo?.[0]?.path;
//     if (photoPath) {
//       updateData.photo = photoPath;
//     }

//     // Role
//     if (roleId) {
//       const role = await Role.findByPk(roleId);
//       if (!role) {
//         return res.status(400).json({ message: "Invalid role ID" });
//       }
//       updateData.roleId = roleId;
//       updateData.managementDesignation = role.roleName;
//     }

//     // Email
//     if (email && email !== existingUser.email) {
//       const emailExists = await User.findOne({ where: { email } });
//       if (emailExists) {
//         return res.status(400).json({ message: "Email already in use" });
//       }
//       updateData.email = email;
//     }

//     await existingUser.update(updateData);

//     return res.status(200).json({ message: "User updated successfully" });
//   } catch (error) {
//     console.error("Error updating society moderator:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };

// // const updateSocietyStatus = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     // const {status} = req.body;
// //     const { address, roleId,status, ...updateData } = req.body;

// //     const moderator = await User.findByPk(id);
// //     if (!moderator) {
// //       await t.rollback();
// //       return res.status(404).json({ message: "Moderator not found" });
// //     }

// //     if (address) {
// //       const updatedAddress = await addressService.updateAddress(moderator.addressId, address);
// //       updateData.addressId = updatedAddress.addressId;
// //     }

// //     let newRole = null;
// //     if (roleId) {
// //       newRole = await Role.findByPk(roleId);
// //       if (!newRole) {
// //         return res.status(400).json({ message: "Invalid roleId" });
// //       }
// //       updateData.roleId = roleId;
// //       updateData.managementDesignation = newRole.roleName;
// //     }

// //     if (status && ["pending", "inactive", "active"].includes(status)) {
// //       updateData.status = status;

// //       const currentRole = await Role.findByPk(moderator.roleId);
// //       const currentCategory = currentRole?.roleCategory;

// //       if (["society_moderator", "society_facility_manager"].includes(currentCategory)) {
// //         const residentRoles = await Role.findAll({
// //           where: {
// //             roleCategory: ["society_owner", "society_owner_family", "society_tenant", "society_tenant_family"],
// //           },
// //         });
// //         const residentRoleIds = residentRoles.map((r) => r.roleId);

// //         await User.update(
// //           { status },
// //           {
// //             where: {
// //               societyId: moderator.societyId,
// //               roleId: residentRoleIds,
// //             },
// //             transaction:t,
// //           }
// //         );
// //         await Customer.update(
// //           { status },
// //           {
// //             where: {
// //               customerId: moderator.societyId,
// //             },
// //             transaction:t,
// //           }
// //         );
// //       }
// //     }

// //     await moderator.update(updateData, { transaction: t });
// //     await t.commit();
// //     res.status(200).json({
// //       message: "Moderator updated successfully",
// //       updatedModerator: moderator,
// //     });
// //   } catch (err) {
// //     await t.rollback();
// //     console.error("Error updating moderator:", err);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // };

// const updateSocietyStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { address, roleId, status, ...updateData } = req.body;

//     const moderator = await User.findByPk(id);
//     if (!moderator) {
//       return res.status(404).json({ message: "Moderator not found" });
//     }

//     if (address) {
//       const updatedAddress = await addressService.updateAddress(moderator.addressId, address);
//       updateData.addressId = updatedAddress.addressId;
//     }

//     let newRole = null;
//     if (roleId) {
//       newRole = await Role.findByPk(roleId);
//       if (!newRole) {
//         return res.status(400).json({ message: "Invalid roleId" });
//       }
//       updateData.roleId = roleId;
//       updateData.managementDesignation = newRole.roleName;
//     }

//     if (status && ["pending", "inactive", "active"].includes(status)) {
//       updateData.status = status;
//       const currentRole = await Role.findByPk(moderator.roleId);
//       const currentCategory = currentRole?.roleCategory;
//       if (["society_moderator", "society_facility_manager"].includes(currentCategory)) {
//         const residentRoles = await Role.findAll({
//           where: {
//             roleCategory: ["society_owner", "society_owner_family", "society_tenant", "society_tenant_family"],
//           },
//         });
//         const residentRoleIds = residentRoles.map((r) => r.roleId);

//         await User.update(
//           { status },
//           {
//             where: {
//               societyId: moderator.societyId,
//               roleId: residentRoleIds,
//             },
//           }
//         );
//       }
//     }

//     await moderator.update(updateData);

//     res.status(200).json({
//       message: "Moderator updated successfully",
//       updatedModerator: moderator,
//     });
//   } catch (err) {
//     console.error("Error updating moderator:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // const createSocietyResident = async (req, res) => {
// //   upload.fields([{name:"photo"}])( req,res,async(err) =>{
// //     if(err){
// //       return res.status(400).json({
// //         message:"file upload error",error: err.message
// //       })
// //     };
// //   })
// //   try {
// //     const { address, email, salutation, firstName, lastName, mobileNumber, alternateNumber, roleId, unitId } = req.body;
// //     const { societyId } = req.params;

// //     if (!societyId) {
// //       return res.status(400).json({ message: "Society ID is required in the URL" });
// //     }

// //     const existingUser = await User.findOne({ where: { email } });
// //     if (existingUser) {
// //       return res.status(400).json({ message: "Email already in use" });
// //     }

// //     const addressData = await addressService.createAddress(address);
// //     const addressId = addressData.addressId;

// //     const password = "Himansu";

// //     let unit = null;
// //     if (unitId) {
// //       unit = await Unit.findByPk(unitId);
// //       if (!unit) {
// //         return res.status(400).json({ message: "Invalid unit ID" });
// //       }
// //     }

// //     const role = await Role.findByPk(roleId);
// //     if (!role) {
// //       return res.status(400).json({ message: "Invalid role ID" });
// //     }
// //     const photoPath= req.files?.photo?.[0]?.path || null;
// //     const managementDesignation = role.roleName;
// //     const residentDetails = {
// //       salutation,
// //       firstName,
// //       lastName,
// //       password,
// //       countryCode: address.countryCode || 91,
// //       mobileNumber,
// //       alternateNumber,
// //       email,
// //       roleId,
// //       photo:photoPath,
// //       livesHere: true,
// //       primaryContact: true,
// //       isManagementCommittee: false,
// //       managementDesignation,
// //       status: "pending",
// //       addressId,
// //       societyId,
// //       unitId: unit ? unit.unitId : null,
// //     };

// //     const result = await User.create(residentDetails);

// //     res.status(201).json({
// //       message: "Society Resident created successfully",
// //       result,
// //     });
// //   } catch (error) {
// //     console.error("Error creating society resident:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // };
// const createSocietyResident = async (req, res) => {
//   upload.fields([{ name: "photo" }])(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: "File upload error", error: err.message });
//     }

//     try {
//       let {
//         address,
//         email,
//         salutation,
//         firstName,
//         lastName,
//         mobileNumber,
//         alternateNumber,
//         roleId,
//         unitId
//       } = req.body;

//       const { societyId } = req.params;

//       if (!societyId) {
//         return res.status(400).json({ message: "Society ID is required in the URL" });
//       }

//       // Parse address if it's a JSON string
//       if (typeof address === "string") {
//         try {
//           address = JSON.parse(address);
//         } catch (e) {
//           return res.status(400).json({ message: "Invalid address format" });
//         }
//       }

//       // Address validation
//       if (!address?.city || !address?.state || !address?.zipCode) {
//         return res.status(400).json({
//           message: "Address must include city, state, and zipCode",
//         });
//       }

//       // Email validation
//       if (!email) {
//         return res.status(400).json({ message: "Email is required" });
//       }

//       const existingUser = await User.findOne({ where: { email } });
//       if (existingUser) {
//         return res.status(400).json({ message: "Email already in use" });
//       }

//       // Create address
//       const addressData = await addressService.createAddress(address);
//       const addressId = addressData.addressId;

//       // Set default password
//       const password = "Himansu";

//       // Validate unit (if provided)
//       let unit = null;
//       if (unitId) {
//         unit = await Unit.findByPk(unitId);
//         if (!unit) {
//           return res.status(400).json({ message: "Invalid unit ID" });
//         }
//       }

//       // Validate role
//       const role = await Role.findByPk(roleId);
//       if (!role) {
//         return res.status(400).json({ message: "Invalid role ID" });
//       }

//       const photoPath = req.files?.photo?.[0]?.path || null;
//       const managementDesignation = role.roleName;

//       const residentDetails = {
//         salutation,
//         firstName,
//         lastName,
//         password,
//         countryCode: address.countryCode || 91,
//         mobileNumber,
//        // alternateNumber, //changes by subhashree
//         email,
//         roleId,
//         photo: photoPath,
//         livesHere: true,
//         primaryContact: true,
//         isManagementCommittee: false,
//         managementDesignation,
//         status: "pending",
//         addressId,
//         societyId,
//         unitId: unit ? unit.unitId : null,
//       };

//       const result = await User.create(residentDetails);

//       res.status(201).json({
//         message: "Society Resident created successfully",
//         result,
//       });
//     } catch (error) {
//       console.error("Error creating society resident:", error);
//       res.status(500).json({ error: error.message });
//     }
//   });
// };

// //BulkCreateResidents
// const bulkCreateResidents = async (req, res) => {
//   try {
//     const { societyId } = req.params;
//     let data = [];

//     if (req.file) {
//       // 📂 Case 1: File upload
//       const workbook = XLSX.readFile(req.file.path);
//       const sheet = workbook.Sheets[workbook.SheetNames[0]];
//       data = XLSX.utils.sheet_to_json(sheet);

//       // cleanup uploaded file right away
//       fs.unlinkSync(req.file.path); 
//     } else if (req.body && Array.isArray(req.body)) {
//       // 📄 Case 2: JSON body
//       data = req.body;
//     } else {
//       return res.status(400).json({ message: "No file or JSON body provided" });
//     }

//     if (!data.length) {
//       return res.status(400).json({ message: "No data found" });
//     }

//     const created = [];
//     const skipped = [];

//     for (const row of data) {
//       const {
//         salutation,
//         firstName,
//         lastName,
//         countryCode,
//         alternateCountryCode,
//         mobileNumber,
//         alternateNumber,
//         email,
//         roleId,
//         unitId,
//         "address.street": street,
//         "address.city": city,
//         "address.state": state,
//         "address.zipCode": zipCode,
//         "address.address1": address1,
//         "address.address2": address2,
//         address,
//       } = row;

//       const finalAddress = address || { street, city, state, zipCode, address1, address2 };

//       // ✅ Required fields validation
//       if (!email || !firstName || !lastName || !unitId || !roleId || !mobileNumber) {
//         skipped.push({ email, reason: "Missing required fields" });
//         continue;
//       }

//       const exists = await User.findOne({ where: { email } });
//       if (exists) {
//         skipped.push({ email, reason: "Email already exists" });
//         continue;
//       }

//       const role = await Role.findByPk(roleId);
//       if (!role) {
//         skipped.push({ email, reason: "Role not found" });
//         continue;
//       }

//       const addressData = await addressService.createAddress(finalAddress);

//       const password = "Himansu1";

//       const user = await User.create({
//         salutation,
//         firstName,
//         lastName,
//         countryCode: countryCode || 91,
//         alternateCountryCode,
//         mobileNumber,
//         alternateNumber,
//         email,
//         password,
//         roleId,
//         unitId,
//         societyId,
//         addressId: addressData.addressId,
//         livesHere: true,
//         primaryContact: true,
//         inManagementCommittee: false,
//         managementDesignation: "Resident",
//         status: "pending",
//       });

//       created.push(user);
//     }

//     // ✅ Removed unconditional unlinkSync here

//     res.status(201).json({
//       message: "Residents bulk uploaded successfully",
//       createdCount: created.length,
//       skipped,
//     });
//   } catch (error) {
//     console.error("Bulk resident creation failed:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };



// ///////////////////////////////////////////////////////////////

// const getResidentBySocietyId = async (req, res) => {
//   try {
//     const { societyId } = req.params;
//     if (!societyId) {
//       return res.status(400).json({ message: "Society ID is required" });
//     }

//     const residents = await User.findAll({
//       where: {
//         societyId,
//         isManagementCommittee: false,
//         isDeleted: 0,
//        // status: ["active", "pending", "inactive"], changes by subhashree
//          status: ["pending"],
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
//     });

//     if (!residents || residents.length === 0) {
//       return res.status(404).json({ message: "No residents found for the given Society ID" });
//     }

//     res.status(200).json({
//       message: "Residents fetched successfully",
//       residents,
//     });
//   } catch (error) {
//     console.error("Error fetching residents:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // const updateResidentBySocietyId = async (req, res) => {
// //   upload.fields([{ name: "photo" }])(req, res, async (err) => {
// //     if(err){
// //       return res.status(400).json({ message: "File upload error", error: err.messag});
// //     }
// //   try {
// //     const { societyId } = req.params;
// //     const { userId, salutation, firstName, lastName, mobileNumber, alternateNumber, roleId, unitId, status } = req.body;

// //     if (!societyId) {
// //       return res.status(400).json({ message: "Society ID is required in the URL" });
// //     }
// //     if (!userId) {
// //       return res.status(400).json({ message: "User ID is required in the request body" });
// //     }

// //     const resident = await User.findOne({ where: { userId, societyId, isManagementCommittee: false } });

// //     if (!resident) {
// //       return res.status(404).json({ message: "Resident not found in the given society" });
// //     }

// //     let unit = null;
// //     if (unitId) {
// //       unit = await Unit.findByPk(unitId);
// //       if (!unit) {
// //         return res.status(400).json({ message: "Invalid unit ID" });
// //       }
// //     }

// //     const photoPath = req.files?.photo?.[0]?.path|| resident.photo;

// //     await resident.update({
// //       salutation,
// //       firstName,
// //       lastName,
// //       mobileNumber,
// //       photo:photoPath,
// //       alternateNumber,
// //       roleId,
// //       status,
// //       unitId: unit ? unit.unitId : resident.unitId,
// //     });

// //     res.status(200).json({ message: "Resident updated successfully", resident });
// //   } catch (error) {
// //     console.error("Error updating resident:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // })
// // };

// const updateResidentBySocietyId = async (req, res) => {
//   upload.fields([{ name: "photo" }])(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: "File upload error", error: err.message });
//     }

//     try {
//       const { societyId } = req.params;
//       const { userId, salutation, firstName, lastName, mobileNumber, alternateNumber, roleId, unitId, status } = req.body;

//       if (!societyId) {
//         return res.status(400).json({ message: "Society ID is required in the URL" });
//       }

//       if (!userId) {
//         return res.status(400).json({ message: "User ID is required in the request body" });
//       }

//       const resident = await User.findOne({ where: { userId, societyId, isManagementCommittee: false } });

//       if (!resident) {
//         return res.status(404).json({ message: "Resident not found in the given society" });
//       }

//       let unit = null;
//       if (unitId) {
//         unit = await Unit.findByPk(unitId);
//         if (!unit) {
//           return res.status(400).json({ message: "Invalid unit ID" });
//         }
//       }

//       const photoPath = req.files?.photo?.[0]?.path || resident.photo;

//       await resident.update({
//         salutation,
//         firstName,
//         lastName,
//         mobileNumber,
//         photo: photoPath,
//         alternateNumber,
//         roleId,
//         status,
//         unitId: unit ? unit.unitId : resident.unitId,
//       });

//       res.status(200).json({ message: "Resident updated successfully", resident });
//     } catch (error) {
//       console.error("Error updating resident:", error);
//       res.status(500).json({ error: error.message });
//     }
//   });
// };


// const createUser = async (req, res) => {
//   try {
//     const { address, ...customerData } = req.body;
//     const addressData = await addressService.createAddress(address);
//     const addressId = addressData.addressId;

//     const result = await User.create({ ...customerData, addressId });

//     if (result) {
//       res.status(201).json({
//         message: "User created successfully",
//         result,
//       });
//     } else {
//       throw new Error("Error creating user");
//     }
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await getAllUsersService();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const getUserById = async (req, res) => {
//   try {
//     const user = await getUserByIdService(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

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

// const getManagement_committee = async (req, res) => {
//   try {
//     const societyId = req.params.societyId;
//     if (!societyId) {
//       return res.status(400).json({ message: "Society ID is required" });
//     }
//     const allowedCategories = ["management_committee", "society_moderator"];
//     const roles = await Role.findAll({
//       where: {
//         roleCategory: allowedCategories,
//       }
//     });

//     const roleIds = roles.map(role => role.roleId);
//     const members = await User.findAll({
//       where: {
//         societyId,
//         roleId: roleIds,
//       },
//       include: [
//         { model: Role, as: "role" },
//         // {model: Address, as: "address"},
//       ],
//     });
//     res.status(200).json({
//       message: "Management committee members fetched successfully",
//       members,
//     });
//   }
//   catch (error) {
//     console.error("Error fetching management committee:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const getAllApprovedUsers = async (req, res) => {
//   try {
//     const { societyId } = req.params;
//     const { page = 0, pageSize = 10 } = req.query;

//     if (!societyId) {
//       return res.status(400).json({ message: "societyId is required" });
//     }

//     const offset = parseInt(page) * parseInt(pageSize);
//     const limit = parseInt(pageSize);

//     const { count, rows: activeUsers } = await User.findAndCountAll({
//       where: {
//         societyId,
//         status: "active",
//         isDeleted: 0, // <- assuming 0 means not deleted
//         managementDesignation: "Resident",
//       },
//       offset,
//       limit,
//     });

//     if (!activeUsers || activeUsers.length === 0) {
//       return res.status(404).json({ message: "No approved users found" });
//     }

//     return res.status(200).json({ total: count, users: activeUsers });
//   } catch (error) {
//     console.error("Error fetching approved users:", error);
//     return res.status(500).json({ error: error.message || "Internal Server Error" });
//   }
// };


//  const getAllDeactiveUsers = async (req, res) => {
//   const { societyId } = req.params; 

//   try {
//     if (!societyId) {
//       return res.status(400).json({ error: "Society ID is required" });
//     }
//     const deactiveUsers = await User.findAll({
//       where: {
//         status: "inactive", 
//         societyId: societyId,   
//       },
//     });

//     // Check if any users were found
//     if (deactiveUsers.length === 0) {
//       return res.status(404).json({ message: "No deactivated users found for this society" });
//     }

//     // Respond with the retrieved users
//     res.status(200).json({
//       message: "Deactivated users retrieved successfully",
//       users: deactiveUsers.map(user => ({
//         userId: user.userId,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email:user.email,//added by subhashree
//         roleId: user.roleId,
//         mobileNumber: user.mobileNumber,
//         status: user.status,
//       })),
//     });
//   } catch (err) {
//     console.error("Error retrieving deactivated users:", err);
//     res.status(500).json({ error: "Failed to retrieve deactivated users", details: err.message });
//   }
// };

// const getAllSuper_admin_itAndModrerator = async (req, res) => {
//   await Promise.all([
//     Role.findAll({
//       where: {
//         roleCategory: {
//           [Op.in]: ["super_admin_it","society_moderator"],
//         },
//       },
//     }),
//   ])
//     .then(async ([roles]) => {
//       const roleIds = roles.map((role) => role.roleId);
//       const users = await User.findAll({
//         where: {
//           roleId: {
//             [Op.in]: roleIds,
//           },
//           isDeleted: 0,
//         },
//         include: [{ model: Role, as: "role" }],
//       });
//       res.status(200).json({
//         message: "Super Admins, IT Admins, and IT Moderators fetched successfully",
//         users,
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching users:", error);
//       res.status(500).json({ error: "Internal server error" });
//     });
// };
// const updateUserIdStatus = async(req,res) =>{
//   try{
//     const {userId} = req.params;
//   const {status}=req.body;
//   if(!userId){
//     return res.status(400).json({
//       message:"UserId is required",
//     });
//   }
//   if(!status || !["active","inactive","pending"].includes(status)){
//     return res.status(400).json({
//       message:"Valid status is required (active, inactive, pending)",
//     });
//   }
//   const user = await User.findByPk(userId);
//   if(!user){
//     return res.status(404).json({
//       message:"User not found",
//     });
//   }
//   user.status = status;
//   await user.save();
//   return res.status(200).json({
//     message:"User status updated successfully", 
//     user,
//   });
// } catch (error){
//     console.log("error updateUserId Status",error);
//     res.status(500).json({
//       message:"Internal server error",
//     });
//   }
// }

// module.exports = {
//   createUser,
//   getAllUsers,
//   getUserById,
//   createSocietyModerator,
//   updateSocietyModerator,
//   updateSocietyStatus,
//   createSocietyResident,
//   updateResidentBySocietyId,
//   bulkCreateResidents,
//   getResidentBySocietyId,
//   getSocietyModerator,
//   getManagement_committee,
//   getAllApprovedUsers,
//   getAllDeactiveUsers,
//   getAllSuper_admin_itAndModrerator,
//   updateUserIdStatus,
// };


const { User, Unit, Role } = require("../models");
const { getAllUsersService, getUserByIdService } = require("../services/userService");
//const { createUnit, getUnit, getAllUnits } = require("../controllers/unitController.js");
const addressService = require("../services/addressService");
const XLSX = require("xlsx");
const fs = require("fs");
const bcrypt = require("bcrypt");
const upload = require("../middleware/upload");
const { Op } = require("sequelize");
// const createSocietyModerator = async (req, res) => {
//   try {
//     const { address, email, roleId, ...customerData } = req.body;

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     const addressData = await addressService.createAddress(address);
//     const addressId = addressData.addressId;

//     const role = await Role.findByPk(roleId);
//     if (!role) {
//       return res.status(400).json({ message: "Invalid role ID" });
//     }

//     const managementDesignation = role.roleName;

//     const password = "admin"; 
//     const result = await User.create({
//       ...customerData,
//       email,
//       roleId,
//       addressId,
//       password,
//       livesHere: true,
//       primaryContact: true,
//       isManagementCommittee: true,
//       managementDesignation,
//     });

//     res.status(201).json({
//       message: "Society Moderator created successfully",
//       result,
//     });
//   } catch (error) {
//     console.error("Error creating society moderator:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// const createSocietyModerator = async (req, res) => {
//   try {
//     const { address, email, roleId, ...customerData } = req.body;

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     const addressData = await addressService.createAddress(address);
//     const addressId = addressData.addressId;

//     const role = await Role.findByPk(roleId);
//     if (!role) {
//       return res.status(400).json({ message: "Invalid role ID" });
//     }

//     const password = "admin"; // Default password
//     const managementDesignation = role.roleName;

//     const result = await User.create({
//       ...customerData,
//       email,
//       roleId,
//       addressId,
//       password,
//       livesHere: true,
//       primaryContact: true,
//       isManagementCommittee: true,
//       managementDesignation,
//       status: "pending", 
//     });

//     res.status(201).json({
//       message: "Society Moderator created successfully",
//       result,
//     });
//   } catch (error) {
//     console.error("Error creating society moderator:", error);
//     res.status(500).json({ error: error.message });
//   }
//  };

const createSocietyModerator = async (req, res) => {
  upload.fields([{ name: "photo" }])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    }

    try {
      const { address, email, roleId, ...customerData } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
      const addressData = await addressService.createAddress(parsedAddress);
      const addressId = addressData.addressId;
      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(400).json({ message: "Invalid role ID" });
      }
      const photoPath = req.files?.photo?.[0]?.path || null;

      const password = "admin";
      const managementDesignation = role.roleName;

      const result = await User.create({
        ...customerData,
        email,
        roleId,
        addressId,
        password, 
        photo: photoPath,
        livesHere: true,
        primaryContact: true,
        isManagementCommittee: true,
        managementDesignation,
        status: "pending",
      });

      res.status(201).json({
        message: "Society Moderator created successfully",
        result,
      });
    } catch (error) {
      console.error("Error creating society moderator:", error);
      res.status(500).json({ error: error.message });
    }
  });
};

// const updateSocietyModerator = async (req, res) => {
//   upload.fields([{ name: "photo" }])(req, res, async (err) => {
//     if(err){
//       return res.status(400).json({ message: "File upload error", error: err.messag});
//     }
//     try{
//       const { userId} = req.params;
//       const { address, roleId,email, ...updateData } = req.body;

//       const existingUser = await User.findByPk(userId);
//       if (!existingUser) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       if(address){
//         const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
//         if(existingUser.adressId){
//           await addressService.updateAddress(existingUser.addressId, parsedAddress);
//         } else {
//           const newAdress = await addressService.createAddress(parsedAddress);
//           updateData.addressId = newAdress.addressId;
//         }
//       }

//       const photoPath = req.files?.photo?.[0]?.path;
//       if (photoPath) {
//         updateData.photo = photoPath;
//       }

//       if (roleId) {
//         const role = await Role.findByPk(roleId);
//         if (!role) {
//           return res.status(400).json({ message: "Invalid role ID" });
//         }
//         updateData.roleId = roleId;
//         updateData.managementDesignation = role.roleName;
//       }

//       if(email && email !== existingUser.email){
//         const emailExists = await User.findOne({ where: { email } });
//         if(emailExists){
//           return res.status(400).json({ message: "Email already in use" });
//         }
//         updateData.email = email;
//       }

//       await existingUser.update(updateData);

//     } catch(error){
//       console.error("Error updating society moderator:", error);
//       res.status(500).json({ error: error.message });
//     }
//   })
//   }
const updateSocietyModerator = async (req, res) => {
  try {
    const { userId } = req.params;
    const { address, roleId, email, ...updateData } = req.body;

    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Address handling
    if (address) {
      const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
      if (existingUser.addressId) {
        await addressService.updateAddress(existingUser.addressId, parsedAddress);
      } else {
        const newAddress = await addressService.createAddress(parsedAddress);
        updateData.addressId = newAddress.addressId;
      }
    }

    // Photo upload
    const photoPath = req.files?.photo?.[0]?.path;
    if (photoPath) {
      updateData.photo = photoPath;
    }

    // Role
    if (roleId) {
      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(400).json({ message: "Invalid role ID" });
      }
      updateData.roleId = roleId;
      updateData.managementDesignation = role.roleName;
    }

    // Email
    if (email && email !== existingUser.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
      updateData.email = email;
    }

    await existingUser.update(updateData);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating society moderator:", error);
    return res.status(500).json({ error: error.message });
  }
};

// const updateSocietyStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // const {status} = req.body;
//     const { address, roleId,status, ...updateData } = req.body;

//     const moderator = await User.findByPk(id);
//     if (!moderator) {
//       await t.rollback();
//       return res.status(404).json({ message: "Moderator not found" });
//     }

//     if (address) {
//       const updatedAddress = await addressService.updateAddress(moderator.addressId, address);
//       updateData.addressId = updatedAddress.addressId;
//     }

//     let newRole = null;
//     if (roleId) {
//       newRole = await Role.findByPk(roleId);
//       if (!newRole) {
//         return res.status(400).json({ message: "Invalid roleId" });
//       }
//       updateData.roleId = roleId;
//       updateData.managementDesignation = newRole.roleName;
//     }

//     if (status && ["pending", "inactive", "active"].includes(status)) {
//       updateData.status = status;

//       const currentRole = await Role.findByPk(moderator.roleId);
//       const currentCategory = currentRole?.roleCategory;

//       if (["society_moderator", "society_facility_manager"].includes(currentCategory)) {
//         const residentRoles = await Role.findAll({
//           where: {
//             roleCategory: ["society_owner", "society_owner_family", "society_tenant", "society_tenant_family"],
//           },
//         });
//         const residentRoleIds = residentRoles.map((r) => r.roleId);

//         await User.update(
//           { status },
//           {
//             where: {
//               societyId: moderator.societyId,
//               roleId: residentRoleIds,
//             },
//             transaction:t,
//           }
//         );
//         await Customer.update(
//           { status },
//           {
//             where: {
//               customerId: moderator.societyId,
//             },
//             transaction:t,
//           }
//         );
//       }
//     }

//     await moderator.update(updateData, { transaction: t });
//     await t.commit();
//     res.status(200).json({
//       message: "Moderator updated successfully",
//       updatedModerator: moderator,
//     });
//   } catch (err) {
//     await t.rollback();
//     console.error("Error updating moderator:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const updateSocietyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, roleId, status, ...updateData } = req.body;

    const moderator = await User.findByPk(id);
    if (!moderator) {
      return res.status(404).json({ message: "Moderator not found" });
    }

    if (address) {
      const updatedAddress = await addressService.updateAddress(moderator.addressId, address);
      updateData.addressId = updatedAddress.addressId;
    }

    let newRole = null;
    if (roleId) {
      newRole = await Role.findByPk(roleId);
      if (!newRole) {
        return res.status(400).json({ message: "Invalid roleId" });
      }
      updateData.roleId = roleId;
      updateData.managementDesignation = newRole.roleName;
    }

    if (status && ["pending", "inactive", "active"].includes(status)) {
      updateData.status = status;
      const currentRole = await Role.findByPk(moderator.roleId);
      const currentCategory = currentRole?.roleCategory;
      if (["society_moderator", "society_facility_manager"].includes(currentCategory)) {
        const residentRoles = await Role.findAll({
          where: {
            roleCategory: ["society_owner", "society_owner_family", "society_tenant", "society_tenant_family"],
          },
        });
        const residentRoleIds = residentRoles.map((r) => r.roleId);

        await User.update(
          { status },
          {
            where: {
              societyId: moderator.societyId,
              roleId: residentRoleIds,
            },
          }
        );
      }
    }

    await moderator.update(updateData);

    res.status(200).json({
      message: "Moderator updated successfully",
      updatedModerator: moderator,
    });
  } catch (err) {
    console.error("Error updating moderator:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const createSocietyResident = async (req, res) => {
//   upload.fields([{name:"photo"}])( req,res,async(err) =>{
//     if(err){
//       return res.status(400).json({
//         message:"file upload error",error: err.message
//       })
//     };
//   })
//   try {
//     const { address, email, salutation, firstName, lastName, mobileNumber, alternateNumber, roleId, unitId } = req.body;
//     const { societyId } = req.params;

//     if (!societyId) {
//       return res.status(400).json({ message: "Society ID is required in the URL" });
//     }

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     const addressData = await addressService.createAddress(address);
//     const addressId = addressData.addressId;

//     const password = "Himansu";

//     let unit = null;
//     if (unitId) {
//       unit = await Unit.findByPk(unitId);
//       if (!unit) {
//         return res.status(400).json({ message: "Invalid unit ID" });
//       }
//     }

//     const role = await Role.findByPk(roleId);
//     if (!role) {
//       return res.status(400).json({ message: "Invalid role ID" });
//     }
//     const photoPath= req.files?.photo?.[0]?.path || null;
//     const managementDesignation = role.roleName;
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
//       photo:photoPath,
//       livesHere: true,
//       primaryContact: true,
//       isManagementCommittee: false,
//       managementDesignation,
//       status: "pending",
//       addressId,
//       societyId,
//       unitId: unit ? unit.unitId : null,
//     };

//     const result = await User.create(residentDetails);

//     res.status(201).json({
//       message: "Society Resident created successfully",
//       result,
//     });
//   } catch (error) {
//     console.error("Error creating society resident:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
const createSocietyResident = async (req, res) => {
  upload.fields([{ name: "photo" }])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    }

    try {
      let {
        address,
        email,
        salutation,
        firstName,
        lastName,
        mobileNumber,
        alternateNumber,
        roleId,
        unitId
      } = req.body;

      const { societyId } = req.params;

      if (!societyId) {
        return res.status(400).json({ message: "Society ID is required in the URL" });
      }

      // Parse address if it's a JSON string
      if (typeof address === "string") {
        try {
          address = JSON.parse(address);
        } catch (e) {
          return res.status(400).json({ message: "Invalid address format" });
        }
      }

      // Address validation
      if (!address?.city || !address?.state || !address?.zipCode) {
        return res.status(400).json({
          message: "Address must include city, state, and zipCode",
        });
      }

      // Email validation
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Create address
      const addressData = await addressService.createAddress(address);
      const addressId = addressData.addressId;

      // Set default password
      const password = "Himansu";

      // Validate unit (if provided)
      let unit = null;
      if (unitId) {
        unit = await Unit.findByPk(unitId);
        if (!unit) {
          return res.status(400).json({ message: "Invalid unit ID" });
        }
      }

      // Validate role
      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(400).json({ message: "Invalid role ID" });
      }

      const photoPath = req.files?.photo?.[0]?.path || null;
      const managementDesignation = role.roleName;

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
        photo: photoPath,
        livesHere: true,
        primaryContact: true,
        isManagementCommittee: false,
        managementDesignation,
        status: "pending",
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
  });
};

//BulkCreateResidents
const bulkCreateResidents = async (req, res) => {
  try {
    const { societyId } = req.params;
    let data = [];


    if (req.file) {
      const workbook = XLSX.readFile(req.file.path);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(sheet);
      fs.unlinkSync(req.file.path); 
    }
  
    else if (req.body && Array.isArray(req.body)) {
      data = req.body;
    }
  
    else {
      return res.status(400).json({ message: "No file or JSON body provided" });
    }

    if (!data.length) {
      return res.status(400).json({ message: "No data found" });
    }

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
        address 
      } = row;

    
      const finalAddress = address || { street, city, state, zipCode, address1, address2 };

      
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

      const addressData = await addressService.createAddress(finalAddress);

      
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
        password,
        roleId,
        unitId,
        societyId,
        addressId: addressData.addressId,
        livesHere: true,
        primaryContact: true,
        inManagementCommittee: false,
        managementDesignation: "Resident",
        status: "pending",
      });

      created.push(user);
    }

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
        isDeleted: 0,
        status: ["active", "pending", "inactive"],
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
    res.status(500).json({ error: error.message });
  }
};

// const updateResidentBySocietyId = async (req, res) => {
//   upload.fields([{ name: "photo" }])(req, res, async (err) => {
//     if(err){
//       return res.status(400).json({ message: "File upload error", error: err.messag});
//     }
//   try {
//     const { societyId } = req.params;
//     const { userId, salutation, firstName, lastName, mobileNumber, alternateNumber, roleId, unitId, status } = req.body;

//     if (!societyId) {
//       return res.status(400).json({ message: "Society ID is required in the URL" });
//     }
//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required in the request body" });
//     }

//     const resident = await User.findOne({ where: { userId, societyId, isManagementCommittee: false } });

//     if (!resident) {
//       return res.status(404).json({ message: "Resident not found in the given society" });
//     }

//     let unit = null;
//     if (unitId) {
//       unit = await Unit.findByPk(unitId);
//       if (!unit) {
//         return res.status(400).json({ message: "Invalid unit ID" });
//       }
//     }

//     const photoPath = req.files?.photo?.[0]?.path|| resident.photo;

//     await resident.update({
//       salutation,
//       firstName,
//       lastName,
//       mobileNumber,
//       photo:photoPath,
//       alternateNumber,
//       roleId,
//       status,
//       unitId: unit ? unit.unitId : resident.unitId,
//     });

//     res.status(200).json({ message: "Resident updated successfully", resident });
//   } catch (error) {
//     console.error("Error updating resident:", error);
//     res.status(500).json({ error: error.message });
//   }
// })
// };

const updateResidentBySocietyId = async (req, res) => {
  upload.fields([{ name: "photo" }])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    }

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

      const photoPath = req.files?.photo?.[0]?.path || resident.photo;

      await resident.update({
        salutation,
        firstName,
        lastName,
        mobileNumber,
        photo: photoPath,
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
  });
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

const getSocietyModerator = async (req, res) => {
  try {
    const societyId = req.params.societyId;
    if (!societyId) {
      return res.status(400).json({ message: "Society ID is required" });
    }
    const moderator = await User.findAll({
      where: {
        societyId,
        isManagementCommittee: true,
        isDeleted: 0,
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
    })
    if (!moderator || moderator.length === 0) {
      return res.status(404).json({ message: "No society moderator found for the given Society ID" });
    }
    res.status(200).json({
      message: "Society Moderator fetched successfully",
      moderator,
    });
  }
  catch (error) {
    console.error("Error fetching society moderator:", error);
    res.status(500).json({ error: error.message });
  }
}

const getManagement_committee = async (req, res) => {
  try {
    const societyId = req.params.societyId;
    if (!societyId) {
      return res.status(400).json({ message: "Society ID is required" });
    }
    const allowedCategories = ["management_committee", "society_moderator"];
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
        { model: Role, as: "role" },
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
};

const getAllApprovedUsers = async (req, res) => {
  try {
    const { societyId } = req.params;
    const { page = 0, pageSize = 10 } = req.query;

    if (!societyId) {
      return res.status(400).json({ message: "societyId is required" });
    }

    const offset = parseInt(page) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    const { count, rows: activeUsers } = await User.findAndCountAll({
      where: {
        societyId,
        status: "active",
        isDeleted: 0, // <- assuming 0 means not deleted
        managementDesignation: "Resident",
      },
      offset,
      limit,
    });

    if (!activeUsers || activeUsers.length === 0) {
      return res.status(404).json({ message: "No approved users found" });
    }

    return res.status(200).json({ total: count, users: activeUsers });
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

const getAllSuper_admin_itAndModrerator = async (req, res) => {
  await Promise.all([
    Role.findAll({
      where: {
        roleCategory: {
          [Op.in]: ["super_admin_it","society_moderator"],
        },
      },
    }),
  ])
    .then(async ([roles]) => {
      const roleIds = roles.map((role) => role.roleId);
      const users = await User.findAll({
        where: {
          roleId: {
            [Op.in]: roleIds,
          },
          isDeleted: 0,
        },
        include: [{ model: Role, as: "role" }],
      });
      res.status(200).json({
        message: "Super Admins, IT Admins, and IT Moderators fetched successfully",
        users,
      });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const updateUserIdStatus = async(req,res) =>{
  try{
    const {userId} = req.params;
  const {status}=req.body;
  if(!userId){
    return res.status(400).json({
      message:"UserId is required",
    });
  }
  if(!status || !["active","inactive","pending"].includes(status)){
    return res.status(400).json({
      message:"Valid status is required (active, inactive, pending)",
    });
  }
  const user = await User.findByPk(userId);
  if(!user){
    return res.status(404).json({
      message:"User not found",
    });
  }
  user.status = status;
  await user.save();
  return res.status(200).json({
    message:"User status updated successfully", 
    user,
  });
} catch (error){
    console.log("error updateUserId Status",error);
    res.status(500).json({
      message:"Internal server error",
    });
  }
}


const getUserBySocietyId = async (req, res) => {
  try {
    const { societyId } = req.params;
    const { roleCategory } = req.query; 
    // example: society_owner, society_tenant, management_committee

    const users = await User.findAll({
      where: {
        societyId,
        isDeleted: false,
        status: "active",
      },
      attributes: [
        "userId",
        "salutation",
        "firstName",
        "lastName",
        "email",
        "mobileNumber",
        "primaryContact",
        "isManagementCommittee",
        "status",
      ],
      include: [
        {
          model: Role,
          as: "role",
          attributes: [
            "roleId",
            "roleCategory",
            "roleName",
            "occupancyStatus",
          ],
          where: roleCategory
            ? { roleCategory, isDeleted: false }
            : { isDeleted: false },
        },
      ],
      order: [["userId", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("getUserBySocietyId error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  createSocietyModerator,
  updateSocietyModerator,
  updateSocietyStatus,
  createSocietyResident,
  updateResidentBySocietyId,
  bulkCreateResidents,
  getResidentBySocietyId,
  getSocietyModerator,
  getManagement_committee,
  getAllApprovedUsers,
  getAllDeactiveUsers,
  getAllSuper_admin_itAndModrerator,
  updateUserIdStatus,
  getUserBySocietyId,
};