// config/moduleMap.js
module.exports = {
    // --- Core ---
    "/api/users": "users",
    "/api/userUnit": "users",
    "/api/family": "users",
  
    // --- Auth / password (NO subscription check usually) ---
    // "/api/auth": skipped
    // "/api/password": skipped
  
    // --- Customer & Subscription ---
    "/api/customer": "customers",
    "/api/subscription": "subscription",
  
    // --- Role & Admin ---
    "/api/role": "roles",
    "/api/admin": "admin",
  
    // --- Gate ---
    "/api/gate": "gate",
    "/api/gateAllocation": "gate",
  
    // --- Building / Unit Management ---
    "/api/building": "building",
    "/api/floor": "floor",
    "/api/unitType": "unit",
    "/api/unit": "unit",
  
    // --- Vehicle & Parking ---
    "/api/vehicle": "vehicle",
    "/api/parking": "parking",
  
    // --- Documents ---
    "/api/documents": "document",
  
    // --- Discussion / Chat ---
    "/api/discussionForum": "discussion",
    "/api/chat": "chat",
    "/api/chatAdmin": "chat",
  
    // --- Emergency ---
    "/api/emergencyContacts": "emergency_contact",
  
    // --- Location ---
    "/api/location": "location",
  
    // --- Notice ---
    "/api/noticeAnnouncement": "notice",
  
    // --- Visitor ---
    "/api/visitormanagement": "visitor_new_visitentry",
  
    // --- Helpdesk ---
    "/api/societyhelpdesk": "society_helpdesk",
    "/api/softwarehelpdesk": "software_helpdesk",
  
    // --- Facility ---
    "/api/facilityManagement": "facility_management",
  
    // --- Filter / Reference ---
    "/api/filter": "filter",
    "/api/refusergroup": "user_group",
  };