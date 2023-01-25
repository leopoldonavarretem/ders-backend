//Imports
const AWS = require('aws-sdk');

//AWS config
require('../config/dynamo.config');

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
function registerUser(username, password, name) {
    return docClient.put({
        TableName: "ders-users",
        Item: {
            "username": username,
            "password": password,
            "employeeName": name,
            "role": "employee"
        }
    }).promise();
}

function editUserInformation(username, newPassword, newName, newAddress) {
    return docClient.update({
        TableName: 'ders-users',
        Key: {
            username
        },
        UpdateExpression: 'set #a = :value1, #b = :value2, #c = :value3',
        ExpressionAttributeNames: {
            "#a": 'password',
            "#b": 'employeeName',
            "#c": "address"
        },
        ExpressionAttributeValues: {
            ":value1": newPassword,
            ":value2": newName,
            ":value3": newAddress
        },

        ReturnValues: "UPDATED_NEW"
    }).promise();
}

module.exports = {
    retrieveUser,
    registerUser,
    editUserInformation
};