const { DataTypes } = require('sequelize');
const { db } = require('./mysql.config');

const Todo = db.define('todo', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    activity_group_id: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    is_active: {
        type: DataTypes.STRING
    },
    priority: {
        type: DataTypes.STRING
    },
    created_at: {
        type: "TIMESTAMP",
        defaultValue: db.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    updated_at: {
        type: "TIMESTAMP",
        defaultValue: db.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    deleted_at: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
},
    {
        freezeTableName: true,
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    });

module.exports.getAllTodo = async(request, h) => {
    const result = await Todo.findAll();
    return h.response({
        status: 'Success',
        message: 'Success',
        data: result,
    });
};

module.exports.getOneTodo = async (request, h) => {
    const { id } = request.params;

    const result = await Todo.findByPk(id);
    if (result === null) {
        return h.response({
            status: 'Not Found',
            message: `Todo with ID ${id} Not Found`,
            data: {}
        }).code(404);
    } else {
        return h.response({
            status: 'Success',
            message: 'Success',
            data: result
        });
    }
};

module.exports.createTodo = async (request, h) => {
    const { activity_group_id = null, title = null } = request.payload;
    if (title === null) {
        return h.response({
            status: 'Bad Request',
            message: 'title cannot be null',
            data: {},
        }).code(400);
    };
    if (activity_group_id === null) {
        return h.response({
            status: 'Bad Request',
            message: 'activity_group_id cannot be null',
            data: {},
        }).code(400);
    };
    
    const addtodo = await Todo.create({ activity_group_id: activity_group_id, title: title }).then(async(res)=>{
        return await Todo.findByPk(res.id);
    });
    
    const response = h.response({
        status: 'Success',
        message: 'Success',
        data: {
            created_at: addtodo.created_at,
            updated_at: addtodo.updated_at,
            id: addtodo.id,
            activity_group_id: addtodo.activity_group_id,
            title: addtodo.title,
        },
    });
    response.code(201);
    return response;
};

module.exports.deleteTodo = async (request, h) => {
    const { id } = request.params;
    const del = await Todo.findByPk(id);

    if (del !== null) {
        const d = await Todo.destroy({ where: { id } });
        console.log("hapus: ", d);
        return h.response({
            status: 'Success',
            message: 'Success',
            data: {}
        });
    } else {
        return h.response({
            status: 'Not Found',
            message: `Todo with ID ${id} Not Found`,
            data: {}
        }).code(404);
    }
};

module.exports.updateTodo = async (request, h) => {
    const { id } = request.params;
    const { title = null } = request.payload;

    const result = await Todo.findByPk(id);
    if (result === null) {
        return h.response({
            status: "Not Found",
            message: `Todo with ID ${id} Not Found`,
            data: {}
        }).code(404);
    }

    if (title === null) {
        return h.response({
            status: "Bad Request",
            message: "title cannot be null",
            data: {}
        }).code(400);
    }

    const updatedtodo = await Todo.update({ title }, { where: { id } });
    if(updatedtodo[0] > 0){
        const dt = await Todo.findByPk(id);
        return h.response({
            status: 'Success',
            message: 'Success',
            data: dt
        }).code(200);
    } else {
        return h.response().code(500);
    }
};