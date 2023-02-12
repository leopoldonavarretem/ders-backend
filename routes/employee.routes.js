//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');
const ticketDao = require('../dao/ticket.dao');
const getUserInfo = require('../middleware/getUserInfo');
const isEmployee = require('../middleware/isEmployee');
const uuid = require('uuid');

//This route allows users to retrieve their tickets.
router.get('/tickets', getUserInfo, isEmployee, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    try {
        const data = await ticketDao.retrieveTicketsByEmployee(req.user.userID);
        if (data.Items.length) {
            return res.send(data.Items);
        } else {
            return res.send({message: "You have not submitted any tickets."});
        }
    } catch {
        logger.error(`ERROR: ${req.method} received to ${req.url}.`);
        res.status(500);
        return res.send({serverError: "A server error has occurred."});
    }
});

//This route allows users to retrieve an individual ticket.
router.get('/tickets/:ticketId', getUserInfo, isEmployee, async (req, res) => {
    try {
        const data = await ticketDao.retrieveTicketById(req.params['ticketId']);
        if (!data.Item) {
            return res.status(404).send({errorMessage: "Ticket does not exist."});
        } else if (data.Item.userID !== req.user.userID) {
            return res.send({errorMessage: "Not authorized to view this ticket."});
        } else {
            return res.send(data.Item);
        }
    } catch {
        logger.error(`ERROR: ${req.method} received to ${req.url}.`);
        return res.status(500).send({serverError: "A server error has occurred."});
    }

});

//This route allows users to submit a ticket.
router.post('/tickets', getUserInfo, isEmployee, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    const {amount, description, title, reimbursementType} = req.body;
    const user = req.user;

    if (typeof amount !== 'number' || typeof description !== "string" || typeof reimbursementType !== 'string' || typeof title !== 'string') {
        res.status(400);
        return res.send({
            errorMessage: "Please input a valid amount, description, type and title."
        });
    }

    const validatedReimbursementType = reimbursementType.toLowerCase();
    if (amount <= 1) {
        res.status(400);
        return res.send({
            errorMessage: "Amount cannot be less than $1"
        });
    } else if (validatedReimbursementType !== "food" && validatedReimbursementType !== 'lodging' && validatedReimbursementType !== 'travel' && validatedReimbursementType !== "other") {
        res.status(400);
        return res.send({
            errorMessage: "Type must be either food, travel, lodging or other."
        });
    }
    try {
        const ticketId = uuid.v4().toString();
        await ticketDao.submitTicket(ticketId, amount, description, validatedReimbursementType, title, user.userID, user.employeeName);
        res.status(201);
        return res.send({message: "Ticket created successfully", "ticketId": ticketId});
    } catch {
        logger.error(`ERROR: ${req.method} received to ${req.url}.`);
        return res.status(500).send({serverError: "A server error has occurred."});
    }

});

module.exports = router;