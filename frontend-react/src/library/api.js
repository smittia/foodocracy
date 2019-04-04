
const qs = require('qs');
const axios = require('axios');

function trigger_new(name, time, lat, long, update_function, error_function)
{
	console.log(name)
	console.log(time)
	axios.post('/new', qs.stringify({ name: name, time_ending: time, lat : lat, long : long }))
	  .then(update_function)
	  .catch(error_function);
}

function trigger_vote(restaurant_id, vote_id, user_id, update_function, error_function)
{
	console.log(restaurant_id)
	console.log(vote_id)
	console.log(user_id)
	axios.post('/addVote', qs.stringify({ restaurant_id: restaurant_id, vote_id: vote_id, user_id:user_id }))
	  .then(update_function)
	  .catch(error_function);
}

function trigger_unvote(restaurant_id, vote_id, user_id, update_function, error_function)
{
	console.log(restaurant_id)
	console.log(vote_id)
	axios.post('/removeVote', qs.stringify({ restaurant_id: restaurant_id, vote_id: vote_id, user_id:user_id }))
	  .then(update_function)
	  .catch(error_function);
}

function trigger_location_add(name, lat, long, update_function, error_function)
{
	axios.post('/location', qs.stringify({ name: name, lat : lat, long : long }))
	  .then(update_function)
	  .catch(error_function);
}

async function get_vote_list()
{
	  try {
	    const response = await axios.get('/all');
	    console.log(response);
	    return response
	  } catch (error) {
	    console.error(error);
	    return [];
	  }
}

async function get_locations()
{
	  try {
	    const response = await axios.get('/locations');
	    console.log(response);
	    return response
	  } catch (error) {
	    console.error(error);
	    return [];
	  }
}

async function get_vote(vote_id)
{
	  try {
	    const response = await axios.get('/vote/'+vote_id);
	    console.log(response);
	    return response
	  } catch (error) {
	    console.error(error);
	    return null;
	  }
}

export { trigger_new, trigger_vote, trigger_unvote, get_vote, get_vote_list, trigger_location_add, get_locations };