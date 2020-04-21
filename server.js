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
APP MAIN
*******************************/
console.log('===================================================');
console.log('🚀 TWITTER TREND TWEETER STARTED' + ' [localhost:' + port +']');
console.log('===================================================');

let now                 = new Date() ;
let interval            = (0.25 * (60 * 60 * 1000)) ; // One Hour
let nextTweetTime       = Date.now() + interval;
let nextTweetTimeDt     = new Date(nextTweetTime);

console.log(' Start time => ' + now.toString()) ;
console.log('   Tweet at => ' + nextTweetTimeDt.toString()) ;
console.log('===================================================');

setInterval( () => {
     //console.log('\r\nTweeting at ' + now.toString() + '\r\n');
     let countryCode ;
     countryCode = 'IN'; // Possible IN, US, GB
     TrendTweeter.trendTweeter(countryCode);
     countryCode = 'US'; // Possible IN, US, GB
     TrendTweeter.trendTweeter(countryCode);
     countryCode = 'GB'; // Possible IN, US, GB
     TrendTweeter.trendTweeter(countryCode);
 }, interval ); //Tweet Every Hour

/*******************************
RUN SERVER
*******************************/
server.listen(port);
