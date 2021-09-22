const Pug = require('pug');
const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');

const server = Hapi.Server({ 
    port: 3000 ,
    host: "localhost"
});

const rootHandler = (request, h) => {
  return h.view('index', {
    title: request.server.version,
    message: 'Hello!'
  });
};

const init = async () => {
  await server.register(Vision);  
  server.views({
    engines: { pug: Pug },
    relativeTo: __dirname,
    path: 'views'
  });  
  server.route({ method: 'GET', path: '/', handler: rootHandler });  
  await server.start();
  console.log('Server running at:', server.info.uri);
};
init();