// const { Document, User, Role } = require("../models");
// const upload = require("../middleware/upload");
// const fs = require("fs");
// const { Op } = require("sequelize");

// // Admins can  use this function to create documents for a society.
// const createDocumentBySocietyId = async (req, res) => {
//   upload.fields([{ name: "document" }])(req, res, async (err) => {
//     if (err) return res.status(400).json({ message: "File upload error", error: err.message });

//     try {
//       const { documentName, visibilityOption } = req.body;
//       const { societyId, userId } = req.params;

//       if (!societyId || !userId || !documentName || !visibilityOption) {
//         return res.status(400).json({ message: "Missing required fields" });
//       }

//       const documentPath = req.files?.document?.[0]?.path || null;
//       // const picturePath = req.files?.picture?.[0]?.path || null;

//       const user = await User.findByPk(userId);
//       if (!user) return res.status(404).json({ message: "User not found" });

//       const role = await Role.findByPk(user.roleId);
//       if (!role) return res.status(404).json({ message: "Role not found" });

//       if (user.societyId?.toString() !== societyId.toString()) {
//         return res.status(403).json({ message: "You can only upload documents to your own society" });
//       }

//       const allowedRoles = ["society_moderator", "management_committee"];
//       if (!allowedRoles.includes(role.roleCategory)) {
//         return res.status(403).json({ message: "Permission denied" });
//       }

      // const visibilityMap = {
      //   owner: ["society_owner", "society_owner_family"],
      //   tenant: ["society_tenant", "society_tenant_family"],
      //   all: ["society_owner", "society_owner_family", "society_tenant", "society_tenant_family"],
      //   primary: ["primary_member"]
      // };

//       const roleCategories = visibilityMap[visibilityOption];
//       if (!roleCategories) {
//         return res.status(400).json({ message: "Invalid visibility option" });
//       }

//       const newDoc = await Document.create({
//         societyId,
//         userId,
//         roleId: user.roleId,
//         documentName,
//         document: documentPath,
//         // picture: picturePath,
//         roleCategories
//       });

//       return res.status(201).json({ message: "Document uploaded successfully", data: newDoc });
//     } catch (err) {
//       return res.status(500).json({ message: "Error uploading document", error: err.message });
//     }
//   });
// };

// // Get Documents by Society ID
// // this gate for specific role categories like ( society_owner, society_tenant, society_moderator, management_committee );
// const getDocumentBySocietyId = async (req, res) => {
//   try {
//     const { societyId, userId } = req.params;

//     if (!societyId || !userId) {
//       return res.status(400).json({ message: "societyId and userId are required" });
//     }

//     const user = await User.findByPk(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return res.status(404).json({ message: "User role not found" });

//     if (user.societyId?.toString() !== societyId.toString()) {
//       return res.status(403).json({ message: "You can only view documents from your own society" });
//     }

//     const userCategory = role.roleCategory?.toLowerCase();
//     const isPrimary = user.primaryMember === true;

//     // Only allow access to allowed roles
//     const allowedCategories = ["society_owner", "society_tenant", "society_moderator", "management_committee"];
//     if (!allowedCategories.includes(userCategory)) {
//       return res.status(403).json({ message: "Permission denied" });
//     }

//     const allDocuments = await Document.findAll({
//       where: { societyId },
//       order: [["createdAt", "DESC"]],
//     });

//     const matchedDocs = allDocuments.filter(doc => {
//       const categories = Array.isArray(doc.roleCategories)
//         ? doc.roleCategories
//         : [];

//       // Show if visible to primary member and user is primary
//       if (categories.includes("primary_member") && isPrimary) return true;

//       // Show if roleCategory matches
//       if (categories.includes(userCategory)) return true;

//       // Show if document has no restrictions
//       if (categories.length === 0) return true;

//       return false;
//     });

//     return res.status(200).json({
//       message: "Documents fetched successfully",
//       count: matchedDocs.length,
//       documents: matchedDocs
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Error fetching documents", error: err.message });
//   }
// };

// // This function is used by Residents to create their own documents.
// // Admins can also use this function to create documents for themselves.
// const createDocumentByUserId = async (req, res) => {
//     upload.fields([{ name: "document" }])(req, res, async (err) => {
//       if (err) return res.status(400).json({ message: "File upload error", error: err.message });

