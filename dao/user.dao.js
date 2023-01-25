//Imports
const AWS = require('aws-sdk');

//AWS Config
require('../config/dynamo.config')

//Instantiate docClient.
const docClient = new AWS.DynamoDB.DocumentClient();

//Function to retrieve a User.
function retrieveUser(username) {
    return docClient.get({
        TableName: 'ders-users',
        Key: {
            "username": username
        }
    }).promise();
}

//Function register a user.
function registerUser(username, password) {
    return docClient.put({
        TableName: "ders-users",
        Item: {
            "username": username,
            "password": password,
            "role": "employee"
        }
    }).promise();
}

module.exports = {
    retrieveUser,
    registerUser
};