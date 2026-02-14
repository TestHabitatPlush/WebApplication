const rolesJSON = require("../service/json/roles.json");
const plansJSON = require("../service/json/subscriptionPlans.json");
const { Role, User, Customer, SubscriptionPlan, Address } = require("./models");
const RefUserGroup = require("./models/UserGroup");

const resultStack = [];
const errorStack = [];

const createAddress = async () => {
  const address = {
    city: "Bangalore",
    state: "Karnataka",
    zipCode: "560102",
    street: "Srivari street",
    address1: "123 Greenwood Lane",
  };

  try {
    const data = await Address.create(address);
    resultStack.push({ message: "Address created", data });
  } catch (err) {
    errorStack.push(`Address: ${err.message}`);
  }
};

const createUserCategory = async () => {
  console.log("CreateUserCategory called!");
  try {
    const result = [];
    const categories = ["resident", "tenant", "primaryContact", "all"];

    for (const name of categories) {
      const data = await RefUserGroup.create({ userGroupName: name });
      result.push(data);
    }

    resultStack.push({ message: "User groups created", data: result });
  } catch (err) {
    errorStack.push(`UserCategory: ${err.message}`);
  }
};

const createUserRoles = async () => {
  console.log("createUserRoles called!");
  try {
    const result = [];

    for (const role of rolesJSON) {
      const data = await Role.create(role);
      result.push(data);
    }

    resultStack.push({ message: "Roles created", data: result });
  } catch (err) {
    errorStack.push(`Roles: ${err.message}`);
  }
};

const createSubScriptionPlans = async () => {
  console.log("createSubscriptionPlans called!");
  try {
    const result = [];

    for (const plan of plansJSON) {
      const data = await SubscriptionPlan.create(plan);
      result.push(data);
    }

    resultStack.push({ message: "Subscription plans created", data: result });
  } catch (err) {
    errorStack.push(`SubscriptionPlans: ${err.message}`);
  }
};

const createSuperAdmin = async () => {
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
    livesHere: true,
    primaryContact: true,
    isManagementCommittee: true,
    managementDesignation: "Super Admin",
    status: "active",
    addressId: 1,
  };

  try {
    const result = await User.create(superAdminDetails);
    resultStack.push({ message: "Super admin created", data: result });
  } catch (err) {
    errorStack.push(`SuperAdmin: ${err.message}`);
  }
};

const createDemoCustomer = async () => {
  console.log("createDemoCustomer called!");
  const customer = {
    customerType: "society",
    customerName: "Greenwood Society",
    societyType: "residential",
    societyName: "Greenwood Heights",
    establishedYear: "2005",
    phone: "9876543214",
    email: "contact2@greenwood.com",
    subscriptionId: 1,
    addressId: 1,
  };

  try {
    const result = await Customer.create(customer);
    resultStack.push({ message: "Demo customer created", data: result });
  } catch (err) {
    errorStack.push(`Customer: ${err.message}`);
  }
};

exports.initController = async (req, res) => {
  console.log("InitController called!");
  try {
    await createAddress();
    await createUserCategory();
    await createSubScriptionPlans();
    await createUserRoles();
    await createSuperAdmin();
    await createDemoCustomer();

    res.status(201).json({
      message: "Database initiated successfully",
      data: resultStack,
    });
  } catch (err) {
    res.status(500).json({
      error: "Initialization failed",
      details: errorStack,
    });
  }
};