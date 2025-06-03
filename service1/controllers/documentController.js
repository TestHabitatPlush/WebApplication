const { Document } = require("../models");
const upload = require("../middleware/upload");
const fs = require("fs"); 
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");

//  Create Document by Society ID
const createDocumentBySocietyId = async (req, res) => {
    upload.fields([{ name: 'document' }, { name: 'picture' }])(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "File upload error", error: err.message });

        try {
            const { documentName } = req.body;
            const { societyId } = req.params;
            const { userGroupId } = req.body;

            if (!societyId) return res.status(400).json({ message: "societyId is required" });

            const documentPath = req.files?.document ? req.files.document[0].path : null;
            const picturePath = req.files?.picture ? req.files.picture[0].path : null;

            const newDocument = await Document.create({
                societyId,
                documentName,
                userGroupId,
                document: documentPath,
                picture: picturePath
            });

            return res.status(201).json({ message: "Document uploaded successfully", data: newDocument });
        } catch (err) {
            return res.status(500).json({ message: "Error uploading document", error: err.message });
        }
    });
};

//  Create Document by User ID
const createDocumentByUserId = async (req, res) => {
    upload.fields([{ name: 'document' }, { name: 'picture' }])(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "File upload error", error: err.message });

        try {
            const { documentName } = req.body;
            const { userId } = req.params;
            const { societyId } = req.body;

            if (!userId) return res.status(400).json({ message: "userId is required" });

            const documentPath = req.files?.document ? req.files.document[0].path : null;
            const picturePath = req.files?.picture ? req.files.picture[0].path : null;

            const newDocument = await Document.create({
                userId,
                documentName,
                societyId,
                document: documentPath,
                picture: picturePath
            });

            return res.status(201).json({ message: "Document uploaded successfully", data: newDocument });
        } catch (err) {
            return res.status(500).json({ message: "Error uploading document", error: err.message });
        }
    });
};

//  Get Documents by Society ID
const getDocumentBySocietyId = async (req, res) => {
    try {
        const { societyId } = req.params;
        const documents = await Document.findAll({ where: { societyId } });

        if (!documents.length) return res.status(404).json({ message: "No document found for this society" });

        return res.status(200).json({ message: "Documents fetched successfully", data: documents });
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch document", error: err.message });
    }
};

// Get Documents by User ID
const getDocumentByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const documents = await Document.findAll({ where: { userId } });

        if (!documents.length) return res.status(404).json({ message: "No document found for this user" });

        return res.status(200).json({ message: "Documents fetched successfully", data: documents });
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch document by user id", error: err.message });
    }
};

// Update Document by Society ID
const updateDocumentBySocietyId = async (req, res) => {
    upload.fields([{ name: 'document' }, { name: 'picture' }])(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "File upload error", error: err.message });

        try {
            const { documentId } = req.params;
            const existingDoc = await Document.findByPk(documentId);

            if (!existingDoc) return res.status(404).json({ message: "Document not found" });

            const { documentName, userGroupId } = req.body;
            let document = existingDoc.document;
            let picture = existingDoc.picture;

            if (req.files?.document) {
                if (document) fs.unlinkSync(document);
                document = req.files.document[0].path;
            }
            if (req.files?.picture) {
                if (picture) fs.unlinkSync(picture);
                picture = req.files.picture[0].path;
            }

            await existingDoc.update({ documentName, userGroupId, document, picture });

            return res.status(200).json({ message: "Document updated successfully", data: existingDoc });
        } catch (err) {
            return res.status(500).json({ message: "Failed to update document", error: err.message });
        }
    });
};

// Update Document by User ID
const updateDocumentByUserId = async (req, res) => {
    upload.fields([{ name: 'document' }, { name: 'picture' }])(req, res, async (err) => {
        if (err) return res.status(400).json({ message: "File upload error", error: err.message });

        try {
            const { documentId } = req.params;
            const existingDoc = await Document.findByPk(documentId);

            if (!existingDoc) return res.status(404).json({ message: "Document not found" });

            const { documentName, userGroupId, societyId } = req.body;
            let document = existingDoc.document;
            let picture = existingDoc.picture;

            if (req.files?.document) {
                if (document) fs.unlinkSync(document);
                document = req.files.document[0].path;
            }
            if (req.files?.picture) {
                if (picture) fs.unlinkSync(picture);
                picture = req.files.picture[0].path;
            }

            await existingDoc.update({ documentName, userGroupId, societyId, document, picture });

            return res.status(200).json({ message: "Document updated successfully", data: existingDoc });
        } catch (err) {
            return res.status(500).json({ message: "Failed to update document", error: err.message });
        }
    });
};

const deleteDocument = async (req, res) => {
    try{
        const { documentId } = req.params;
        const document = await Document.findByPk(documentId);

        if (!document){
            return res.status(404).json({ message: "Document not found" });
        }
        // remove files if they exist
        if (fs.existsSync(document.document)) fs.unlinkSync(document.document);
        if (fs.existsSync(document.picture)) fs.unlinkSync(document.picture);

        await document.destroy();
        return res.status(200).json({ message: "Document deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Failed to delete document", error: err.message });
    }
}

module.exports = {
    createDocumentBySocietyId, createDocumentByUserId,
    getDocumentBySocietyId, getDocumentByUserId,
    updateDocumentBySocietyId, updateDocumentByUserId,
    deleteDocument
};


