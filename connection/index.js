const mongoose = require('mongoose');

const conn_settings =
	{ 
		useNewUrlParser: true, 
		useUnifiedTopology: true, 
		useFindAndModify: false
	};

/*
	Defining connection to MongoDB instance.
	TODO: change static string to enviroment variable.
*/
const conn = mongoose.connect("mongodb://localhost/math", conn_settings);

module.exports = conn;
