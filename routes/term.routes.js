const TermDomain = require("./../domains/term.domain");

module.exports = function(app){

	/*
		GET "/term" route.
		Fetches all available terms.
	*/
	app.get('/term', async function(req, res){

		try{

			let name = (req.query.name === undefined ? null : req.query.name);
			let description = (req.query.description === undefined ? null : req.query.description);
			let type = (req.query.type === undefined ? null : req.query.type);
			let page = (req.query.page === undefined ? 1 : parseInt(req.query.page));
			let count = (req.query.count === undefined ? 10 : parseInt(req.query.count));

			let obj = await TermDomain.GetTerms(name, description, type, page, count);

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
		GET "/term/:id" route.
		Fetches specific term by id.
	*/
	app.get('/term/:id', async function(req, res){

		try{

			let id = req.params.id;

			let obj = await TermDomain.GetTermById(id);

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
		POST "/term" route.
		Creates new term.
	*/
	app.post('/term', async function(req, res){

		try{

			/*
				Checking if requiered field are present in request. 
				Send 400 response (Bad request) if field is missing.
			*/
			if(req.body.name === undefined){
				res.status(400).json(
					{"message": "Name of a term is requiered data"}
				);
			}

			if(req.body.type === undefined){
				res.status(400).json(
					{"message": "Type of a term is requiered data"}
				);
			}

			if(req.body.description === undefined){
				res.status(400).json(
					{"message": "Description of a term is requiered data"}
				);
			}

			if(req.body.text === undefined){
				res.status(400).json(
					{"message": "Text of a term is requiered data"}
				);
			}

			if(req.body.comment === undefined){
				res.status(400).json(
					{"message": "Comment of a term is requiered data"}
				);
			}

			if(req.body.reference === undefined){
				res.status(400).json(
					{"message": "Reference of a term is requiered data"}
				);
			}

			//Holding term fields in variables
			let name = req.body.name;
			let type = req.body.type;
			let description = req.body.description;
			let text = req.body.text;
			let comment = req.body.comment;
			let reference = req.body.reference;

			//Creating new term
			let obj = await TermDomain.CreateTerm(name, type, description, text, comment, reference);

			//Forming JSON response
			let jsonResponse = {
				"id": obj._id,
				"name": obj.name,
				"type": obj.type,
				"description": obj.description,
				"text": obj.text,
				"comment": obj.comment,
				"reference": obj.reference
			};

			//On successfull creating, send response
			res.status(201).json(jsonResponse);

		}catch(err){

			res.status(500).send({"message": err.message});

		}

	});


	/*
		PUT "/term" route.
		Updates term by id.
	*/
	app.put('/term', async function(req, res){

		try{

			/*
				Checking if requiered field are present in request. 
				Send 400 response (Bad request) if field is missing.
			*/
			if(req.body.id === undefined){
				res.status(400).json(
					{"message": "ID of a term is requiered data"}
				);
			}

			if(req.body.name === undefined){
				res.status(400).json(
					{"message": "Name of a term is requiered data"}
				);
			}

			if(req.body.type === undefined){
				res.status(400).json(
					{"message": "Type of a term is requiered data"}
				);
			}

			if(req.body.description === undefined){
				res.status(400).json(
					{"message": "Description of a term is requiered data"}
				);
			}

			if(req.body.text === undefined){
				res.status(400).json(
					{"message": "Text of a term is requiered data"}
				);
			}

			if(req.body.comment === undefined){
				res.status(400).json(
					{"message": "Comment of a term is requiered data"}
				);
			}

			if(req.body.reference === undefined){
				res.status(400).json(
					{"message": "Reference of a term is requiered data"}
				);
			}

			//Holding term fields in variables
			let id = req.body.id;
			let name = req.body.name;
			let type = req.body.type;
			let description = req.body.description;
			let text = req.body.text;
			let comment = req.body.comment;
			let reference = req.body.reference;

			//Creating new term
			let success = await TermDomain.UpdateTerm(id, name, type, description, text, comment, reference);

			//On successfull creating, send response
			res.status(204).json({});

		}catch(err){

			res.status(500).send({"message": err.message});

		}

	});

}