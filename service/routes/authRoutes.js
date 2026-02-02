const express = require("express");
const { loginUser, tokenSignIn,jobProfileLogin,loginToken, getAdminRedirect } = require("../controllers/authController");
const { checkAuth } = require("../middleware/authMiddleware");
const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.get("/admin-redirect",checkAuth,getAdminRedirect)

authRouter.post("/token-signin", tokenSignIn);

authRouter.post("/job-profile-login", jobProfileLogin);
authRouter.post("/login-token", loginToken);

module.exports = authRouter;
