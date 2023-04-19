/**
 * Class which handles all MySQL database interaction
 */
export default class DB {
	con: any;//The database connection.

	/**
	 * Sets up the connection to the MySQL database
	 */
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

		this.con.on('error', function (error) {
			console.log("Database Error:" + error);
		});
	}

	/**
	 * Get all customers from database
	 * @returns JSON array of all customers contained in the database
	 */
	public getAllCustomers() {
		let dbdata: any;
		let query: string = "SELECT * FROM customers";

		dbdata = new Promise((resolve, reject) => {
			try {
				this.con.query(query, function (err, result, fields) {
					if (err) {
						throw err;
						reject();
					}

					resolve(result);
				});
			} catch (err) {
				console.log(err);
				resolve([]);
			}
		});


		return dbdata;
	}

	/**
	 * Selects a defined size array of customers from a defined position
	 * @param start Position to start selecting customers from
	 * @param finish How many customers to select from the start position
	 * @returns JSON array of 'count' customers beginning at 'start'
	 */
	public getCustomers(start: number, count: number) {
		let dbdata: any;
		let query: string = "SELECT * FROM customers LIMIT " + start + ", " + count;

		console.log(query);

		try {
			dbdata = new Promise((resolve, reject) => {

				if (start < 0 || count <= 0)//Shouldn't get to this point, but just in case
					reject(new Error("Pagination parameters out of bounds."));

				this.con.query(query, function (err, result, fields) {
					if (err) {
						reject(new Error("SQL error."));
						//throw err;
					}

					resolve(result);
				});

			});
		} catch (err) {
			console.log(err);
		}


		return dbdata;
	}

	/**
	 * Returns a JSON of customer matching the id passed
	 * @param id customerNumber of the desired customer to be returned
	 * @returns customer matching the id passed
	 */
	public getCustomer(id: number) {
		let dbdata: any;
		let query: string = "SELECT * FROM customers WHERE customerNumber = " + id;

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
