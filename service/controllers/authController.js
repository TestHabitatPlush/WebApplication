// require("dotenv").config();
// const bcrypt = require("bcrypt");
// const { generateToken, verifyToken } = require("../utils/jwt");
// const cookieHandler = require("../middleware/cookieHandler");
// const { User, Role, Customer, JobProfile } = require("../models");
// const { SUPER_ADMIN_ROLES, REDIRECT_ROLES } = require("../config/role.js");

// // // 🔑 ROLE GROUPING (FINAL)
// // const SUPER_ADMIN_ROLES = [
// //   "super_admin",
// //   "super_admin_it",
// // ];

// // const ADMIN_ROLES = [
// //   "society_moderator",
// //   "management_committee",
// // ];

// // const REDIRECT_ROLES = [
// //   "society_security_guard",
// //   "society_facility_manager",
// // ];

// /* ---------------- USER LOGIN ---------------- */
// // const loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({
// //       where: { email },
// //       include: [
// //         { model: Role, as: "userRole" },
// //         { model: Customer, as: "society" },
// //       ],
// //     });

// //     if (!user) {
// //       return res.status(404).json({ message: "Email not found." });
// //     }

// //     if (["inactive", "pending"].includes(user.status)) {
// //       return res.status(403).json({
// //         message: "Account inactive or pending. Contact administrator.",
// //       });
// //     }

// //     const isValid = await bcrypt.compare(password, user.password);
// //     if (!isValid) {
// //       return res.status(401).json({ message: "Invalid credentials." });
// //     }

// //     const payload = {
// //       userId: user.userId,
// //       email: user.email,
// //       role: user.userRole.roleCategory,
// //     };

// //     /* -------- SUPER ADMIN → ADMIN DIRECT -------- */
// //     if (SUPER_ADMIN_ROLES.includes(user.userRole.roleCategory)) {
// //       const token = generateToken(payload, "1h");
// //       const baseUrl = process.env.ADMIN_BASE_URL.replace(/\/+$/, "");

// //       return res.status(200).json({
// //         redirectUrl: `${baseUrl}/signin/${token}`,
// //         token,
// //         user,
// //       });
// //     }

// //     /* -------- SOCIETY ADMIN → RESIDENT FIRST -------- */
// //     // society_moderator & management_committee
// //     // fall through to normal login (NO redirect)

// //     const token = generateToken(payload, "7d");
// //     cookieHandler(res, token);

