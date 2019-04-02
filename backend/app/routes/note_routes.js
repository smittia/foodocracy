
var ObjectID = require('mongodb').ObjectID;
const parse_restaurants = require('../lib/parse_restaurants');
const get_restaurants_from_api = require('../lib/get_restaurants_from_api');

module.exports = function(app, db) {

  // gets all
  app.post('/new', (req, res) => {

    const vote_object = { name: req.body.name, time_ending: req.body.time_ending };
    const restaurants = parse_restaurants(get_restaurants_from_api())

    console.log(vote_object)
    db.collection('votes').insert(vote_object, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {

      	let restaurant_object = {
      		vote_id: result.ops[0]._id,
      		restaurants: restaurants
      	}


        db.collection('restaurants').insert(restaurant_object, (err, result2) => {
	      if (err) { 
	        res.send({ 'error': 'An error has occurred' }); 
	      } else {
	      	
	        res.send(result.ops[0]);
	      }
	    });
      }
    });
  });
/*
new(name, time)
{
	id = generate_id()
	resturants = parse_restaurants(get_resturants_from_api())
	restaurant_list[id] = resturants
	vote_object = {
		"name" : name,
		"time_ending" : time,
	}
	votes[id] = vote_object
}

vote(user_id, restaurant_id, vote_id)
{
	vote_object = {restaurant_id : restaurant_id, user_id : user_id}
	add_if_not_present( votes[vote_id].votes[restaurant_id], user_id )
}

unvote(user_id, restaurant_id, vote_id)
{
	remove_if_present( votes[vote_id].votes[restaurant_id], user_id )
}

get_all(vote_id)
{
	returns a list of all the restaurants with their vote count
	return get_restaurants(vote_id)
}
*/


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