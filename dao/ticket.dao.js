//Imports
const AWS = require('aws-sdk');
const uuid = require('uuid');

//AWS config
require('../config/dynamo.config');

//Instantiate docClient.
const docClient = new AWS.DynamoDB.DocumentClient();

//Function to submit a ticket.
function submitTicket(amount, description, type, title, username, name) {
    const date = new Date();
    return docClient.put({
        TableName: "ders-tickets",
        Item: {
            "title": title,
            "ticket_id": uuid.v4(),
            "amount": amount,
            "description": description,
            "type": type,
            "status": "pending",
            "employeeName": name,
            "username": username,
            "dateSubmitted": date.toUTCString()
        }
    }).promise();
}

function retrieveTicketsByCategory(category) {
    return docClient.query({
        TableName: 'ders-tickets',
        IndexName: 'type-index',
        KeyConditionExpression: '#a = :value1',
        ExpressionAttributeNames: {
            '#a': 'type'
        },
        ExpressionAttributeValues: {
            ':value1': category
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

//Function to retrieve an individual ticket.
function retrieveTicketById(ticketId) {
    return docClient.get({
        TableName: 'ders-tickets',
        Key: {
            'ticket_id': ticketId
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

function changeTicketStatus(ticketId, status){
    return docClient.update({
        TableName: 'ders-tickets',
        Key: {
            "ticket_id": ticketId
        },
        UpdateExpression: 'set #a = :value1',
        ExpressionAttributeNames:{
            "#a": 'status'
        },
        ExpressionAttributeValues: {
            ':value1': status
        }
    }).promise()
}

module.exports = {
    submitTicket,
    retrieveTicketsByCategory,
    retrieveTicketById,
    retrieveTicketsByEmployee,
    retrieveAllTickets,
    retrieveTicketsByStatus,
    changeTicketStatus
};