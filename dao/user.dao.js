//Imports
const AWS = require('aws-sdk');

//AWS config
require('../config/dynamo.config');

//Instantiate docClient.
const docClient = new AWS.DynamoDB.DocumentClient();

//Function to retrieve a User.
function retrieveUser(username) {
    return docClient.scan({
        TableName: 'ders-users',
        FilterExpression: '#a = :value',
        ExpressionAttributeNames: {
            '#a': "username"
        },
        ExpressionAttributeValues: {
            ':value': username
        }
    }).promise();

}

//Function register a user.
function registerUser(userID, username, password, name) {
    return docClient.put({
        TableName: "ders-users",
        Item: {
            "userID": userID,
            "username": username,
            "password": password,
            "employeeName": name,
            "role": "employee"
        }
    }).promise();
}

//Function to edit a users' information.
function editUserInformation(userID, newUsername, newPassword, newName, newAddress) {
    return docClient.update({
        TableName: 'ders-users',
        Key: {
            userID
        },
        UpdateExpression: 'set #a = :value1, #b = :value2, #c = :value3, #d = :value4',
        ExpressionAttributeNames: {
            "#a": "password",
            "#b": "employeeName",
            "#c": "address",
            "#d": "username"
        },
        ExpressionAttributeValues: {
            ":value1": newPassword,
            ":value2": newName,
            ":value3": newAddress,
            ":value4": newUsername
        },

        ReturnValues: "UPDATED_NEW"
    }).promise();
}

//Function to retrieve all users.
function retrieveAllUsers() {
    return docClient.scan({
        TableName: 'ders-users'
    }).promise();
}

//Function to change an employee role.
function changeEmployeeRole(userID, role) {
    return docClient.update({
        TableName: 'ders-users',
        Key: {
            "userID": userID
        },
        UpdateExpression: 'set #a = :value1',
        ExpressionAttributeNames: {
            "#a": "role",
        },
        ExpressionAttributeValues: {
            ":value1": role,
        }
    }).promise();
}

//Function to retrieve a user by ID.
function retrieveUserByID(userID) {
    return docClient.get({
        TableName: 'ders-users',
        Key: {
            'userID': userID
        }
    }).promise();
}

module.exports = {
    retrieveUser,
    registerUser,
    editUserInformation,
    retrieveAllUsers,
    changeEmployeeRole,
    retrieveUserByID
};