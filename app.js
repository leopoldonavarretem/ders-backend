//Imports
const express = require("express");

//Creates an express Server.
const app = express();

//Import server configurations
require('./config/server.config')(app);

//Router
const allRoutes = require('./routes/index.routes');
app.use('/', allRoutes);

module.exports = app;