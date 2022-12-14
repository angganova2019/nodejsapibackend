const { DataTypes, QueryTypes } = require('sequelize');
const { db } = require('./mysql.config');

const Todo = db.define('todos', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    activity_group_id: {
        type: DataTypes.INTEGER
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

module.exports = { dbtodo: db };

module.exports.getAllTodo = async (request, h) => {
    const { activity_group_id = null } = request.query;

    if (activity_group_id === null) {
        const result = await Todo.findAll();
        return h.response({
            status: 'Success',
            message: 'Success',
            data: result,
        });
    } else {
        const result = await Todo.findAll({ where: { activity_group_id } });
        return h.response({
            status: 'Success',
            message: 'Success',
            data: result,
        });
    }

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
            data: {
                title: result.title,
                priority: result.priority
            }
        }).code(200);
    }
};

module.exports.createTodo = async (request, h) => {
    const { activity_group_id = null, title = null, is_active = 1, priority = 'very-high' } = request.payload;
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

    const result = await Todo.create({ activity_group_id, title, is_active, priority });
    return h.response({
        status: 'Success',
        message: 'Success',
        data: {
            created_at: result.created_at,
            updated_at: result.updated_at,
            id: result.id,
            activity_group_id: result.activity_group_id,
            title: result.title,
            is_active: !!result.is_active,
            priority: result.priority
        },
    }).code(201);
};

module.exports.deleteTodo = async (request, h) => {
    const { id } = request.params;
    const result = await Todo.findByPk(id);

    if (result !== null) {
        await result.destroy();
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
    const { title = null, priority = 'very-high' } = request.payload;

    const result = await Todo.findByPk(id);

    if (result === null) {
        return h.response({
            status: 'Not Found',
            message: `Todo with ID ${id} Not Found`,
            data: {}
        }).code(404);
    }

    if (title === null) {
        await result.update({ priority });
        return h.response({
            status: 'Success',
            data: {
                title: result.title,
                is_active: result.is_active,
                priority: result.priority
            }
        }).code(200);
    } else {
        await result.update({ title, priority });
        return h.response({
            status: 'Success',
            data: {
                title: result.title,
                is_active: result.is_active,
                priority: result.priority
            }
        }).code(200);
    }
};