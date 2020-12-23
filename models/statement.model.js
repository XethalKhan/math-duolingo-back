const mongoose = require("mongoose");

let schema = new mongoose.Schema(
	{
		name: String,			//name of a statement type
		description: String,	//short description of a statement type
	}, 
	{ 
		collection: "statement" //name of collection
	});

const model = mongoose.model("Statement", schema);

module.exports = model;
