//Imports
const winston = require('winston');
const {combine, timestamp, json} = winston.format;

//This function filters the error messages to our loggerConfig.
const errorFilter = winston.format((info) =>{
    return info.level === 'error' ? info: false;
})

//This function filters the info messages to our loggerConfig.
const infoFilter = winston.format((info)=>{
    return info.level === 'info' ? info:false;
})

//This creates a loggerConfig and a file that will save the console outputs.
const loggerConfig = winston.createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './logs/combined.log'
        }),
        new winston.transports.File({
            filename: './logs/app-error.log',
            level: 'error',
            format: combine(errorFilter(), timestamp(), json())
        }),
        new winston.transports.File({
            filename: './logs/app-info.log',
            level: 'info',
            format: combine(infoFilter(), timestamp(), json())
        })
    ]
});

module.exports = loggerConfig;
