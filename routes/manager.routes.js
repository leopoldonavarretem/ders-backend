//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');
const ticketDao = require('../dao/ticket.dao');
const getUserInfo = require('../middleware/getUserInfo');
const isManager = require('../middleware/isManager');

//This route allows managers to view tickets
router.get('/tickets', getUserInfo, isManager, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    const status = req.query.status;

    if (status) {
        if (status !== 'pending' && status !== 'approved' && status !== 'denied') {
            res.status(400);
            return res.send({
                errorMessage: 'Please input a valid ticket status.'
            });
        }

        try {
            const data = await ticketDao.retrieveTicketsByStatus(status);
            if (data.Items.length) {
                return res.send(data.Items);
            } else {
                return res.status(400).send({message: `There are no tickets with ${status} status.`});
            }

        } catch {
            logger.error(`ERROR: ${req.method} received to ${req.url}.`);
            res.status(500);
            return res.send({errormessage: "Server error."});
        }
    }

    try {
        const data = await ticketDao.retrieveAllTickets();
        if (data.Items.length) {
            return res.send(data.Items);
        } else {
            return res.send({message: 'There are no tickets.'});
        }
    } catch {
        logger.error(`ERROR: ${req.method} received to ${req.url}.`);
        res.status(500);
        return res.send({errormessage: "Server error."});
    }
});

router.get('/tickets/:ticketId', getUserInfo, isManager, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    const ticketId = req.params['ticketId'];

    try {
        const data = await ticketDao.retrieveTicketById(ticketId);
        if (data.Item) {
            return res.send(data.Item);
        } else {
            return res.status(404).send({message: 'Ticket does not exist.'});
        }
    } catch {
        logger.error(`ERROR: ${req.method} received to ${req.url}.`);
        res.status(500);
        return res.send({errorMessage: "Server error."});
    }
});

router.patch('/tickets/:ticketId', getUserInfo, isManager, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    const ticketId = req.params['ticketId'];
    const status = req.body.status;
    try {
        if (status !== 'approved' && status !== 'denied') {
            res.status(400);
            return res.send({
                message: "Please approve or deny ticket."
            });
        } else {
            const data = await ticketDao.retrieveTicketById(ticketId);
            if (data.Item.status !== "pending") {
                res.status(400);
                return res.send({
                    message: "This ticket has already been denied or approved."
                });
            } else {
                await ticketDao.changeTicketStatus(ticketId, req.body.status);
                return res.send({message: `Ticket has been ${status}.`});
            }
        }
    } catch {
        logger.error(`ERROR: ${req.method} received to ${req.url}.`);
        return res.status(500).send({
            errorMessage: 'Server error'
        });
    }
})
;

module.exports = router;