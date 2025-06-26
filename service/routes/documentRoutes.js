const express = require("express");
const documentRouter = express.Router();
const documentController = require("../controllers/documentController");

documentRouter.post("/society/:societyId/:userId", documentController.createDocumentBySocietyId);
documentRouter.post("/user/:userId", documentController.createDocumentByUserId);

<<<<<<< HEAD
documentRouter.get("/society/:societyId", documentController.getDocumentBySocietyId);
documentRouter.get("/user/:userId", documentController.getDocumentByUserId);
documentRouter.get("/:documentId", documentController.getDocumentById);
=======
documentRouter.get("/society/:societyId/:userId", documentController.getDocumentBySocietyId);
documentRouter.get("/list/:userId", documentController.getDocumentByUserId);
documentRouter.get("/all/:userId", documentController.getAllDocuments);
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47


documentRouter.put("/society/:documentId",documentController.updateDocumentBySocietyId);
documentRouter.put("/user/:documentId",documentController.updateDocumentByUserId);

documentRouter.delete("/:documentId",documentController.deleteDocument);

module.exports = documentRouter;