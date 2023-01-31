//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');
const jwtUtil = require('../utility/jwt.util');
const userDao = require('../dao/user.dao');
const bcrypt = require('bcrypt');

//Route to create an account.
router.post('/signup', async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);

    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (!username || !password || !name) {
        res.status(400);
        return res.send({
            errorMessage: "Please input a valid name, password or name."
        });
    }

    if (!regex.test(password)) {
        res.status(400);
        return res.send({errorMessage: "Password must have at least eight characters, contain one number, one lowercase letter, and one uppercase letter. "});
    }

    const validatedPassword = await bcrypt.hash(password, 10);
    const validatedUsername = username.toLowerCase();

    try {
        const data = await userDao.retrieveUser(username);

        if (data.Item) {
            res.status(400);
            return res.send({
                errorMessage: "Username already exists. Try logging in."
            });
        } else {
            await userDao.registerUser(validatedUsername, validatedPassword, name);

            return res.send({
                message: "User successfully registered."
            });
        }
    } catch {
        logger.error(`ERROR: ${req.method} received to ${req.url}.`);
        return res.status(500).send({
            serverError: "A server error has occurred."
        });
    }
});

//Route to log in to account.
router.post('/login', async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.status(400);
        return res.send({errorMessage: 'Please input a valid username or password.'});
    }

    const validatedUsername = username.toLowerCase();
    const data = await userDao.retrieveUser(validatedUsername);

    if (data.Item) {
        if (await bcrypt.compare(data.Item.password, password)) {
            return res.send({
                message: 'Successful login!',
                token: await jwtUtil.createToken(data.Item.username, data.Item.role, data.Item.employeeName)
            });
        } else {
            res.status(400);
            return res.send({errorMessage: "Invalid credentials."});
        }
    } else {
        res.status(404);
        return res.send({errorMessage: "Invalid credentials."});
    }
});

module.exports = router;
