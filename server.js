//Imports
const app = require('./app.js');

//Sets the port of our application
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)
});