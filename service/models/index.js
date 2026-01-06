// const User = require("./User");
// const UserUnit = require("./UserUnit");
// const Address = require("./Address");
// const Customer = require("./Customer");
// const DiscussionForum = require("./Discussion_Forum");
// const GateAllocation = require("./GateAllocation");
// const SubscriptionPlan = require("./SubscriptionPlan");
// const Module = require("./Module");
// const SubscriptionModule = require("./SubscriptionModule");
// const Parking = require("./Parking");
// const Vehicle = require("./VehicleDetails");
// const JobProfile = require("./JobProfile");
// const Document = require("./Document");
// const Role = require("./RoleModel");
// const Building = require("./Building");
// const Gate = require("./Gate");
// const Emergency_Contact = require("./Emergency_Contact");
// const Floor = require("./Floor");
// const Facility = require("./FacilityManagement");
// const UnitType = require("./UnitType");
// const Unit = require("./Unit");
// const UserGroup = require("./UserGroup");
// const Notice = require("./Notice");
// const ref_visitor_type_of_entry = require("./ref_visitor_type_of_entry");
// const ref_visitor_type = require("./ref_visitor_type");
// const Visitor_new_visitentry = require("./Visitor_new_visitentry");
// const ref_ticket_status = require("./ref_ticket_status");
// const Ticket_Details = require("./Ticket_Details");
// const Ticket_Summary = require("./Ticket_Summary");
// const Ticket_Purpose = require("./Ticket_Purpose");
// const Society_HelpDesk_Access_Management = require("./Society_HelpDesk_Access_Management");
// const Software_HelpDesk_Access_Management = require("./Software_HelpDesk_Access_Management");
// const Software_Ticket_Summary = require("./Software_Ticket_Summary");
// const Software_Ref_Ticket_Status = require("./Software_Ref_Ticket_Status");
// const Software_Ticket_Details = require("./Software_Ticket_Details");
// const Software_Ticket_Purpose = require("./Software_Ticket_Purpose");

// /* ================= ADDRESS ================= */
// Address.hasMany(Customer, { foreignKey: "addressId" });
// Customer.belongsTo(Address, { foreignKey: "addressId" });

// Address.hasMany(User, { foreignKey: "addressId" });
// User.belongsTo(Address, { foreignKey: "addressId" });

// /* ================= SUBSCRIPTION ================= */
// SubscriptionPlan.hasMany(Customer, { foreignKey: "subscriptionId" });
// Customer.belongsTo(SubscriptionPlan, { foreignKey: "subscriptionId" });

// /* ================= USER ↔ ROLE (ONLY ONCE) ================= */
// User.belongsTo(Role, {
//   foreignKey: "roleId",
//   as: "userRole", //  UNIQUE on User
// });

// Role.hasMany(User, {
//   foreignKey: "roleId",
//   as: "users", //  DIFFERENT alias
// });

// /* ================= USER ↔ UNIT (M:N SOURCE OF TRUTH) ================= */
// User.belongsToMany(Unit, {
//   through: UserUnit,
//   foreignKey: "userId",
//   otherKey: "unitId",
// });

// Unit.belongsToMany(User, {
//   through: UserUnit,
//   foreignKey: "unitId",
//   otherKey: "userId",
// });

// /* ================= USER_UNIT DIRECT (IMPORTANT) ================= */
// UserUnit.belongsTo(User, {
//   foreignKey: "userId",
//   as: "unitOwner", // ✅ owner of the unit
// });

// UserUnit.belongsTo(Unit, {
//   foreignKey: "unitId",
//   as: "unit",
// });

// User.hasMany(UserUnit, { foreignKey: "userId" });
// Unit.hasMany(UserUnit, { foreignKey: "unitId" });

// /* ================= USER → CURRENT UNIT ================= */
// User.belongsTo(Unit, {
//   foreignKey: "unitId",
// });

// /* ================= UNIT STRUCTURE ================= */
// Unit.hasMany(Floor, { foreignKey: "floorId" });
// Unit.hasMany(UnitType, { foreignKey: "unitTypeId" });

