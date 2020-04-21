//NPM PACKAGES
let http = require('http');

//LOCAL FILES
let TwitWrapper     = require('./twitWrapper.js');
let TrendTweeter    = require('./trendTweeter.js');

//LOCAL VARIABLES
const port          = 5000;

/*******************************
CREATE A SIMPLE SERVER
*******************************/
let server = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Hello World!\n');
});

/*******************************
APP LOGIC
*******************************/
 setInterval( () => {
     console.log('Tweeting');
     let countryCode ;
     countryCode = 'IN'; // Possible IN, US, GB
     TrendTweeter.trendTweeter(countryCode);
     countryCode = 'US'; // Possible IN, US, GB
     TrendTweeter.trendTweeter(countryCode);
     countryCode = 'GB'; // Possible IN, US, GB
     TrendTweeter.trendTweeter(countryCode);
 }, 1 * 60 * 1000 ); //Tweet Every Hour

/*******************************
RUN SERVER
*******************************/
console.log(`🚀 Twitter app is running on http://localhost:${port}/`);

// Start the server
server.listen(port);
