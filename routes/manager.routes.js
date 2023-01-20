//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');

//Main route
router.get('/', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    const managerIntroMessage = {
        message: "You have accessed the /manager endpoint.",
        routes: [
            "GET /manager/tickets to see pending tickets.",
            "GET /manager/tickets/:ticketId to see and individual ticket.",
            "PATCH /manager/tickets/:ticketId to approve or deny tickets."
        ]
    }
    res.send(managerIntroMessage)
})

router.get('/tickets', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: "You have accessed the /manager/tickets route."});
});

router.get('/tickets/:ticketId', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: "You have accessed the /manager/tickets/:ticketId route."});
});

router.patch('/tickets/:ticketId', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: "You have accessed the /manager/tickets/ticketId route."});
})

module.exports = router;