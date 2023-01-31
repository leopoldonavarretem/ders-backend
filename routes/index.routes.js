//Module Imports
const router = require('express').Router();
const logger = require('../config/logger.config');

//Route imports
const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');
const employeeRoutes = require('./employee.routes');
const managerRoutes = require('./manager.routes');
const userRoutes = require('./user.routes');

//Routes imports
router.get('/', (req, res) => {
    logger.info(`${req.method} received to ${req.url}.`);

    return res.send({message: "Welcome to the DERS server."});
});

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/employee', employeeRoutes);
router.use('/manager', managerRoutes);
router.use('/user', userRoutes);

//Route not found.
router.use((req, res) => {
    logger.warn(`${req.method} received to ${req.url}.`);
    return res.status(404).send({errorMessage: "This route does not exist."});
});

module.exports = router;