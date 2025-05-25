const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");
const { JobProfile } = require("../models");
const { Role } = require("../models");
const fs = require("fs");
const { URL } = require("url");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); 
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

// Create JobProfile
const createJobProfile = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "File upload error", error: err.message });
      }
  
      try {
        // Check required parameters
        const { firstName, lastName, email, mobileNumber,documentType,roleCategory} = req.body;
        const { societyId } = req.params;
  
        if (!societyId) {
          return res.status(400).json({ message: "societyId is required" });
        }
  
        if (!firstName || !lastName || !email || !mobileNumber ||!documentType) {
          return res.status(400).json({ message: "Missing required fields" });
        }
        // Fatch roleId based on roleCategory
        const role = await Role.findOne({
          where:{
            roleCategory:roleCategory,
          }
        })
        if (!role) {
                  return res.status(404).json({ message: "Role not found" });
                }
        const roleId = role.roleId;

        // Validate if the email is already in use
        const existingJobProfileGuard = await JobProfile.findOne({ where: { email } });
        if (existingJobProfileGuard) {
          return res.status(400).json({ message: "A JobProfile guard with this email already exists" });
        }
  
        // Handle file uploads
        // let profilePhoto = req.files?.profilePhoto ?[0]?.path : null;
        // let idProof = req.files?.idProof ?[0]?.path : null;

        let profilePhoto = req.files?.profilePhoto? req.files.profilePhoto[0].path: null;
        let idProof = req.files?.idProof? req.files.idProof[0].path: null;
  
        if (!profilePhoto || !idProof) {
          return res.status(400).json({ message: "Profile photo and ID proof are required" });
        }
  
        // Set default password
        const password = "Security"
  
        // Create JobProfile
        const newJobProfileGuard = await JobProfile.create({
          profilePhoto,
          firstName,
          lastName,
          email,
          password,
          mobileNumber,
          societyId,
          idProof,
          roleId, // Assigned dynamically
          documentType,
          roleCategory,
          status:"active",
        });
  
        res.status(201).json({
          message: "JobProfile created successfully",
          data: newJobProfileGuard,
        });
      } catch (error) {
        console.error("Error creating JobProfile guard:", error.message);
        res.status(500).json({ message: "Failed to create JobProfile guard", error: error.message });
      }
    });
  };
  

// Get JobProfile by ID
const getJobProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobProfile = await JobProfile.findByPk(id);

    if (!jobProfile) {
      return res.status(404).json({ message: "JobProfile guard not found" });
    }

    res.status(200).json({ message: "JobProfile guard fetched successfully", data: jobProfile });
  } catch (error) {
    console.error("Error fetching JobProfile guard:", error.message);
    res.status(500).json({ message: "Failed to fetch JobProfile guard" });
  }
};

// Get JobProfiles by Society ID
const getJobProfilesBySocietyId = async (req, res) => {
  try {
    const { societyId } = req.params;
    const jobProfiles = await JobProfile.findAll({ where: { societyId } });

    if (jobProfiles.length === 0) {
      return res.status(404).json({ message: "No JobProfile guards found for this society" });
    }

    res.status(200).json({ message: "JobProfiles fetched successfully", data: jobProfiles });
  } catch (error) {
    console.error("Error fetching JobProfiles by societyId:", error.message);
    res.status(500).json({ message: "Failed to fetch JobProfiles" });
  }
};

// Update JobProfile
const updateJobProfileGuard = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    }

    try {
      const { id } = req.params;
      const jobProfile = await JobProfile.findByPk(id);
      if (!jobProfile) {
        return res.status(404).json({ message: "JobProfile guard not found" });
      }

      const { firstName, lastName, email, mobileNumber,documentType, status } = req.body;
      let profilePhoto = jobProfile.profilePhoto;
      let idProof = jobProfile.idProof;

      if (req.files?.profilePhoto) {
        fs.unlinkSync(jobProfile.profilePhoto); // Delete old file
        profilePhoto = req.files.profilePhoto[0].path;
      }
      if (req.files?.idProof) {
        fs.unlinkSync(jobProfile.idProof);
        idProof = req.files.idProof[0].path;
      }

      await jobProfile.update({ firstName, lastName, email, mobileNumber, profilePhoto, idProof,documentType, status });

      res.status(200).json({
        message: "JobProfile guard updated successfully",
        data: jobProfile,
      });
    } catch (error) {
      console.error("Error updating JobProfile guard:", error.message);
      res.status(500).json({ message: "Failed to update JobProfile guard" });
    }
  });
};

// Delete JobProfile
const deleteJobProfileGuard = async (req, res) => {
  try {
    const { id } = req.params;
    const jobProfile = await JobProfile.findByPk(id);

    if (!jobProfile) {
      return res.status(404).json({ message: "JobProfile guard not found" });
    }

    if (fs.existsSync(jobProfile.profilePhoto)) // Remove stored files
    fs.unlinkSync(jobProfile.profilePhoto); 

   if (fs.existsSync(jobProfile.idProof))
    fs.unlinkSync(jobProfile.idProof);

    await jobProfile.destroy();
    res.status(200).json({ message: "JobProfile guard deleted successfully" });
  } catch (error) {
    console.error("Error deleting JobProfile guard:", error.message);
    res.status(500).json({ message: "Failed to delete JobProfile guard" });
  }
};

module.exports = {
  createJobProfile,
  getJobProfileById,
  getJobProfilesBySocietyId,
  updateJobProfileGuard,
  deleteJobProfileGuard,
};
