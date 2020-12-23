/*
	Express.js routes for courses.
*/

const CourseDomain = require("./../domains/course.domain");

module.exports = function(app){

	/*
		GET "/course" route.
		Fetches all available courses.
	*/
	app.get('/course', async function(req, res){

		try{

			let obj = await CourseDomain.GetCourses();

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
		GET "/course/:id" route.
		Fetches specific course by id.
	*/
	app.get('/course/:id', async function(req, res){

		try{

			let id = req.params.id;

			let obj = await CourseDomain.GetCourseById(id);

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
		POST "/course" route.
		Creates course.
	*/
	app.post('/course', async function(req, res){

		try{

			/*
				Checking if requiered field are present in request. 
				Send 400 response (Bad request) if field is missing.
			*/
			if(req.body.name === undefined){
				res.status(400).json(
					{"message": "Name of a course is requiered data"}
				);
			}

			if(req.body.description === undefined){
				res.status(400).json(
					{"message": "Description of a course is requiered data"}
				);
			}

			if(req.body.grid === undefined){
				res.status(400).json(
					{"message": "Chains related to course are requiered"}
				);
			}

			//Holding chain fields in variables
			let name = req.body.name;
			let description = req.body.description;
			let grid = req.body.grid;
			let img = req.body.img === undefined ? "" : req.body.img;

			//Creating new term
			let success = await CourseDomain.CreateCourse(name, description, grid, img);

			//On successfull creating, send response
			res.status(201).json({});

		}catch(err){

			res.status(500).send({"message": err.message});

		}

	});

	/*
		PUT "/course" route.
		Update course.
	*/
	app.put('/course', async function(req, res){

		try{

			/*
				Checking if requiered field are present in request. 
				Send 400 response (Bad request) if field is missing.
			*/
			if(req.body.id === undefined){
				res.status(400).json(
					{"message": "ID of a course is requiered data"}
				);
			}

			if(req.body.name === undefined){
				res.status(400).json(
					{"message": "Name of a course is requiered data"}
				);
			}

			if(req.body.description === undefined){
				res.status(400).json(
					{"message": "Description of a course is requiered data"}
				);
			}

			if(req.body.grid === undefined){
				res.status(400).json(
					{"message": "Chains related to course are requiered"}
				);
			}

			//Holding chain fields in variables
			let id = req.body.id;
			let name = req.body.name;
			let description = req.body.description;
			let grid = req.body.grid;
			let img = req.body.img === undefined ? "" : req.body.img;

			//Creating new term
			let success = await CourseDomain.UpdateCourse(id, name, description, grid, img);

			//On successfull creating, send response
			res.status(204).json({});

		}catch(err){

			res.status(500).send({"message": err.message});

		}

	});

}