//       try {
//         const { documentName, societyId } = req.body;
//         const { userId } = req.params;

//         if (!userId) return res.status(400).json({ message: "userId is required" });

//         const user = await User.findByPk(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         const roleId = user.roleId;

//         const documentPath = req.files?.document?.[0]?.path || null;
//         // const picturePath = req.files?.picture?.[0]?.path || null;

//         const newDocument = await Document.create({
//           userId,
//           documentName,
//           societyId,
//           document: documentPath,
//           // picture: picturePath,
//           roleId,
//         });

//         return res.status(201).json({ message: "Document uploaded successfully", data: newDocument });
//       } catch (err) {
//         return res.status(500).json({ message: "Error uploading document", error: err.message });
//       }
//     });
//   };

// // this function is use for Resident // admin  get there own document *****
// const getDocumentByUserId = async (req, res) => {
//     try {
//       const userId = req.userId || req.params.userId;

//       const user = await User.findByPk(userId);
//       if (!user) return res.status(404).json({ message: "User not found" });

//       const documents = await Document.findAll({
//         where: {
//           userId,
//         },
//         order: [["createdAt", "DESC"]],
//       });

//       return res.status(200).json({
//         message: "Documents fetched successfully",
//         count: documents.length,
//         documents,
//       });
//     } catch (err) {
//       return res.status(500).json({
//         message: "Error fetching documents",
//         error: err.message,
//       });
//     }
//   };

// // Update Document by Society ID
// const updateDocumentBySocietyId = async (req, res) => {
//   upload.fields([{ name: "document" }])(req, res, async (err) => {
//     if (err) return res.status(400).json({ message: "File upload error", error: err.message });

//     try {
//       const { documentId } = req.params;
//       const existingDoc = await Document.findByPk(documentId);
//       if (!existingDoc) return res.status(404).json({ message: "Document not found" });

//       const { documentName, roleId } = req.body;
//       let document = existingDoc.document;
//       // let picture = existingDoc.picture;

//       if (req.files?.document?.[0]) {
//         if (document && fs.existsSync(document)) fs.unlinkSync(document);
//         document = req.files.document[0].path;
//       }

//       // if (req.files?.picture?.[0]) {
//       //   if (picture && fs.existsSync(picture)) fs.unlinkSync(picture);
//       //   picture = req.files.picture[0].path;
//       // }

//       await existingDoc.update({ documentName, roleId, document, picture });
//       return res.status(200).json({ message: "Document updated successfully", data: existingDoc });
//     } catch (err) {
//       return res.status(500).json({ message: "Failed to update document", error: err.message });
//     }
//   });
// };

// // Update Document by User ID
// const updateDocumentByUserId = async (req, res) => {
//   upload.fields([{ name: "document" }])(req, res, async (err) => {
//     if (err) return res.status(400).json({ message: "File upload error", error: err.message });

//     try {
//       const { documentId } = req.params;
//       const existingDoc = await Document.findByPk(documentId);
//       if (!existingDoc) return res.status(404).json({ message: "Document not found" });

//       const { documentName, roleId, societyId } = req.body;
//       let document = existingDoc.document;
//       // let picture = existingDoc.picture;

//       if (req.files?.document?.[0]) {
//         if (document && fs.existsSync(document)) fs.unlinkSync(document);
//         document = req.files.document[0].path;
//       }

//       // if (req.files?.picture?.[0]) {
//       //   if (picture && fs.existsSync(picture)) fs.unlinkSync(picture);
//       //   picture = req.files.picture[0].path;
//       // }

//       await existingDoc.update({ documentName, roleId, societyId, document});
//       return res.status(200).json({ message: "Document updated successfully", data: existingDoc });
//     } catch (err) {
//       return res.status(500).json({ message: "Failed to update document", error: err.message });
//     }
//   });
// };

// // Delete Document
// const deleteDocument = async (req, res) => {
//   try {
//     const { documentId } = req.params;
//     const document = await Document.findByPk(documentId);

//     if (!document) return res.status(404).json({ message: "Document not found" });

