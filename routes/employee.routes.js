//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');
const jwtUtil = require('../utility/jwt.util');
const userDao = require("../dao/user.dao");
const ticketDao = require('../dao/ticket.dao');

//This route allows users to change their information.
//TODO: Users can add a profile picture.
router.patch('/', async (req, res) => {
    logger.info(`${req.method} received to ${req.url}`);
    try {
        //HELP: Why can it be done in one line?
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        const tokenPayload = await jwtUtil.verifyTokenAndReturnPayload(token);

        //TODO: Add verification.
        const {newPassword, newName, newAddress} = req.body;
        await userDao.editUserInformation(tokenPayload.username, newPassword, newName, newAddress);

        res.send({"message": "Information updated successfully."});
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

//This route allows users to retrieve their tickets.
router.get('/tickets', async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        const tokenPayload = await jwtUtil.verifyTokenAndReturnPayload(token);
        const {ticketId} = req.query;

        if (ticketId) {
            const data = await ticketDao.retrieveTicketById(ticketId);
            if (data.Item.username !== tokenPayload.username) {
                res.send({"message": "Not authorized to view this ticket."});
            } else {
                res.send({data});

            }

        } else {
             const data = await ticketDao.retrieveTicketsByEmployee(tokenPayload.username);
            res.send({data})
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
router.post('/tickets', async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        const tokenPayload = await jwtUtil.verifyTokenAndReturnPayload(token);


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
            await ticketDao.submitTicket(amount, description, type, title, tokenPayload.username, tokenPayload.employeeName);

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