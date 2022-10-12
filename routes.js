const { getAll, getOne, createUser, updateUser, deleteUser } = require("./activity");
const { getAllTodo, getOneTodo, createTodo, deleteTodo } = require("./todo");


const routes = [
    {
        method: 'GET',
        path: '/',
        handler: () => {
            return `Hello world!`
        },
    },
    {
        method: 'GET',
        path: '/activity-groups',
        handler: getAll,
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
    {
        method: 'DELETE',
        path: '/activity-groups/{id}',
        handler: deleteUser,
    },
    {
        method: 'GET',
        path: '/todo-items',
        handler: getAllTodo,
    },
    {
        method: 'GET',
        path: '/todo-items/{id}',
        handler: getOneTodo,
    },
    {
        method: 'POST',
        path: '/todo-items',
        handler: createTodo,
    },
    {
        method: 'DELETE',
        path: '/todo-items/{id}',
        handler: deleteTodo,
    },
];

module.exports = routes;