//     if (document.document && fs.existsSync(document.document)) fs.unlinkSync(document.document);
//     // if (document.picture && fs.existsSync(document.picture)) fs.unlinkSync(document.picture);

//     await document.destroy();
//     return res.status(200).json({ message: "Document deleted successfully" });
//   } catch (err) {
//     return res.status(500).json({ message: "Failed to delete document", error: err.message });
//   }
// };

// const getAllDocuments = async (req, res) => {
//   try {
//     const userId = req.userId || req.params.userId;
//     if (!userId) return res.status(400).json({ message: "userId is required" });

//     const user = await User.findByPk(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return res.status(404).json({ message: "Role not found" });

//     const allowedRoles = ["super_admin", "super_admin_it"];
//     if (!allowedRoles.includes(role.roleCategory)) {
//       return res.status(403).json({ message: "Permission denied" });
//     }

//     const documents = await Document.findAll({
//       order: [["createdAt", "DESC"]],
//     });

//     return res.status(200).json({
//       message: "Documents fetched successfully",
//       count: documents.length,
//       documents,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Error fetching documents",
//       error: err.message,
//     });
//   }
// };

// module.exports = {
//   createDocumentBySocietyId,
//   createDocumentByUserId,
//   getDocumentBySocietyId,
//   getDocumentByUserId,
//   updateDocumentBySocietyId,
//   updateDocumentByUserId,
//   deleteDocument,
//   getAllDocuments
// };



// const { Document, User, Role } = require("../models");
// const upload = require("../middleware/upload");
// const fs = require("fs");
// const { Op } = require("sequelize");

// const SUPER_ADMIN_ROLES = ["super_admin", "super_admin_it"];
// const SOCIETY_ADMIN_ROLES = ["society_moderator", "management_committee"];
// const RESIDENT_ROLES = [
//   "society_owner",
//   "society_owner_family",
//   "society_tenant",
//   "society_tenant_family",
//   "primary_member",
// ];


// const createDocumentBySocietyId = async (req, res) => {
//   upload.fields([{ name: "document" }])(req, res, async (err) => {
//     if (err) {
//       return res
//         .status(400)
//         .json({ message: "File upload error", error: err.message });
//     }

//     try {
//       const { societyId, userId } = req.params;
//       const { documentName } = req.body;

//       if (!documentName) {
//         return res.status(400).json({ message: "Document name is required" });
//       }

//       const user = await User.findByPk(userId);
//       if (!user) return res.status(404).json({ message: "User not found" });

//       if (user.societyId?.toString() !== societyId.toString()) {
//         return res.status(403).json({ message: "Unauthorized society access" });
//       }

//       const role = await Role.findByPk(user.roleId);
//       if (!role) return res.status(404).json({ message: "Role not found" });

//       if (!SOCIETY_ADMIN_ROLES.includes(role.roleCategory)) {
//         return res.status(403).json({ message: "Permission denied" });
//       }

//       const document = await Document.create({
//         societyId,
//         userId,
//         roleId: user.roleId,
//         createdByRole: role.roleCategory,
//         documentName,
//         document: req.files?.document?.[0]?.path || null,
//       });

//       return res.status(201).json({
//         message: "Society document uploaded successfully",
//         data: document,
//       });
//     } catch (err) {
//       return res
//         .status(500)
//         .json({ message: "Error uploading document", error: err.message });
//     }
//   });
// };

// const createDocumentByUserId = async (req, res) => {
//   upload.fields([{ name: "document" }])(req, res, async (err) => {
//     if (err) {
//       return res
//         .status(400)
//         .json({ message: "File upload error", error: err.message });
//     }

//     try {
//       const { userId } = req.params;
//       const { documentName } = req.body;

//       if (!documentName) {
//         return res.status(400).json({ message: "Document name is required" });
//       }

//       const user = await User.findByPk(userId);
//       if (!user) return res.status(404).json({ message: "User not found" });

//       const role = await Role.findByPk(user.roleId);
//       if (!role) return res.status(404).json({ message: "Role not found" });

//       const isSuperAdmin = SUPER_ADMIN_ROLES.includes(role.roleCategory);
//       const isResident = RESIDENT_ROLES.includes(role.roleCategory);

