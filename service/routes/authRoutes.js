const express = require("express");
const { loginUser, tokenSignIn,jobProfileLogin,loginToken } = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/login", loginUser);

authRouter.post("/token-signin", tokenSignIn);

authRouter.post("/job-profile-login", jobProfileLogin);
authRouter.post("/login-token", loginToken);

module.exports = authRouter;
