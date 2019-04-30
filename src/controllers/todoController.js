const TodoObject = require("../models/TodoObject");

async function get(request, response) {
    const id = request.params.id;

    const todo = await TodoObject.findOne({_id: id}).lean();
    if (!todo) {
        return response.send({
            success: false,
            message: "TodoObject not found."
        });
    }

    response.send({
        data: todo,
        success: true,
    });

}

async function list(request, response) {
    const {page, limit} = request.query;
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 10;
    const skip = (p - 1) * l;

    const todoList = await TodoObject.find({})
        .skip(skip)
        .limit(l)
        .sort({
            created: -1
        })
        .lean();

    response.send(todoList);
}

async function create(request, response) {
    const {title} = request.body;

    if (!title) {
        return response.send({
            success: false,
            message: "Title must be not empty."
        });
    }

    try {
        const todo = new TodoObject({
            title: "Hello"
        });

        const doc = await todo.save();

        return response.send({
            data: doc.toJSON(),
            success: true
        });
    } catch (err) {
        response.send({
            success: false,
            message: err.message,
        });
    }
}

async function update(request, response) {
    const title = request.body.title;

    if (!title) {
        return response.send({
            success: false,
            message: "Title must be not empty."
        })
    }

    const id = request.params.id;
    const todo = await TodoObject.findOne({_id: id}).lean();
    if (!todo) {
        return response.send({
            success: false,
            message: "TodoObject not found."
        });
    }

    try {
        await TodoObject.updateOne(
            {_id: id},
            {
                $set: {
                    title
                }
            }
        );

        response.send({
            success: true,
            data: true,
        });
    } catch (e) {
        response.send({
            success: false,
            message: e.message,
        });
    }
}

async function del(request, response) {
    const id = request.params.id;

    const todo = await TodoObject.findOne({_id: id}).lean();
    if (!todo) {
        return response.send({
            success: false,
            message: "Todo not found."
        });
    }

    await TodoObject.deleteOne({_id: id});

    response.send({
        success: true,
        data: true,
    });
}

module.exports.get = get;
module.exports.list = list;
module.exports.create = create;
module.exports.update = update;
module.exports.del = del;


