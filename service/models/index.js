const User = require("./User");
const Address = require("./Address");
const Customer = require("./Customer");
const DiscussionForum = require("./Discussion_Forum");
const GateAllocation = require("./GateAllocation");
const SubscriptionPlan = require("./SubscriptionPlan");
const Module = require("./Module");
const SubcriptionModule = require("./SubscriptionModule");
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
const Software_HelpDesk_Access_Management = require("./Software_HelpDesk_access_Management");
const Software_Ticket_Summary = require("./Software_Ticket_Summary");
const Software_Ref_Ticket_Status = require("./Software_Ref_Ticket_Status");
const Software_Ticket_Details = require("./Software_Ticket_Details");
const Software_Ticket_Purpose = require("./Software_Ticket_Purpose");

// ===================== GENERAL RELATIONS =====================
Address.hasMany(Customer, { foreignKey: "addressId" });
Customer.belongsTo(Address, { foreignKey: "addressId" });

SubscriptionPlan.hasMany(Customer, { foreignKey: "subscriptionId" });
Customer.belongsTo(SubscriptionPlan, { foreignKey: "subscriptionId" });

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

Address.hasMany(User, { foreignKey: "addressId" });
User.belongsTo(Address, { foreignKey: "addressId" });

Unit.hasMany(Floor, { foreignKey: "floorId" });
Unit.hasMany(UnitType, { foreignKey: "unitTypeId" });
Building.belongsTo(UnitType, { foreignKey: "unitTypeId" });

// ===================== TICKET SYSTEM =====================

// Ticket_Summary -> Ticket_Details
Ticket_Summary.hasMany(Ticket_Details, { foreignKey: "ticket_Id" });
Ticket_Details.belongsTo(Ticket_Summary, { foreignKey: "ticket_Id" });

// Ticket_Summary -> Ticket_Purpose
Ticket_Summary.belongsTo(Ticket_Purpose, { foreignKey: "ticket_purpose_Id" });
Ticket_Purpose.hasMany(Ticket_Summary, { foreignKey: "ticket_purpose_Id" });

// Ticket_Summary -> User
Ticket_Summary.belongsTo(User, { foreignKey: "userId" });

// Ticket_Details -> User relations
Ticket_Details.belongsTo(User, { foreignKey: "userId", as: "createdBy" });
Ticket_Details.belongsTo(User, { foreignKey: "assigned_to", as: "assignedTo" });
Ticket_Details.belongsTo(User, { foreignKey: "updated_by_user_id", as: "updatedBy" });

// Ticket_Details -> ref_ticket_status
Ticket_Details.belongsTo(ref_ticket_status, { foreignKey: "ticket_status_Id" });
ref_ticket_status.hasMany(Ticket_Details, { foreignKey: "ticket_status_Id" });

// ===================== SOFTWARE TICKETS =====================
// Summary ↔ Details
// Software_Ticket_Summary.hasMany(Software_Ticket_Details, {
//   foreignKey: "ticket_Id",
//   as: "Software_Ticket_Details",
// });
// Software_Ticket_Details.belongsTo(Software_Ticket_Summary, {
//   foreignKey: "ticket_Id",
//   as: "ticketSummary",
// });

// // Details ↔ Status
// Software_Ticket_Details.belongsTo(Software_Ref_Ticket_Status, {
//   foreignKey: "ticket_status_Id",
//   as: "software_ref_ticket_status",
// });
// Software_Ref_Ticket_Status.hasMany(Software_Ticket_Details, {
//   foreignKey: "ticket_status_Id",
// });

// // Summary ↔ Purpose
// Software_Ticket_Summary.belongsTo(Software_Ticket_Purpose, {
//   foreignKey: "ticket_purpose_Id",
//   as: "ticketPurpose",
// });
// Software_Ticket_Purpose.hasMany(Software_Ticket_Summary, {
//   foreignKey: "ticket_purpose_Id",
// });

// // Details ↔ Users
// // Assigned user
// Software_Ticket_Details.belongsTo(User, {
//   foreignKey: "assigned_to",
//   as: "assignedTo",
// });
// // Updated by
// Software_Ticket_Details.belongsTo(User, {
//   foreignKey: "updated_by_user_id",
//   as: "updatedBy",
// });
// // Created by
// Software_Ticket_Details.belongsTo(User, {
//   foreignKey: "userId",
//   as: "createdBy",
// });



// Summary ↔ Purpose
Software_Ticket_Summary.belongsTo(Software_Ticket_Purpose, {
  foreignKey: "ticket_purpose_Id",
  as: "ticketPurpose", // must match alias in queries
});
Software_Ticket_Purpose.hasMany(Software_Ticket_Summary, {
  foreignKey: "ticket_purpose_Id",
  as: "ticketSummaries", // optional
});

// Summary ↔ Details
Software_Ticket_Summary.hasMany(Software_Ticket_Details, {
  foreignKey: "ticket_Id",
  as: "Software_Ticket_Details", // must match alias in queries
});
Software_Ticket_Details.belongsTo(Software_Ticket_Summary, {
  foreignKey: "ticket_Id",
  as: "ticketSummary",
});

// Details ↔ Status
Software_Ticket_Details.belongsTo(Software_Ref_Ticket_Status, {
  foreignKey: "ticket_status_Id",
  as: "software_ref_ticket_status", // must match alias in queries
});

// // Details ↔ Users
// Software_Ticket_Details.belongsTo(User, { foreignKey: "assigned_to", as: "assignedTo" });
// Software_Ticket_Details.belongsTo(User, { foreignKey: "updated_by_user_id", as: "updatedBy" });
// Software_Ticket_Details.belongsTo(User, { foreignKey: "userId", as: "createdBy" });

// Software_Ticket_Details -> User
Software_Ticket_Details.belongsTo(User, { foreignKey: "assigned_to", as: "assignedTo" });
Software_Ticket_Details.belongsTo(User, { foreignKey: "updated_by_user_id", as: "updatedBy" });
Software_Ticket_Details.belongsTo(User, { foreignKey: "userId", as: "createdBy" });



module.exports = {
  User,
  Address,
  SubscriptionPlan,
  Module,
  SubcriptionModule,
  Customer,
  Document,
  DiscussionForum,
  GateAllocation,
  Parking,
  Vehicle,
  Role,
  Building,
  JobProfile,
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
  Software_Ref_Ticket_Status,
  Software_Ticket_Purpose,
  Software_Ticket_Summary,
  Software_Ticket_Details,
};
