const { Document, User, Role } = require("../models");
const upload = require("../middleware/upload");
const fs = require("fs");
const { Op } = require("sequelize");

// Admins can  use this function to create documents for a society.
const createDocumentBySocietyId = async (req, res) => {
    upload.fields([{ name: "document" }, { name: "picture" }])(req, res, async (err) => {
      if (err) return res.status(400).json({ message: "File upload error", error: err.message });
  
      try {
        const { documentName, targetGroups } = req.body;
        const { societyId, userId } = req.params;
  
        if (!societyId) return res.status(400).json({ message: "societyId is required" });
        if (!userId) return res.status(400).json({ message: "userId is required" });
  
        const documentPath = req.files?.document?.[0]?.path || null;
        const picturePath = req.files?.picture?.[0]?.path || null;
  
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
  
        const role = await Role.findByPk(user.roleId);
        if (!role) return res.status(404).json({ message: "Role not found" });
  
        const allowedRoles = ["society_moderator", "management_committee"];
        if (!allowedRoles.includes(role.roleCategory)) {
          return res.status(403).json({ message: "Permission denied" });
        }
  
        if (societyId.toString() !== user.societyId?.toString()) {
          return res.status(403).json({ message: "You can only add documents to your own society" });
        }
  
        const parsedTargetGroups = JSON.parse(targetGroups || "[]");
        const validGroups = [
          "society_owner",
          "society_owner_family",
          "society_tenant",
          "society_tenant_family"
        ];
        const invalid = parsedTargetGroups.filter(g => !validGroups.includes(g));
        if (invalid.length > 0) {
          return res.status(400).json({ message: "Invalid target groups", invalid });
        }
  
        const newDocument = await Document.create({
          societyId,
          userId,
          documentName,
          roleId: user.roleId,
          document: documentPath,
          picture: picturePath,
          roleCategories: parsedTargetGroups,
        });
  
        return res.status(201).json({ message: "Document uploaded successfully", data: newDocument });
      } catch (err) {
        return res.status(500).json({ message: "Error uploading document", error: err.message });
      }
    });
  };
// Get Documents by Society ID

// const getDocumentBySocietyId = async (req, res) => {
//     try {
//       const { societyId, userId } = req.params;
  
//       if (!societyId) return res.status(400).json({ message: "societyId is required" });
//       if (!userId) return res.status(400).json({ message: "userId is required" });
  
//       const user = await User.findByPk(userId);
//       if (!user) return res.status(404).json({ message: "User not found" });
  
//       const role = await Role.findByPk(user.roleId);
//       if (!role) return res.status(404).json({ message: "User role not found" });
  
//       if (user.societyId?.toString() !== societyId.toString()) {
//         return res.status(403).json({ message: "You can only view documents from your own society" });
//       }
  
//       const allDocuments = await Document.findAll({
//         where: { societyId },
//         order: [["createdAt", "DESC"]],
//       });
  
//       const userCategory = role.roleCategory?.toLowerCase();
//       const matchedDocs = [documentName, document, picture, ];
  
//       for (const doc of allDocuments) {
//         let visibleTo = [];
  
//         try {
//           if (Array.isArray(doc.roleCategories)) {
//             visibleTo = doc.roleCategories.map(c => c.toLowerCase());
//           } else if (typeof doc.roleCategories === "string") {
//             const parsed = JSON.parse(doc.roleCategories);
//             if (Array.isArray(parsed)) {
//               visibleTo = parsed.map(c => c.toLowerCase());
//             }
//           }
//         } catch (err) {
//           console.warn(`Failed to parse roleCategories for documentId=${doc.documentId}`, err.message);
//           visibleTo = []; // fallback if parsing fails
//         }
  
//         if (!visibleTo.length || visibleTo.includes(userCategory)) {
//           matchedDocs.push(doc);
//         }
//       }
  
//       return res.status(200).json({
//         message: "Documents fetched successfully",
//         count: matchedDocs.length,
//         documents: matchedDocs,
//       });
//     } catch (err) {
//       return res.status(500).json({ message: "Error fetching documents", error: err.message });
//     }
//   };

const getDocumentBySocietyId = async (req, res) => {
    try {
      const { societyId, userId } = req.params;
  
      if (!societyId) return res.status(400).json({ message: "societyId is required" });
      if (!userId) return res.status(400).json({ message: "userId is required" });
  
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const role = await Role.findByPk(user.roleId);
      if (!role) return res.status(404).json({ message: "User role not found" });
  
      if (user.societyId?.toString() !== societyId.toString()) {
        return res.status(403).json({ message: "You can only view documents from your own society" });
      }
  
      const userCategory = role.roleCategory?.toLowerCase();
  
      const allDocuments = await Document.findAll({
        where: { societyId },
        order: [["createdAt", "DESC"]],
      });
  
      const matchedDocs = [];
  
      for (const doc of allDocuments) {
        let roleCategories = [];
  
        if (Array.isArray(doc.roleCategories)) {
          roleCategories = doc.roleCategories.map(c => c.toLowerCase());
        } else if (typeof doc.roleCategories === 'string') {
          try {
            const parsed = JSON.parse(doc.roleCategories);
            if (Array.isArray(parsed)) {
              roleCategories = parsed.map(c => c.toLowerCase());
            }
          } catch (err) {
            console.warn(`Invalid JSON in roleCategories for docId=${doc.documentId}`);
            roleCategories = [];
          }
        }
  
        if (roleCategories.length === 0 || roleCategories.includes(userCategory)) {
          matchedDocs.push(doc);
        }
      }
  
      return res.status(200).json({
        message: "Documents fetched successfully",
        count: matchedDocs.length,
        documents: matchedDocs,
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

module.exports = {
  createDocumentBySocietyId,
  createDocumentByUserId,
  getDocumentBySocietyId,
  getDocumentByUserId,
  updateDocumentBySocietyId,
  updateDocumentByUserId,
  deleteDocument,
};
