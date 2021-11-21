const router = require("express").Router();

const multer = require("multer");
const upload = multer();

const bpfController = require("../controllers/bpf.controller");

// new
router.post("/create/by_photo", upload.single("file"), bpfController.createByPhoto);
router.post("/create", bpfController.create);

// get one
router.post("/get/one", bpfController.getOne);

// get all by user
router.get("/get/all_by_user", bpfController.getAllByUser);

// delete
router.delete("/delete/all", bpfController.deleteAllByUser);
router.delete("/delete", bpfController.deleteOne);

//csv
router.post('/csv', upload.single("file"), bpfController.createByCsv)

module.exports = router;
