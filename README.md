# Bamazon
__Amazon-style CLI (Command Line Interface) Application using Node.js, JavaScript and MySQL.__

In this CLI App, customers can shop for a variety of products offered by Bamazon. Store managers can also manage their inventory. Let's begin with the customer view.

Before you run the app, make sure you have installed the required Node modules first. You can do this by running `npm install` in your Command Terminal. Also, start the MySQL server.

### Customer View
To begin, enter into your Terminal `node bamazonCustomer` and press Enter. 

Here, the customer is presented with a list of items they can purchase from the store.

![Starting the Program](/images/bamCust_productList.PNG)

Next, the customer is prompted to enter the ID Number of the item they wish to purchase and to enter the quantity desired for this item.

![Buying a Product](/images/bamCust_buyProduct.PNG)

Their purchase is processed, their total cost is presented, and then the customer is prompted if they would like to do any more shopping.

If the response is `Y` (yes), then the customer is presented with the full list of items available and goes through the same shopping process as outlined above.

If the response is `N` (no), then the program ends with a closing message.

![Ending the Program](/images/bamCust_buyMoreThenEndProg.PNG)


### Manager View
To begin, enter into your Terminal `node bamazonManager` and press Enter. 

Here, the manager is presented with a list of actions they can choose to manage their store's inventory.

![Starting the Program](/images/bamManager_start.PNG)

To select an option, enter the corresponding number and press Enter.

1. __The first option displays a list of all items for sale and their inventory level (stock quantity).__

![List all Products](/images/bamManager_listStock.PNG)

2. __The second option displays a list of all items with low inventory levels (less than 5 items).__

![List Low Inventory](/images/bamManager_lowStock.PNG)

3. __The third option allows the manager to add more stock to a product.__

![Add Inventory](/images/bamManager_addInventory.PNG)

  - The manager chooses a product to update and then is prompted for how much ADDITIONAL stock to add for this item (*the new stock quantity will reflect the current stock PLUS the additional stock the manager added*).
   ![Updated Inventory](/images/bamManager_stockUpdated.PNG)

4. __The fourth option allows the manager to add an entirely new product to the store's offerings.__
The manager types in the necessary information for the new product with each prompt.
![Add New Product](/images/bamManager_newProduct.PNG)


After each action in the list is performed, the manager is prompted if he/she would like to complete another action.

If the response is `Y` (yes), then the manager is presented with the full list of actions available.

If the response is `N` (no), then the program ends with a closing message.

![Ending the Program](/images/bamManager_endProg.PNG)

