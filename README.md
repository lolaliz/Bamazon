# Bamazon

## Description

An interactive command line application that uses MySQL and Node.js to create an Amazon-like storefront. The app allows users to view all the store's products and make purchases as a customer and  allows users to view and update the store's inventory as a store manager.

### Customer Interface

The customer interface allows users to view all of the store's products available for purchase. Products are displayed in a table with ID numbers, product names, department names, and prices. The user will be prompted to enter the ID number of the item they want to purchase, along with the quantity they want to purchase. If the store has sufficient quantity, the order will be completed and the user will see the total cost of their purchase. If the store does not have sufficient quanity, the user will be notified. 

### Manager Interface 

The manager interface first displays a menu and prompts the user to choose one of five options: **View Products for Sale**, **View Low Inventory**, **Add to Inventory**, **Add New Product**, and **Exit**. The first option displays all the products with ID numbers, product names, department names, prices, and stock quanity. The second option displays the same categories but only for products with a stock quanity of 5 or less. **Add to Inventory** allows the user to add to the stock quantiy of any existing category. **Add New Product** allows the user to add a completely new product. 

### NPM Packages
* [Inquirer](https://www.npmjs.com/package/inquirer#methods)
* [MySQL](https://www.npmjs.com/package/mysql)
* [CLI-Table](https://www.npmjs.com/package/cli-table)
