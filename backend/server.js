const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./config/db');

// server.js
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, function(err, client) {
	if (err) return console.log(err)

	//const database_ = client.db("cluster01");


	const database = client.db("cluster01")

  	require('./app/routes')(app, database);


	app.listen(port, () => {
		console.log('We are live on ' + port);
	});
});