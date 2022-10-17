const Hapi = require('@hapi/hapi');
const { migratedb } = require('./migrate');
const routes = require('./routes');


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
}

init();
