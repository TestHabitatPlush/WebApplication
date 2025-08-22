const { User, Role } = require("../models");

const ALLOWED_ROLE_CATEGORIES = [
  "super_admin_it",
  "society_owner",
  "society_owner_family",
  "society_tenant",
  "society_tenant_family",
  "society_builder",
  "society_moderator", 
];

// const UPDATE_ALLOWED_ROLE_CATEGORIES = [
//   "super_admin_it",
//   "society_moderator", 
// ];


const UPDATE_ALLOWED_ROLE_CATEGORIES = [
  "super_admin_it",      
  "society_moderator",  
  "society_admin",       
  "society_owner",      
  "society_tenant",     
];


async function checkTicketAccess(userId) {
  const user = await User.findByPk(userId, {
    include: [{ model: Role, attributes: ["roleCategory"] }],
  });
  if (!user || !user.Role) return false;
  return ALLOWED_ROLE_CATEGORIES.includes(user.Role.roleCategory);
}

async function checkTicketUpdateAccess(userId) {
  const user = await User.findByPk(userId, {
    include: [{ model: Role, attributes: ["roleCategory"] }],
  });
  if (!user || !user.Role) return false;
  return UPDATE_ALLOWED_ROLE_CATEGORIES.includes(user.Role.roleCategory);
}

module.exports = { checkTicketAccess, checkTicketUpdateAccess };
