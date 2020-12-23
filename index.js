//Connection to MongoDB
const conn = require("./connection");

//Express.js
const express = require("express");

//Parser for HTTP requests
const body_parser = require("body-parser");

const app = express();

//Parse JSON requests
app.use(body_parser.json());

//Serve static files
app.use('/static', express.static('public'))

require("./routes")(app);

const port = 5000;

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
})