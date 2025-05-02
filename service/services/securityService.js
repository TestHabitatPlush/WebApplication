// // services/securityService.js
// const { Op } = require("sequelize");
// const { Security } = require("../models/SecurityGuard.js");

// // Create Security Guard
// const createSecurityGuard = async (data) => {
//   try {
//     const { profilePhoto, firstName, lastName, email, mobileNumber, idProof } = data;

//     if (!firstName || !email || !mobileNumber || !idProof) {
//       throw new Error("Missing required fields: firstName, email, mobileNumber, idProof");
//     }

//     // Check for uniqueness of the email
//     const existingSecurityGuard = await Security.findOne({ where: { email } });
//     if (existingSecurityGuard) {
//       throw new Error("A security guard with this email already exists");
//     }

//     const securityGuardData = await Security.create({
//       profilePhoto,
//       firstName,
//       lastName,
//       email,
//       mobileNumber,
//       idProof,
//     });

//     return securityGuardData;
//   } catch (error) {
//     console.error("Error creating security guard:", error.message);
//     throw error; // Re-throw the error for controller to handle
//   }
// };

// // Read Security Guards
// const readSecurityGuard = async (query) => {
//   try {
//     const { search, limit, offset } = query;

//     const whereClause = {};
//     if (search) {
//       whereClause[Op.or] = [
//         { firstName: { [Op.like]: `%${search}%` } },
//         { lastName: { [Op.like]: `%${search}%` } },
//         { email: { [Op.like]: `%${search}%` } },
//         { mobileNumber: { [Op.like]: `%${search}%` } },
//       ];
//     }

//     const securityGuards = await Security.findAll({
//       where: whereClause,
//       limit: Math.min(limit, 100), // Cap limit at 100
//       offset: offset,
//     });

//     return securityGuards;
//   } catch (error) {
//     console.error("Error reading security guards:", error.message);
//     throw new Error("Error reading security guards");
//   }
// };

// // Update Security Guard
// const updateSecurityGuard = async (id, data) => {
//   try {
//     const { profilePhoto, firstName, lastName, email, mobileNumber, idProof } = data;

//     const securityGuard = await Security.findByPk(id);
//     if (!securityGuard) {
//       throw new Error("Security guard not found");
//     }

//     // Optionally validate the new email herea
//     await securityGuard.update({
//       profilePhoto,
//       firstName,
//       lastName,
//       email,
//       mobileNumber,
//       idProof,
//     });

//     return securityGuard;
//   } catch (error) {
//     console.error("Error updating security guard:", error.message);
//     throw new Error("Error updating security guard");
//   }
// };

// // Delete Security Guard
// const deleteSecurityGuard = async (id) => {
//   try {
//     const securityGuard = await Security.findByPk(id);
//     if (!securityGuard) {
//       throw new Error("Security guard not found");
//     }

//     await securityGuard.destroy();
//     return { message: "Security guard deleted successfully" };
//   } catch (error) {
//     console.error("Error deleting security guard:", error.message);
//     throw error;
//   }
// };

// module.exports = {
//   createSecurityGuard,
//   readSecurityGuard,
//   updateSecurityGuard,
//   deleteSecurityGuard,
// };
