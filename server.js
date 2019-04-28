const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

function start() {
    app.use(require("./router"));
    
    app.listen(port, host, () => {
        console.log(`Listening on port ${port} on host ${host}`);
    });
}

exports.start = start;