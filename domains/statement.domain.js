/*
	Domain layer for statements. Handles all business logic.
*/
const statement = require("./../models/statement.model");

/*
	Get all statements.
*/
async function GetStatements(){

	let obj = await statement.find({}, {_id: false, __v: false});

	return obj;

}

module.exports = {
	GetStatements
};