//Imports
const AWS = require('aws-sdk');

//AWS config
require('../config/dynamo.config');

//Instantiate docClient.
const docClient = new AWS.DynamoDB.DocumentClient();

function submitTicket(ticketId, amount, description, reimbursementType, title, userID, name) {
    const date = new Date();
    return docClient.put({
        TableName: "ders-tickets",
        Item: {
            "title": title,
            "ticketId": ticketId,
            "amount": amount,
            "description": description,
            "reimbursementType": reimbursementType,
            "status": "pending",
            "employeeName": name,
            "userID": userID,
            "dateSubmitted": date.toUTCString()
        }

    }).promise();
}

function retrieveTicketsByStatus(status) {
    return docClient.query({
        TableName: 'ders-tickets',
        IndexName: 'status-index',
        KeyConditionExpression: '#a = :value1',
        ExpressionAttributeNames: {
            '#a': 'status'
        },
        ExpressionAttributeValues: {
            ':value1': status
        }
    }).promise();
}

function retrieveTicketById(ticketId) {
    return docClient.get({
        TableName: 'ders-tickets',
        Key: {
            'ticketId': ticketId
        }
    }).promise();
}

function retrieveTicketsByEmployee(userID) {
    return docClient.scan({
        TableName: 'ders-tickets',
        FilterExpression: '#a = :value',
        ExpressionAttributeNames: {
            '#a': "userID"
        },
        ExpressionAttributeValues: {
            ':value': userID
        }
    }).promise();
}

function retrieveAllTickets() {
    return docClient.scan({
        TableName: 'ders-tickets',

    }).promise();
}

function changeTicketStatus(ticketId, status) {
    return docClient.update({
        TableName: 'ders-tickets',
        Key: {
            "ticketId": ticketId
        },
        UpdateExpression: 'set #a = :value1',
        ExpressionAttributeNames: {
            "#a": 'status'
        },
        ExpressionAttributeValues: {
            ':value1': status
        }
    }).promise();
}

module.exports = {
    submitTicket,
    retrieveTicketById,
    retrieveTicketsByEmployee,
    retrieveAllTickets,
    retrieveTicketsByStatus,
    changeTicketStatus,
};