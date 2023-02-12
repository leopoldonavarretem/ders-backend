//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');
const userDao = require('../dao/user.dao');
const isAdmin = require('../middleware/isAdmin');
const getUserInfo = require('../middleware/getUserInfo');
const uuid = require('uuid');
const bcrypt = require("bcrypt");

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
    const {employeeName, password, username} = req.body;

    if (typeof employeeName !== 'string' || typeof password !== 'string' || typeof username !== 'string') {
        return res.status(400).send({errorMessage: 'Please input a valid employee name, password, role and username type'});
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (!regex.test(password)) {
        res.status(400);
        return res.send({errorMessage: "Password must have at least eight characters, contain one number, one lowercase letter, and one uppercase letter. "});
    }

    const validatedUsername = username.toLowerCase();
    const validatedPassword = await bcrypt.hash(password, 10);
    const validatedName = employeeName.toLowerCase();
    const userID = uuid.v4();

    try {
        await userDao.registerUser(userID, validatedUsername, validatedPassword, validatedName);
        return res.status(201).send({message: 'Employee created successfully.'});
    } catch {
        logger.error(`ERROR: ${req.method} received to ${req.url}.`);
        return res.status(500).send({serverError: 'A server error has occurred.'});
    }
});

//This route allows us to edit employee role.
router.patch('/employees/:userID', getUserInfo, isAdmin, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);

    const {role} = req.body;
    const {userID} = req.params;

    if (role !== 'manager' && role !== 'employee') {
        return res.status(400).send({
            errorMessage: 'Role can only be manager or employee.'
        });
    }

    try {
        const data = await userDao.retrieveUserByID(userID);
        if (data.Item) {
            await userDao.changeEmployeeRole(userID, role);
            return res.send({message: 'Role updated successfully.'});
        } else {
            return res.status(404).send({message: 'User does not exist'});
        }
    } catch {
        logger.error(`ERROR: ${req.method} received to ${req.url}.`);
        return res.status(500).send({
            serverError: 'A server error has occurred.'
        });
    }
});

module.exports = router;