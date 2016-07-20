var recordController = function(Book){

  var post = function(req, res){
    var record = new Book(req.body);
    //actually stores to database

//Test condition to make sure record has title
    if(!req.body.title) {
      res.status(400);
      res.send('Title is required');
    } else {
      record.save();
      //201 means created, sending record back
      res.status(201);
      res.send(record);
    }
  }

//Get function passed into router
  var get = function(req, res){

//Ensures we're not accepting random user input
      var query = [];

//Check to see if it's a queryable request
      if(req.query.genre) {
        query.genre = req.query.genre
      }

      Book.find(query, function(err, records) {
        if(err) {
          res.status(500).send(err);
        }
        else {
          var returnBooks = [];
          records.forEach(function(element, index, array){
            var newBook = element.toJSON();
            newBook.links = {};
            newBook.links.self = 'http://' + req.headers.host + '/api/records/' + newBook._id;
            returnBooks.push(newBook);
          });
          res.json(returnBooks);
        }
      });
  }

  return {
    post: post,
    get: get
  }

}

module.exports = recordController;
