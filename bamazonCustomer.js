var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("You are connected");
    start();
    //connection.end();
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //console.log(results);
        for (var x = 0; x < results.length; x++) {
            console.log(results[x].item_id + " | " + results[x].product_name + " | " + results[x].department_name + " | " + results[x].price + " | " + results[x].stock_quantity);
        }
        //connection.end();
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var y = 0; y < results.length; y++) {
                            choiceArray.push(results[y].item_id);
                        }
                        return choiceArray;
                    },
                    message: "What's the ID of the item you would like to buy?",
                },
                {
                    name: "units",
                    type: "input",
                    message: "How many units would you like to buy?"
                }
            ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                if (chosenItem.stock_quantity > parseInt(answer.units)) {
                    chosenItem.stock_quantity=chosenItem.stock_quantity-answer.units;
                    var finalPrice;
                    // there is enough stock to give the customer
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenItem.stock_quantity
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Stock updated successfully!");
                            //start();
                            
                        }
                    );
                    finalPrice=answer.units*chosenItem.price;
                    console.log("Total cost of purchase: $"+finalPrice);
                    connection.end();
                }
                else {
                    // there wasn't enough stock to sell the client.
                    console.log("Insufficient quantity!");
                    //start();
                    connection.end();
                }

                //connection.end();
            });
    })

}