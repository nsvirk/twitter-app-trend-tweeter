var auth = require('./twitterCredentials.js');
var Twit = require('twit');

/********************************
GET & POST WRAPPER
********************************/
var Twitter = new Twit({
    consumer_key:         auth.consumer_key ,
    consumer_secret:      auth.consumer_secret,
    access_token:         auth.access_token,
    access_token_secret:  auth.access_token_secret
});

/********************************
GET & POST WRAPPER
********************************/
const get = async function (path, params) {
    const response = await Twitter.get(path, params);
    return response;
}

const post = async function (path, params) {
    const response = await Twitter.post(path, params);
    return response;
}

/********************************
AUTHENTICATE TWITTER
********************************/
const verifyCredentials = async function () {
try {
    const path = 'account/verify_credentials';
    const params = { include_entities: false, skip_status: true, include_email: false };
    const response = await Twitter.get(path, params);
    const credentials = response.data ;
    return credentials;
}
catch (error) {
    console.log(error);
}
}

/********************************
POST TEXT TWEET
@ params : message (message to tweet, required)
*********************************/
const postTextTweet = async (message) => {
    const path      = 'statuses/update';
    const params    = { status: message };
    const response  = await Twitter.post(path, params) ;
    return response ;
}

/********************************
GET TRENDS PLACE
@ params : id (WOIED, required)
@ params : exclude (exclude hashtags if set ture, optional)
********************************/
const getTrendsPlace = async function (woeid) {
 try {
     const path     = 'trends/place';
     const params   = { id: woeid, exclude: false };
     const response = await Twitter.get(path, params);
     return response ;
}
 catch (error) {console.log(error);}
}

/********************************
GET TRENDS AVAILABLE
@ params : none
********************************/
const getTrendsAvailable = async function () {
  try {
      const path     = 'trends/available';
      const params   = { };
      const response = await Twitter.get(path, params);
      const trends   = response.data ;
      console.log(trends);
      return trends;
  }
  catch (error) {console.log(error);}
}

/********************************
GET TRENDS AVAILABLE
@ params : lat (latitude, required)
@ params : long (longitude, required)
********************************/
const getTrendsClosest = async function (latitude, longitude) {
   try {
       const path     = 'trends/closest';
       const params   = { lat: latitude, long: longitude };
       const response = await Twitter.get(path, params);
       const trends   = response.data ;
       console.log(trends);
       return trends;
   }
   catch (error) {console.log(error);}
}

/*******************************
Module Exports
*******************************/
module.exports = {
    get,
    post,
    verifyCredentials,
    postTextTweet,
    getTrendsPlace,
    getTrendsAvailable,
    getTrendsClosest
}
