//Main Bamazon file to work with the BamazonDB

//Department ideas... Books, Music, Housewares, Clothing, Health

var mysql = require("mysql");
var inquirer = require("inquirer");

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
  connection.query(
    "SELECT item_id, product_name, price, FORMAT(price, 2) FROM products",
    function(err, res) {
      if (err) throw err;

      for (var i = 0; i < res.length; i++) {
        console.log(
          "ID: " +
            res[i].item_id +
            " || Product: " +
            res[i].product_name +
            " || Price: $" +
            res[i].price
        );
      }
      buyProduct();
    }
  );
}

function buyProduct() {
  inquirer
    .prompt([
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
      },
      {
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
    ])
    .then(function(answer) {
      var query = "SELECT item_id, stock_quantity FROM products WHERE ?";
      connection.query(query, { item_id: answer.buyItem }, function(err, res) {
        if (answer.itemQuantity < res[0].stock_quantity) {
          // console.log("Stock Quantity: " + res[0].stock_quantity)
          updateStock(answer);
          console.log("Item(s) purchased!");
          purchaseTotal(answer);

        } else {
          // console.log("Stock Quantity: " + res[0].stock_quantity)
          console.log("Oops! Insufficient quantity. Please try again. ");
          displayProducts();

        }
        // console.log("in the .then function")
      });
    });
}

function updateStock(answer) {
  connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [answer.itemQuantity, answer.buyItem], function(err, res) {
  });
}

function purchaseTotal(answer) {
  var query = "SELECT item_id, price FROM products WHERE ?";
    connection.query(query, { item_id: answer.buyItem }, function(err, res) {

    console.log("Your total cost was: $" + (res[0].price * answer.itemQuantity))
    shopAgain();
    });
}

function shopAgain() {
  inquirer.prompt({
    type: "confirm",
    name: "shopMore",
    message: "Would you like to shop for more items?"
  }).then(function(answer) {
    if (answer.shopMore === true) {
      displayProducts();
    } else {
      console.log("Thank you for shopping today!")
      connection.end();
    }
  });
};