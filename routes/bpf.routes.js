const router = require("express").Router();

const multer = require("multer");
const upload = multer();

const bpfController = require("../controllers/bpf.controller");

// new
router.post("/create/by_photo", bpfController.createByPhoto);
router.post("/create", bpfController.create);

// get one
router.post("/get/one");

// get all by user
router.get("/get/all_by_user");

// delete
router.delete("/delete/all");
router.delete("/delete");

module.exports = router;
