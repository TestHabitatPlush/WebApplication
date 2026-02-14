// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const sendEmail = require('../utils/sendEmail');
// const { Op } = require('sequelize');

// // Request Password Reset
// exports.requestPasswordReset = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: 'Email is required' });
//     }

//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour

//     await user.update({ resetToken, resetTokenExpiration });

//     const resetLink = `http://localhost:5000/api/reset-password?token=${resetToken}`;
//     await sendEmail(user.email, 'Password Reset Request', `Click here to reset your password: ${resetLink}`);

//     return res.status(200).json({ message: 'Password reset link sent to your email.' });
//   } catch (error) {
//     console.error('❗ Error requesting password reset:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// // Reset Password
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, password } = req.body;

//     if (!token || !password || password.length < 8) {
//       return res.status(400).json({ error: 'Invalid input. Token and password are required, and password must be at least 8 characters.' });
//     }

//     const user = await User.findOne({
//       where: {
//         resetToken: token,
//         resetTokenExpiration: { [Op.gt]: new Date() },
//       },
//     });

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid or expired token' });
//     }

//     // Hash the new password before storing
//     const hashedPassword = await bcrypt.hash(password, 10);

//     //Update the password and clear the resetToken fields
//     // await user.update({
//     // password: hashedPassword,
//     // resetToken: null,
//     // resetTokenExpiration: null,
//     // });

//     user.password = hashedPassword;
//     user.resetToken = null;
//     user.resetTokenExpiration = null;
//     await user.save();

//     return res.status(200).json({ message: 'Password has been reset successfully.' });
//   } catch (error) {
//     console.error('❗ Error resetting password:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { Op } = require('sequelize');
require('dotenv').config();

// Request Password Reset
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour

    await user.update({ resetToken, resetTokenExpiration });

    const frontendURL = process.env.REACT_APP_PUBLIC_FRONTEND_URL || 'http://localhost:3001';
    const resetLink = `${frontendURL}/reset-password?token=${resetToken}`;

    await sendEmail(
      user.email,
      'Password Reset Request',
      `Click the link to reset your password: ${resetLink}`
    );

    return res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error('❗ Error requesting password reset:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password || password.length < 8) {
      return res.status(400).json({
        error: 'Token and valid password (min 8 characters) are required.',
      });
    }

    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash the new password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    //Update the password and clear the resetToken fields
    // await user.update({
    // password: hashedPassword,
    // resetToken: null,
    // resetTokenExpiration: null,
    // });

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();

    return res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('❗ Error resetting password:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
