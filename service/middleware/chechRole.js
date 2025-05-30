// middlewares/checkRole.js
const User = require('../models/User');
const Role = require('../models/RoleModel');

const checkRole = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const role = await Role.findByPk(user.roleId);
    if (!role) return res.status(403).json({ message: 'Role not found' });

    req.userDetails = {
      userId: user.userId,
      societyId: user.societyId,
      roleCategory: role.roleCategory, // "super_admin", "Resident", etc.
    };

    next();
  } catch (err) {
    console.error('Role check error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkRole;
