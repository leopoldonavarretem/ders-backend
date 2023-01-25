//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');

//This route sends the menu for the entire route.
router.get("/", (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`)
    const adminIntroMessage = {
        message: 'You have accessed the /admin endpoint.',
        routes: [
            "GET /admin/employees to see all employees.",
            "POST /admin/employees to create an employee.",
            "PATCH /admin/:employeeID to edit employee details"
        ]

    }
    res.send(adminIntroMessage)
})

//This route allows us to see all the employees.
router.get("/employees", (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: "You have accessed the /employees endpoint."})
});

//This route allows us to create an employee.
router.post('/employees', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: 'You have accessed the /employees endpoint.'})
});

//This route allows us to edit employee details.
router.patch('/:employeeId', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: 'You have accessed the /employeeId endpoint'});
})

module.exports = router;