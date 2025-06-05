require("dotenv").config();

const { generateToken, verifyToken } = require("../utils/jwt");
const cookieHandler = require("../middleware/cookieHandler");
const { User, Role, Customer, JobProfile } = require("../models");
const bcrypt = require("bcrypt");

const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL.replace(/\/+$/, "");

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

    if (["inactive", "pending"].includes(user.status)) {
      return res.status(403).json({
        message: "Your account is inactive or pending. Please contact the administrator.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Entered password is incorrect!" });
    }

    if (["super_admin", "society_moderator", "management_committee"].includes(user.role.roleCategory)) {
      const token = generateToken({ email, password }, "1h");
      const redirectUrl = `${ADMIN_BASE_URL}/signin/${token}`;
      return res.json({ redirectUrl, token, user });
    }

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
    console.error("Login Error:", err.message);
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

const tokenSignIn = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "Token not found." });

    const { email, password } = verifyToken(token);
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "role" }, { model: Customer }],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const newToken = generateToken({ userId: user.userId, email });
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

    const isRedirectRole = ["society_security_guard", "society_facility_manager"].includes(profile.role.roleCategory);
    const payload = isRedirectRole ? { email, password } : { profileId: profile.profileId, email: profile.email };
    const token = generateToken(payload, isRedirectRole ? "1h" : undefined);

    if (isRedirectRole) {
      const redirectUrl = `${ADMIN_BASE_URL}/signin/${token}`;
      return res.json({ redirectUrl, token, profile });
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

const loginToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "Token not found." });

    const decoded = verifyToken(token);
    const profile = await JobProfile.findOne({
      where: { email: decoded.email },
      include: [{ model: Role, as: "role" }],
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

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

module.exports = { loginUser, tokenSignIn, jobProfileLogin, loginToken };