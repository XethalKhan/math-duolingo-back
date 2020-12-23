/*
	Express.js routes for courses.
*/

const ChainDomain = require("./../domains/chain.domain");

module.exports = function(app){

	/*
		GET "/chain" route.
		Fetches all available courses.
	*/
	app.get('/chain', async function(req, res){

		try{

			let name = (req.query.name === undefined ? null : req.query.name);
			let description = (req.query.description === undefined ? null : req.query.description);
			let page = (req.query.page === undefined ? 1 : parseInt(req.query.page));
			let count = (req.query.count === undefined ? 10 : parseInt(req.query.count));

			let obj = await ChainDomain.GetChains(name, description, page, count);

			if(obj === null){

				res.status(404).json({});

			}else{

				res.status(200).json(obj);

			}

		}catch(err){

			res.status(500).send({message: err.message});

		}

	});

	/*
		GET "/chain/:id" route.
		Fetches specific course by id.
	*/
	app.get('/chain/:id', async function(req, res){

		try{

			let id = req.params.id;

			let obj = await ChainDomain.GetChainById(id);

			if(obj === null){

				res.status(404).json({});

			}else{

				res.status(200).json(obj);

			}

		}catch(err){

			res.status(500).json({message: err.message});

		}

	});

	/*
		POST "/chain" route.
		Creates new chain.
	*/
	app.post('/chain', async function(req, res){

		try{

			/*
				Checking if requiered field are present in request. 
				Send 400 response (Bad request) if field is missing.
			*/
			if(req.body.name === undefined){
				res.status(400).json(
					{"message": "Name of a chain is requiered data"}
				);
			}

			if(req.body.description === undefined){
				res.status(400).json(
					{"message": "Description of a chain is requiered data"}
				);
			}

			//Holding term fields in variables
			let name = req.body.name;
			let description = req.body.description;
			let chain = (req.body.chain === undefined ? [] : req.body.chain);

			//Creating new term
			let obj = await ChainDomain.CreateChain(name, description, chain);

			//Forming JSON response
			let jsonResponse = {
				"obj": {
					"name": obj.name,
					"description": obj.description,
					"chain": obj.chain
				},
				"resource": "chain/" + obj._id
			};

			//On successfull creating, send response
			res.status(201).json(jsonResponse);

		}catch(err){

			res.status(500).send({"message": err.message});

		}

	});

	/*
		PUT "/chain" route.
		Creates new chain.
	*/
	app.put('/chain', async function(req, res){

		try{

			/*
				Checking if requiered field are present in request. 
				Send 400 response (Bad request) if field is missing.
			*/
			if(req.body.id === undefined){
				res.status(400).json(
					{"message": "ID of a chain is requiered data"}
				);
			}

			if(req.body.name === undefined){
				res.status(400).json(
					{"message": "Name of a chain is requiered data"}
				);
			}

			if(req.body.description === undefined){
				res.status(400).json(
					{"message": "Description of a chain is requiered data"}
				);
			}

			if(req.body.chain === undefined){
				res.status(400).json(
					{"message": "Terms related to chain are requiered"}
				);
			}

			//Holding chain fields in variables
			let id = req.body.id;
			let name = req.body.name;
			let description = req.body.description;
			let chain = req.body.chain;

			//Creating new term
			let success = await ChainDomain.UpdateChain(id, name, description, chain);

			//On successfull creating, send response
			res.status(204).json({});

		}catch(err){

			res.status(500).send({"message": err.message});

		}

	});

}