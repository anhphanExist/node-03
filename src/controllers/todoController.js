const TodoObject = require("../models/TodoObject");

async function get(request, response) {
    try {
        const id = request.params.id;
        const todo = await TodoObject.findById(id).lean();
        response.send({
            success: true,
            data: todo
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
    try {
        const todo = new TodoObject(request.body);
        await todo.save();
        return response.send({
            success: true,
            data: todo
        });
    } catch (err) {
        response.send({
            success: false,
            message: `Create Failed! Details: ${err.message}`
        });
    }
}

async function updateTitleOnly(request, response) {
    const newTitle = request.body.title;
    if (!newTitle) {
        return response.send({
            success: false,
            message: "Title can't be empty."
        });
    }
    try {
        const id = request.params.id;
        const todo = await TodoObject.findByIdAndUpdate(
            id,
            {$set: {
                title: newTitle
            }},
            {new: true}
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

async function updateStatusOnly(request, response) {
    try {
        const id = request.params.id;
        var todo = await TodoObject.findById(id).lean();
        const completed = todo.completed;
        await TodoObject.updateOne(
            todo,
            {$set:{
                completed: !completed
            }}
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
    try {
        const id = request.params.id;
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

async function delAll(request, response) {
    try {
        await TodoObject.deleteMany();
        response.send({
            success: true,
            message: `Delete Success`
        });
        await list(request,response);
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
module.exports.updateTitleOnly = updateTitleOnly;
module.exports.updateStatusOnly = updateStatusOnly;
module.exports.del = del;
module.exports.delAll = delAll;


