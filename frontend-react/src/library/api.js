
const qs = require('qs');
const axios = require('axios');

function trigger_new(name, time)
{
	console.log(name)
	console.log(time)
	axios.post('/new', qs.stringify({ name: name, time_ending: time }))
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
}

function trigger_vote(restaurant_id, vote_id)
{
	console.log(restaurant_id)
	console.log(vote_id)
}

function trigger_unvote(restaurant_id, vote_id)
{
	console.log(restaurant_id)
	console.log(vote_id)
}

function get_restaurant_list(vote_id)
{
	console.log(vote_id)
	return []
}

function get_vote_list()
{
	return []
}

export { trigger_new, trigger_vote, trigger_unvote, get_restaurant_list, get_vote_list };