// Building.belongsTo(UnitType, { foreignKey: "unitTypeId" });

// /* ================= TICKETS ================= */
// Ticket_Summary.hasMany(Ticket_Details, { foreignKey: "ticket_Id" });
// Ticket_Details.belongsTo(Ticket_Summary, { foreignKey: "ticket_Id" });

// Ticket_Summary.belongsTo(Ticket_Purpose, { foreignKey: "ticket_purpose_Id" });
// Ticket_Purpose.hasMany(Ticket_Summary, { foreignKey: "ticket_purpose_Id" });

// Ticket_Summary.belongsTo(User, { foreignKey: "userId" });

// Ticket_Details.belongsTo(User, { foreignKey: "userId", as: "createdBy" });
// Ticket_Details.belongsTo(User, { foreignKey: "assigned_to", as: "assignedTo" });
// Ticket_Details.belongsTo(User, { foreignKey: "updated_by_user_id", as: "updatedBy" });

// Ticket_Details.belongsTo(ref_ticket_status, { foreignKey: "ticket_status_Id" });
// ref_ticket_status.hasMany(Ticket_Details, { foreignKey: "ticket_status_Id" });

// /* ================= SOFTWARE TICKETS ================= */
// Software_Ticket_Summary.hasMany(Software_Ticket_Details, { foreignKey: "ticket_Id" });
// Software_Ticket_Details.belongsTo(Software_Ticket_Summary, { foreignKey: "ticket_Id" });

// Software_Ticket_Summary.belongsTo(Software_Ticket_Purpose, { foreignKey: "ticket_purpose_Id" });
// Software_Ticket_Purpose.hasMany(Software_Ticket_Summary, { foreignKey: "ticket_purpose_Id" });

// Software_Ticket_Summary.belongsTo(User, { foreignKey: "userId" });

// Software_Ticket_Details.belongsTo(User, { foreignKey: "userId", as: "createdBy" });
// Software_Ticket_Details.belongsTo(User, { foreignKey: "assigned_to", as: "assignedTo" });
// Software_Ticket_Details.belongsTo(User, { foreignKey: "updated_by_user_id", as: "updatedBy" });

// Software_Ticket_Details.belongsTo(Software_Ref_Ticket_Status, { foreignKey: "ticket_status_Id" });
// Software_Ref_Ticket_Status.hasMany(Software_Ticket_Details, { foreignKey: "ticket_status_Id" });

// /* ================= EXPORT ================= */
// module.exports = {
//   User,
//   UserUnit,
//   Address,
//   Customer,
//   DiscussionForum,
//   GateAllocation,
//   SubscriptionPlan,
//   Module,
//   SubscriptionModule,
//   Parking,
//   Vehicle,
//   JobProfile,
//   Document,
//   Role,
//   Building,
//   Gate,
//   Emergency_Contact,
//   Floor,
//   Facility,
//   UnitType,
//   Unit,
//   UserGroup,
//   Notice,
//   ref_visitor_type_of_entry,
//   ref_visitor_type,
//   Visitor_new_visitentry,
//   ref_ticket_status,
//   Ticket_Details,
//   Ticket_Summary,
//   Ticket_Purpose,
//   Society_HelpDesk_Access_Management,
//   Software_HelpDesk_Access_Management,
//   Software_Ticket_Summary,
//   Software_Ref_Ticket_Status,
//   Software_Ticket_Details,
//   Software_Ticket_Purpose,
// };

