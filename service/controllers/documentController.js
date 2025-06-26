// const { Document } = require("../models");
// const upload = require("../middleware/upload");
// const fs = require("fs");
// const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

// // Create Document by Society ID
// // const createDocumentBySocietyId = async (req, res) => {
// //   upload.fields([{ name: "document" }])(req, res, async (err) => {
// //     if (err) return sendErrorResponse(res, "File upload error", 400, err.message);

// //     try {
// //       const { documentName, userGroupId } = req.body;
// //       const { societyId } = req.params;

// //       if (!societyId) return sendErrorResponse(res, "societyId is required");

// //        const documentPath = req.files?.document ? req.files.document[0].path : null;
// //       console.log("document path",documentPath);

// //       const newDocument = await Document.create({
// //         societyId,
// //         documentName,
// //         userGroupId,
// //         document: documentPath,
// //       });

// //       return sendSuccessResponse(res, "Document uploaded successfully", newDocument, 201);
// //     } catch (err) {
// //       return sendErrorResponse(res, "Error uploading document", 500, err.message);
// //     }
// //   });
// // };

// const createDocumentBySocietyId = async (req, res) => {
//   upload.fields([{ name: "document" }])(req, res, async (err) => {
//     if (err)
//       return sendErrorResponse(res, "File upload error", 400, err.message);

//     try {
//       const { documentName, userGroupId } = req.body;
//       const { societyId } = req.params;

//       if (!societyId) return sendErrorResponse(res, "societyId is required");
//  const documentPath = req.files?.document ? req.files.document[0].path : null;
//       console.log("document path",documentPath);

//       // const file = req.files?.document?.[0];
//       // const fileUrl = file
//       //   ? `${req.protocol}://${req.get("host")}/upload/${file.filename}`
//       //   : null;
//       // console.log("fileUrl", fileUrl);

//       const newDocument = await Document.create({
//         societyId,
//         documentName,
//         userGroupId,
//       //  document: fileUrl,
//        document:documentPath,
//       });

//       return sendSuccessResponse(
//         res,
//         "Document uploaded successfully",
//         newDocument,
//         201
//       );
//     } catch (err) {
//       return sendErrorResponse(
//         res,
//         "Error uploading document",
//         500,
//         err.message
//       );
//     }
//   });
// };

// // Create Document by User ID
// const createDocumentByUserId = async (req, res) => {
//   upload.fields([{ name: "document" }, { name: "picture" }])(
//     req,
//     res,
//     async (err) => {
//       if (err)
//         return res
//           .status(400)
//           .json({ message: "File upload error", error: err.message });

//       try {
//         const { documentName } = req.body;
//         const { userId } = req.params;
//         // const { societyId } = req.body;

//         if (!userId)
//           return res.status(400).json({ message: "userId is required" });

//         // const file = req.files?.document?.[0];
//         // const fileUrl = file
//         //   ? `${req.protocol}://${req.get("host")}/upload/${file.filename}`
//         //   : null;
//         // console.log("fileUrl", fileUrl);
//     const documentPath = req.files?.document ? req.files.document[0].path : null;
//       console.log("document path",documentPath);
//         const newDocument = await Document.create({
//           userId,
//           documentName,
//           // societyId,
//           document:documentPath,
//         });

//         return res
//           .status(201)
//           .json({
//             message: "Document uploaded successfully",
//             data: newDocument,
//           });
//       } catch (err) {
//         return res
//           .status(500)
//           .json({ message: "Error uploading document", error: err.message });
//       }
//     }
//   );
// };

// // Get Documents by Society ID
// const getDocumentBySocietyId = async (req, res) => {
//   try {
//     const { societyId } = req.params;
//     const documents = await Document.findAll({ where: { societyId } });

//     if (!documents.length)
//       return sendErrorResponse(res, "No document found for this society", 404);

//     return sendSuccessResponse(
//       res,
//       "Documents fetched successfully",
//       documents
//     );
//   } catch (err) {
//     return sendErrorResponse(res, "Failed to fetch document", 500, err.message);
//   }
// };

// // Get Documents by User ID
// const getDocumentByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const documents = await Document.findAll({ where: { userId } });

//     if (!documents.length)
//       return sendErrorResponse(res, "No document found for this user", 404);

