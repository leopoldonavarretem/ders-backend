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

    try {
        if (status) {
            const data = await ticketDao.retrieveTicketsByStatus(status);
            res.send(data);
        } else {
            const data = await ticketDao.retrieveAllTickets();
            res.send(data);
        }

    } catch (err) {
        res.status(500);
        res.send({"message": "Server error."});
    }

});

router.get('/tickets/:ticketId', getUserInfo, isManager, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    const ticketId = req.params['ticketId'];

    try {
        const data = await ticketDao.retrieveTicketById(ticketId);
        res.send(data);
    } catch {
        res.status(500);
        res.send({"message": "Server error."});
    }
});

router.patch('/tickets/:ticketId', getUserInfo, isManager, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    const ticketId = req.params['ticketId'].toLowerCase();
    const status = req.body.status;
    try {
        if (status !== 'approved' && status !== 'denied') {
            res.status(400);
            res.send({
                "message": "Please approve or deny ticket."
            });
        } else {
            const data = await ticketDao.retrieveTicketById(ticketId);
            if (data.Item.status !== "pending") {
                res.status(400);
                res.send({
                    "message": "This ticket has already been denied or approved."
                });
            } else {
                await ticketDao.changeTicketStatus(ticketId, req.body.status);
                res.send({"message": `Ticket has been ${status}.`});
            }
        }
    } catch (err) {
        console.log(err);
    }
});

        }


    } catch (err) {
        console.log(err);
    }
});

module.exports = router;