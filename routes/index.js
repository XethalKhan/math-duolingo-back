module.exports = function(app){

	require("./term.routes")(app);
	require("./course.routes")(app);
	require("./chain.routes")(app);
	require("./statement.routes")(app);

}