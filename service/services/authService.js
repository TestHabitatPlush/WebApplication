const bcrypt = require("bcrypt");

exports.checkPassword = async (password, encryptedPass) => {
  if (!(await bcrypt.compare(password, encryptedPass))) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }
};
