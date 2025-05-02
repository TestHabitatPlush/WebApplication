// const rolesJSON = require("../service/json/roles.json");
// const plansJSON = require("../service/json/subscriptionPlans.json");
// const { Role, User, Customer, SubscriptionPlan, Address } = require("./models");
// const RefUserGroup = require("./models/UserGroup");

// const resultStack = [];
// const errorStack = [];

// const createAddress = () => {
//   const address = {
//     city: "Bangalore",
//     state: "Karnataka",
//     zipCode: "560102",
//     street: "Srivari street",
//     address1: "123 Greenwood Lane",
//   };

//   const data = Address.create(address);
// };

// const createUserCategory = async () => {
//   console.log("CreateUserCategory called !");
//   try {
//     const result = [];
//     const createRefUserCategory = async (userGroupName) => {
//       const data = await RefUserGroup.create({
//         userGroupName,
//       });
//       result.push(data);
//     };
//     ["resident", "tenant", "primaryContact", "all"].forEach((data) =>
//       createRefUserCategory(data)
//     );
//     resultStack.push({
//       data: result,
//       message: "ref users created successfully!",
//     });
//   } catch (err) {
//     errorStack.push(err.message);
//   }
// };

// const createUserRoles = async () => {
//   console.log("createUserRoles called !");
//   try {
//     const result = [];
//     const createRole = async (obj) => {
//       console.log(obj);
//       const data = await Role.create(obj);
//       result.push(data);
//     };
//     rolesJSON.forEach((data) => createRole(data));

//     resultStack.push({
//       data: result,
//       message: "Roles created successfully!",
//     });
//   } catch (err) {
//     errorStack.push(err.message);
//   }
// };

// const createSuperAdmin = async () => {
//   console.log("createSuperAdmin called !");
//   const superAdminDetails = {
//     salutation: "Mr",
//     firstName: "Super",
//     lastName: "Admin",
//     password: "super.admin",
//     countyCode: 91,
//     mobileNumber: 9887865722,
//     alternateNumber: 9876543210,
//     email: "super.admin@gmail.com",
//     roleId: 1,
//     livesHere: true,
//     primaryContact: true,
//     isManagementCommittee: true,
//     managementDesignation: "Super Admin",
//     status: "active",
//     addressId:1,
//   };

//   try {
//     const result = await User.create(superAdminDetails);
//     resultStack.push({
//       message: "Super admin credential created successfully!",
//       data: result,
//     });
//   } catch (err) {
//     errorStack.push(err.message);
//   }
// };

// const createSubScriptionPlans = async () => {
//   console.log("createSubscriptionPlans called !");

//   try {
//     const result = [];
//     const createSubScription = async (obj) => {
//       const data = await SubscriptionPlan.create(obj);
//       result.push(data);
//     };
//     plansJSON.forEach((data) => createSubScription(data));
//     resultStack.push({ data: result, message: "Roles created successfully!" });
//   } catch (err) {
//     errorStack.push(err.message);
//   }
// };

// const createDemoCustomer = async () => {
//   console.log("createDemoCustomer called!");
//   try {
//     const customer1 = {
//       customerType: "society",
//       customerName: "Greenwood Society",
//       societyType: "residential",
//       societyName: "Greenwood Heights",
//       establishedYear: "2005",
//       phone: "9876543214",
//       email: "contact2@greenwood.com",
//       subscriptionId: 1,
//       addressId:1,
//     };

//     const result = await Customer.create(customer1);
//     resultStack.push({ message: "Customer created", data: result });
//   } catch (err) {
//     errorStack.push(err.message);
//     throw new Error(err.message);
//   }
// };

// // const createDemoUsers = async () => {
// //   console.log("createDemoUsers called !");

// //   const demoUsers = [
// //     {
// //       salutation: "Mr",
// //       firstName: "Super",
// //       lastName: "Admin",
// //       password: "super.admin",
// //       countyCode: 91,
// //       mobileNumber: 9887865722,
// //       alternateNumber: 9876543210,
// //       email: "super.admin@gmail.com",
// //       roleId: 1,
// //       livesHere: true,
// //       primaryContact: true,
// //       isManagementCommittee: true,
// //       managementDesignation: "Super Admin",
// //       status: "active",
// //       addressId: 1,
// //     },
// //     {
// //       salutation: "Mr",
// //       firstName: "Admin",
// //       lastName: "User",
// //       password: "admin.user",
// //       countyCode: 91,
// //       mobileNumber: 9876543210,
// //       alternateNumber: 9887865722,
// //       email: "admin@gmail.com",
// //       roleId: 3,
// //       livesHere: true,
// //       primaryContact: true,
// //       isManagementCommittee: true,
// //       managementDesignation: "Admin",
// //       status: "active",
// //       addressId: 1,
// //     },
// //   ];

// //   try {
// //     const result = [];
// //     for (const user of demoUsers) {
// //       const data = await User.create(user);
// //       result.push(data);
// //     }

