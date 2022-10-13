const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const { db } = require('./mysql.config');
const { dbactivity } = require('./activity');
const { dbtodo } = require('./todo.js');


const init = async () => {
    const server = Hapi.server({
        port: 3030,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);

    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        dbactivity.sync({ force: true });
        dbtodo.sync({ force: true });
    } catch (ex) {
        console.error('Unable to connect to the database:', i);
    }
}

init();
