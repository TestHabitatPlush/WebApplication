// validators/roleValidator.js
const { body } = require('express-validator');

exports.roleValidationRules = [
  body('roleCategory')
    .notEmpty()
    .withMessage('Role category is required'),
  body('roleName')
    .notEmpty()
    .withMessage('Role name is required'),
  body('occupancyStatus')
    .optional()
    .isString()
    .withMessage('Occupancy status must be a string'),
];
