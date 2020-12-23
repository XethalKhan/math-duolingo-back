/*
	Domain layer for courses. Handles all business logic.
*/

const chainModel = require("./../models/chain.model");
const courseModel = require("./../models/course.model");

/*
	Get all chains.
*/
async function GetChains(name, description, page = 1, count = 10){

	let filter = {};

	if(name != null){
		filter.name = new RegExp(".*" + name + ".*", "i");
	}

	if(description != null){
		filter.description = new RegExp(".*" + description + ".*", "i");
	}

	let obj = await chainModel.aggregate([
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
        		"description": true,
        		"chain": true
        	}
		}
    ]);

    let total_filtered = await chainModel.aggregate([{"$match": filter}, {$count: "count"}]);

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
	Get chain by id.
*/
async function GetChainById(id){

	let obj = await chainModel.findById(id, {_id: false, __v: false});

	return obj;

}

/*
	Create new chain
*/
async function CreateChain(name, description, chain){

	let obj = new chainModel(
		{
			name: name, 
			description: description,
			chain: chain
		}
	);

	obj.save();

	return obj;

}

/*
	Update chain
*/
async function UpdateChain(id, name, description, chain){

	let obj = 
		{
			"name": name, 
			"description": description, 
			"chain": chain,
		};

	let updateSuccess = await chainModel.updateOne({"_id": id}, obj);

	if(updateSuccess.ok <= 0){
		return false;
	}

	obj =
		{
			"$set": 
				{
					"grid.$[].items.$[inner].name": name,
				}
		};

	updateSuccess = await courseModel.updateMany({}, obj, {"arrayFilters": [{"inner.id": id}]});

	return true;

}

module.exports = {
	GetChains,
	GetChainById,
	CreateChain,
	UpdateChain
};