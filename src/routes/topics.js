const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topicController");
const validation = require("./validation");

router.get("/topics", topicController.index);
router.get("/topics/new", topicController.new);
router.post("/topics/create", validation.validateTopics, topicController.create);
router.get("/topics/:id/edit", topicController.edit);
router.get("/topics/:id", topicController.show);
router.post("/topics/:id/destroy", topicController.destroy);
router.post("/topics/:id/update", topicController.update);



module.exports = router;