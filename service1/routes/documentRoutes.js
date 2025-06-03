const express = require("express");
const documentRouter = express.Router();
const documentController = require("../controllers/documentController");

documentRouter.post("/society/:societyId", documentController.createDocumentBySocietyId);
documentRouter.post("/user/:userId", documentController.createDocumentByUserId);

documentRouter.get("/society/:societyId", documentController.getDocumentBySocietyId);
documentRouter.get("/user/:userId", documentController.getDocumentByUserId);

documentRouter.put("/society/:documentId",documentController.updateDocumentBySocietyId);
documentRouter.put("/user/:documentId",documentController.updateDocumentByUserId);

documentRouter.delete("/:documentId",documentController.deleteDocument);

module.exports = documentRouter;