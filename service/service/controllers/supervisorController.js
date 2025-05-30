// const multer = require("multer");
// const path = require("path");
// const { Op } = require("sequelize");
// const { Supervisor } = require("../models/SupervisorModel.js");

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Files are stored in the "uploads/" directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Adds a timestamp to the file name
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif|pdf/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       return cb(new Error("Only image or PDF files are allowed"));
//     }
//   },
// }).fields([
//   { name: "profilePhoto", maxCount: 1 },
//   { name: "idProof", maxCount: 1 },
// ]);

// // Create Supervisor Guard
// const createSupervisorGuard = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: "File upload error", error: err.message });
//     }

//     try {
//       // Extract data from the body and files
//       const { firstName, lastName, email, mobileNumber } = req.body;
//       const profilePhoto = req.files?.profilePhoto ? req.files.profilePhoto[0].path : null;
//       const idProof = req.files?.idProof ? req.files.idProof[0].path : null;

//       // Validate required fields
//       if (!firstName || !lastName || !email || !mobileNumber || !profilePhoto || !idProof) {
//         return res.status(400).json({
//           message: "Missing required fields: firstName, lastName, email, mobileNumber, profilePhoto, or idP
//         });
//       }

//       // Check if email is unique
//       const existingSupervisorGuard = await Supervisor.findOne({ where: { email } });
//       if (existingSupervisorGuard) {
//         return res.status(400).json({ message: "A Supervisor guard with this email already exists" });
//       }

//       // Create a new Supervisor guard entry
//       const newSupervisorGuard = await Supervisor.create({
//         profilePhoto,
//         firstName,
//         lastName,
//         email,
//         mobileNumber,
//         idProof,
//       });

//       res.status(201).json({
//         message: "Supervisor guard created successfully",
//         data: newSupervisorGuard,
//       });
//     } catch (error) {
//       console.error("Error creating Supervisor guard:", error.message);
//       res.status(500).json({
//         message: error.message || "Failed to create Supervisor guard",
//       });
//     }
//   });
// };

// // Read Supervisor Guards
// const readSupervisorGuard = async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 10;
//     const offset = parseInt(req.query.offset) || 0;
//     const search = req.query.search || "";

//     const whereClause = {};
//     if (search) {
//       whereClause[Op.or] = [
//         { firstName: { [Op.like]: `%${search}%` } },
//         { lastName: { [Op.like]: `%${search}%` } },
//         { email: { [Op.like]: `%${search}%` } },
//         { mobileNumber: { [Op.like]: `%${search}%` } },
//       ];
//     }

//     const SupervisorGuards = await Supervisor.findAll({
//       where: whereClause,
//       limit: Math.min(limit, 100),
//       offset: offset,
//     });

//     if (SupervisorGuards.length === 0) {
//       return res.status(404).json({ message: "No Supervisor guards found" });
//     }

//     res.status(200).json({
//       message: "Supervisor guards fetched successfully",
//       data: SupervisorGuards,
//     });
//   } catch (error) {
//     console.error("Error reading Supervisor guards:", error.message);
//     res.status(500).json({ message: "Failed to fetch Supervisor guards" });
//   }
// };

// // Update Supervisor Guard
// const updateSupervisorGuard = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: "File upload error", error: err.message });
//     }

//     try {
//       const { id } = req.params;
//       const SupervisorGuard = await Supervisor.findByPk(id);
//       if (!SupervisorGuard) {
//         return res.status(404).json({ message: "Supervisor guard not found" });
//       }

//       const { firstName, lastName, email, mobileNumber } = req.body;
//       const profilePhoto = req.files?.profilePhoto ? req.files.profilePhoto[0].path : SupervisorGuard.profile
//       const idProof = req.files?.idProof ? req.files.idProof[0].path : SupervisorGuard.idProof;

//       await SupervisorGuard.update({
//         firstName,
//         lastName,
//         email,
//         mobileNumber,
//         profilePhoto,
//         idProof,
//       });

//       res.status(200).json({
//         message: "Supervisor guard updated successfully",
//         data: SupervisorGuard,
//       });
//     } catch (error) {
//       console.error("Error updating Supervisor guard:", error.message);
//       res.status(500).json({ message: "Failed to update Supervisor guard" });
//     }
//   });
// };

// // Delete Supervisor Guard
// const deleteSupervisorGuard = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const SupervisorGuard = await Supervisor.findByPk(id);
//     if (!SupervisorGuard) {
//       return res.status(404).json({ message: "Supervisor guard not found" });
//     }

