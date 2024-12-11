const express = require('express');
const router = express.Router();
const makeupController = require('../controllers/makeupController');

//CRUD

// Homepage
// Read
router.get('/makeups', makeupController.listMakeup);

// New Makeup Form
router.get('/makeups/new', makeupController.newMakeup);

// Add New Makeup - Create
router.post('/makeups', makeupController.addMakeup);

// View Specific Makeup - Read
router.get('/makeups/:id', makeupController.viewMakeup);

// Edit Makeup Form - Update
router.get('/makeups/:id/edit', makeupController.editMakeup);

// Update Makeup
router.patch('/makeups/:id/edit', makeupController.updateMakeup);

// Delete Form
router.get('/makeups/:id/delete', makeupController.delMakeupConfirmation);

// Delete
router.delete('/makeups/:id', makeupController.delMakeup);

module.exports = router;
