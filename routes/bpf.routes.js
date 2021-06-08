const router = require("express").Router();

// new
router.post("/create");

// get one
router.post("/get/one");

// get all by user
router.post("/get/all/by_user");

// delete
router.delete("/delete");
router.delete("/delete/all");

module.exports = router;