//     return sendSuccessResponse(
//       res,
//       "Documents fetched successfully",
//       documents
//     );
//   } catch (err) {
//     return sendErrorResponse(
//       res,
//       "Failed to fetch document by user id",
//       500,
//       err.message
//     );
//   }
// };

// // Update Document by Society ID
// const updateDocumentBySocietyId = async (req, res) => {
//   upload.fields([{ name: "document" }, { name: "picture" }])(
//     req,
//     res,
//     async (err) => {
//       if (err)
//         return sendErrorResponse(res, "File upload error", 400, err.message);

//       try {
//         const { documentId } = req.params;
//         const existingDoc = await Document.findByPk(documentId);

//         if (!existingDoc)
//           return sendErrorResponse(res, "Document not found", 404);

//         const { documentName, userGroupId } = req.body;
//         let document = existingDoc.document;
//         // let picture = existingDoc.picture;

//         if (req.files?.document) {
//           if (document) fs.unlinkSync(document);
//           document = req.files.document[0].path;
//         }

//         // if (req.files?.picture) {
//         //   if (picture) fs.unlinkSync(picture);
//         //   picture = req.files.picture[0].path;
//         // }

//         await existingDoc.update({ documentName, userGroupId, document });

//         return sendSuccessResponse(
//           res,
//           "Document updated successfully",
//           existingDoc
//         );
//       } catch (err) {
//         return sendErrorResponse(
//           res,
//           "Failed to update document",
//           500,
//           err.message
//         );
//       }
//     }
//   );
// };

// // Update Document by User ID
// const updateDocumentByUserId = async (req, res) => {
//   upload.fields([{ name: "document" }])(req, res, async (err) => {
//     if (err)
//       return sendErrorResponse(res, "File upload error", 400, err.message);

//     try {
//       const { documentId } = req.params;
//       const existingDoc = await Document.findByPk(documentId);

//       if (!existingDoc)
//         return sendErrorResponse(res, "Document not found", 404);

//       const { documentName, userGroupId, societyId } = req.body;
//       let document = existingDoc.document;
//       let picture = existingDoc.picture;

//       if (req.files?.document) {
//         if (document) fs.unlinkSync(document);
//         document = req.files.document[0].path;
//       }

//       // if (req.files?.picture) {
//       //   if (picture) fs.unlinkSync(picture);
//       //   picture = req.files.picture[0].path;
//       // }

//       await existingDoc.update({
//         documentName,
//         userGroupId,
//         societyId,
//         document,
//         picture,
//       });

//       return sendSuccessResponse(
//         res,
//         "Document updated successfully",
//         existingDoc
//       );
//     } catch (err) {
//       return sendErrorResponse(
//         res,
//         "Failed to update document",
//         500,
//         err.message
//       );
//     }
//   });
// };

// // Delete Document
// const deleteDocument = async (req, res) => {
//   try {
//     const { documentId } = req.params;
//     const document = await Document.findByPk(documentId);

//     if (!document) return sendErrorResponse(res, "Document not found", 404);

//     if (fs.existsSync(document.document)) fs.unlinkSync(document.document);
//     // if (fs.existsSync(document.picture)) fs.unlinkSync(document.picture);

//     await document.destroy();

//     return sendSuccessResponse(res, "Document Permanently Deleted ");
//   } catch (err) {
//     return sendErrorResponse(
//       res,
//       "Failed to delete document",
//       500,
//       err.message
//     );
//   }
// };

// // Get Documents by document id
// const getDocumentByDocId = async (req, res) => {
//   try {
//     const { documentId } = req.params;
//     const documents = await Document.findAll({ where: { documentId } });

//     if (!documents.length)
//       return sendErrorResponse(res, "No document found for this society", 404);

//     return sendSuccessResponse(
//       res,
//       "Documents fetched successfully",
//       documents
//     );
//   } catch (err) {
//     return sendErrorResponse(res, "Failed to fetch document", 500, err.message);
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
//   getDocumentByDocId
// };


const { Document, User, Role } = require("../models");
const upload = require("../middleware/upload");
const fs = require("fs");
const { Op } = require("sequelize");

