const router = require("express").Router();

const users = require("../controllers/user.controller.js");
const authController = require("../controllers/auth.controller.js");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();

router.post("/create", users.create);

router.get("/all", users.getAll);

router.delete("/delete/:id", users.delete);

// verify email
router.get('/verify_email', users.verifyEmail);
// new password
router.get('/reset_password', users.resetPassword)

// auth
router.post("/login", authController.logIn);
router.post("/logout", authController.logOut);

router.put("/update/:id", users.update);

// photo
router.post(
    "/upload",
    upload.single("file"),
    uploadController.uploadProfil
);

router.get("/:id", users.getOne);

module.exports = router;
