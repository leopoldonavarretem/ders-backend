//Imports
const aws = require('aws-sdk');

aws.config.update({
    region: 'us-east-1'
});

module.exports = aws;