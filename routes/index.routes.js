//Module Imports
const router = require('express').Router();
const logger = require('../config/logger.config');

//Route imports
const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');
const employeeRoutes = require('./employee.routes');
const managerRoutes = require('./manager.routes');

//Routes imports
router.get('/', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`)
    const introMessage = {
        message: 'Welcome to the DERS server.',
        auth: "GET /auth to create or log in to an account.",
        admin: 'GET /admin to manage employee records.',
        manager: 'GET /manager to see administer tickets..',
        employee: "GET /employee to submit or view tickets."
    }

    res.json(introMessage)
});

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/employee', employeeRoutes);
router.use('/manager', managerRoutes);

//Route not found.
router.use((req, res) => {
    logger.warn(`${req.method} received to ${req.url}.`)
    res.status(404).send({errorMessage: "This route does not exist."})
});

module.exports = router;