// //     resultStack.push({
// //       message: "Demo users created successfully!",
// //       data: result,
// //     });
// //   } catch (err) {
// //     errorStack.push(err.message);
// //     new Error(err);
// //   }
// // };

// exports.initController = async (req, res) => {
//   console.log("InitController called !");
//   try {
//     await createAddress();
//     await createUserCategory();
//     await createSubScriptionPlans();
//     await createUserRoles();
//     await createSuperAdmin();
//     await createDemoCustomer();
//     // await createDemoUsers(); // Call the demo user creation function

//     res
//       .status(201)
//       .json({ message: "Database initiated successfully", data: resultStack });
//   } catch (err) {
//     res.status(500).json({ error: errorStack });
//   }
// };


// exports.createSuperAdmin = async (req, res) => {
//   console.log("createSuperAdmin called!");

//   const superAdminDetails = {
//     salutation: "Mr",
//     firstName: "Super",
//     lastName: "Admin",
//     password: "super.admin", 
//     countryCode: 91,
//     mobileNumber: 9887865722,
//     alternateNumber: 9876543210,
//     email: "super.admin@gmail.com",
//     roleId: 1,
//     livesHere: true,
//     primaryContact: true,
//     isManagementCommittee: true,
//     managementDesignation: "Super Admin",
//     status: "active",
//     addressId: 1,
//   };

//   try {
//     // Create the Super Admin user in the database
//     const result = await User.create(superAdminDetails);

//     // Send a success response with the created Super Admin user data
//     res.status(201).json({
//       message: "Super Admin created successfully!",
//       data: result,
//     });
//   } catch (err) {
//     // Log the error and send a failure response
//     console.error("Error creating Super Admin:", err.message);
//     res.status(500).json({
//       error: "Failed to create Super Admin",
//       details: err.message,
//     });
//   }
// };

// exports.createAdmin = async (req, res) => {
//   console.log("admin called!");

//   const superAdminDetails = {  
//   salutation: "Mr",
//    firstName: "Himansu",
//    lastName: "Paltasingh",
//    password: "himansu",
//    countryCode: 91,
//    mobileNumber: 6370868678,
//    alternateNumber: 7008710715,
//    email: "himansu@gmail.com",
//    roleId: 5,
//    livesHere: true,
//    primaryContact: true,
//    isManagementCommittee: true,
//    managementDesignation: "Resident",
//    status: "active",
//    addressId: 1,
//    societyId:1
//  }

//   try {
//     // Create the Super Admin user in the database
//     const result = await User.create(superAdminDetails);

//     // Send a success response with the created Super Admin user data
//     res.status(201).json({
//       message: "Admin created successfully!",
//       data: result,
//     });
//   } catch (err) {
//     // Log the error and send a failure response
//     console.error("Error creating Super Admin:", err.message);
//     res.status(500).json({
//       error: "Failed to create Super Admin",
//       details: err.message,
//     });
//   }
//

const rolesJSON = require("../service/json/roles.json");
const plansJSON = require("../service/json/subscriptionPlans.json");
const { Role, User, Customer, SubscriptionPlan, Address } = require("./models");
const RefUserGroup = require("./models/UserGroup");

const resultStack = [];
const errorStack = [];

const createAddress = () => {
  const address = {
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560102",
    street: "Srivari street",
    address1: "123 Greenwood Lane",
  };

  const data = Address.create(address);
};

const createUserCategory = async () => {
  console.log("CreateUserCategory called !");
  try {
    const result = [];
    const createRefUserCategory = async (userGroupName) => {
      const data = await RefUserGroup.create({
        userGroupName,
      });
      result.push(data);
    };
    ["resident", "tenant", "primaryContact", "all"].forEach((data) =>
      createRefUserCategory(data)
    );
    resultStack.push({
      data: result,
      message: "ref users created successfully!",
    });
  } catch (err) {
    errorStack.push(err.message);
  }
};

const createUserRoles = async () => {
  console.log("createUserRoles called !");
  try {
    const result = [];
    const createRole = async (obj) => {
      console.log(obj);
      const data = await Role.create(obj);
      result.push(data);
    };
    rolesJSON.forEach((data) => createRole(data));

    resultStack.push({
      data: result,
      message: "Roles created successfully!",
    });
  } catch (err) {
    errorStack.push(err.message);
  }
};

const createSuperAdmin = async () => {
  console.log("createSuperAdmin called !");
  const superAdminDetails = {
    salutation: "Mr",
    firstName: "Super",
    lastName: "Admin",
    password: "super.admin",
    countyCode: 91,
    mobileNumber: 9887865722,
    alternateNumber: 9876543210,
    email: "super.admin@gmail.com",
    roleId: 1,
    livesHere: true,
    primaryContact: true,
    isManagementCommittee: true,
    managementDesignation: "Super Admin",
    status: "active",
    addressId:1,
  };

  try {
    const result = await User.create(superAdminDetails);
    resultStack.push({
      message: "Super admin credential created successfully!",
      data: result,
    });
  } catch (err) {
    errorStack.push(err.message);
  }
};

