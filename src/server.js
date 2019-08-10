const http = require('http');
const app = require('./backend/app');
const debug = require('debug')("node-angular");

const port = 3000; // port = process.end.PORT -- once hosting provider is set up

app.set('port', port);
const server = http.createServer(app);

server.listen(port);