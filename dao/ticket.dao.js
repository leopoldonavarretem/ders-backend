//Imports
const AWS = require('aws-sdk');

//AWS config
require('../config/dynamo.config');

//Instantiate docClient.
const docClient = new AWS.DynamoDB.DocumentClient();

function submitTicket(ticketId, amount, description, reimbursementType, title, username, name) {
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
            "username": username,
            "dateSubmitted": date.toUTCString()
        }

    }).promise();
}

function retrieveTicketsByReimbursementType(reimbursementType, username) {
    return docClient.query({
        TableName: 'ders-tickets',
        IndexName: 'reimbursementType-index',
        FilterExpression: '#C = :value2',
        KeyConditionExpression: '#A = :value1',
        ExpressionAttributeNames: {
            '#A': 'reimbursementType',
            '#C': 'username',
        },
        ExpressionAttributeValues: {
            ':value1': reimbursementType,
            ':value2': username
        }
    }).promise();
}

function retrieveTicketsByStatusEmployee(status, username) {
    return docClient.query({
        TableName: 'ders-tickets',
        IndexName: 'status-index',
        FilterExpression: '#C = :value2',
        KeyConditionExpression: '#A = :value1',
        ExpressionAttributeNames: {
            '#A': 'status',
            '#C': 'username',
        },
        ExpressionAttributeValues: {
            ':value1': status,
            ':value2': username
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

function retrieveTicketsByEmployee(username) {
    return docClient.scan({
        TableName: 'ders-tickets',
        FilterExpression: '#a = :value',
        ExpressionAttributeNames: {
            '#a': "username"
        },
        ExpressionAttributeValues: {
            ':value': username
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
            "ticket_id": ticketId
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
    retrieveTicketsByReimbursementType,
    retrieveTicketById,
    retrieveTicketsByEmployee,
    retrieveAllTickets,
    retrieveTicketsByStatus,
    changeTicketStatus,
    retrieveTicketsByStatusEmployee
};