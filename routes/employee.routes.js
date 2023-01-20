//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');

router.get('/', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    const employeeIntroMessage = {
        message: 'You have accessed the /employee endpoint',
        employee: [
            "POST /employee to edit personal details.",
            "GET /employee/tickets to see your submitted tickets.",
            "POST /employee/tickets to submit a ticket. ",
            "GET /employee/tickets/:ticketId to see an individual ticket.",
        ]
    }

    res.send(employeeIntroMessage);
})

router.post('/', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: "You have accessed the POST /employee route."})
});

router.get('/tickets', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: "You have accessed the GET /tickets route."})
})

router.post('/tickets', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: "You have accessed the POST /tickets route."})
})

router.get('/tickets/:ticketId', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: "You have accessed the GET /tickets/:ticketId details route."})
});

module.exports = router;