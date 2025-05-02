const { generateToken, verifyToken } = require("../utils/jwt");
const cookieHandler = require("../middleware/cookieHandler");
const { User, Role, Customer, JobProfile } = require("../models");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "role" }],
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }
     // Debug Logs
     console.log("User Found:", user.email, "Role:", user.role?.roleCategory);
     console.log("Stored Password:", user.password);
     console.log("Entered Password:", password);

     // Compare password using bcrypt

     const isPasswordMatch = await bcrypt.compare(password,user.password);
     if(!isPasswordMatch){
      console.log("Password Matched");
      return res.status(401).json({
        message:"invalid email or password"
      });
     }
     console.log("Password Mitched")

    const payload = user.role.roleCategory === "super_admin" ||
      user.role.roleCategory === "society_moderator" ||
      user.role.roleCategory === "management_committee"
      ? { email, password }
      : { userId: user.userId, email: user.email };

    const token = generateToken(payload, user.role.roleCategory ? "1h" : undefined);
// 
    // if (payload.password) {
      // return res.json({ redirectUrl: `http://localhost:3001/signin/${token}`, token, user });
    // }
// 
if (payload.password) {
  // const redirectUrl = `http://localhost:3001/signin/${token}`;
  const redirectUrl = `${process.env.ADMIN_PORTAL_URL}/signin/${token}`
  // const redirectUrl = `https://testadmin.habitatplush.com/signin/${token}`
  console.log("Redirecting to:", redirectUrl);
  return res.json({ redirectUrl, token, user });
}

    cookieHandler(res, token);
    return res.status(200).json({
      message: "Successfully logged in!",
      user,
       token
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: error.message ||
        "Internal Server Error"
    });
  }
};

const tokenSignIn = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({
      message: "Token not found."
    });

    const { email, password } = verifyToken(token);
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "role" },
      { model: Customer }]
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const newToken = generateToken({
      userId: user.userId,
      email
    });
    cookieHandler(res, newToken);

    return res.status(200).json({
      message: "Successfully logged in!",
      token: newToken, user
    });
  } catch (error) {
    console.error("Token Sign-in Error:", error);
    return res.status(500).json({
      message: error.message ||
        "Internal Server Error"
    });
  }
};

const jobProfileLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const profile = await JobProfile.findOne({ 
      where: { email }, 
      include: [{ model: Role, as: "role" }] 
    });

    // Check if profile exists
    if (!profile) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Check if the profile status is inactive
    if (profile.status === "inactive") {
      return res.status(403).json({ message: "Your account is inactive. Please contact the administrator." });
    }

    // Check password
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
      return res.json({ redirectUrl: `${process.env.ADMIN_PORTAL_URL}/signin/${token}`, token, profile });
    }

    cookieHandler(res, token);
    return res.status(200).json({
      message: "Successfully logged in!",
      profile,
      token
    });
  } catch (error) {
    console.error("Job Profile Login Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error"
    });
  }
};

const loginToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({
      message: "Token not found."
    });

    const decoded = verifyToken(token);
    const profile = await JobProfile.findOne({
      where: { email: decoded.email },
      include: [{ model: Role, as: "role" }]
    });

    if (!profile) return res.status(404).json({
      message: "Profile not found."
    });

    const refreshToken = generateToken({ profileId: profile.profileId, email: profile.email });
    cookieHandler(res, refreshToken);

    return res.status(200).json({
      message: "Successfully logged in!",
      token: refreshToken,
      profile
    });
  } catch (error) {
    console.error("Login Token Error:", error);
    return res.status(500).json({
      message: error.message ||
        "Internal Server Error"
    });
  }
};

module.exports = { loginUser, tokenSignIn, jobProfileLogin, loginToken };