//Imports
const app = require('./app.js');
const logger = require('./config/logger.config');

//Sets the port of our application
const PORT = process.env.PORT;


app.listen(PORT, ()=>{
    logger.info(`Server listening on port http://localhost:${PORT}`)
});