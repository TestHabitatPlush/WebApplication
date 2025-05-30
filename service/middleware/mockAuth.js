// middlewares/mockAuth.js
const mockAuth = (req, res, next) => {
  // Read role and society ID from headers for testing
  const roleId = parseInt(req.headers['x-user-role']);
  const societyId = parseInt(req.headers['x-society-id']);

  if (!roleId || !societyId) {
    return res.status(400).json({ message: "Missing x-user-role or x-society-id header" });
  }

  req.user = { roleId, societyId };
  next();
};

module.exports = mockAuth;
