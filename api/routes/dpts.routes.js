const router = require('express').Router();
const dptsController = require('../controllers/dpts.controller')

// get all by user
router.get("/all", dptsController.getAll);

module.exports = router;