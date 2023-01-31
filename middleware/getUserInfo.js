//Imports
const jwtUtil = require('../utility/jwt.util');

module.exports = async (req, res, next) => {
    //Prevents the user from accessing the page if not logged in.
    if (!req.headers.authorization || req.headers.authorization === "null") {
        return res.status(403).send({"errorMessage": "Please log in to continue."});
    }

    try {
        //Saves the users information to the req.
        const token = req.headers.authorization.split(" ")[1];
        req.user = await jwtUtil.verifyTokenAndReturnPayload(token);
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            res.status(400);
            res.send({
                "errorMessage": "Invalid JWT"
            });
        } else {
            res.status(500);
            res.send({"serverError": "A server error has occurred."});
        }
    }
};
