const express = require("express");
const router = express.Router();
const todoController = require("./controllers/todoController");

router.get("/", function (request, response) {
    response.status(200).send("Hello, world!");
});

router.post("/todos", todoController.create);
router.get("/todos", todoController.list);
router.get("/todos/:id", todoController.get);
router.post("todos/:id", todoController.update);
router.delete("todos/:id", todoController.del);

module.exports = router;