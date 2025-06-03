const { Document } = require("../models");
const upload = require("../middleware/upload");
const fs = require("fs");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

// Create Document by Society ID
// const createDocumentBySocietyId = async (req, res) => {
//   upload.fields([{ name: "document" }])(req, res, async (err) => {
//     if (err) return sendErrorResponse(res, "File upload error", 400, err.message);

//     try {
//       const { documentName, userGroupId } = req.body;
//       const { societyId } = req.params;

//       if (!societyId) return sendErrorResponse(res, "societyId is required");

//       const documentPath = req.files?.document?.[0]?.path || null;
//       console.log("document path",documentPath);

//       const newDocument = await Document.create({
//         societyId,
//         documentName,
//         userGroupId,
//         document: documentPath,
//       });

//       return sendSuccessResponse(res, "Document uploaded successfully", newDocument, 201);
//     } catch (err) {
//       return sendErrorResponse(res, "Error uploading document", 500, err.message);
//     }
//   });
// };

const createDocumentBySocietyId = async (req, res) => {
  upload.fields([{ name: "document" }])(req, res, async (err) => {
    if (err)
      return sendErrorResponse(res, "File upload error", 400, err.message);

    try {
      const { documentName, userGroupId } = req.body;
      const { societyId } = req.params;

      if (!societyId) return sendErrorResponse(res, "societyId is required");

      //const file = req.files?.document?.[0];

      const documentPath = req.files?.document?.[0]?.path || null;
      console.log("document path",documentPath);
      // const fileUrl = file
      //   ? `${req.protocol}://${req.get("host")}/upload/${file.filename}`
      //   : null;
      // console.log("fileUrl", fileUrl);

      const newDocument = await Document.create({
        societyId,
        documentName,
        userGroupId,
       // document: fileUrl,
       document:documentPath,
      });

      return sendSuccessResponse(
        res,
        "Document uploaded successfully",
        newDocument,
        201
      );
    } catch (err) {
      return sendErrorResponse(
        res,
        "Error uploading document",
        500,
        err.message
      );
    }
  });
};

// Create Document by User ID
const createDocumentByUserId = async (req, res) => {
  upload.fields([{ name: "document" }, { name: "picture" }])(
    req,
    res,
    async (err) => {
      if (err)
        return res
          .status(400)
          .json({ message: "File upload error", error: err.message });

      try {
        const { documentName } = req.body;
        const { userId } = req.params;
        // const { societyId } = req.body;

        if (!userId)
          return res.status(400).json({ message: "userId is required" });

        const file = req.files?.document?.[0];
        const fileUrl = file
          ? `${req.protocol}://${req.get("host")}/upload/${file.filename}`
          : null;
        console.log("fileUrl", fileUrl);

        const newDocument = await Document.create({
          userId,
          documentName,
          // societyId,
          document: fileUrl,
        });

        return res
          .status(201)
          .json({
            message: "Document uploaded successfully",
            data: newDocument,
          });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Error uploading document", error: err.message });
      }
    }
  );
};

// Get Documents by Society ID
const getDocumentBySocietyId = async (req, res) => {
  try {
    const { societyId } = req.params;
    const documents = await Document.findAll({ where: { societyId } });

    if (!documents.length)
      return sendErrorResponse(res, "No document found for this society", 404);

    return sendSuccessResponse(
      res,
      "Documents fetched successfully",
      documents
    );
  } catch (err) {
    return sendErrorResponse(res, "Failed to fetch document", 500, err.message);
  }
};

// Get Documents by User ID
const getDocumentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const documents = await Document.findAll({ where: { userId } });

    if (!documents.length)
      return sendErrorResponse(res, "No document found for this user", 404);

    return sendSuccessResponse(
      res,
      "Documents fetched successfully",
      documents
    );
  } catch (err) {
    return sendErrorResponse(
      res,
      "Failed to fetch document by user id",
      500,
      err.message
    );
  }
};

// Update Document by Society ID
const updateDocumentBySocietyId = async (req, res) => {
  upload.fields([{ name: "document" }, { name: "picture" }])(
    req,
    res,
    async (err) => {
      if (err)
        return sendErrorResponse(res, "File upload error", 400, err.message);

      try {
        const { documentId } = req.params;
        const existingDoc = await Document.findByPk(documentId);

        if (!existingDoc)
          return sendErrorResponse(res, "Document not found", 404);

        const { documentName, userGroupId } = req.body;
        let document = existingDoc.document;
        // let picture = existingDoc.picture;

        if (req.files?.document) {
          if (document) fs.unlinkSync(document);
          document = req.files.document[0].path;
        }

        // if (req.files?.picture) {
        //   if (picture) fs.unlinkSync(picture);
        //   picture = req.files.picture[0].path;
        // }

        await existingDoc.update({ documentName, userGroupId, document });

        return sendSuccessResponse(
          res,
          "Document updated successfully",
          existingDoc
        );
      } catch (err) {
        return sendErrorResponse(
          res,
          "Failed to update document",
          500,
          err.message
        );
      }
    }
  );
};

// Update Document by User ID
const updateDocumentByUserId = async (req, res) => {
  upload.fields([{ name: "document" }])(req, res, async (err) => {
    if (err)
      return sendErrorResponse(res, "File upload error", 400, err.message);

    try {
      const { documentId } = req.params;
      const existingDoc = await Document.findByPk(documentId);

      if (!existingDoc)
        return sendErrorResponse(res, "Document not found", 404);

      const { documentName, userGroupId, societyId } = req.body;
      let document = existingDoc.document;
      let picture = existingDoc.picture;

      if (req.files?.document) {
        if (document) fs.unlinkSync(document);
        document = req.files.document[0].path;
      }

      // if (req.files?.picture) {
      //   if (picture) fs.unlinkSync(picture);
      //   picture = req.files.picture[0].path;
      // }

      await existingDoc.update({
        documentName,
        userGroupId,
        societyId,
        document,
        picture,
      });

      return sendSuccessResponse(
        res,
        "Document updated successfully",
        existingDoc
      );
    } catch (err) {
      return sendErrorResponse(
        res,
        "Failed to update document",
        500,
        err.message
      );
    }
  });
};

// Delete Document
const deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findByPk(documentId);

    if (!document) return sendErrorResponse(res, "Document not found", 404);

    if (fs.existsSync(document.document)) fs.unlinkSync(document.document);
    // if (fs.existsSync(document.picture)) fs.unlinkSync(document.picture);

    await document.destroy();

    return sendSuccessResponse(res, "Document Permanently Deleted ");
  } catch (err) {
    return sendErrorResponse(
      res,
      "Failed to delete document",
      500,
      err.message
    );
  }
};

// Get Documents by document id
const getDocumentByDocId = async (req, res) => {
  try {
    const { documentId } = req.params;
    const documents = await Document.findAll({ where: { documentId } });

    if (!documents.length)
      return sendErrorResponse(res, "No document found for this society", 404);

    return sendSuccessResponse(
      res,
      "Documents fetched successfully",
      documents
    );
  } catch (err) {
    return sendErrorResponse(res, "Failed to fetch document", 500, err.message);
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
  getDocumentByDocId
};
