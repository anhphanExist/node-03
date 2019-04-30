const express = require("express");
const router = express.Router();
const todoController = require("./controllers/todoController");

router.get("/", function (request, response) {
    response.status(200).send("Hello, world!");
});
router.get("/todos", todoController.list);
router.get("/todos/:id", todoController.get);
router.post("/todos", todoController.create);
router.post("/todos/:id", todoController.updateTitleOnly);
router.post("/todos/:id/toggle", todoController.updateStatusOnly);
router.delete("/todos/:id", todoController.del);
router.delete("/todos", todoController.delAll);

module.exports = router;