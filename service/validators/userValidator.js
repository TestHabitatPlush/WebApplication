// validators/userValidator.js
const { body } = require('express-validator');

exports.userValidationRules = [
  body('salutation')
    .isIn(['Mr', 'Mrs', 'Miss', 'Dr', 'Prof'])
    .withMessage('Invalid salutation value'),
  
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string'),

  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string'),

  body('countyCode')
    .isInt({ min: 1 })
    .withMessage('County code must be a positive integer'),

  body('mobileNumber')
    .isInt({ min: 1 })
    .withMessage('Mobile number must be a positive integer'),

  body('alternateNumber')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Alternate number must be a positive integer if provided'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address'),

  body('addressId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Address ID must be a positive integer'),

  body('societyId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Society ID must be a positive integer'),

  body('unitId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Unit ID must be a positive integer'),

  body('roleId')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('Role ID is required and must be a positive integer'),

  body('livesHere')
    .isBoolean()
    .withMessage('livesHere must be a boolean value'),

  body('primaryContact')
    .isBoolean()
    .withMessage('primaryContact must be a boolean value'),

  body('isManagementCommittee')
    .isBoolean()
    .withMessage('isManagementCommittee must be a boolean value'),

  body('managementDesignation')
    .optional()
    .isString()
    .withMessage('Management designation must be a string if provided'),

  body('remarks')
    .optional()
    .isString()
    .withMessage('Remarks must be a string if provided'),

  body('status')
    .isIn(['active', 'inactive'])
    .withMessage('Status must be either active or inactive'),

  body('isDeleted')
    .optional()
    .isBoolean()
    .withMessage('isDeleted must be a boolean value')
];