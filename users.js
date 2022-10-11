const { DataTypes } = require('sequelize');
const { db } = require('./mysql.config');

const User = db.define('users', {
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


module.exports.getAllUser = async (request, h) => {
    const datauser = await User.findAll();
    return h.response({
        status: 'Success',
        message: 'Success',
        data: datauser,
    });
};

module.exports.getOne = async (request, h) => {
    const { id } = request.params;

    const datauser = await User.findByPk(id);
    if (datauser === null) {
        return h.response({
            status: 'Not Found',
            message: 'Activity with ID 8328923 Not Found',
            data: {}
        }).code(404);
    } else {
        return h.response({
            status: 'Success',
            message: 'Success',
            data: datauser
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
    if (email === null) {
        return h.response({
            status: 'Bad Request',
            message: 'email cannot be null',
            data: {},
        }).code(400);
    };
    console.log(email, title);
    const addUser = await User.create({ email: email, title: title });
    console.log('Hasil create: ', addUser);

    const response = h.response({
        status: 'Success',
        message: 'Success',
        data: addUser,
    });
    response.code(201);
    return response;

};

module.exports.updateUser = async (request, h) => {
    const { id } = request.params;
    const { email = null, title = null } = request.payload;

    const datauser = await User.findByPk(id);
    if (datauser === null) {
        return h.response({
            status: "Not Found",
            message: "Activity with ID ${id} Not Found",
            data: {}
        }).code(404);
    }

    if (email === null) {
        return h.response({
            status: "Bad Request",
            message: "email cannot be null",
            data: {}
        }).code(400);
    }
    if (title === null) {
        return h.response({
            status: "Bad Request",
            message: "title cannot be null",
            data: {}
        }).code(400);
    }

    const updateduser = await User.update({ email, title }, { where: { id } });
    return h.response({
        status: 'OK',
        data: updateduser
    });
};