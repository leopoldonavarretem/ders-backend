//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');
const jwtUtil = require('../utility/jwt.util');
const userDao = require("../dao/user.dao");

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

        res.send({"message": "success"});
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

router.get('/tickets', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: "You have accessed the GET /tickets route."});
});

//This route allows users to submit a ticket.
router.post('/tickets', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: "You have accessed the POST /tickets route."});
});

router.get('/tickets/:ticketId', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    res.send({message: "You have accessed the GET /tickets/:ticketId details route."});
});

module.exports = router;