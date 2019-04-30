const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";


const app = express();

function start() {
    // for parsing application/json
    app.use(bodyParser.json());
    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(require("./router"));
    
    app.listen(port, host, () => {
        console.log(`Listening on port ${port} on host ${host}`);
    });
}

module.exports.start = start;