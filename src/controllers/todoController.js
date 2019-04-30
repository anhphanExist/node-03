const TodoObject = require("../models/TodoObject");

async function get(request, response) {
    try {
        const id = request.params.id;
        const todo = await TodoObject.findById(id).lean();
        response.send({
            data: todo,
            success: true,
        });
    } catch (err) {
        response.send({
            success: false,
            message: `Get Object Failed! Details: ${err.message}`
        });
    }
}

async function list(request, response) {
    try {
        const todoList = await TodoObject.find().lean();
        response.send(todoList);
    } catch (err) {
        response.send(`Load List Failed! Details: ${err.message}`);
    }
}

async function create(request, response) {
    const title = request.body.title;
    if (!title) {
        return response.send({
            success: false,
            message: "Title can't be empty."
        });
    }
    try {
        const todo = new TodoObject({
            title: title
        });
        const doc = await todo.save();
        return response.send({
            success: true,
            data: doc.toJSON(),
        });
    } catch (err) {
        response.send({
            success: false,
            message: `Create Failed! Details: ${err.message}`
        });
    }
}

async function update(request, response) {
    const title = request.body.title;
    if (!title) {
        return response.send({
            success: false,
            message: "Title can't be empty."
        });
    }
    try {
        const id = request.params.id;
        const todo = await TodoObject.findByIdAndUpdate(
            {id},
            {$set: {title}},
            {new: true},
        );
        response.send({
            success: true,
            data: todo
        });
    } catch (err) {
        response.send({
            success: false,
            message: `Update Failed! Details: ${err.message}`
        });
    }

}

async function del(request, response) {
    const id = request.params.id;
    try {
        await TodoObject.findByIdAndDelete(id);
        response.send({
            success: true,
            data: true
        });
    } catch (err) {
        response.send({
            success: false,
            message: `Delete Failed! Details: ${err.message}`
        });
    }
}

module.exports.get = get;
module.exports.list = list;
module.exports.create = create;
module.exports.update = update;
module.exports.del = del;