//       if (!isSuperAdmin && !isResident) {
//         return res.status(403).json({ message: "Permission denied" });
//       }

//       const document = await Document.create({
//         societyId: isSuperAdmin ? null : user.societyId,
//         userId,
//         roleId: user.roleId,
//         createdByRole: role.roleCategory,
//         documentName,
//         document: req.files?.document?.[0]?.path || null,
//       });

//       return res.status(201).json({
//         message: "Document uploaded successfully",
//         data: document,
//       });
//     } catch (err) {
//       return res
//         .status(500)
//         .json({ message: "Error uploading document", error: err.message });
//     }
//   });
// };


// // const getDocumentBySocietyId = async (req, res) => {
// //   try {
// //     const { societyId, userId } = req.params;

// //     const user = await User.findByPk(userId);
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     const role = await Role.findByPk(user.roleId);
// //     if (!role) return res.status(404).json({ message: "Role not found" });

// //     if (
// //       !SUPER_ADMIN_ROLES.includes(role.roleCategory) &&
// //       user.societyId?.toString() !== societyId.toString()
// //     ) {
// //       return res.status(403).json({ message: "Unauthorized society access" });
// //     }

// //     const documents = await Document.findAll({
// //       where: {
// //         [Op.or]: [{ societyId }, { societyId: null }],
// //       },
// //       order: [["createdAt", "DESC"]],
// //     });

// //     const visibleDocuments = documents.filter((doc) => {
// //       const isSuperAdminDoc = doc.societyId === null;

// //       if (SUPER_ADMIN_ROLES.includes(role.roleCategory)) {
// //         return isSuperAdminDoc;
// //       }

// //       if (SOCIETY_ADMIN_ROLES.includes(role.roleCategory)) {
// //         return (
// //           isSuperAdminDoc || 
// //           (doc.societyId?.toString() === societyId.toString() &&
// //             SOCIETY_ADMIN_ROLES.includes(doc.createdByRole))
// //         );
// //       }

// //       if (RESIDENT_ROLES.includes(role.roleCategory)) {
// //         return (
// //           isSuperAdminDoc || // Super Admin docs
// //           doc.userId === userId || // Own docs
// //           (doc.societyId?.toString() === societyId.toString() &&
// //             SOCIETY_ADMIN_ROLES.includes(doc.createdByRole))
// //         );
// //       }

// //       return false;
// //     });

// //     return res.status(200).json({
// //       message: "Documents fetched successfully",
// //       count: visibleDocuments.length,
// //       documents: visibleDocuments,
// //     });
// //   } catch (err) {
// //     return res.status(500).json({
// //       message: "Error fetching documents",
// //       error: err.message,
// //     });
// //   }
// // };

// const getDocumentBySocietyId = async (req, res) => {
//   try {
//     const { societyId, userId } = req.params;
//     const user = await User.findByPk(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const role = await Role.findByPk(user.roleId);
//     if (!role) {
//       return res.status(404).json({ message: "Role not found" });
//     }

//     if (
//       !SUPER_ADMIN_ROLES.includes(role.roleCategory) &&
//       user.societyId?.toString() !== societyId.toString()
//     ) {
//       return res.status(403).json({ message: "Unauthorized society access" });
//     }

//     const documents = await Document.findAll({
//       where: {
//         [Op.or]: [{ societyId }, { societyId: null }],
//       },
//       order: [["createdAt", "DESC"]],
//     });

//     const roleCache = {};
//     const visibleDocuments = [];
//     for (const doc of documents) {
//       const isSuperAdminDoc = doc.societyId === null;

//       let creatorRole = doc.createdByRole;

//       if (!creatorRole && doc.roleId) {
//         if (!roleCache[doc.roleId]) {
//           const creatorRoleRecord = await Role.findByPk(doc.roleId);
//           roleCache[doc.roleId] = creatorRoleRecord?.roleCategory || null;
//         }
//         creatorRole = roleCache[doc.roleId];
//       }

//       if (SUPER_ADMIN_ROLES.includes(role.roleCategory)) {
//         if (isSuperAdminDoc) {
//           visibleDocuments.push(doc);
//         }
//         continue;
//       }

