const express = require("express");
const router = express.Router();


router.get("/", function (request, response) {
    response.status(200).send("Hello, world!");
});

module.exports = router;