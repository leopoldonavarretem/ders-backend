//Imports
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AMAZONREGION
});

module.exports = AWS;