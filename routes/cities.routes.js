const router = require("express").Router();
const CitiesController = require("../controllers/cities.controller");

router.get("/all", CitiesController.getAll);

// Get one city (Post datas to get);
router.post("/", CitiesController.getOne);

module.exports = router;
