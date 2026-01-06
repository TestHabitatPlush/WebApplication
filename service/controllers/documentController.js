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
};
