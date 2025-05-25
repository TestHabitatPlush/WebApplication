// const express = require("express");
// const gateAllocationgateAllocationRouter = express.gateAllocationRouter();
// const upload = require("../utils/multer");
// const gateAllocationController = require("../controllers/gateAllocationController.js");

// // Create Gate Allocation
// gateAllocationgateAllocationRouter.post(
//   "/gateAllocation",
//   upload.fields([
//     { name: "profilePhoto", maxCount: 1 },
//     { name: "idProof", maxCount: 1 }
//   ]),
//   gateAllocationController.createGateAllocation
// );

// // Get All Gate Allocations
// gateAllocationgateAllocationRouter.get("/gateAllocation", gateAllocationController.getAllGateAllocations);

// // Update Gate Allocation
// gateAllocationgateAllocationRouter.put(
//   "/gateAllocation/:id",
//   upload.fields([
//     { name: "profilePhoto", maxCount: 1 },
//     { name: "idProof", maxCount: 1 }
//   ]),
//   gateAllocationController.updateGateAllocation
// );

// // Delete Gate Allocation
// gateAllocationgateAllocationRouter.delete("/gateAllocation/:id", gateAllocationController.deleteGateAllocation);

// module.exports = gateAllocationgateAllocationRouter;


const express = require('express');
const gateAllocationRouter = express.Router();
const upload = require('../middleware/upload');
const gateAllocationController = require('../controllers/gateAllocationController.js');


// Routes for gate allocations
gateAllocationRouter.get('/', gateAllocationController.getAllGateAllocations); 
gateAllocationRouter.get('/:id', gateAllocationController.getGateAllocationById); 
gateAllocationRouter.post('/', gateAllocationController.createGateAllocation);
gateAllocationRouter.put('/:id', gateAllocationController.updateGateAllocation); 
gateAllocationRouter.delete('/:id', gateAllocationController.deleteGateAllocation);

gateAllocationRouter.get('/list/:societyId', gateAllocationController.getGateAllocationsBySocietyId);


module.exports = gateAllocationRouter;