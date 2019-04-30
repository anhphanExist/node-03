const Schema = require("mongoose").Schema;
const connection = require("../dataAccess/connection");

const todoSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const TodoObject = connection.model("todo", todoSchema);

module.exports = TodoObject;