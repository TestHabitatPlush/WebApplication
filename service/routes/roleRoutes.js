const express = require('express');
const { createRole, getRoles, updateRole, deleteRole } = require('../controllers/roleController');
const { roleValidationRules } = require('../validators/roleValidator');

const roleRouter = express.Router();

roleRouter.post('/', roleValidationRules, createRole);
roleRouter.get('/', getRoles);
roleRouter.put('/:id', roleValidationRules, updateRole);
roleRouter.delete('/:id', deleteRole);

module.exports = roleRouter;
