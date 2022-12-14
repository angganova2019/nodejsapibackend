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
    const result = await Activity.findAll();
    return h.response({
        status: 'Success',
        message: 'Success',
        data: result,
    }).code(200);
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
    const result = await Activity.create({ email, title });
    return h.response({
        status: 'Success',
        message: 'Success',
        data: {
            created_at: result.created_at,
            updated_at: result.updated_at,
            id: result.id,
            title: result.title,
            email: result.email,
        },
    }).code(201);

};

module.exports.updateUser = async (request, h) => {
    const { id } = request.params;
    const { title = null } = request.payload;

    const data = await Activity.findByPk(id);
    if (data === null) {
        return h.response({
            status: "Not Found",
            message: `Activity with ID ${id} Not Found`,
            data: {}
        }).code(404);
    }
    await data.update({ title });
    return h.response({
        status: 'Success',
        message: 'Success',
        data: {
            id: data.id,
            title: data.title,
            email: data.email
        },
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