const mongoose = require("mongoose");

//Chain
const Chain = new mongoose.Schema(
	{
		id: mongoose.ObjectId,
		name: String
	},
	{
		_id : false
	}
);

//Grid row filled with chains for specific level
const Row = new mongoose.Schema(
	{
		items: [Chain],
		comment: String
	},
	{
		_id : false
	}
);

let schema = new mongoose.Schema(
	{
		name: String,			//name of a course
		description: String,	//descsription of a course
		img: String,			//course image
		grid: [Row]				//course grid filled with chains
	}, 
	{ 
		collection: "course" //name of collection
	});

const model = mongoose.model("Course", schema);

module.exports = model;