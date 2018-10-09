var faker = require('faker');

function printPriceList(numItems) { // Print a numItems amount of random items and prices
    console.log("===================");
    console.log("WELCOME TO MY SHOP!");
    console.log("===================");
    for (var i = 0; i < numItems; i++){
        console.log(faker.commerce.productName() + " - " + faker.commerce.price() + " €")
    }
}

printPriceList(10); // Print 10 random items and prices