// Admins can  use this function to create documents for a society.
const createDocumentBySocietyId = async (req, res) => {
  upload.fields([{ name: "document" }, { name: "picture" }])(req, res, async (err) => {
    if (err) return res.status(400).json({ message: "File upload error", error: err.message });

    try {
      const { documentName, visibilityOption } = req.body;
      const { societyId, userId } = req.params;

      if (!societyId || !userId || !documentName || !visibilityOption) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const documentPath = req.files?.document?.[0]?.path || null;
      const picturePath = req.files?.picture?.[0]?.path || null;

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const role = await Role.findByPk(user.roleId);
      if (!role) return res.status(404).json({ message: "Role not found" });

      if (user.societyId?.toString() !== societyId.toString()) {
        return res.status(403).json({ message: "You can only upload documents to your own society" });
      }

      const allowedRoles = ["society_moderator", "management_committee"];
      if (!allowedRoles.includes(role.roleCategory)) {
        return res.status(403).json({ message: "Permission denied" });
      }

      const visibilityMap = {
        owner: ["society_owner", "society_owner_family"],
        tenant: ["society_tenant", "society_tenant_family"],
        all: ["society_owner", "society_owner_family", "society_tenant", "society_tenant_family"],
        primary: ["primary_member"]
      };

      const roleCategories = visibilityMap[visibilityOption];
      if (!roleCategories) {
        return res.status(400).json({ message: "Invalid visibility option" });
      }

      const newDoc = await Document.create({
        societyId,
        userId,
        roleId: user.roleId,
        documentName,
        document: documentPath,
        picture: picturePath,
        roleCategories
      });

      return res.status(201).json({ message: "Document uploaded successfully", data: newDoc });
    } catch (err) {
      return res.status(500).json({ message: "Error uploading document", error: err.message });
    }
  });
};

