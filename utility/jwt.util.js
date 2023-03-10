//Imports
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

//This will store the username and role into the token that we create.
function createToken(userInformation) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3),
        ...userInformation
    }, process.env.JWTSECRET);
}

//This function returns a promise that contains the payload when the promise is solved.
function verifyTokenAndReturnPayload(token) {
    jwt.verify = Promise.promisify(jwt.verify);
    return jwt.verify(token, process.env.JWTSECRET);
}

module.exports = {
    createToken,
    verifyTokenAndReturnPayload
};

