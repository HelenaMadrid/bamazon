var mysql = require("mysql");
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
    printAll();
    //connection.end();
});

function printAll() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //console.log(results);
        for (var x = 0; x < results.length; x++) {
            console.log(results[x].item_id + " | " + results[x].product_name + " | " + results[x].department_name + " | " + results[x].price + " | " + results[x].stock_quantity);
        }
        connection.end();
    })
}