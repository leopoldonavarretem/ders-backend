//Imports
const AWS = require('aws-sdk');
const uuid = require('uuid');

//AWS config
require('../config/dynamo.config');

//Instantiate docClient.
const docClient = new AWS.DynamoDB.DocumentClient();

//Function to submit a ticket.
function submitTicket(amount, description, type, title, username) {
    return docClient.put({
        TableName: "ders-tickets",
        Item: {
            "title": title,
            "ticket_id": uuid.v4(),
            "amount": amount,
            "description": description,
            "type": type,
            "status": "pending",
            "employee": username
        }
    }).promise();
}

module.exports = {
    submitTicket
};