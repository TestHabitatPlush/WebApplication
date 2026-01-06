const express = require("express");
const visitorManagementRouter = express.Router();
const {
  createTypeOfEntryController,
} = require("../controllers/createTypeOfEntryController");
const {
  createVisitorType,
  getVisitorType,
} = require("../controllers/createVisitorTypeController");
const {
  visitorapprovalmatrix,
} = require("../controllers/visitorApprovalMatrix");
const {
  createVisitorNewVisitEntryController,
  newVisitorListTable,
  // CreateQRCode,
  deleteVisitorController,
  getVisiterEntry,
  getVisitorById,
  getQRCode,getVisitorEntriesBySender
  
} = require("../controllers/visitorNewVisitEntryController");
const {
  createVisitorRelation,
  getVisitorData,
  deleteVisitorData,
  updateVisitorData,
} = require("../controllers/visitorRelationshipController");

// Routes for Type of Entry
visitorManagementRouter.post("/type-of-entry", createTypeOfEntryController);

// Routes for Visitor Type
visitorManagementRouter.post("/visitor-type", createVisitorType);
visitorManagementRouter.get("/visitor-type", getVisitorType);

// Routes for Visitor Relationship
visitorManagementRouter.post("/visitor-relationship", createVisitorRelation);
visitorManagementRouter.get("/visitor-relationship", getVisitorData);
visitorManagementRouter.delete(
  "/visitor-relationship/:Visit_relation_Id",
  deleteVisitorData
);
visitorManagementRouter.put(
  "/visitor-relationship/:Visit_relation_Id",
  updateVisitorData
);

// Routes for Approval Matrix
visitorManagementRouter.get("/approval-matrix", visitorapprovalmatrix);

// Routes for New Visit Entry
visitorManagementRouter.post(
  "/new-visit-entry",
  createVisitorNewVisitEntryController
);

// Delete a visitor by ID
visitorManagementRouter.delete("/visitor-list/:visit_entry_Id", deleteVisitorController);
//Get data by ID
visitorManagementRouter.get("/visitor/:visit_entry_Id", getVisitorById);

// Visitor Table Routes
visitorManagementRouter.get("/visitor-list", newVisitorListTable);

// QR Code Generation Route
// visitorManagementRouter.post("/generate-qrCode", CreateQRCode);
// visitorManagementRouter.get("/qrCode/:visit_entry_Id",getQRCode);

visitorManagementRouter.get("/qrCode/:visit_entry_Id", getQRCode);

visitorManagementRouter.get("/visitorapprovalmatrix", visitorapprovalmatrix);
// Qr Code View By Id
visitorManagementRouter.get("/:visit_entry_Id", getVisiterEntry);

// Correct route for fetching visitor entries by senderId
visitorManagementRouter.get(
  "/visitor-entries/sender/:senderId",
  getVisitorEntriesBySender
);

module.exports = visitorManagementRouter;

// /visitormanagement