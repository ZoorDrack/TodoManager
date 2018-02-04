const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const port = 8080;

MongoClient.connect(db.url, (err,client) => {
	const database = client.db(db.name);
	
	if (err) return console.log(err);
	require('./app/routes') (app,database);

	app.listen(port, () => {
		console.log('Express starts on ' + port);	
	})
})


