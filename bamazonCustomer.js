//Main Bamazon file to work with the BamazonDB

var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "DUb00tc4mp",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;

  console.log("connected as id " + connection.threadId + "\n");
  // run the start function after the connection is made to prompt the user
  displayProducts();
});

//Display all of the products in the DB
function displayProducts() {
  console.log("Displaying all products...\n");
  connection.query("SELECT item_id, product_name, price, FORMAT(price, 2) FROM products", function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price);
        }
  buyProduct();
})
  
};

function buyProduct() {
	inquirer.prompt([
	{
      name: "buyItem",
      type: "input",
      message: "\nPlease enter the ID # for the product you want to buy? ",
      validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
  	}, {

      name: "itemQuantity",
      type: "input",
      message: "How many do you want to buy of this product? ",
      validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
    	}
    }
    ]).then(function(answer) {
    	// console.log("in the .then function")

    });
}