const createSubScriptionPlans = async () => {
  console.log("createSubscriptionPlans called !");

  try {
    const result = [];
    const createSubScription = async (obj) => {
      const data = await SubscriptionPlan.create(obj);
      result.push(data);
    };
    plansJSON.forEach((data) => createSubScription(data));
    resultStack.push({ data: result, message: "Roles created successfully!" });
  } catch (err) {
    errorStack.push(err.message);
  }
};

const createDemoCustomer = async () => {
  console.log("createDemoCustomer called!");
  try {
    const customer1 = {
      customerType: "society",
      customerName: "Greenwood Society",
      societyType: "residential",
      societyName: "Greenwood Heights",
      establishedYear: "2005",
      phone: "9876543214",
      email: "contact2@greenwood.com",
      subscriptionId: 1,
      addressId:1,
    };

    const result = await Customer.create(customer1);
    resultStack.push({ message: "Customer created", data: result });
  } catch (err) {
    errorStack.push(err.message);
    throw new Error(err.message);
  }
};

// const createDemoUsers = async () => {
//   console.log("createDemoUsers called !");

//   const demoUsers = [
//     {
//       salutation: "Mr",
//       firstName: "Super",
//       lastName: "Admin",
//       password: "super.admin",
//       countyCode: 91,
//       mobileNumber: 9887865722,
//       alternateNumber: 9876543210,
//       email: "super.admin@gmail.com",
//       roleId: 1,
//       livesHere: true,
//       primaryContact: true,
//       isManagementCommittee: true,
//       managementDesignation: "Super Admin",
//       status: "active",
//       addressId: 1,
//     },
//     {
//       salutation: "Mr",
//       firstName: "Admin",
//       lastName: "User",
//       password: "admin.user",
//       countyCode: 91,
//       mobileNumber: 9876543210,
//       alternateNumber: 9887865722,
//       email: "admin@gmail.com",
//       roleId: 3,
//       livesHere: true,
//       primaryContact: true,
//       isManagementCommittee: true,
//       managementDesignation: "Admin",
//       status: "active",
//       addressId: 1,
//     },
//   ];

//   try {
//     const result = [];
//     for (const user of demoUsers) {
//       const data = await User.create(user);
//       result.push(data);
//     }

//     resultStack.push({
//       message: "Demo users created successfully!",
//       data: result,
//     });
//   } catch (err) {
//     errorStack.push(err.message);
//     new Error(err);
//   }
// };

exports.initController = async (req, res) => {
  console.log("InitController called !");
  try {
    await createAddress();
    await createUserCategory();
    await createSubScriptionPlans();
    await createUserRoles();
    await createSuperAdmin();
    await createDemoCustomer();
    // await createDemoUsers(); // Call the demo user creation function

    res
      .status(201)
      .json({ message: "Database initiated successfully", data: resultStack });
  } catch (err) {
    res.status(500).json({ error: errorStack });
  }
};


exports.createSuperAdmin = async (req, res) => {
  console.log("createSuperAdmin called!");

  const superAdminDetails = {
    salutation: "Mr",
    firstName: "Super",
    lastName: "Admin",
    password: "super.admin", 
    countryCode: 91,
    mobileNumber: 9887865722,
    alternateNumber: 9876543210,
    email: "super.admin@gmail.com",
    roleId: 1,
    societyId:1,
    livesHere: true,
    primaryContact: true,
    isManagementCommittee: true,
    managementDesignation: "Super Admin",
    status: "active",
    addressId: 1,
  };

  try {
    // Create the Super Admin user in the database
    const result = await User.create(superAdminDetails);

    // Send a success response with the created Super Admin user data
    res.status(201).json({
      message: "Super Admin created successfully!",
      data: result,
    });
  } catch (err) {
    // Log the error and send a failure response
    console.error("Error creating Super Admin:", err.message);
    res.status(500).json({
      error: "Failed to create Super Admin",
      details: err.message,
    });
  }
};

exports.createAdmin = async (req, res) => {
  console.log("admin called!");

  const superAdminDetails = {
    salutation: "Mr",
    firstName: "Himansu",
    lastName: "name",
    password: "himansu", // You should hash the password in a real scenario
    countryCode: 91,
    mobileNumber: 9887865722,
    alternateNumber: 9876543210,
    email: "himansu@gmail.com",
    roleId: 6,
    livesHere: true,
    primaryContact: true,
    isManagementCommittee: true,
    managementDesignation: "Super Admin",
    status: "active",
    addressId: 1,
    societyId:4,
  };

  try {
    // Create the Super Admin user in the database
    const result = await User.create(superAdminDetails);

    // Send a success response with the created Super Admin user data
    res.status(201).json({
      message: "Admin created successfully!",
      data: result,
    });
  } catch (err) {
    // Log the error and send a failure response
    console.error("Error creating Super Admin:", err.message);
    res.status(500).json({
      error: "Failed to create Super Admin",
      details: err.message,
    });
  }
};
