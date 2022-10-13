const { DataTypes } = require('sequelize');
const { db } = require('./mysql.config');

const Activity = db.define('activities', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING
    },
    title: {
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


module.exports.getAll = async (request, h) => {
    const datauser = await Activity.findAll();
    return h.response({
        status: 'Success',
        message: 'Success',
        data: datauser,
    });
};

module.exports.getOne = async (request, h) => {
    const { id } = request.params;

    const datauser = await Activity.findByPk(id);
    if (datauser === null) {
        return h.response({
            status: 'Not Found',
            message: `Activity with ID ${id} Not Found`,
            data: {}
        }).code(404);
    } else {
        return h.response({
            status: 'Success',
            message: 'Success',
            data: {
                id: datauser.id,
                title: datauser.title,
                email: datauser.email
            }
        });
    }
};

module.exports.createUser = async (request, h) => {
    const { title = null, email = null } = request.payload;
    if (title === null) {
        return h.response({
            status: 'Bad Request',
            message: 'title cannot be null',
            data: {},
        }).code(400);
    };

    const addUser = await Activity.create({ email, title }).then(async (res) => {
        return await Activity.findByPk(res.id);
    });

    const response = h.response({
        status: 'Success',
        message: 'Success',
        data: {
            created_at: addUser.created_at,
            updated_at: addUser.updated_at,
            id: addUser.id,
            title: addUser.title,
            email: addUser.email,
        },
    });
    response.code(201);
    return response;

};

module.exports.updateUser = async (request, h) => {
    const { id } = request.params;
    const { title = null } = request.payload;

    const datauser = await Activity.findByPk(id);
    if (datauser === null) {
        return h.response({
            status: "Not Found",
            message: `Activity with ID ${id} Not Found`,
            data: {}
        }).code(404);
    }

    await Activity.update({ title }, { where: { id } });
    const dt = await Activity.findByPk(id);
    return h.response({
        status: 'Success',
        message: 'Success',
        data: dt
    }).code(200);
};

module.exports.deleteUser = async (request, h) => {
    const { id } = request.params;
    const userdel = await Activity.findByPk(id);

    if (userdel !== null) {
        const d = await Activity.destroy({ where: { id } });
        return h.response({
            status: 'Success',
            message: 'Success',
            data: {}
        });
    } else {
        return h.response({
            status: 'Not Found',
            message: `Activity with ID ${id} Not Found`,
            data: {}
        }).code(404);
    }
};