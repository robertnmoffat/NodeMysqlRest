export default class DB {
	con: any;

	constructor() {
		console.log("Calling constructor.");
		let mysql = require('mysql');

		this.con = mysql.createConnection({
			host: 'localhost',
			user: 'test',
			password: '1Password!',
			database: 'classicmodels',
		});

		this.con.connect(function (err) {
			if (err) throw err;
			console.log('connected!');
		});
	}

	public getCustomers() {
		let dbdata: any;
		let query: string = "SELECT * FROM customers";

		dbdata = new Promise((resolve, reject) => {
			this.con.query(query, function (err, result, fields) {
				if (err) {
					throw err;
					reject();
				}

				resolve(result);
			});
		});


		return dbdata;
	}
}
