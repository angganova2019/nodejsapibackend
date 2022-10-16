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

module.exports = { dbactivity: db };

module.exports.getAll = async (request, h) => {
    const [result, metadata] = await db.query("SELECT * FROM activities");
    return h.response({
        status: 'Success',
        message: 'Success',
        data: result,
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

    const [addUser, fields] = await db.query(`INSERT INTO activities(email, title) values('${email}', '${title}')`);
    console.log(addUser);
    return h.response({
        status: 'Success',
        message: 'Success',
        data: {
            created_at: addUser.created_at,
            updated_at: addUser.updated_at,
            id: addUser.id,
            title: addUser.title,
            email: addUser.email,
        },
    }).code(201);
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

    await datauser.update({ title });
    return h.response({
        status: 'Success',
        message: 'Success',
        data: datauser,
    }).code(200);
};

module.exports.deleteUser = async (request, h) => {
    const { id } = request.params;
    const userdel = await Activity.findByPk(id);

    if (userdel !== null) {
        await userdel.destroy();
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