const User = require("./User");
const UserUnit = require("./UserUnit");
const Address = require("./Address");
const Customer = require("./Customer");
const DiscussionForum = require("./Discussion_Forum");
const ChatRoom = require("./ChatRoom");
const ChatRoomMember = require ("./ChatRoomMember");
const ChatMessage = require ("./ChatMessage");
const MessageReaction = require("./MessageReaction");
const GateAllocation = require("./GateAllocation");
const SubscriptionPlan = require("./SubscriptionPlan");
const Module = require("./Module");
const SubscriptionModule = require("./SubscriptionModule");
const Parking = require("./Parking");
const Vehicle = require("./VehicleDetails");
const JobProfile = require("./JobProfile");
const Document = require("./Document");
const Role = require("./RoleModel");
const Building = require("./Building");
const Gate = require("./Gate");
const Emergency_Contact = require("./Emergency_Contact");
const Floor = require("./Floor");
const Facility = require("./FacilityManagement");
const UnitType = require("./UnitType");
const Unit = require("./Unit");
const UserGroup = require("./UserGroup");
const Notice = require("./Notice");
const ref_visitor_type_of_entry = require("./ref_visitor_type_of_entry");
const ref_visitor_type = require("./ref_visitor_type");
const Visitor_new_visitentry = require("./Visitor_new_visitentry");
const ref_ticket_status = require("./ref_ticket_status");
const Ticket_Details = require("./Ticket_Details");
const Ticket_Summary = require("./Ticket_Summary");
const Ticket_Purpose = require("./Ticket_Purpose");
const Society_HelpDesk_Access_Management = require("./Society_HelpDesk_Access_Management");
const Software_HelpDesk_Access_Management = require("./Software_HelpDesk_Access_Management");
const Software_Ticket_Summary = require("./Software_Ticket_Summary");
const Software_Ref_Ticket_Status = require("./Software_Ref_Ticket_Status");
const Software_Ticket_Details = require("./Software_Ticket_Details");
const Software_Ticket_Purpose = require("./Software_Ticket_Purpose");

/* ================= ADDRESS ================= */
Address.hasMany(Customer, { foreignKey: "addressId" });
Customer.belongsTo(Address, { foreignKey: "addressId" });

Address.hasMany(User, { foreignKey: "addressId" });
User.belongsTo(Address, { foreignKey: "addressId" });

/* ================= SUBSCRIPTION ================= */
SubscriptionPlan.hasMany(Customer, { foreignKey: "subscriptionId" });
Customer.belongsTo(SubscriptionPlan, { foreignKey: "subscriptionId" });

/* ================= USER ↔ ROLE (ONLY ONCE) ================= */
User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "userRole", 
});

Role.hasMany(User, {
  foreignKey: "roleId",
  as: "userRole",
});

/* ================= USER ↔ UNIT (M:N SOURCE OF TRUTH) ================= */
User.belongsToMany(Unit, {
  through: UserUnit,
  foreignKey: "userId",
  otherKey: "unitId",
});

Unit.belongsToMany(User, {
  through: UserUnit,
  foreignKey: "unitId",
  otherKey: "userId",
});

/* ================= USER_UNIT DIRECT (IMPORTANT) ================= */
UserUnit.belongsTo(User, {
  foreignKey: "userId",
  as: "unitOwner", 
});

UserUnit.belongsTo(Unit, {
  foreignKey: "unitId",
  as: "unit",
});

User.hasMany(UserUnit, { foreignKey: "userId" });
Unit.hasMany(UserUnit, { foreignKey: "unitId" });

/* ================= USER → CURRENT UNIT ================= */
User.belongsTo(Unit, {
  foreignKey: "unitId",
  as:"currentUnit",
});

/* ================= UNIT STRUCTURE ================= */
Unit.hasMany(Floor, { foreignKey: "floorId" });
Unit.hasMany(UnitType, { foreignKey: "unitTypeId" });

Building.belongsTo(UnitType, { foreignKey: "unitTypeId" });

/* ================= TICKETS ================= */
Ticket_Summary.hasMany(Ticket_Details, { foreignKey: "ticket_Id" });
Ticket_Details.belongsTo(Ticket_Summary, { foreignKey: "ticket_Id" });

Ticket_Summary.belongsTo(Ticket_Purpose, { foreignKey: "ticket_purpose_Id" });
Ticket_Purpose.hasMany(Ticket_Summary, { foreignKey: "ticket_purpose_Id" });

Ticket_Summary.belongsTo(User, { foreignKey: "userId" });

