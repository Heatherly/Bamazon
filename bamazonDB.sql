DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL (6,2),
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Coffee Mug", "Housewares", 5.00, 25),("Coffee Maker", "Housewares", 45.00, 15),("T-shirt", "Men Clothing", 10.50, 10),("Movie-logo Tie", "Men's Clothing", 19.50, 8),("Dress", "Women's Clothing", 35.00, 12),("Lawn Mower", "Home & Garden", 300.00, 5),("Weed Trimmer", "Home & Garden", 150.00, 7), ("60-inch TV", "Electronics", 600.00, 10), ("Blu-ray Player", "Electronics", 100.00, 15), ("MacBook Pro", "Electronics", 1600.00, 4);