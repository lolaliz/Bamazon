var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bamazon_DB'
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("******** Welcome to the Bamazon Store **********")
    start()
  });


function start () {
    inquirer
    .prompt({
        name: "productDisplay",
        type:"rawlist",
        message: "Would you like to see our products?",
        choices: ["Yes", "No"]
    })
    .then(function(answer) { 
        if(answer.productDisplay=== "Yes"){ 
                displayProducts()
                purchasePrompts ()
        } else {
            console.log("Good-bye!")
            connection.end();
            }
        })
    }


function displayProducts (){
    var productTable = new Table({
        head: ['Item ID #', 'Product', 'Department', 'Price'],
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
      connection.query('SELECT id, product_name, department_name, price FROM products ORDER BY id', function(err, results) {
        if (err) throw err;
        if (results.length) {
            for (var i = 0; i < results.length; i++) {
                productTable.push(
                    [
                        results[i].id,
                        results[i].product_name,
                        results[i].department_name,
                        '$' + results[i].price
                    ]
                );
            }
            console.log(productTable.toString()) } else {
                console.log ("We are out of stock!")
                 }
        })
    }


 function purchasePrompts () {
    connection.query("SELECT * FROM products", function(err, results) {
       if (err) throw err;  
        inquirer
        .prompt ([ 
            {
            name: "productID",
            type: "input",
            message: "Please enter the ID # of the product you would like to purchase.",
            validate: function (value){
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function (value){
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                    }
            }
        ])
        .then(function(answer) {
            var customerChoiceID = parseInt(answer.productID)
            console.log("Chosen Item ID:", customerChoiceID)
            var customerQuantity = parseInt(answer.quantity)
            console.log("Quantity requested:", customerQuantity)
            purchaseCheck(customerChoiceID, customerQuantity)
            })
        })
    }


function purchaseCheck (ID, quantityRequest){ 
    connection.query("SELECT * FROM products WHERE id = " + ID, function(err, results) { 
        if (err) throw err;
        if (quantityRequest <= results[0].stock_quantity){
            var total = results[0].price * quantityRequest
            var updateQ = results[0].stock_quantity - quantityRequest
            console.log("We have enough!")

            connection.query("UPDATE products SET stock_quantity = " + updateQ + " WHERE id = " + ID, function(err, results){ 
            console.log("Your total is $" + total)
            keepShopping()
            })
        } else {
            console.log ("Insufficient quantity!") 
            start()
            }
        })
    }


function keepShopping () {
    inquirer.prompt ([{
        name: "moreItems",
        type: "confirm",
        message: "Would you like to keep shopping?",
        default: true
        }])
    .then(function(answer){
        if (answer.moreItems)
        connection.query("SELECT * FROM products", function(err, results){
            if (err) throw err;
            console.log(results)
            purchasePrompts ()
        })
        else {
            connection.end()
             }
        })
    }