//     await SupervisorGuard.destroy();
//     res.status(200).json({ message: "Supervisor guard deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Supervisor guard:", error.message);
//     res.status(500).json({ message: "Failed to delete Supervisor guard" });
//   }
// };

// module.exports = {
//   createSupervisorGuard,
//   readSupervisorGuard,
//   updateSupervisorGuard,
//   deleteSupervisorGuard,
// };

const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");
const { Supervisor } = require("../models/SupervisorModel.js");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files are stored in the "uploads/" directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Adds a timestamp to the file name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error("Only image or PDF files are allowed"));
    }
  },
}).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "idProof", maxCount: 1 },
]);

// Create Supervisor Guard
const createSupervisor = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    }

    try {
      // Extract data from the body and files
      const { firstName, lastName, email, mobileNumber } = req.body;
      const profilePhoto = req.files?.profilePhoto ? req.files.profilePhoto[0].path : null;
      const idProof = req.files?.idProof ? req.files.idProof[0].path : null;

      // Validate required fields
      if (!firstName || !lastName || !email || !mobileNumber || !profilePhoto || !idProof) {
        return res.status(400).json({
          message: "Missing required fields: firstName, lastName, email, mobileNumber, profilePhoto, or idProof",
        });
      }

      // Check if email is unique
      const existingSupervisorGuard = await Supervisor.findOne({ where: { email } });
      if (existingSupervisorGuard) {
        return res.status(400).json({ message: "A Supervisor guard with this email already exists" });
      }

      // Create a new Supervisor guard entry
      const newSupervisorGuard = await Supervisor.create({
        profilePhoto,
        firstName,
        lastName,
        email,
        mobileNumber,
        idProof,
      });

      res.status(201).json({
        message: "Supervisor guard created successfully",
        data: newSupervisorGuard,
      });
    } catch (error) {
      console.error("Error creating Supervisor guard:", error.message);
      res.status(500).json({
        message: error.message || "Failed to create Supervisor guard",
      });
    }
  });
};

// Read Supervisor Guards
const readSupervisor = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search || "";

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { mobileNumber: { [Op.like]: `%${search}%` } },
      ];
    }

    const SupervisorGuards = await Supervisor.findAll({
      where: whereClause,
      limit: Math.min(limit, 100),
      offset: offset,
    });

    if (SupervisorGuards.length === 0) {
      return res.status(404).json({ message: "No Supervisor guards found" });
    }

    res.status(200).json({
      message: "Supervisor guards fetched successfully",
      data: SupervisorGuards,
    });
  } catch (error) {
    console.error("Error reading Supervisor guards:", error.message);
    res.status(500).json({ message: "Failed to fetch Supervisor guards" });
  }
};

// Update Supervisor Guard
const updateSupervisor = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    }

    try {
      const { id } = req.params;
      const supervisorGuard = await Supervisor.findByPk(id);
      if (!supervisorGuard) {
        return res.status(404).json({ message: "Supervisor guard not found" });
      }

      const { firstName, lastName, email, mobileNumber } = req.body;

      // Use existing profile photo and id proof if not uploaded again
      const profilePhoto = req.files?.profilePhoto ? req.files.profilePhoto[0].path : supervisorGuard.profilePhoto;
      const idProof = req.files?.idProof ? req.files.idProof[0].path : supervisorGuard.idProof;

      // Update Supervisor entry
      await supervisorGuard.update({
        firstName,
        lastName,
        email,
        mobileNumber,
        profilePhoto,
        idProof,
      });

      res.status(200).json({
        message: "Supervisor guard updated successfully",
        data: supervisorGuard,
      });
    } catch (error) {
      console.error("Error updating Supervisor guard:", error.message);
      res.status(500).json({ message: "Failed to update Supervisor guard" });
    }
  });
};

// Delete Supervisor Guard
const deleteSupervisor = async (req, res) => {
  try {
    const { id } = req.params;
    const supervisorGuard = await Supervisor.findByPk(id);
    if (!supervisorGuard) {
      return res.status(404).json({ message: "Supervisor guard not found" });
    }

    await supervisorGuard.destroy();
    res.status(200).json({ message: "Supervisor guard deleted successfully" });
  } catch (error) {
    console.error("Error deleting Supervisor guard:", error.message);
    res.status(500).json({ message: "Failed to delete Supervisor guard" });
  }
};

module.exports = {
  createSupervisor,
  readSupervisor,
  updateSupervisor,
  deleteSupervisor,
};
