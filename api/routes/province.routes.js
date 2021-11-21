const router = require('express').Router();
const provinceController = require('../controllers/province.controller')

// get all by user
router.get("/get/all", provinceController.getAll);

module.exports = router;