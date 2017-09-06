const request = require('request-sync');
let datares;
module.exports = function (sign) {
    return JSON.parse(request({
        uri: "http://widgets.fabulously40.com/horoscope.json?sign=" + sign,
        method: 'GET'
    }).body);

};
