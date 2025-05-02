const { validationResult } = require('express-validator');
const { Role } = require('../models');

exports.createRole = async (req, res) => {
    console.log('role controller calledsssss')
   
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body)
  const { roleCategory, roleName, occupancyStatus } = req.body;

  try {
     
    const newRole = await Role.create({
      roleCategory,
      roleName,
      occupancyStatus, 
    });
    
    res.status(201).json(newRole);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

 
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({ where: { isDeleted: false } });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching roles' });
  }
};

 
exports.updateRole = async (req, res) => {
  const { id } = req.params;

 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { roleCategory, roleName, occupancyStatus } = req.body;

  try {
    const role = await Role.findOne({ where: { roleId: id, isDeleted: false } });
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

 
    role.roleCategory = roleCategory || role.roleCategory;
    role.roleName = roleName || role.roleName;
    role.occupancyStatus = occupancyStatus || role.occupancyStatus;

    await role.save();

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Error updating role' });
  }
};

// Soft delete a role (set isDeleted to true)
exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findOne({ where: { roleId: id, isDeleted: false } });
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Soft delete the role (setting isDeleted to true)
    role.isDeleted = true;
    await role.save();

    res.status(200).json({ message: 'Role soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting role' });
  }
};
