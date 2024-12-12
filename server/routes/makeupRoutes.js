const express = require('express');
const router = express.Router();
const makeupController = require('../controllers/makeupController');

// CRUD Routes for Makeup Items

// Get all makeup items
router.get('/makeups', makeupController.listMakeup);

// Display form to add new makeup
router.get('/makeups/new', makeupController.newMakeup);

// Add new makeup item
router.post('/makeups', makeupController.addMakeup);

// View specific makeup item by ID
router.get('/makeups/:id', makeupController.viewMakeup);

// Display form to edit makeup item
router.get('/makeups/:id/edit', makeupController.editMakeup);

// Update makeup item
router.patch('/makeups/:id/edit', makeupController.updateMakeup);

// Delete makeup item by ID
router.delete('/makeups/:id', makeupController.deleteMakeup);

// Export router
module.exports = router;