//       if (SOCIETY_ADMIN_ROLES.includes(role.roleCategory)) {
//         if (
//           isSuperAdminDoc ||
//           (
//             doc.societyId?.toString() === societyId.toString() &&
//             SOCIETY_ADMIN_ROLES.includes(creatorRole)
//           )
//         ) {
//           visibleDocuments.push(doc);
//         }
//         continue;
//       }

//       if (RESIDENT_ROLES.includes(role.roleCategory)) {
//         if (
//           isSuperAdminDoc ||
//           doc.userId === userId ||
//           (
//             doc.societyId?.toString() === societyId.toString() &&
//             SOCIETY_ADMIN_ROLES.includes(creatorRole)
//           )
//         ) {
//           visibleDocuments.push(doc);
//         }
//         continue;
//       }
//     }

//     return res.status(200).json({
//       message: "Documents fetched successfully",
//       count: visibleDocuments.length,
//       documents: visibleDocuments,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       message: "Error fetching documents",
//       error: error.message,
//     });
//   }
// };


// const getDocumentByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findByPk(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return res.status(404).json({ message: "Role not found" });

//     const documents = await Document.findAll({
//       where: {
//         [Op.or]: [
//           { societyId: null }, // Super Admin documents
//           { societyId: user.societyId }, // Society documents
//         ],
//       },
//       order: [["createdAt", "DESC"]],
//     });

//     const visibleDocuments = documents.filter((doc) => {
//       // Super Admin docs
//       if (doc.societyId === null) return true;

//       // Same society docs
//       if (doc.societyId?.toString() === user.societyId?.toString()) return true;

//       // Own docs fallback
//       return doc.userId === userId;
//     });

//     return res.status(200).json({
//       message: "Documents fetched successfully",
//       count: visibleDocuments.length,
//       documents: visibleDocuments,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Error fetching documents",
//       error: err.message,
//     });
//   }
// };

// const updateDocumentByDocumentId = async (req, res) => {
//   upload.fields([{ name: "document" }])(req, res, async (err) => {
//     if (err) {
//       return res
//         .status(400)
//         .json({ message: "File upload error", error: err.message });
//     }

//     try {
//       const { documentId } = req.params;
//       const { documentName } = req.body;

//       const doc = await Document.findByPk(documentId);
//       if (!doc) return res.status(404).json({ message: "Document not found" });

//       let documentPath = doc.document;

//       if (req.files?.document?.[0]) {
//         if (documentPath && fs.existsSync(documentPath)) {
//           fs.unlinkSync(documentPath);
//         }
//         documentPath = req.files.document[0].path;
//       }

//       await doc.update({
//         documentName: documentName || doc.documentName,
//         document: documentPath,
//       });

//       return res.status(200).json({
//         message: "Document updated successfully",
//         data: doc,
//       });
//     } catch (err) {
//       return res
//         .status(500)
//         .json({ message: "Error updating document", error: err.message });
//     }
//   });
// };

// const deleteDocument = async (req, res) => {
//   try {
//     const { documentId } = req.params;

//     const doc = await Document.findByPk(documentId);
//     if (!doc) return res.status(404).json({ message: "Document not found" });

//     if (doc.document && fs.existsSync(doc.document)) {
//       fs.unlinkSync(doc.document);
//     }

//     await doc.destroy();

//     return res.status(200).json({ message: "Document deleted successfully" });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Error deleting document", error: err.message });
//   }
// };

// const getAllDocuments = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findByPk(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return res.status(404).json({ message: "Role not found" });

//     if (!SUPER_ADMIN_ROLES.includes(role.roleCategory)) {
//       return res.status(403).json({ message: "Permission denied" });
//     }

//     const documents = await Document.findAll({
//       order: [["createdAt", "DESC"]],
//     });

//     return res.status(200).json({
//       message: "Documents fetched successfully",
//       count: documents.length,
//       documents,
//     });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ message: "Error fetching documents", error: err.message });
//   }
// };

// module.exports = {
//   createDocumentBySocietyId,
//   createDocumentByUserId,
//   getDocumentBySocietyId,
//   getDocumentByUserId,
//   updateDocumentByDocumentId,
//   deleteDocument,
//   getAllDocuments,
// };

