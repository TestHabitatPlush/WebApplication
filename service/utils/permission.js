const { User, Role } = require("../models");

const getUserRoleCategory = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) return null;

  const role = await Role.findByPk(user.roleId);
  return role?.roleCategory || null;
};

const isFullAccessRole = (roleCategory) => {
  return ['super_admin', 'society_moderator', 'management_committee'].includes(roleCategory);
};

const isViewOnlyRole = (roleCategory) => {
  return ['society_owner', 'society_owner_family', 'society_tenant', 'society_tenant_family'].includes(roleCategory);
};

module.exports = { getUserRoleCategory, isFullAccessRole, isViewOnlyRole };
