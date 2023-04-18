const express = require("express");
import DB from "./db.js";
const app = express();
const port: number = 4444;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let db: DB = new DB();

app.get("/", (req, res)=>{
	db.getCustomers().then((r)=>{
		res.json(r);
	});
});


app.listen(port, ()=>{
	console.log("Listening on port "+port+"...");
});
