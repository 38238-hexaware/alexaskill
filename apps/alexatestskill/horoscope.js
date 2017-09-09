// const request = require('request-sync');
// let datares;
// module.exports = function (sign) {
//     return JSON.parse(request({
//         uri: "http://widgets.fabulously40.com/horoscope.json?sign=" + sign,
//         method: 'GET'
//     }).body);

// };
var requestnew = require('request');

module.exports = function(data, callback) {

    var r;
    var options = {};
        options.url = "http://widgets.fabulously40.com/horoscope.json?sign="+data;
        options.method = "GET";
    requestnew(options, function(error, response, body) {

         if (!error) {

            if(response.statusCode == 200) {

                try {

                    if((typeof body) == "string") {

                        var result = JSON.parse(body);

                        r = result;
                    } else {

                        r = body;
                    }

                    // Call callback with no error, and result of request
                    return callback(null, r);

                } catch (e) {

                    // Call callback with error
                    return callback(e);
                }
            }
        } else {

            console.log("Error: " + error);
            return callback(error);
        }
    });

}