const { Document, User, Role } = require("../models");
const upload = require("../middleware/upload");
const fs = require("fs");
const { Op } = require("sequelize");


const SUPER_ADMIN_ROLES = ["super_admin", "super_admin_it"];
const SOCIETY_ADMIN_ROLES = ["society_moderator", "management_committee"];
const RESIDENT_ROLES = [
  "society_owner",
  "society_owner_family",
  "society_tenant",
  "society_tenant_family",
  "primary_member",
];


const VISIBILITY_MAP = {
  owner: ["society_owner", "society_owner_family"],
  tenant: ["society_tenant", "society_tenant_family"],
  primary: ["primary_member"],
  all: [
    "society_owner",
    "society_owner_family",
    "society_tenant",
    "society_tenant_family",
  ],
};


const createDocumentBySocietyId = async (req, res) => {
  upload.fields([{ name: "document" }])(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }

    try {
      const { societyId, userId } = req.params;
      const { documentName, visibility } = req.body; 

      if (!documentName || !visibility) {
        return res.status(400).json({
          message: "Document name and visibility are required",
        });
      }

      if (!VISIBILITY_MAP[visibility]) {
        return res.status(400).json({ message: "Invalid visibility option" });
      }

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.societyId?.toString() !== societyId.toString()) {
        return res.status(403).json({ message: "Unauthorized society access" });
      }

      const role = await Role.findByPk(user.roleId);
      if (!role) return res.status(404).json({ message: "Role not found" });

      if (!SOCIETY_ADMIN_ROLES.includes(role.roleCategory)) {
        return res.status(403).json({ message: "Permission denied" });
      }

      const document = await Document.create({
        societyId,
        userId,
        roleId: user.roleId,
        createdByRole: role.roleCategory,
        documentName,
        document: req.files?.document?.[0]?.path || null,
        roleCategories: JSON.stringify(VISIBILITY_MAP[visibility]), 
      });

      return res.status(201).json({
        message: "Society document uploaded successfully",
        data: document,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error uploading document", error: err.message });
    }
  });
};


const createDocumentByUserId = async (req, res) => {
  upload.fields([{ name: "document" }])(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }

    try {
      const { userId } = req.params;
      const { documentName, visibility } = req.body; 

      if (!documentName || !visibility) {
        return res.status(400).json({
          message: "Document name and visibility are required",
        });
      }

      if (!VISIBILITY_MAP[visibility]) {
        return res.status(400).json({ message: "Invalid visibility option" });
      }

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const role = await Role.findByPk(user.roleId);
      if (!role) return res.status(404).json({ message: "Role not found" });

      const isSuperAdmin = SUPER_ADMIN_ROLES.includes(role.roleCategory);
      const isResident = RESIDENT_ROLES.includes(role.roleCategory);

      if (!isSuperAdmin && !isResident) {
        return res.status(403).json({ message: "Permission denied" });
      }

      const document = await Document.create({
        societyId: isSuperAdmin ? null : user.societyId,
        userId,
        roleId: user.roleId,
        createdByRole: role.roleCategory,
        documentName,
        document: req.files?.document?.[0]?.path || null,
        roleCategories: JSON.stringify(VISIBILITY_MAP[visibility]),
      });

      return res.status(201).json({
        message: "Document uploaded successfully",
        data: document,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error uploading document", error: err.message });
    }
  });
};


