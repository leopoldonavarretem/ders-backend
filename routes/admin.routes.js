//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');
const userDao = require('../dao/user.dao');
const isAdmin = require('../middleware/isAdmin');
const getUserInfo = require('../middleware/getUserInfo');

//This route allows us to see all the employees.
router.get("/employees", getUserInfo, isAdmin, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    try {
        const data = await userDao.retrieveAllUsers();
        if (data.Items.length) {
            data.Items.forEach((item) => {
                item.password = null;
            });
            return res.send(data.Items);
        } else {
            return res.send({message: 'There are no employees.'});
        }
    } catch {
        res.status(500).send({errorMessage: 'Server error.'});
    }
});

//This route allows us to create an employee.
router.post('/employees', getUserInfo, isAdmin, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: 'You have accessed the /employees endpoint.'});
});

//This route allows us to edit employee details.
router.patch('/:employeeId', getUserInfo, isAdmin, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: 'You have accessed the /employeeId endpoint'});
});

module.exports = router;