const User = require("./User");
const Address = require("./Address");
const Customer = require("./Customer");
const DiscussionForum = require("./Discussion_Forum");
const GateAllocation = require("./GateAllocation")
const SubscriptionPlan = require("./SubscriptionPlan");
const Parking = require("./Parking");
const Vehicle = require("./VehicleDetails")
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
// const ref_ticket_categorisation = require("./ref_ticket_catagorisation");
const ref_ticket_status = require("./ref_ticket_status");
const Ticket_Details = require("./Ticket_Details")
const Ticket_Summary = require("./Ticket_Summary")
const Ticket_Purpose = require("./Ticket_Purpose");
const Society_HelpDesk_Access_Management = require("./Society_HelpDesk_Access_Management");


Address.hasMany(Customer, { foreignKey: "addressId" });
Customer.belongsTo(Address, { foreignKey: "addressId" });

SubscriptionPlan.hasMany(Customer, { foreignKey: "subscriptionId" });
Customer.belongsTo(SubscriptionPlan, { foreignKey: "subscriptionId" });

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

Address.hasMany(User, { foreignKey: "addressId" });
User.belongsTo(Address, { foreignKey: "addressId" });


// Unit can have many Users
// UnitType.hasMany(Customer, { foreignKey: 'unitTypeId' });
// Customer.belongsTo(UnitType, { foreignKey: "unitTypeId" });

// Customer.hasMany(User, { foreignKey: "", as: "role" });
// User.belongsTo(Customer, { foreignKey: "roleId", as: "role" });

// Unit.hasMany(Customer, { foreignKey: "societyId" });
// Unit.hasMany(Building, { foreignKey: "buildingId" });

Unit.hasMany(Floor, { foreignKey: "floorId" });
Unit.hasMany(UnitType, { foreignKey: "unitTypeId" });

Building.belongsTo(UnitType, { foreignKey: "unitTypeId" });



// ticket
// Establish associations here
// ref_ticket_status.hasMany(Ticket_Details, {
//   foreignKey: "ticket_status_Id",
//   // as: "tickets",
// });

// Ticket_Details.belongsTo(ref_ticket_status, {
//   foreignKey: "ticket_status_Id",
//   // as: "status",
// });

// In a separate file or after all models are defined:

// Ticket_Summary -> Ticket_Details
Ticket_Summary.hasMany(Ticket_Details, { foreignKey: "ticket_Id" });
Ticket_Details.belongsTo(Ticket_Summary, { foreignKey: "ticket_Id" });

// Ticket_Summary -> Ticket_Purpose
Ticket_Summary.belongsTo(Ticket_Purpose, { foreignKey: "ticket_purpose_Id" });
Ticket_Purpose.hasMany(Ticket_Summary, { foreignKey: "ticket_purpose_Id" });

// Ticket_Summary -> User
Ticket_Summary.belongsTo(User, { foreignKey: "userId" });

// Ticket_Details -> User (created by)
Ticket_Details.belongsTo(User, { foreignKey: "userId", as: "createdBy" });
// Ticket_Details -> User (assigned to)
Ticket_Details.belongsTo(User, { foreignKey: "assigned_to", as: "assignedTo" });
// Ticket_Details -> User (updated by)
Ticket_Details.belongsTo(User, { foreignKey: "updated_by_user_id", as: "updatedBy" });

// Ticket_Details -> ref_ticket_status
Ticket_Details.belongsTo(ref_ticket_status, { foreignKey: "ticket_status_Id" });
ref_ticket_status.hasMany(Ticket_Details, { foreignKey: "ticket_status_Id" });

Ticket_Summary.belongsTo(Ticket_Purpose, { foreignKey: 'ticket_purpose_Id' });
Ticket_Summary.hasMany(Ticket_Details, { foreignKey: 'ticket_Id' });

Ticket_Details.belongsTo(ref_ticket_status, { foreignKey: 'ticket_status_Id' });

// Ticket_Details.belongsTo(User, { as: "assignedUser", foreignKey: "assigned_to" });
// Ticket_Details.belongsTo(User, { as: "updatedUser", foreignKey: "updated_by_user_id" });


module.exports = {
  User,
  Address,
  SubscriptionPlan,
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
//  ref_ticket_categorisation,
 ref_ticket_status,
 Ticket_Details,
 Ticket_Summary,
 Ticket_Purpose,
 Society_HelpDesk_Access_Management
};
