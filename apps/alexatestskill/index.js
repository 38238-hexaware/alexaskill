module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'test-skill' );
const request=require('request');


app.launch( function( request, response ) {
	response.say( 'Welcome, have a good day!!! What would you like to do?' ).reprompt( 'Way to go. You got it to run. Bad ass.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
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
    response.say("You asked for the number "+number);
  }
);
app.intent('Thankyou',function(request,response) {
response.say("Thanks have a nice day");	
 }
);	
app.intent('ZODIACINTENT',function(request,response) {
    var zodiac = request.slot('GetZodiacIntent');
if(zodiac){
var options = { method: 'GET',
  url: 'http://widgets.fabulously40.com/horoscope.json',
  qs: { sign: zodiac}};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
console.log(JSON.stringify(body));
var horoscope=JSON.parse(body);	
var sign=horoscope.horoscope.sign;
var todaysh=horoscope.horoscope.horoscope;
response.say("Your sign "+sign+" today predication fortells "+todaysh+". Do you like to know any other horoscope?").shouldEndSession( false );
});	
}
	else
	{
	response.say("Can i know the zodiac sign, to say today forecast?").shouldEndSession( false );	
	}
  }
);
module.exports = app;
