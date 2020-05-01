import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { request } from 'http';
const mongoose = require('mongoose');
const moment = require('moment');

const partiesRoutes = require('./src/backend/routes/parties');
const charactersRoutes = require('./src/backend/routes/characters');
const userRoutes = require('./src/backend/routes/user');
const instancesRoutes = require('./src/backend/routes/instances');
const vapidRoutes = require('./src/backend/routes/vapid');
const serversRoutes = require('./src/backend/routes/servers');
const patreonRoutes = require('./src/backend/routes/patreon');

const production = false;

mongoose.set('useUnifiedTopology', true);

if(production){
mongoose.connect("mongodb://admin:lMLb0CdY89@localhost/ffr", { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {console.log('[P] Connected to MongoDB at 44.226.39.163:27017 (localhost:27017)');})
  .catch(() => {console.log('[P] Failed connection to MongoDB at 44.226.39.163:27017 (localhost:27017)');});
}
else{
mongoose.connect('mongodb://admin:lMLb0CdY89@34.216.206.161:27017/ffr', { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {console.log('[D] Connected to MongoDB at 34.216.206.161:27017');})
  .catch(err => {console.log('[D] Failed connection to MongoDB at 34.216.206.161:27017: ' + err);});
}

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ffr/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.use((req, res, next) => {
    console.log("[" + moment().utc().format('hh:mm:ss') + "] Client Connected: " + req.ip + " " + req.method + ": " + req.path);
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS");

    next();
  });

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  

  server.use("/api/parties", partiesRoutes);
  server.use("/api/instances", instancesRoutes);
  server.use("/api/characters", charactersRoutes);
  server.use("/api/user", userRoutes);
  server.use("/api/vapid", vapidRoutes);
  server.use("/api/servers", serversRoutes);
  server.use("/api/patreon", patreonRoutes);

  server.get('/api/*', (req, res) => { 
    console.log(res);
    res.status(404).send('data requests are not supported');
  });

  // Base route uses the Universal engine
  server.get('/', (req, res) => {
    res.render('index', {
      req: req,
      res: res,
      preboot: true
    });
  });

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {maxAge: '1y'}), (req, res) => {
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });

    // console.log("Navigation");
    // console.log("indexHtml");
    // console.log(indexHtml);
    // console.log("req");
    // console.log(req);

    // console.log("originalUrl");
    // console.log(req.originalUrl);
    // console.log("APP_BASE_HREF");
    // console.log(APP_BASE_HREF);
    // console.log("req.baseUrl");
    // console.log(req.baseUrl);
    // console.log("test"); 
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
