const express = require("express");
const router = express.Router();
const marco = "http://localhost:300/marco"
const staticController = require("../controllers/staticController");

router.get("/", staticController.index);

router.get("/marco", (req, res, next)=>{
	res.send("POLO!");
});

//about handler

router.get('/about', staticController.about);

module.exports = router;