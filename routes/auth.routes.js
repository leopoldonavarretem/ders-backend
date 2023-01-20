//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');

//Main route
router.get('/', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);
    const authIntroMessage = {
        message: "You have accessed the /auth endpoint.",
        signup: "POST /auth/signup to create an account.",
        login: "POST /auth/login to log in to your account."
    }
    res.send(authIntroMessage)
})

//Route to create an account.
router.post('/signup', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`)
    res.send({message: "You have accessed the signup endpoint."})
})

//Route to log in to account.
router.post('/login', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`)
    res.send({message: "you have accessed the login endpoint.'"})
})


module.exports = router;
