var express = require('express'),
    API = require('../lib/api'),
    util = require('util'),
    router = express.Router(),
    api = new API();

router.param('id', function(req, res, next, id) {
   if (id === undefined) { 
      //TODO      handle this error
   }

   req.id = id;
   next();
});


/* GET home page. */
router.get('/stop/:id', function(req, res) {
  res.render('stop', { title: 'Express' });
});

router.get('/routes', function(req, res) {
   var emitter = api.getRoutes();
   emitter.on('success', function(data) {
     res.json(200, data);
   });

   emitter.on('error', function(error) {
     res.json(200, error);
   });
});

router.get('/stops/:id', function(req, res) {
   var emitter = api.getStopsByRoute({'route': req.id});
   emitter.on('success', function(data) {
     res.json(200, data);
   });

   emitter.on('error', function(error) {
     res.json(200, error);
   });

});

router.get('/vehicles/:id', function(req, res) {
   var emitter = api.getVehiclesByRoute({'route': req.id});
   emitter.on('success', function(data) {
     res.json(200, data);
   });

   emitter.on('error', function(error) {
     res.json(200, error);
   });

});



router.get('/prediction/:id', function(req, res) {
   var emitter = api.getPredictionsByStop({'stop': req.id});
   emitter.on('success', function(data) {
     res.json(200, data);
   });

   emitter.on('error', function(error) {
     res.json(200, error);
   });

});


module.exports = router;
