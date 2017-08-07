var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "DUb00tc4mp",
	database: "bamazon_DB"
});

connection.connect(function(err) {
	if (err) throw err;

	console.log("Connected to server...\n");
});

function startProgram() {
	inquirer
		.prompt([
			{
				type: "rawlist",
				name: "action",
				message: "What would you like to do? ",
				choices: [
					"View Products for Sale",
					"View Low Inventory",
					"Add to Inventory",
					"Add New Product"
				]
			}
		])
		.then(function(answer) {
			switch (answer.action) {
				case "View Products for Sale":
					viewProducts();
					break;
				case "View Low Inventory":
					viewLowInventory();
					break;
				case "Add to Inventory":
					addInventory();
					break;
				case "Add New Product":
					addNewProduct();
					break;
			}
		});
}

function viewProducts() {
	connection.query(
		"SELECT item_id, product_name, price, stock_quantity, FORMAT(price, 2) FROM products",
		function(err, res) {
			if (err) throw err;
			console.log(
				"All Products for Sale:\n----------------------------------------\n"
			);
			for (var i = 0; i < res.length; i++) {
				console.log(
					"ID: " +
						res[i].item_id +
						" || Product: " +
						res[i].product_name +
						" || Price: $" +
						res[i].price +
						" || Stock Quantity: " +
						res[i].stock_quantity
				);
			}
			console.log("\n");
			nextAction();
		}
	);
}

function viewLowInventory() {
	connection.query(
		"SELECT item_id, product_name, price, stock_quantity FROM products WHERE (stock_quantity < 5)",
		function(err, res) {
			if (err) throw err;

			if (res.length === 0) {
				console.log("There are no products on the Low Inventory List.");
			} else {
				console.log(
					"Low Inventory List:\n----------------------------------------\n"
				);

				for (var i = 0; i < res.length; i++) {
					console.log(
						"ID: " +
							res[i].item_id +
							" || Product: " +
							res[i].product_name +
							" || Price: $" +
							res[i].price +
							" || Stock Quantity: " +
							res[i].stock_quantity
					);
				}
				console.log("\n");
				
			}
		nextAction();
		}
	);
}

function addInventory() {
	var productList = [];
	connection.query("SELECT item_id, product_name FROM products", function(req,res) {
		for (var i = 0; i < res.length; i++) {
			productList.push(res[i].product_name);
		}

		inquirer.prompt([
				{
					type: "rawlist",
					name: "item",
					message:
						"To which product do you want to add more inventory? ",
					choices: productList
				},
				{
					type: "input",
					name: "newQuantityAdded",
					message: "How many more items would you like to add? ",
					validate: function(value) {
			          if (isNaN(value) === false) {
			            return true;
			          }
			          return false;
			        }
				}
			])
			.then(function(answer) {
				connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_name = ?",
    				[answer.newQuantityAdded, answer.item], function(err, res) {
    					console.log("Product quantity updated!\n");
      					nextAction();
 				 });
			 
			});
	});
}

function addNewProduct(answer) {
  console.log("Please complete the following information:\n");
	inquirer.prompt([
			{
				name: "itemName",
				type: "input",
				message: "New product name?"
			},{
				name: "department",
				type: "input",
				message: "Department?"
			},{
				name: "price",
				type: "input",
				message: "Retail Price?"
			},{
				name: "quantity",
				type: "input",
				message: "Intial stock quantity?"
			}
		])
		.then(function(answer) {
			connection.query("INSERT INTO products SET ?", [{ product_name: answer.itemName,
				department_name: answer.department, price: answer.price,stock_quantity: answer.quantity}],
			function(err, res) {
				console.log(res.affectedRows + " product inserted!\n");
				nextAction();
			})
		});
};

function nextAction() {
	inquirer
		.prompt([
			{
				name: "next",
				type: "confirm",
				message: "Would you like to do something else?"
			}
		])
		.then(function(answer) {
			if (answer.next === true) {
				startProgram();
			} else {
				console.log("Thank you. Have a nice day!");
				connection.end();
			}
		});
}

//kick off the program
startProgram();