const getDocumentBySocietyId = async (req, res) => {
  try {
    const { societyId, userId } = req.params;
    const { visibility } = req.query; 

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const role = await Role.findByPk(user.roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });

    if (
      !SUPER_ADMIN_ROLES.includes(role.roleCategory) &&
      user.societyId?.toString() !== societyId.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized society access" });
    }

    const documents = await Document.findAll({
      where: {
        [Op.or]: [{ societyId }, { societyId: null }],
      },
      order: [["createdAt", "DESC"]],
    });

    const roleCache = {};
    const visibleDocuments = [];

    for (const doc of documents) {
      const isSuperAdminDoc = doc.societyId === null;
      let creatorRole = doc.createdByRole;

      if (!creatorRole && doc.roleId) {
        if (!roleCache[doc.roleId]) {
          const creatorRoleRecord = await Role.findByPk(doc.roleId);
          roleCache[doc.roleId] = creatorRoleRecord?.roleCategory || null;
        }
        creatorRole = roleCache[doc.roleId];
      }

      if (SUPER_ADMIN_ROLES.includes(role.roleCategory)) {
        if (isSuperAdminDoc) visibleDocuments.push(doc);
        continue;
      }

      if (SOCIETY_ADMIN_ROLES.includes(role.roleCategory)) {
        if (
          isSuperAdminDoc ||
          (doc.societyId?.toString() === societyId.toString() &&
            SOCIETY_ADMIN_ROLES.includes(creatorRole))
        ) {
          visibleDocuments.push(doc);
        }
        continue;
      }

      if (RESIDENT_ROLES.includes(role.roleCategory)) {
        if (
          isSuperAdminDoc ||
          doc.userId === userId ||
          (doc.societyId?.toString() === societyId.toString() &&
            SOCIETY_ADMIN_ROLES.includes(creatorRole))
        ) {
          visibleDocuments.push(doc);
        }
      }
    }

    let filteredDocuments = visibleDocuments;

    if (visibility && VISIBILITY_MAP[visibility]) {
      filteredDocuments = visibleDocuments.filter((doc) => {
        if (!doc.roleCategories) return false;
        const roles = JSON.parse(doc.roleCategories);
        return roles.some((r) => VISIBILITY_MAP[visibility].includes(r));
      });
    }

    return res.status(200).json({
      message: "Documents fetched successfully",
      count: filteredDocuments.length,
      documents: filteredDocuments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching documents",
      error: error.message,
    });
  }
};


const getDocumentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { visibility } = req.query; 

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const documents = await Document.findAll({
      where: {
        [Op.or]: [{ societyId: null }, { societyId: user.societyId }],
      },
      order: [["createdAt", "DESC"]],
    });

    const visibleDocuments = documents.filter((doc) => {
      if (doc.societyId === null) return true;
      if (doc.societyId?.toString() === user.societyId?.toString()) return true;
      return doc.userId === userId;
    });

    let filteredDocuments = visibleDocuments;

    if (visibility && VISIBILITY_MAP[visibility]) {
      filteredDocuments = visibleDocuments.filter((doc) => {
        if (!doc.roleCategories) return false;
        const roles = JSON.parse(doc.roleCategories);
        return roles.some((r) => VISIBILITY_MAP[visibility].includes(r));
      });
    }

    return res.status(200).json({
      message: "Documents fetched successfully",
      count: filteredDocuments.length,
      documents: filteredDocuments,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching documents",
      error: err.message,
    });
  }
};


const updateDocumentByDocumentId = async (req, res) => {
  upload.fields([{ name: "document" }])(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }

    try {
      const { documentId } = req.params;
      const { documentName } = req.body;

      const doc = await Document.findByPk(documentId);
      if (!doc) return res.status(404).json({ message: "Document not found" });

      let documentPath = doc.document;

      if (req.files?.document?.[0]) {
        if (documentPath && fs.existsSync(documentPath)) {
          fs.unlinkSync(documentPath);
        }
        documentPath = req.files.document[0].path;
      }

      await doc.update({
        documentName: documentName || doc.documentName,
        document: documentPath,
      });

      return res.status(200).json({
        message: "Document updated successfully",
        data: doc,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error updating document", error: err.message });
    }
  });
};


const deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    const doc = await Document.findByPk(documentId);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    if (doc.document && fs.existsSync(doc.document)) {
      fs.unlinkSync(doc.document);
    }

    await doc.destroy();

    return res.status(200).json({ message: "Document deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting document", error: err.message });
  }
};


const getAllDocuments = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const role = await Role.findByPk(user.roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });

    if (!SUPER_ADMIN_ROLES.includes(role.roleCategory)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    const documents = await Document.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Documents fetched successfully",
      count: documents.length,
      documents,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching documents", error: err.message });
  }
};


module.exports = {
  createDocumentBySocietyId,
  createDocumentByUserId,
  getDocumentBySocietyId,
  getDocumentByUserId,
  updateDocumentByDocumentId,
  deleteDocument,
  getAllDocuments,
};
