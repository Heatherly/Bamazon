# Bamazon
Amazon-style CLI (Command Line Interface) using Node.js, JavaScript and MySQL

In this CLI App, customers can shop for a variety of products offered by Bamazon. Store managers can also manage their inventory. Let's begin with the customer view.

Before you run the app, make sure you have installed the required Node modules first. You can do this be running <npm install> in your Command Terminal. Also, start the MySQL server.

## Customer View
To begin, enter into your Terminal `node bamazonCustomer` and press Enter. 

Here, the customer is presented with the list of items from which they can purchase.
![Starting the Program](/images/bamCust_productList.PNG)

Next, the customer is prompted to enter the ID Number of the item they wish to purchase, and to enter the quantity desired for this item.
![Buying a Product](/images/bamCust_buyProduct.PNG)

Their purchase is processed, their total cost is presented, and then the cusomter is prompted if they would like to do any more shopping.

If the response is `Y` (yes), then the customer is presented with the full list of items available, goes through the same shopping process as outlined above.

If the response is `N` (no), then the program ends with a closing message.
![Ending the Program](/images/bamCust_buyMoreThenEndProg.PNG)
