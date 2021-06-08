const router = require("express").Router();
const bpfController = require("../controllers/bpf.controller");

// new
router.post("/create", bpfController.create);

// get one
router.post("/get/one");

// get all by user
router.post("/get/all/by_user");

// delete
router.delete("/delete");
router.delete("/delete/all");

module.exports = router;
