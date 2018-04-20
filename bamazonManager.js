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
    console.log("******** Welcome Bamazon Store Manager **********")
    managerMenu()
  });


  function managerMenu () {
    inquirer
    .prompt({
        name: "initialMenu",
        type:"rawlist",
        message: "What would you like to do today?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    })
    .then(function(answer) { 
        switch (answer.initialMenu){
            case "View Products for Sale":
            viewProducts ()
            break;
            case "View Low Inventory":
            viewLow ()
            break;
            case "Add to Inventory":
            addInventoryInfo ()
            break;
            case "Add New Product":
            addNew ()
            break;
            case "Exit":
            console.log ("Good-bye!")
            connection.end ()
            break;

        }
      })
  }

  function viewProducts (){
    var managerTable = new Table({
        head: ['Item ID #', 'Product', 'Department', 'Price', 'Stock Quantity'],
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
      connection.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;
        if (results.length) {
            for (var i = 0; i < results.length; i++) {
                managerTable.push(
                    [
                        results[i].id,
                        results[i].product_name,
                        results[i].department_name,
                        '$' + results[i].price,
                        results[i].stock_quantity
                    ]
                );
            }
            console.log(managerTable.toString()) 
            managerMenu ()
             } else {
                console.log ("We are out of stock!")
                connection.end()
            }
})
  }

function viewLow (){
    var lowInventory = new Table({
        head: ['Item ID #', 'Product', 'Department', 'Price', 'Stock Quantity'],
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
      connection.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;
        if (results.length) {
            for (var i = 0; i < results.length; i++) {
                if (results[i].stock_quantity <= 5) { 
                lowInventory.push(
                    [
                        results[i].id,
                        results[i].product_name,
                        results[i].department_name,
                        '$' + results[i].price,
                        results[i].stock_quantity
                    ]
                );}
            }
            console.log(lowInventory.toString())
            managerMenu ()
             } else {
                console.log ("No low inventory stock!")
                connection.end()
            }
})
}

function addInventoryInfo (){
    connection.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;
        inquirer.prompt([{
                name: "moreProductID",
                type: "input",
                message: "Please enter the ID # of the product to add inventory to",
                validate: function (value){
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                    }
            },
            {
                name: "amountAdd",
                type: "input",
                message: "Please enter the amount to add",
                validate: function (value){
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                    }
            }
            ])
            .then(function(answer) {
                var moreStockID = parseInt(answer.moreProductID)
                console.log("Stock ID:", moreStockID)
                var addAmount = parseInt(answer.amountAdd)
                console.log("Amount to add:", addAmount)
                addInventoryDB (moreStockID, addAmount)

            })
    })
}

function addInventoryDB (ID, amount) {
    connection.query("SELECT * FROM products WHERE id = " + ID, function(err, results) {
        
        if (err) throw err;

            var updateStock = results[0].stock_quantity + amount
            console.log("New Stock Quantity:", updateStock)
           
            connection.query("UPDATE products SET stock_quantity = " + updateStock + " WHERE id = " + ID, function(err, results){ 
                
            })
            console.log ("Inventory updated!") 
            managerMenu()
    })
}

function addNew () {
    connection.query("SELECT * FROM products", function(err, res){
        if(err)throw err;
        inquirer.prompt([{
            name: "productName",
            type: "input",
            message: "Enter the name of the new product",
        },
        {
            name: "deptName",
            type: "input",
            message: "Enter the department name in which to place the product"
        },
        {
            name:"productPrice",
            type: "input",
            message: "Enter the product price"
        },
        {
            name: "productQ",
            type: "input",
            message: "Enter the stock quantity of the new product"
        }
    ]).then (function(answer){
        connection.query("INSERT INTO products SET ?", {
                product_name: answer.productName,
                department_name: answer.deptName,
                price: answer.productPrice,
                stock_quantity: answer.productQ
        }, function(err) {
                if (err) throw err;
                console.log("New product added");
                managerMenu()
             })
        })
    })
}