const mongoose = require("mongoose");

let schema = new mongoose.Schema(
	{
		name: String,			//name of a term
		type: String,			//type of a term (Definition, Theorem, Lemma etc.)
		description: String,	//short description of a defining text
		text: String,			//content of a term (text of definition, theorem etc.)
		comment: String,		//additional comment about term
		reference: String		//source of text
	}, 
	{ 
		collection: "term" //name of collection
	});

const model = mongoose.model("Term", schema);

module.exports = model;