Ticket_Details.belongsTo(User, { foreignKey: "userId", as: "createdBy" });
Ticket_Details.belongsTo(User, { foreignKey: "assigned_to", as: "assignedTo" });
Ticket_Details.belongsTo(User, { foreignKey: "updated_by_user_id", as: "updatedBy" });

Ticket_Details.belongsTo(ref_ticket_status, { foreignKey: "ticket_status_Id" });
ref_ticket_status.hasMany(Ticket_Details, { foreignKey: "ticket_status_Id" });

/* ================= SOFTWARE TICKETS ================= */
Software_Ticket_Summary.hasMany(Software_Ticket_Details, { foreignKey: "ticket_Id" });
Software_Ticket_Details.belongsTo(Software_Ticket_Summary, { foreignKey: "ticket_Id" });

Software_Ticket_Summary.belongsTo(Software_Ticket_Purpose, { foreignKey: "ticket_purpose_Id" });
Software_Ticket_Purpose.hasMany(Software_Ticket_Summary, { foreignKey: "ticket_purpose_Id" });

Software_Ticket_Summary.belongsTo(User, { foreignKey: "userId" });

Software_Ticket_Details.belongsTo(User, { foreignKey: "userId", as: "createdBy" });
Software_Ticket_Details.belongsTo(User, { foreignKey: "assigned_to", as: "assignedTo" });
Software_Ticket_Details.belongsTo(User, { foreignKey: "updated_by_user_id", as: "updatedBy" });

Software_Ticket_Details.belongsTo(Software_Ref_Ticket_Status, { foreignKey: "ticket_status_Id" });
Software_Ref_Ticket_Status.hasMany(Software_Ticket_Details, { foreignKey: "ticket_status_Id" });


/* ================= CHAT ASSOCIATIONS ================= */

// Room → Members
ChatRoom.hasMany(ChatRoomMember, { foreignKey: "chatRoomId" });
ChatRoomMember.belongsTo(ChatRoom, { foreignKey: "chatRoomId" });

// User → Members
User.hasMany(ChatRoomMember, { foreignKey: "userId" });
ChatRoomMember.belongsTo(User, { foreignKey: "userId" });

// Room → Messages
ChatRoom.hasMany(ChatMessage, { foreignKey: "chatRoomId" });
ChatMessage.belongsTo(ChatRoom, { foreignKey: "chatRoomId" });

// User → Messages
User.hasMany(ChatMessage, { foreignKey: "senderId" });
ChatMessage.belongsTo(User, { foreignKey: "senderId" });

// Message → Reactions
ChatMessage.hasMany(MessageReaction, { foreignKey: "messageId" });
MessageReaction.belongsTo(ChatMessage, { foreignKey: "messageId" });

User.hasMany(MessageReaction, { foreignKey: "userId" });
MessageReaction.belongsTo(User, { foreignKey: "userId" });

/* ================= CHAT MESSAGE REPLY ================= */

ChatMessage.belongsTo(ChatMessage, {
  foreignKey: "replyToMessageId",
  as: "replyTo",
});
/* ================= EXPORT ================= */

module.exports = {
  User,
  UserUnit,
  Address,
  Customer,
  DiscussionForum,
  ChatRoom,
  ChatRoomMember,
  ChatMessage,
  MessageReaction,
  GateAllocation,
  SubscriptionPlan,
  Module,
  SubscriptionModule,
  Parking,
  Vehicle,
  JobProfile,
  Document,
  Role,
  Building,
  Gate,
  Emergency_Contact,
  Floor,
  Facility,
  UnitType,
  Unit,
  UserGroup,
  Notice,
  ref_visitor_type_of_entry,
  ref_visitor_type,
  Visitor_new_visitentry,
  ref_ticket_status,
  Ticket_Details,
  Ticket_Summary,
  Ticket_Purpose,
  Society_HelpDesk_Access_Management,
  Software_HelpDesk_Access_Management,
  Software_Ticket_Summary,
  Software_Ref_Ticket_Status,
  Software_Ticket_Details,
  Software_Ticket_Purpose,
};
