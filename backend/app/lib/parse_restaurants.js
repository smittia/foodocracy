module.exports = function(restuarant_list ) {
	let new_list = []
	restuarant_list.forEach(function (place, index) {
		new_list.push(
		{
			title: place.title,
			distance: place.distance,
			id: place.id,
			favourite: false,
			votes:[]
		})
	});

  return new_list;
};