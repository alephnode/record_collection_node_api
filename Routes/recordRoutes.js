var express = require('express');

//Func will be return value for this module.exports
//Remember to pass in Record here so route works
var routes = function(Record){
var recordRouter = express.Router();

  //Separate what you pass in to a controller!
  var recordController = require('../Controllers/recordController.js')(Record);
  //declare new route method on the router instance, passing in URL
  recordRouter.route('/')
            .post(recordController.post)
  					.get(recordController.get);

//Add middleware to find record by id so not repeating in code!
  recordRouter.use('/:recordId', function(req, res, next){
    Record.findById(req.params.recordId, function(err, record) {
      if(err) {
        //if issue, send 500 error
        res.status(500).send(err);
      }
      else if(record){
        //make it available to everything downstream, add to request
        req.record = record;
        next();
      }
      else {
        res.status(404).send('no record found');
      }
    });
  });

  //Adding search functionality by single id
  recordRouter.route('/:recordId')
  .get(function(req, res){

//Enable hypermedia so we can filter by genre
//Good practice to give users opportunity to go to other parts of API

//to do this, first we grab the passed requested record and convert it to JSON
    var returnRecord = req.record.toJSON();

//Then we give it a new category, links, that is an empty object (we will place links here)
    returnRecord.links = {};
//Set a newlink variable equal to the desired filter. In this example, its genre
    var newLink = 'http://' + req.headers.host + '/api/records/?genre=' + returnRecord.genre;

//Finally, assign the link to the links object, making sure to account for spaces in genre
    returnRecord.links.FilterByThisGenre = newLink.replace(' ', '%20');

    //PART ONE: NOW with middleware, if no record, won't ever get here!
//HYPERMEDIA, CONT: Now pass in the req.record object
          res.json(returnRecord);
  			})
  .put(function(req, res){
        req.record.title = req.body.title;
        req.record.artist = req.body.author;
        req.record.genre = req.body.genre;
        req.record.label = req.body.label;
        req.record.rating = req.body.rating;
        req.record.save(function(err){
          if(err){
            res.status(500).send(err);
          }
          else{
              res.json(req.record);
          }
        });
  })
  .patch(function(req, res){
    //use for in loop to spot changes and update
    if(req.body._id)
      delete req.body._id;

    for (var p in req.body) {
      req.record[p] = req.body[p];
    }
    req.record.save(function(err){
      if(err){
        res.status(500).send(err);
      }
      else{
          res.json(req.record);
      }
    });
  })
  .delete(function(req, res){
    req.record.remove(function(err){
      if(err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('Removed');
      }
    });
  });

  return recordRouter;

};

module.exports = routes;
