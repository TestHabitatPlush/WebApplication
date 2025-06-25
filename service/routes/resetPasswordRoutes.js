const express = require('express');
const { requestPasswordReset, resetPassword } = require('../controllers/resetPasswordController');

const router = express.Router();

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;

// it's not necessary to include the password reset routes in the main app.js file as it is already done in the passwordRoutes.js file.