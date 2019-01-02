const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topicController");

router.get("/topcs", topicController.index)

module.exports = router;