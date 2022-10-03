const getAllUser = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/activity-groups',
        handler: () => { return 'Hello world'; },
    },
    {
        method: 'GET',
        path: '/',
        handler: () => { return 'Hello Halaman Utama'; },
    },
];

module.exports = routes;