// Get Documents by Society ID
// this gate for specific role categories like ( society_owner, society_tenant, society_moderator, management_committee );
const getDocumentBySocietyId = async (req, res) => {
  try {
    const { societyId, userId } = req.params;

    if (!societyId || !userId) {
      return res.status(400).json({ message: "societyId and userId are required" });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const role = await Role.findByPk(user.roleId);
    if (!role) return res.status(404).json({ message: "User role not found" });

    if (user.societyId?.toString() !== societyId.toString()) {
      return res.status(403).json({ message: "You can only view documents from your own society" });
    }

    const userCategory = role.roleCategory?.toLowerCase();
    const isPrimary = user.primaryMember === true;

    // Only allow access to allowed roles
    const allowedCategories = ["society_owner", "society_tenant", "society_moderator", "management_committee"];
    if (!allowedCategories.includes(userCategory)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    const allDocuments = await Document.findAll({
      where: { societyId },
      order: [["createdAt", "DESC"]],
    });

    const matchedDocs = allDocuments.filter(doc => {
      const categories = Array.isArray(doc.roleCategories)
        ? doc.roleCategories
        : [];

      // Show if visible to primary member and user is primary
      if (categories.includes("primary_member") && isPrimary) return true;

      // Show if roleCategory matches
      if (categories.includes(userCategory)) return true;

      // Show if document has no restrictions
      if (categories.length === 0) return true;

      return false;
    });

    return res.status(200).json({
      message: "Documents fetched successfully",
      count: matchedDocs.length,
      documents: matchedDocs
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching documents", error: err.message });
  }
};




  
  
// This function is used by Residents to create their own documents. 
// Admins can also use this function to create documents for themselves.
const createDocumentByUserId = async (req, res) => {  
    upload.fields([{ name: "document" }, { name: "picture" }])(req, res, async (err) => {
      if (err) return res.status(400).json({ message: "File upload error", error: err.message });
  
      try {
        const { documentName, societyId } = req.body;
        const { userId } = req.params;
  
        if (!userId) return res.status(400).json({ message: "userId is required" });
  
        const user = await User.findByPk(userId); 
        if (!user) return res.status(404).json({ message: "User not found" });
  
        const roleId = user.roleId;
  
        const documentPath = req.files?.document?.[0]?.path || null;
        const picturePath = req.files?.picture?.[0]?.path || null;
  
        const newDocument = await Document.create({
          userId,
          documentName,
          societyId,
          document: documentPath,
          picture: picturePath,
          roleId, 
        });
  
        return res.status(201).json({ message: "Document uploaded successfully", data: newDocument });
      } catch (err) {
        return res.status(500).json({ message: "Error uploading document", error: err.message });
      }
    });
};

// this function is use for Resident // admin  get there own document *****
const getDocumentByUserId = async (req, res) => {
    try {
      const userId = req.userId || req.params.userId;
  
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const documents = await Document.findAll({
        where: {
          userId, 
        },
        order: [["createdAt", "DESC"]],
      });
  
      return res.status(200).json({
        message: "Documents fetched successfully",
        count: documents.length,
        documents,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error fetching documents",
        error: err.message,
      });
    }
  };

// Update Document by Society ID
const updateDocumentBySocietyId = async (req, res) => {
  upload.fields([{ name: "document" }, { name: "picture" }])(req, res, async (err) => {
    if (err) return res.status(400).json({ message: "File upload error", error: err.message });

    try {
      const { documentId } = req.params;
      const existingDoc = await Document.findByPk(documentId);
      if (!existingDoc) return res.status(404).json({ message: "Document not found" });

      const { documentName, roleId } = req.body;
      let document = existingDoc.document;
      let picture = existingDoc.picture;

      if (req.files?.document?.[0]) {
        if (document && fs.existsSync(document)) fs.unlinkSync(document);
        document = req.files.document[0].path;
      }

      if (req.files?.picture?.[0]) {
        if (picture && fs.existsSync(picture)) fs.unlinkSync(picture);
        picture = req.files.picture[0].path;
      }

      await existingDoc.update({ documentName, roleId, document, picture });
      return res.status(200).json({ message: "Document updated successfully", data: existingDoc });
    } catch (err) {
      return res.status(500).json({ message: "Failed to update document", error: err.message });
    }
  });
};

// Update Document by User ID
const updateDocumentByUserId = async (req, res) => {
  upload.fields([{ name: "document" }, { name: "picture" }])(req, res, async (err) => {
    if (err) return res.status(400).json({ message: "File upload error", error: err.message });

    try {
            const { documentId } = req.params;
            const existingDoc = await Document.findByPk(documentId);

            if (!existingDoc) return res.status(404).json({ message: "Document not found" });

      const { documentName, roleId, societyId } = req.body;
            let document = existingDoc.document;
            let picture = existingDoc.picture;

      if (req.files?.document?.[0]) {
        if (document && fs.existsSync(document)) fs.unlinkSync(document);
        document = req.files.document[0].path;
      }

      if (req.files?.picture?.[0]) {
        if (picture && fs.existsSync(picture)) fs.unlinkSync(picture);
        picture = req.files.picture[0].path;
      }

      await existingDoc.update({ documentName, roleId, societyId, document, picture });
      return res.status(200).json({ message: "Document updated successfully", data: existingDoc });
    } catch (err) {
      return res.status(500).json({ message: "Failed to update document", error: err.message });
    }
  });
};

// Delete Document
const deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findByPk(documentId);

    if (!document) return res.status(404).json({ message: "Document not found" });

    if (document.document && fs.existsSync(document.document)) fs.unlinkSync(document.document);
    if (document.picture && fs.existsSync(document.picture)) fs.unlinkSync(document.picture);

    await document.destroy();
    return res.status(200).json({ message: "Document deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete document", error: err.message });
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const userId = req.userId || req.params.userId;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const role = await Role.findByPk(user.roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });

    const allowedRoles = ["super_admin", "super_admin_it"];
    if (!allowedRoles.includes(role.roleCategory)) {
      return res.status(403).json({ message: "Permission denied" });
    }
<<<<<<< HEAD
}
// Get Document by Document ID
const getDocumentById = async (req, res) => {
    try {
        const { documentId } = req.params;
        const document = await Document.findOne({ where: { documentId } });

        if (!document) return res.status(404).json({ message: "Document not found" });

        return res.status(200).json({ message: "Document fetched successfully", data: { document } });
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch document by ID", error: err.message });
    }
};

module.exports = {
    createDocumentBySocietyId, createDocumentByUserId,
    getDocumentBySocietyId, getDocumentByUserId,
    updateDocumentBySocietyId, updateDocumentByUserId,
    deleteDocument,getDocumentById
=======

    const documents = await Document.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Documents fetched successfully",
      count: documents.length,
      documents,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching documents",
      error: err.message,
    });
  }
};


module.exports = {
  createDocumentBySocietyId,
  createDocumentByUserId,
  getDocumentBySocietyId,
  getDocumentByUserId,
  updateDocumentBySocietyId,
  updateDocumentByUserId,
  deleteDocument,
  getAllDocuments
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
};


