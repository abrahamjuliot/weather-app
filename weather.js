'use strict';
const
http = require('http'),
api = require('./api.json'),
printWeather = (weather) => {
    const message = `Current Temperature in ${weather.name} is ${weather.main.temp} °F, with ${weather.weather[0].description} weather`;
    console.log(message);
},
printError = (error) => {
    console.error(error.message);
},
getData = (query) => {
    
    try {
        const
        url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${api.key}&units=imperial`,
        req = http.get(url, (res) => {
            if (res.statusCode === 200) {
                let body = '';
                res.on('data', (chunk) => {
                    body += chunk;
                });
                res.on('end', () => {
                    try {
                        const weather = JSON.parse(body);
                        if (weather.name) {
                            printWeather(weather);
                        } else {
                            const queryError = new Error(`${query} was no found.`);
                            printError(queryError);
                        }
                    } catch(error) {
                        printError(error);
                    }
                });
            } else {
                const statusCodeError = new Error(
                    `Error getting message for ${query} (${http.STATUS_CODES[res.statusCode]})`
                );
                printError(statusCodeError);
            }
        });
        req.on('error', printError);
    } catch(error) {
        printError(error);
    }
};
    
module.exports.get = getData;

// TODO: handle any errors