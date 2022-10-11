const { getAllUser, getOne, createUser, updateUser } = require("./users");


const routes = [
    {
        method: 'GET',
        path: '/activity-groups',
        handler: getAllUser,
    },
    {
        method: 'GET',
        path: '/activity-groups/{id}',
        handler: getOne,
    },
    {
        method: 'POST',
        path: '/activity-groups',
        handler: createUser,
    },
    {
        method: 'PATCH',
        path: '/activity-groups/{id}',
        handler: updateUser,
    },
];

module.exports = routes;