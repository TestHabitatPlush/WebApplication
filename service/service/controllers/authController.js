// const { generateToken, verifyToken } = require("../utils/jwt");
// const cookieHandler = require("../middleware/cookieHandler");
// const { User, Role, Customer, JobProfile } = require("../models");
// const bcrypt = require("bcrypt");

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({
//       where: { email },
//       include: [
//         {
//           model: Role,
//           as: "role",
//         },
//       ],
//     });

//     if (!user) {
//       return res.status(404).json({
//         message: "Email doesnot exists !!",
//       });
//     }
//     if (user.status === "inactive" || user.status === "pending") {
//       return res.status(403).json({
//         message: "Your account is inactive or pending. Please contact the administrator.",
//       });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(404).json({
//         message: "Entered password is incorrect !",
//       });
//     }

//     if (
//       user.role.roleCategory === "super_admin" ||
//       user.role.roleCategory === "society_moderator" ||
//       user.role.roleCategory === "management_committee"
//     ) {
//       const token = generateToken({ email, password }, "1h");
//       const redirectUrl = `http://localhost:3001/signin/${token}`;
//       return res.json({
//         redirectUrl,
//         token,
//         user
//       });
//     }

//     const token = generateToken({ userId: user.userId, email: user.email });
//     cookieHandler(res, token);

//     return res.status(200).json({
//       message: "Successfully logged in!",
//       user: {
//         userId: user.userId,
//         email: user.email,
//         role: user.role,
//       },
//       token,
//     });
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).json({
//       message: err.message || "Internal server Error",
//     });
//   }
// };


// // const tokenSignIn = async (req, res) => {
//   // try {
//     // const { token } = req.body;
//     // if (!token) return res.status(401).json({
//       // message: "Token not found."
//     // });
// // 
//     // const { email, password } = verifyToken(token);
//     // const user = await User.findOne({
//       // where: { email },
//       // include: [{ model: Role, as: "role" },
//       // { model: Customer }]
//     // });
// // 
//     // if (!user || !(await bcrypt.compare(password, user.password))) {
//       // return res.status(401).json({
//         // message: "Invalid email or password."
//       // });
//     // }
// // 
//     // const newToken = generateToken({
//       // userId: user.userId,
//       // email
//     // });
//     // cookieHandler(res, newToken);
// // 
//     // return res.status(200).json({
//       // message: "Successfully logged in!",
//       // token: newToken, user
//     // });
//   // } catch (error) {
//     // console.error("Token Sign-in Error:", error);
//     // return res.status(500).json({
//       // message: error.message ||
//         // "Internal Server Error"
//     // });
//   // }
// // };

// const tokenSignIn = async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) {
//       return res.status(401).json({ message: "Token not found." });
//     }

//     const { email, password } = verifyToken(token);

  
//     const user = await User.findOne({
//       where: { email },
//       attributes: ["userId", "email", "password"],
//       include: [{ model: Role, as: "role" }, { model: Customer }],
//     });

//     console.log("User Retrieved:", user);
//     console.log("Stored Password:", user?.password);
//     console.log("Entered Password:", password);

//     if (!user || !user.password) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("Password Mismatch");
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     console.log("Password Matched");

//     const newToken = generateToken({
//       userId: user.userId,
//       email: user.email,
//     });

//     cookieHandler(res, newToken);

//     return res.status(200).json({
//       message: "Successfully logged in!",
//       token: newToken,
//       user,
//     });
//   } catch (error) {
//     console.error("Token Sign-in Error:", error);
//     return res.status(500).json({
//       message: error.message || "Internal Server Error",
//     });
//   }
// };



// const jobProfileLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required."
//       });
//     }

//     const profile = await JobProfile.findOne({ 
//       where: { email }, 
//       include: [{ model: Role, as: "role" }] 
//     });

//     if (!profile) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     if (profile.status === "inactive") {
//       return res.status(403).json({ message: "Your account is inactive. Please contact the administrator." });
//     }

//     const isPasswordValid = await bcrypt.compare(password, profile.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }

//     const payload = 
//       profile.role.roleCategory === "society_security_guard" ||
//       profile.role.roleCategory === "society_facility_manager"
//         ? { email, password }
//         : { profileId: profile.profileId, email: profile.email };

//     const token = generateToken(payload, profile.role.roleCategory ? "1h" : undefined);

//     if (payload.password) {
//       return res.json({ redirectUrl: `http://localhost:3001/signin/${token}`, token, profile });
//     }

//     cookieHandler(res, token);
//     return res.status(200).json({
//       message: "Successfully logged in!",
//       profile,
//       token
//     });
//   } catch (error) {
//     console.error("Job Profile Login Error:", error);
//     return res.status(500).json({
//       message: error.message || "Internal Server Error"
//     });
//   }
// };

// const loginToken = async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) return res.status(401).json({
//       message: "Token not found."
//     });

//     const decoded = verifyToken(token);
//     const profile = await JobProfile.findOne({
//       where: { email: decoded.email },
//       include: [{ model: Role, as: "role" }]
//     });

//     if (!profile) return res.status(404).json({
//       message: "Profile not found."
//     });

//     const refreshToken = generateToken({ profileId: profile.profileId, email: profile.email });
//     cookieHandler(res, refreshToken);

//     return res.status(200).json({
//       message: "Successfully logged in!",
//       token: refreshToken,
//       profile
//     });
//   } catch (error) {
//     console.error("Login Token Error:", error);
//     return res.status(500).json({
//       message: error.message ||
//         "Internal Server Error"
//     });
//   }
// };

// module.exports = { loginUser, tokenSignIn, jobProfileLogin, loginToken };

const { generateToken, verifyToken } = require("../utils/jwt");
const cookieHandler = require("../middleware/cookieHandler");
const { User, Role, Customer, JobProfile } = require("../models");
const bcrypt = require("bcrypt");

// USER LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "role" }],
    });

    if (!user) {
      return res.status(404).json({ message: "Email does not exist!" });
    }

    if (user.status === "inactive" || user.status === "pending") {
      return res.status(403).json({
        message: "Your account is inactive or pending. Please contact the administrator.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Entered password is incorrect!" });
    }

    // Special roles redirect
    if (
      user.role.roleCategory === "super_admin" ||
      user.role.roleCategory === "society_moderator" ||
      user.role.roleCategory === "management_committee"
    ) {
      const token = generateToken({ email, password }, "1h");
      const redirectUrl = `${process.env.ADMIN_BASE_URL}/signin/${token}`;
      return res.json({ redirectUrl, token, user });
    }

    // Default login
    const token = generateToken({ userId: user.userId, email: user.email });
    cookieHandler(res, token);

    return res.status(200).json({
      message: "Successfully logged in!",
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

// TOKEN SIGN-IN (for redirect flow)
const tokenSignIn = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "Token not found." });

    const { email, password } = verifyToken(token);

    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "role" }, { model: Customer }],
    });

    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const newToken = generateToken({ userId: user.userId, email: user.email });
    cookieHandler(res, newToken);

    return res.status(200).json({
      message: "Successfully logged in!",
      token: newToken,
      user,
    });
  } catch (error) {
    console.error("Token Sign-in Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// JOB PROFILE LOGIN (e.g., security, facility)
const jobProfileLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const profile = await JobProfile.findOne({
      where: { email },
      include: [{ model: Role, as: "role" }],
    });

    if (!profile) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (profile.status === "inactive") {
      return res.status(403).json({ message: "Your account is inactive. Please contact the administrator." });
    }

    const isPasswordValid = await bcrypt.compare(password, profile.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const payload =
      profile.role.roleCategory === "society_security_guard" ||
      profile.role.roleCategory === "society_facility_manager"
        ? { email, password }
        : { profileId: profile.profileId, email: profile.email };

    const token = generateToken(payload, profile.role.roleCategory ? "1h" : undefined);

    if (payload.password) {
      return res.json({
        redirectUrl: `${process.env.ADMIN_BASE_URL}/signin/${token}`,
        token,
        profile,
      });
    }

    cookieHandler(res, token);
    return res.status(200).json({
      message: "Successfully logged in!",
      profile,
      token,
    });
  } catch (error) {
    console.error("Job Profile Login Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// LOGIN FROM JOB PROFILE TOKEN
const loginToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "Token not found." });

    const decoded = verifyToken(token);
    const profile = await JobProfile.findOne({
      where: { email: decoded.email },
      include: [{ model: Role, as: "role" }],
    });

    if (!profile) return res.status(404).json({ message: "Profile not found." });

    const refreshToken = generateToken({
      profileId: profile.profileId,
      email: profile.email,
    });

    cookieHandler(res, refreshToken);

    return res.status(200).json({
      message: "Successfully logged in!",
      token: refreshToken,
      profile,
    });
  } catch (error) {
    console.error("Login Token Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = {
  loginUser,
  tokenSignIn,
  jobProfileLogin,
  loginToken,
};
