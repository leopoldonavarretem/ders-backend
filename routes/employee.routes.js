//Package Imports
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
        const {reimbursementType} = req.query;
        const {status} = req.query;
        if (reimbursementType) {
            const data = await ticketDao.retrieveTicketsByReimbursementType(reimbursementType, req.user.username);
            res.send(data.Items);
        } else if (status) {
            const data = await ticketDao.retrieveTicketsByStatusEmployee(status, req.user.username);
            res.send(data.Items);
        } else {
            const data = await ticketDao.retrieveTicketsByEmployee(req.user.username);
            res.send(data.Items);
        }
    } catch (err) {
        logger.error(err);
        res.status(500);
        res.send({"serverError": "A server error has occurred."});
    }
});

//This route allows users to retrieve an individual ticket.
router.get('/tickets/:ticketId', getUserInfo, isEmployee, async (req, res) => {
    let data;
    try {
        data = await ticketDao.retrieveTicketById(req.params['ticketId']);
    } catch (err) {
        logger.error(err);
        res.status(500).send({"serverError": "A server error has occurred."});
    }

    if (!data.Item) {
        res.status(404).send({"errorMessage": "Ticket does not exist."});
    } else if (data.Item.username !== req.user.username) {
        res.send({"message": "Not authorized to view this ticket."});
    } else {
        res.send(data.Item);
    }
});

//This route allows users to submit a ticket.
router.post('/tickets', getUserInfo, isEmployee, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    const {amount, description, title} = req.body;
    const reimbursementType = req.body.reimbursementType.toLowerCase();
    const user = req.user;

    if (!amount || !description || !reimbursementType || !title) {
        res.status(400);
        res.send({
            "dataError": "Please input amount, description, type and title."
        });
    } else if (amount <= 0) {
        res.status(400);
        res.send({
            "dataError": "Amount cannot be less than $0"
        });
    } else if (reimbursementType !== "food" && reimbursementType !== 'lodging' && reimbursementType !== 'travel' && reimbursementType !== "other") {
        res.status(400);
        res.send({
            "dataError": "Type must be either food, travel, lodging or other."
        });
    } else {
        try {
            const ticketId = uuid.v4().toString();
            await ticketDao.submitTicket(ticketId, amount, description, reimbursementType, title, user.username, user.employeeName);
            res.status(201);
            res.send({"message": "Ticket created successfully", "ticketId": ticketId});
        } catch (err) {
            logger.error(err);
            res.status(500);
        }
    }
});

module.exports = router;