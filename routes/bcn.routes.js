const router = require('express').Router();
const bcnController = require('../controllers/bcn.controller')

// get all by user
router.get("/get/all_by_user", bcnController.getAllByUser);

// delete
router.delete("/delete", bcnController.deleteOne);

module.exports = router;