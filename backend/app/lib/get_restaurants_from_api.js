const axios = require('axios');
const qs = require('qs');


module.exports = async function() {
 try {
 	const get_options = {
 		app_code:'AJKnXv84fjrb0KIHawS0Tg',
	    app_id:'DemoAppId01082013GAL',
	    cat:'eat-drink',
	    pretty:'true',
	    size:'400'
 	}
	const options = {
	  method: 'GET',
	  headers: { 'Geolocation': 'geo:51.457890,-0.975700' },
	  url: 'https://places.demo.api.here.com/places/v1/discover/explore?'+qs.stringify(get_options)
	};
	
    const response = await axios(options);
    return response.data.results.items;
  } catch (error) {
    console.error(error);
    return [];
  }
};