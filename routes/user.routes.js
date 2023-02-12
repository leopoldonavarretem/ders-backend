//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');
const getUserInfo = require("../middleware/getUserInfo");
const isEmployee = require("../middleware/isEmployee");
const userDao = require("../dao/user.dao");

router.patch('/', getUserInfo, isEmployee, async (req, res) => {
    logger.info(`${req.method} received to ${req.url}`);
    const {newPassword, newName, newAddress} = req.body;

    if (typeof newPassword !== 'string' || typeof newName !== 'string' || typeof newAddress !== 'object') {
        return res.status(400).send({
            errorMessage: 'Please input a valid password, name and address type.'
        });
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (!regex.test(newPassword)) {
        res.status(400);
        return res.send({errorMessage: "Password must have at least eight characters, contain one number, one lowercase letter, and one uppercase letter. "});
    }


    try {
        await userDao.editUserInformation(req.user.username, newPassword, newName, newAddress);
        res.send({"message": "Information updated successfully."});

    } catch (err) {
        return res.status(500).send({errorMessage: 'Server Error.'});
    }
});

module.exports = router;