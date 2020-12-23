/*
	Domain layer for courses. Handles all business logic.
*/

const course = require("./../models/course.model");

/*
	Get all courses.
*/
async function GetCourses(){

	let obj = await course.find({}, {grid: false, __v: false});

	return obj;

}

/*
	Get course by id.
*/
async function GetCourseById(id){

	let obj = await course.findById(id, {_id: false, __v: false});

	return obj;

}

/*
	Create new course
*/
async function CreateCourse(name, description, grid, img){

	let obj = new course(
		{
			"name": name, 
			"description": description,
			"grid": grid,
			"img": img
		}
	);

	obj.save();

	return obj;

}

/*
	Update course
*/
async function UpdateCourse(id, name, description, grid, img){

	let obj = 
		{
			"name": name, 
			"description": description, 
			"grid": grid
		};

	let updateSuccess = await course.updateOne({"_id": id}, obj);

	if(updateSuccess.ok <= 0){
		return false;
	}

	return true;

}

module.exports = {
	GetCourses,
	GetCourseById,
	CreateCourse,
	UpdateCourse
};