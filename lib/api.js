var http = require('http'),
    Event = require('events'),
    util = require('util'),
    extend = require('extend'),
    qs = require('qs'),
    config = require('../config'),
    self;

var API = function() {
  this.path = config.PATH;
  self = this;
  this.netOptions = {
    hostname: config.HOSTNAME,
    format: 'json',
    method: 'GET'
  };
  
  return this;
}

API.prototype.getRoutes = function(args, options) {
   return buildRequest("routes/", args, options);
}

API.prototype.getStopsByRoute = function(args, options) {
   return buildRequest("stopsbyroute/", args, options);
}

API.prototype.getPredictionsByStop = function(args, options) {
   return buildRequest("predictionsbystop/", args, options);
}

API.prototype.getVehiclesByRoute = function(args, options) {
   return buildRequest("vehiclesbyroute/", args, options);
}

buildRequest = function (route, args, options) {
 var requestOptions = extend(false, {}, options, self.netOptions)
      requestEvent = new Event.EventEmitter(),
      requestArgs = args || {},
      requestArgs['api_key'] = config.API_KEY,
      queryString = qs.stringify(requestArgs);
  requestOptions.path =  self.path + route + "?" + queryString;
  console.log(util.inspect(requestOptions));
  var request = http.request(requestOptions, function(response) {
     var data = "";
     console.log(response.statusCode);
     response.on('data', function(chunk) {
       data += chunk;
     });

     response.on('end', function() {
       requestEvent.emit('success', data);
     });

  });

  request.on('error', function(error) {
   requestEvent.emit('error', error);
  });
  
  request.end();
  
  return requestEvent;
};

module.exports = API;






