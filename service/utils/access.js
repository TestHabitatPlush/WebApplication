
const { User, Role } = require("../models");

// ------------------- Role Groups -------------------
const CREATOR_ROLES = [
  "super_admin_it",
  "society_moderator",
  "management_committee",
  "society_owner",
  "society_owner_family",
  "society_tenant",
  "society_tenant_family",
  "society_builder",
];

const SOFTWARE_UPDATE_ROLES = [
  "super_admin_it", 
];

const SOCIETY_UPDATE_ROLES = [
  "society_moderator",
  "management_committee",
];

// ------------------- Helpers -------------------
async function getUserRoleCategory(userId) {
  const user = await User.findByPk(userId, {
    include: [{ model: Role, attributes: ["roleCategory"] }],
  });
  return user?.Role?.roleCategory || null;
}

// ------------------- Checkers -------------------
async function checkCreatorAccess(userId) {
  const roleCategory = await getUserRoleCategory(userId);
  return CREATOR_ROLES.includes(roleCategory);
}

async function checkSoftwareUpdateAccess(userId) {
  const roleCategory = await getUserRoleCategory(userId);
  return SOFTWARE_UPDATE_ROLES.includes(roleCategory);
}

async function checkSocietyUpdateAccess(userId) {
  const roleCategory = await getUserRoleCategory(userId);
  return SOCIETY_UPDATE_ROLES.includes(roleCategory);
}

// ------------------- Exports -------------------
module.exports = {
  checkCreatorAccess,
  checkSoftwareUpdateAccess,
  checkSocietyUpdateAccess,
};
