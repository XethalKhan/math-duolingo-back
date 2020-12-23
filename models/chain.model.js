const mongoose = require("mongoose");

const Term = new mongoose.Schema(
	{
		id: mongoose.ObjectId,
		name: String,
		text: String,
		comment: String
	},
	{
		_id : false
	}
);

let schema = new mongoose.Schema(
	{
		name: String,			//name of a chain
		description: String,	//descsription of a chain
		chain: [Term]			//course chain filled with terms
	}, 
	{ 
		collection: "chain" 	//name of collection
	});

const model = mongoose.model("Chain", schema);

module.exports = model;