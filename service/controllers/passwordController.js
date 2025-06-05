const { User } = require("../models");
const bcrypt = require("bcrypt");
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist." });
    }

    // ⚠️ Don't hash here – Sequelize hook will do it
    user.password = newPassword;
    await user.save(); // Triggers beforeUpdate, hashes it once

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  resetPassword,
};
