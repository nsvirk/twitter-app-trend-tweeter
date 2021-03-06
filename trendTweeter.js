//NPM PACKAGES
let TwitWrapper     = require('./twitWrapper.js');
let dateFormat      = require('dateformat');

//LOCAL VARIABLES
let tweetCounter    = 1;
const myDateFormat  = "ddd mmm dd HH:MM:ss Z yyyy" ;

/********************************
TWEET TRENDS
********************************/
const trendTweeter = async (countryCode) => {
     try {

         let woeid, country;
         if (countryCode == 'IN') { woeid = '23424848'; country = 'India' ;};
         if (countryCode == 'US') { woeid = '23424977'; country = 'UnitedStates' ;};
         if (countryCode == 'GB') { woeid = '23424975'; country = 'UnitedKingdom' ;};

         //Generate Country Flag Emoji from Country Code
         const flag = countryCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397) );

         //Get Trends
         const response  = await TwitWrapper.getTrendsPlace(woeid);
         let trendsArr   = response.data[0].trends ;
         trendsArr.sort(function(a, b){return b.tweet_volume - a.tweet_volume});

         //Form Tweet Text
         let tweetText   = '#Twitter #Top #Trending now in #' + country + ' ' + flag + '\r\n' + '\r\n' ;
         let i,r = 0;
         do {
             if (trendsArr[r]) {
                 tweetText   =  tweetText + trendsArr[r].name + '\r\n';
                 r++ ;
                 i = tweetText.length;
             } else { i++; }
         } while (i < 281) ;

         //console.log(tweetText);

         //Post Tweet
         const tweetResponse    = await TwitWrapper.postTextTweet(tweetText) ;
         const data             = tweetResponse.data ;
         let    now             = new Date();
         let   nowDt            = dateFormat(now, myDateFormat);
         let   dtStr            = nowDt.toString();

         if (data.errors ) {
             console.log('         ERROR DETAILS');
             console.log('===================================================');
             console.log('    Error Code: ' + data.errors[0].code);
             console.log('    Error Time: ' + dtStr);
             console.log(' Error Message: ' + data.errors[0].message);
             if (data.errors.code == 186) {
             console.log('  Tweet Length: ' + tweetText.length);
             }
             console.log('===================================================');
         } else {

             console.log('         TWEET DETAILS ' + ' [' + tweetCounter + ']');
             console.log('===================================================');
             console.log('      Tweet ID: ' + data.id_str);
             console.log('    Tweet Time: ' + data.created_at);
             console.log('    Local Time: ' + dtStr);
             console.log(' Tweet Content: ');
             console.log('------------------------------------');
             console.log(data.text);
             console.log('------------------------------------\r\n');
             console.log('===================================================');

         }

    } catch (error) {
        // console.log(error);
    } finally {
        tweetCounter++;
    }

}

/*******************************
Module Exports
*******************************/
module.exports = {
    trendTweeter
}
