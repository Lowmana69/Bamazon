var inquirer  = require ("inquirer");
var mysql = require ("mysql");
var Table = require ("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "BamazonDB",
    port: 3306
})

connection.connect();

var displayTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if(err) throw err;
        console.log("Bamazon Bids You WELCOME!!");
        console.log("Please Make Your Selection");
        
    var table = new Table({
        head: ['ItemID', 'Product', 'Department', 'Price', 'Stock' ],
        colWidths: [12, 15, 20, 10, 20],
        colAligns: ['center', 'left', 'right'] 
    });
    for(var i = 0; i < res.length; i++) {
        table.push(res[1.ItemID, res[i].Products, res[i].Deparment, res[i].Price, res[i].Stock]);
    }
    console.log(table.toString());

    })
};



var shopping = function() {
    inquirer.prompt({
        name: "Selection",
        type: "input",
        message: "Please enter the Item Id to make your selection."
    }).then(function(answer1){
        var select = answer1.Selection;
        connection.query('SELECT * FROM products WHERE ItemID=?', selection, function(err, res){
            if(err) throw err;
            if(res.length === 0) {
                    console.log('Item Id does not match with any items in the store. Please make a new selection')
                };
                shopping();
            } else {
                inquirer.prompt({
                    name: "Quantity",
                    type: "input",
                    message: "How many would you like to purchase today?"
                }).then(function(answer2){
                    var quantity = answer2.Quantity;
                    if(quantity > res[0].Stock) {
                        console.log("Our Sincerist Apologies, We only have " + res[0].Stock + " items of the product you have selected");
                        shopping();
                    }
                });
            } else {
                console.log("");
                console.log(res[0].Product + " purchased");
                console.log(quatity + "qty at $ " + res[0].Price);

                var updateStock = res[0].Stock = quantity;
                connection.query)("UPDATE products SET Stock = " + updateStock + " WHERE ItemID = " + res[0].ItemID, function(err, resUpdate){
                    if(err) throw err;
                    console.log("");
                    console.log("Your Order has been processed");
                    console.log("Thank You for Shopping at Bamazon!!");
                    console.log("");
                    connection.end();
                });
            }
        });
    });
};
displayTable(); 