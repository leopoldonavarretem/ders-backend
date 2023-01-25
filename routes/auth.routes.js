//Imports
const router = require('express').Router();
const logger = require('../config/logger.config');
const jwtUtil = require('../utility/jwt.util');
const userDao = require('../dao/user.dao');

//Route to create an account.
router.post('/signup', async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);

    //HELP: Should validation happen here or at the DAO?
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    const name = req.body.name;

    //TODO: Add regex
    if (!username || !password || !name) {
        res.status(400);
        res.send({
            "message": "Please input a valid name, password or name."
        });
        //HELP: Code keeps executing after I send a response, had to make everything into an ifElse.
    } else {
        //HELP: How to add logger to log in errors.
        const data = await userDao.retrieveUser(username);
        if (data.Item) {
            res.status(400);
            res.send({
                'message': "Username already exists."
            });
        } else {
            //TODO: Add BCRYPT.
            await userDao.registerUser(username, password, name);

            res.send({
                "message": "User successfully registered."
            });
        }
    }

});

//Route to log in to account.
router.post('/login', async (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);

    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    const data = await userDao.retrieveUser(username);


    if (data.Item) {
        if (data.Item.password === password) {
            res.send({
                "message": 'Successful login!',
                "token": jwtUtil.createToken(data.Item.username, data.Item.role, data.Item.employeeName)
            });
        } else {
            res.status(400);
            res.send({
                "message": "Invalid credentials."
            });
        }
    }
});

module.exports = router;
