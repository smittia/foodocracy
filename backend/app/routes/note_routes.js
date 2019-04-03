
var ObjectID = require('mongodb').ObjectID;
const parse_restaurants = require('../lib/parse_restaurants');
const get_restaurants_from_api = require('../lib/get_restaurants_from_api');

module.exports = function(app, db) {

  app.post('/new', (req, res) => {

    let restaurant_promise = get_restaurants_from_api();
    restaurant_promise.then((list) => {
	    const restaurants = parse_restaurants(list)

    	let vote_object = { name: req.body.name,
    	 time_ending: req.body.time_ending,
    	 places: restaurants };

	    db.collection('votes').insert(vote_object, (err, result) => {
	      if (err) { 
	        res.send({ 'error': 'An error has occurred' }); 
	      } else {

	      	res.send(result.ops[0]);
	      }
	    });
	});
  });

  app.get('/all', (req, res) => {
    db.collection('votes').find({}).toArray(function(err, result) {
	      if (err) {
	        res.send({'error':'An error has occurred'});
	      } else {
	        res.send(result);
	      } 
	  });
  });

  app.get('/vote/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('votes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  app.post('/addVote', (req, res) => {
    const details = { '_id': new ObjectID(req.body.vote_id) };
	db.collection('votes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
      	console.log(item)

        item.places.forEach(function (place, index) {
			if(place.id === req.body.restaurant_id &&
				!place.votes.includes(req.body.user_id))
			{
				place.votes.push(req.body.user_id)
			}
		})

		var newvalues = { $set: {places: item.places} };
		db.collection("votes").updateOne(details, newvalues, function(err, item) {
		    if (err) {
		    	console.log(err)
		        res.send({'error':'An error has occurred'});
		    } else {
		        res.send(item);
		    }
	  	});
      } 
    });
  });


  app.post('/removeVote', (req, res) => {
    const details = { '_id': new ObjectID(req.body.vote_id) };
	db.collection('votes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
      	console.log(item)

        item.places.forEach(function (place, index) {
			if(place.id === req.body.restaurant_id &&
				place.votes.includes(req.body.user_id))
			{
				place.votes = place.votes.filter( e => e !== req.body.user_id)
			}
		})

		var newvalues = { $set: {places: item.places} };
		db.collection("votes").updateOne(details, newvalues, function(err, item) {
		    if (err) {
		    	console.log(err)
		        res.send({'error':'An error has occurred'});
		    } else {
		        res.send(item);
		    }
	  	});
      } 
    });
  });




// Notes an example of how to do it correctly
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  // gets all
  app.get('/notes', (req, res) => {
    db.collection('notes').find({}).toArray(function(err, result) {
	      if (err) {
	        res.send({'error':'An error has occurred'});
	      } else {
	        res.send(result);
	      } 
	  });
  });

  app.post('/notes', (req, res) => {

    const note = { text: req.body.body, title: req.body.title };
    console.log(note)
    console.log(req)
	console.log(res)

    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};