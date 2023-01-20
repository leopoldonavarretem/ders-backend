//Imports
const express = require("express");

//Creates an express Server.
const app = express();

//Import server configurations
require('./config/server.config')(app);

module.exports = app;