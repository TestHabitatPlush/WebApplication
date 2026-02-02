const UserAdminAccess = require("../models/UserAdminAccess");
const Role = require("../models/RoleModel");

const ADMIN_ROLE_MAP = {
  super_admin: "super_admin",
  super_admin_it: "super_admin_it",
  society_moderator: "society_admin",
  management_committee: "committee",
};

module.exports = async function syncAdminAccess(user) {
  if (!user?.userId) return;

  const role = await Role.findByPk(user.roleId);
  if (!role) return;

  const accessType = ADMIN_ROLE_MAP[role.roleCategory];
  if (!accessType) return;

  const isGlobalAdmin = ["super_admin", "super_admin_it",].includes(role.roleCategory);

  await UserAdminAccess.findOrCreate({
    where: {
      userId: user.userId,
      societyId: isGlobalAdmin ? null : user.societyId,
    },
    defaults: {
      accessType,
      status: "active",
    },
  });
};
