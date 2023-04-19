const express = require("express");
const bodyParser = require("body-parser");
import DB from "./db.js";
const app = express();
const port: number = 4444;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db: DB = new DB();

/**
 * Home route
 */
app.get("/", (req, res) => {
	res.send("Home");
});

/**
 * Responds with an array of all customers in database
 */
app.get("/api/v1/customers", (req, res) => {
	//Get all with pagination filters
	if (req.query.page != undefined && req.query.perPage != undefined) {

		if (req.query.page <= 0 || req.query.perPage <= 0)
			res.status(404).send("Pagination parameter out of bounds.");

		//Get customers with pagination
		db.getCustomers(
			(req.query.page - 1) * req.query.perPage,
			req.query.perPage
		).then((r) => {
			if (r.length === 0)//If empty return
				res.status(404).send("Not Found");
			else
				res.json(r);
		}
		).catch(err => console.log(err));

	} else {//Get all with no filters
		db.getAllCustomers().then((r) => {
			if (r.length === 0)
				res.status(404).send("Not Found");
			else
				res.json(r);
		});
	}
});

/**
 * Responds with specific customer matching the passed id
 */
app.get("/api/v1/customers/:id", (req, res) => {
	db.getCustomer(req.params.id).then((r) => {
		if (r.length === 0)
			res.status(404).send("Not Found");
		else
			res.json(r);
	});
});


app.listen(port, () => {
	console.log("Listening on port " + port + "...");
});
