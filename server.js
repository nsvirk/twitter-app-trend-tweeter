//NPM PACKAGES
let http = require('http');
let dateFormat = require('dateformat');

//LOCAL FILES
let TwitWrapper     = require('./twitWrapper.js');
let TrendTweeter    = require('./trendTweeter.js');

//LOCAL VARIABLES
const port          = 5000;
let now             = new Date();
const myDateFormat  = "ddd mmm dd HH:MM:ss Z yyyy" ;

/*******************************
CREATE A HTTP SERVER
*******************************/
let server = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Twitter Trend Tweeter is online!\n');
});

/*******************************
APP MAIN
*******************************/
const hLine = '==========================================================';
console.log(hLine);
console.log('🚀 TWITTER TREND TWEETER STARTED' + ' [http://localhost:' + port +']');
console.log(hLine);

const appMain = async () => {
    let interval            = (2 * (60 * 60 * 1000)) ; // 1 = One Hour, 0.5 = Half Hour, 0.25 is 15Min, 0.05 = 3min
    let nextTweetTime       = Date.now() + interval;
    let nextTweetTimeDt     = dateFormat(nextTweetTime, myDateFormat);
    let nowDt               = dateFormat(now,           myDateFormat);

    console.log('  App start time => ' + nowDt.toString()) ;
    console.log(' Next tweet time => ' + nextTweetTimeDt.toString()) ;
    console.log(hLine);

    setInterval( async () => {
         let countryCode ;
         countryCode = 'GB'; // Possible IN, US, GB as on now
         await TrendTweeter.trendTweeter(countryCode);
         countryCode = 'US';
         await TrendTweeter.trendTweeter(countryCode);
         countryCode = 'IN';
         await TrendTweeter.trendTweeter(countryCode);

         nextTweetTime      = Date.now() + interval;
         nextTweetTimeDt    = dateFormat(nextTweetTime, myDateFormat);
         console.log(' Next tweet time => ' + nextTweetTimeDt.toString()) ;
         console.log(hLine);
     }, interval );
}

appMain() ;
/*******************************
RUN SERVER
*******************************/
server.listen(port);
