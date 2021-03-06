module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'test-skill' );
var reqnew = require('request');
var fetch = require('node-fetch');
var waits=require('wait.for');
var Promise=require('promise');
app.launch( function( request, response ) {
	response.say( 'Welcome to our daily horoscope. What would you like to know?' ).reprompt( 'Way to go. You got it to run. Bad ass.' ).shouldEndSession( false );
} );

var callapi=function(data) {
return new Promise(function(resolve, reject){
    var r;
    var options = {};
    options.url = "http://widgets.fabulously40.com/horoscope.json?sign="+data;
    reqnew(options, (error, resps, body)=> {
              try {

                    if((typeof body) == "string") {

                        var result = JSON.parse(body);
                        r = result;
                    } else {

                        r = body;
                    }

                    // Call callback with no error, and result of request
                    resolve(r);

                } catch (e) {

                    // Call callback with error
                    reject(e);
                }
            

    });
});
}



app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( `Sorry an error occured ${error.message}`);
};

app.intent('sayNumber',
  {
    "slots":{"number":"NUMBER"}
	,"utterances":[ 
		"say the number {1-100|number}",
		"give me the number {1-100|number}",
		"tell me the number {1-100|number}",
		"I want to hear you say the number {1-100|number}"]
  },
  function(request,response) {
    var number = request.slot('number');
    response.say(`You asked for the number ${number}`);
  }
);
app.intent('Thankyou',function(request,response) {
response.say("Thanks have a nice day");	
 }
);	
app.intent('ZODIACINTENT',function(request,response) {
var zodiac = request.slot('GetZodiacIntent');
var horoscope,sign,todaysh;
response.shouldEndSession( false );
if(zodiac){
return callapi(zodiac).then(function(result1){
console.log(JSON.stringify(result1));
 horoscope=result1;
 sign=horoscope.horoscope.sign;
 todaysh=horoscope.horoscope.horoscope;	
 response.say(`Your sign ${sign} today predication fortells ${todaysh}. Do you like to know any other horoscope?`).shouldEndSession( false ).send();	
}).catch(function(err){
console.log(err);
response.say("There was some problem! Please try after some time. ThankYou!!!").shouldEndSession(true);
});
// reqnew('http://widgets.fabulously40.com/horoscope.json?sign=capricorn', function (error, resp, body) {
// // console.log('error:', error); // Print the error if one occurred 
// //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
// //   console.log('body:', body); // Print the HTML for the Google homepage. 
// // response.say("srini");
// horoscope=JSON.parse(body);
// //console.log(horoscope.horoscope.sign+"=>"+horoscope.horoscope.horoscope);
// sign=horoscope.horoscope.sign;
// todaysh=horoscope.horoscope.horoscope;
// callback(response.say("Your sign "+sign+" today predication fortells "+todaysh+". Do you like to know any other horoscope?").shouldEndSession( false ).send());
//     });	
// return  fetch('http://widgets.fabulously40.com/horoscope.json?sign='+zodiac)
//     .then(function(res) {
//     // console.log(JSON.stringify(res.text()));
//        return res.text();
//     }).then(function(body) {
// 	//console.log(JSON.stringify(body));
//        horoscope=JSON.parse(body);
// 	//console.log(horoscope.horoscope.sign+"=>"+horoscope.horoscope.horoscope);
// 	sign=horoscope.horoscope.sign;
// todaysh=horoscope.horoscope.horoscope;
// response.say("Your sign "+sign+" today predication fortells "+todaysh+". Do you like to know any other horoscope?").shouldEndSession( false ).send();
//     });	

 //eturn response.say('srini').send();
//  request('http://widgets.fabulously40.com/horoscope.json?sign='+zodiac, function (error, response, body) {
// console.log(JSON.stringify(body));	 
// var horoscope=JSON.parse(body); // Print the HTML for the Google homepage.
// var sign=horoscope.horoscope.sign;
// var todaysh=horoscope.horoscope.horoscope;
// response.say("Your sign "+sign+" today predication fortells "+todaysh+". Do you like to know any other horoscope?").shouldEndSession( false );
// });	
// var horoscope=require('./horoscope')(zodiac);	
// var sign=horoscope.horoscope.sign;
// var todaysh=horoscope.horoscope.horoscope;
// response.say("Your sign "+sign+" today predication fortells "+todaysh+". Do you like to know any other horoscope?").shouldEndSession( false );
}
	else
	{
	response.say("Can i know the zodiac sign, to say today forecast?").shouldEndSession( false );	
	}
  }
);
module.exports = app;
