/*
	Domain layer for terms. Handles all business logic.
*/
const term = require("./../models/term.model");
const chain = require("./../models/chain.model");

//TODO: Use transactions when working with MongoDB

/*
	Get all terms.
*/
async function GetTerms(name, description, type, page = 1, count = 10){

	let filter = {};

	if(name != null){
		filter.name = new RegExp(".*" + name + ".*", "i");
	}

	if(description != null){
		filter.description = new RegExp(".*" + description + ".*", "i");
	}

	if(type != null){
		filter.type = new RegExp(".*" + type + ".*", "i");
	}

	let obj = await term.aggregate([
		{
			"$match": filter
		},
		{
			"$skip": count * (page - 1)
		},
		{
			"$limit": count
		},
		{
			"$project":{
        		"id": "$_id",
        		"_id": false,
        		"name": true,
        		"type": true,
        		"description": true,
        		"text": true,
        		"comment": true,
        		"reference": true
        	}
		}
    ]);

	let total_filtered = await term.aggregate([{"$match": filter}, {$count: "count"}]);

    let out = {
    	"records": obj,
    	"pagination": {
    		"page": page,
    		"total": total_filtered.length === 0 ? 0 : total_filtered[0].count
    	}
    }

	return out;

}

/*
	Get term by id.
*/
async function GetTermById(id){

	let obj = term.findById(id, {_id: false, __v: false});

	return obj;

}

/*
	Create new term
*/
async function CreateTerm(name, type, description, text, comment, reference){

	let obj = new term(
		{
			name: name, 
			type: type, 
			description: description, 
			text: text, 
			comment: comment, 
			reference: reference
		}
	);

	obj.save();

	return obj;

}

/*
	Update term
*/
async function UpdateTerm(id, name, type, description, text, comment, reference){

	let obj = 
		{
			name: name, 
			type: type, 
			description: description, 
			text: text, 
			comment: comment, 
			reference: reference
		};

	let updateSuccess = await term.updateOne({"_id": id}, obj);

	if(updateSuccess.ok <= 0){
		return false;
	}

	obj =
		{
			"$set": 
				{
					"chain.$.name": name,
					"chain.$.text": text,
					"chain.$.comment": comment
				}
		};

	updateSuccess = await chain.updateMany({"chain.id": id}, obj);

	return true;

}

module.exports = {
	GetTerms,
	GetTermById,
	CreateTerm,
	UpdateTerm
};