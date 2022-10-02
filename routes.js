const { getAllUser } = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/activity-groups',
        handler: getAllUser,
    },

];

module.exports = routes;