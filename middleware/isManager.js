module.exports = (req, res, next) => {
    if (req.user.role !== 'manager') {
        return res.status(403).send({"errorMessage": "You do not have authorization."});
    }
    next();
};