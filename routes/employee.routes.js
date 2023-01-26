//Package Imports
const router = require('express').Router();
const logger = require('../config/logger.config');
const userDao = require("../dao/user.dao");
const ticketDao = require('../dao/ticket.dao');
const getUserInfo = require('../middleware/getUserInfo');
const isEmployee = require('../middleware/isEmployee');

//This route allows users to change their information.
//TODO: Users can add a profile picture.

//This route allows users to retrieve their tickets.
router.get('/tickets', getUserInfo, isEmployee, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    try {
        //TODO: Maybe move the ticket Id as its own endpoint
        const {ticketId} = req.query;
        const {type} = req.query;

        if (ticketId) {
            const data = await ticketDao.retrieveTicketById(ticketId);
            if (data.Item.username !== req.user.username) {
                res.send({"message": "Not authorized to view this ticket."});
            } else {
                res.send({data});

            }

        } else if (type) {
            const data = await ticketDao.retrieveTicketsByCategory(type, req.user.username);
            res.send(data);
        } else {
            const data = await ticketDao.retrieveTicketsByEmployee(req.user.username);
            res.send(data);
        }
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            res.status(400);
            res.send({
                "message": "Invalid JWT"
            });
        } else if (err.name === 'TypeError') {
            res.status(400);
            res.send({
                "message": "No authorization header provided"
            });
        } else {
            res.status(500);
        }
    }


});

//This route allows users to submit a ticket.
router.post('/tickets', getUserInfo, isEmployee, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    try {
        const {amount, description, title} = req.body;
        const type = req.body.type.toLowerCase();

        if (!amount || !description || !type || !title) {
            res.status(400);
            res.send({
                "message": "Please input all required parameters."
            });
        } else if (amount <= 0) {
            res.status(400);
            res.send({
                "message": "Amount cannot be less than $1"
            });
        } else if (type !== "food" && type !== 'lodging' && type !== 'travel' && type !== "other") {
            res.status(400);
            res.send({
                "message": "Type must be either food, travel, lodging or other."
            });
        } else {
            await ticketDao.submitTicket(amount, description, type, title, req.user.username, req.user.employeeName);

            res.send({"message": "Ticket successfully created."});
        }


    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            res.status(400);
            res.send({
                "message": "Invalid JWT"
            });
        } else if (err.name === 'TypeError') {
            res.status(400);
            res.send({
                "message": "No authorization header provided"
            });
        } else {
            res.status(500);
        }
    }
});

module.exports = router;