const http = require('http');
const https = require('https');
const app = require('./backend/app');
const debug = require('debug')("node-angular");
var fs = require('fs');

/* DEVELOPMENT */

const server = http.createServer(app.listen(3000));
console.log("Started server listening to localhost:3000");

/* PRODUCTION */

// var options = {
//  key: fs.readFileSync('/home/bitnami/ffr/src/server.key'), 
//  //key: fs.readFileSync('/opt/bitnami/apache2/conf/server.key'),
//  cert: fs.readFileSync('/home/bitnami/ffr/src/server.cert') 
//  //cert: fs.readFileSync('/opt/bitnami/apache2/conf/server.crt')
// };

// const server = http.createServer(app).listen(3000);
// console.log("Started server listening to www.ffrecruiter.com:3000");
// const sserver = https.createServer(options, app).listen(3001);
// console.log("Started server listening to www.ffrecruiter.com:3001");