// //     return res.status(200).json({
// //       message: "Login successful.",
// //       token,
// //       user,
// //     });
// //   } catch (error) {
// //     console.error("Login Error:", error);
// //     return res.status(500).json({ message: "Internal server error." });
// //   }
// // };
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({
//       where: { email },
//       include: [{ model: Role, as: "userRole" }],
//     });

//     if (!user)
//       return res.status(404).json({ message: "Email not found" });

//     if (["inactive", "pending"].includes(user.status))
//       return res.status(403).json({ message: "Account inactive" });

//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const role = user.userRole.roleCategory;

//     const payload = {
//       userId: user.userId,
//       email: user.email,
//       role,
//     };

//     /* 🔹 SUPER ADMIN → DIRECT ADMIN PANEL */
//     if (SUPER_ADMIN_ROLES.includes(role)) {
//       const token = generateToken(payload, "1h");
//       const baseUrl = process.env.ADMIN_BASE_URL.replace(/\/+$/, "");

//       return res.status(200).json({
//         redirectUrl: `${baseUrl}/signin/${token}`,
//         token,
//         user,
//       });
//     }

//     /* 🔹 ALL OTHERS → RESIDENT PANEL */
//     const token = generateToken(payload, "7d");
//     cookieHandler(res, token);

//     return res.status(200).json({
//       message: "Login successful",
//       user,
//     });
//   } catch (err) {
//     console.error("Login Error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /* 🔹 ADMIN REDIRECT URL */
// const getAdminRedirect = async (req, res) => {
//   try {
//     const role = req.user.role;

//     if (!ADMIN_ROLES.includes(role)) {
//       return res.status(403).json({ message: "Not an admin user" });
//     }

//     const payload = {
//       userId: req.user.userId,
//       email: req.user.email,
//       role,
//     };

//     const adminToken = generateToken(payload, "1h");
//     const baseUrl = process.env.ADMIN_BASE_URL.replace(/\/+$/, "");

//     return res.json({
//       redirectUrl: `${baseUrl}/signin/${adminToken}`,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



// /* ---------------- TOKEN SIGN IN (ADMIN REDIRECT) ---------------- */
// const tokenSignIn = async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) {
//       return res.status(401).json({ message: "Token required." });
//     }

//     const decoded = verifyToken(token);

//     const user = await User.findByPk(decoded.userId, {
//       include: [
//         { model: Role, as: "userRole" },
//         { model: Customer, as: "society" },
//       ],
//     });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid token." });
//     }

//     const newToken = generateToken(
//       {
//         userId: user.userId,
//         email: user.email,
//         role: user.userRole.roleCategory,
//       },
//       "7d"
//     );

//     cookieHandler(res, newToken);

//     return res.status(200).json({
//       message: "Login successful.",
//       token: newToken,
//       user,
//     });
//   } catch (error) {
//     console.error("Token SignIn Error:", error);
//     return res.status(401).json({ message: "Invalid or expired token." });
//   }
// };

// /* ---------------- JOB PROFILE LOGIN ---------------- */
// const jobProfileLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const profile = await JobProfile.findOne({
//       where: { email },
//       include: [{ model: Role, as: "role" }],
//     });

//     if (!profile || !(await bcrypt.compare(password, profile.password))) {
//       return res.status(401).json({ message: "Invalid credentials." });
//     }

//     if (profile.status === "inactive") {
//       return res.status(403).json({
//         message: "Account inactive. Contact administrator.",
//       });
//     }

//     const payload = {
//       profileId: profile.profileId,
//       email: profile.email,
//       role: profile.role.roleCategory,
//     };

//     if (REDIRECT_ROLES.includes(profile.role.roleCategory)) {
//       const token = generateToken(payload, "1h");
//       const baseUrl = process.env.ADMIN_BASE_URL.replace(/\/+$/, "");

//       return res.status(200).json({
//         redirectUrl: `${baseUrl}/signin/${token}`,
//         token,
//         profile,
//       });
//     }

//     const token = generateToken(payload, "7d");
//     cookieHandler(res, token);

//     return res.status(200).json({
//       message: "Login successful.",
//       token,
//       profile,
//     });
//   } catch (error) {
//     console.error("Job Profile Login Error:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

// /* ---------------- PROFILE TOKEN LOGIN ---------------- */
// const loginToken = async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) {
//       return res.status(401).json({ message: "Token required." });
//     }

//     const decoded = verifyToken(token);

//     const profile = await JobProfile.findByPk(decoded.profileId, {
//       include: [{ model: Role, as: "role" }],
//     });

//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found." });
//     }

//     const refreshToken = generateToken(
//       {
//         profileId: profile.profileId,
//         email: profile.email,
//         role: profile.role.roleCategory,
//       },
//       "7d"
//     );

//     cookieHandler(res, refreshToken);

//     return res.status(200).json({
//       message: "Login successful.",
//       token: refreshToken,
//       profile,
//     });
//   } catch (error) {
//     console.error("LoginToken Error:", error);
//     return res.status(401).json({ message: "Invalid token." });
//   }
// };

// module.exports = {
//   loginUser,
//   getAdminRedirect,
//   tokenSignIn,
//   jobProfileLogin,
//   loginToken,
// };

require("dotenv").config();
const bcrypt = require("bcrypt");

const { generateToken, verifyToken } = require("../utils/jwt");
const cookieHandler = require("../middleware/cookieHandler");

const { User, Role, Customer, JobProfile } = require("../models");

const {
  SUPER_ADMIN_ROLES,
  ADMIN_ROLES,
  REDIRECT_ROLES,
} = require("../config/role.js");

/* ---------------- USER LOGIN ---------------- */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "userRole" }],
    });

    if (!user)
      return res.status(404).json({ message: "Email not found" });

    if (["inactive", "pending"].includes(user.status))
      return res.status(403).json({ message: "Account inactive" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const role = user.userRole.roleCategory;

    const payload = {
      userId: user.userId,
      email: user.email,
      role,
    };

    /* 🔹 SUPER ADMIN → DIRECT ADMIN PANEL */
    if (SUPER_ADMIN_ROLES.includes(role)) {
      const token = generateToken(payload, "1h");
      const baseUrl = process.env.ADMIN_BASE_URL.replace(/\/+$/, "");

      return res.status(200).json({
        redirectUrl: `${baseUrl}/signin/${token}`,
        token,
        user,
      });
    }

    /* 🔹 ALL OTHERS → RESIDENT PANEL */
    const token = generateToken(payload, "7d");
    cookieHandler(res, token);

    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- ADMIN REDIRECT (RESIDENT → ADMIN) ---------------- */
const getAdminRedirect = async (req, res) => {
  try {
    const role = req.user.role;

    if (!ADMIN_ROLES.includes(role)) {
      return res.status(403).json({ message: "Not an admin user" });
    }

    const payload = {
      userId: req.user.userId,
      email: req.user.email,
      role,
    };

    const adminToken = generateToken(payload, "1h");
    const baseUrl = process.env.ADMIN_BASE_URL.replace(/\/+$/, "");

    return res.status(200).json({
      redirectUrl: `${baseUrl}/signin/${adminToken}`,
    });
  } catch (err) {
    console.error("Admin Redirect Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- TOKEN SIGN-IN (ADMIN PANEL) ---------------- */
const tokenSignIn = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(401).json({ message: "Token required." });

    const decoded = verifyToken(token);

    const user = await User.findByPk(decoded.userId, {
      include: [
        { model: Role, as: "userRole" },
        { model: Customer, as: "society" },
      ],
    });

    if (!user)
      return res.status(401).json({ message: "Invalid token." });

    const newToken = generateToken(
      {
        userId: user.userId,
        email: user.email,
        role: user.userRole.roleCategory,
      },
      "7d"
    );

    cookieHandler(res, newToken);

    return res.status(200).json({
      message: "Login successful.",
      token: newToken,
      user,
    });
  } catch (error) {
    console.error("Token SignIn Error:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

/* ---------------- JOB PROFILE LOGIN ---------------- */
const jobProfileLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const profile = await JobProfile.findOne({
      where: { email },
      include: [{ model: Role, as: "role" }],
    });

    if (!profile || !(await bcrypt.compare(password, profile.password)))
      return res.status(401).json({ message: "Invalid credentials." });

    if (profile.status === "inactive")
      return res.status(403).json({
        message: "Account inactive. Contact administrator.",
      });

    const payload = {
      profileId: profile.profileId,
      email: profile.email,
      role: profile.role.roleCategory,
    };

    if (REDIRECT_ROLES.includes(profile.role.roleCategory)) {
      const token = generateToken(payload, "1h");
      const baseUrl = process.env.ADMIN_BASE_URL.replace(/\/+$/, "");

      return res.status(200).json({
        redirectUrl: `${baseUrl}/signin/${token}`,
        token,
        profile,
      });
    }

    const token = generateToken(payload, "7d");
    cookieHandler(res, token);

    return res.status(200).json({
      message: "Login successful.",
      token,
      profile,
    });
  } catch (error) {
    console.error("Job Profile Login Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/* ---------------- PROFILE TOKEN LOGIN ---------------- */
const loginToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(401).json({ message: "Token required." });

    const decoded = verifyToken(token);

    const profile = await JobProfile.findByPk(decoded.profileId, {
      include: [{ model: Role, as: "role" }],
    });

    if (!profile)
      return res.status(404).json({ message: "Profile not found." });

    const refreshToken = generateToken(
      {
        profileId: profile.profileId,
        email: profile.email,
        role: profile.role.roleCategory,
      },
      "7d"
    );

    cookieHandler(res, refreshToken);

    return res.status(200).json({
      message: "Login successful.",
      token: refreshToken,
      profile,
    });
  } catch (error) {
    console.error("LoginToken Error:", error);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = {
  loginUser,
  getAdminRedirect,
  tokenSignIn,
  jobProfileLogin,
  loginToken,
};
