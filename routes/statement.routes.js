/*
	Express.js routes for courses.
*/

const StatementDomain = require("./../domains/statement.domain");

module.exports = function(app){

	/*
		GET "/statement" route.
		Fetches all available statement types.
	*/
	app.get('/statement', async function(req, res){

		try{

			let obj = await StatementDomain.GetStatements();

			if(obj === null){

				res.status(404).json({});

			}else{

				res.status(200).json(obj);

			}

		}catch(err){

			res.status(500).send({message: err.message});

		}

	});

}