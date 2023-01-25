//Imports
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-1'
});

module.exports = AWS;