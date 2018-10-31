// var colt = {
//     name: 'Colt',
//     sayHi: function(){
//         return `Hi, ${this.name}!`;
//     },
//     addNumbers: function(a,b,c,d){
//         return `${this.name} just calculated ${a+b+c+d}!`;
//     }
    
// };

// var elie = {
//     name: 'Elie',
// };

// var elieCalc = colt.addNumbers.bind(elie,1,2,3,4);

// var elieCalc2 = colt.addNumbers.bind(elie,1,2);

var colt = {
    name: 'Colt',
    sayHi: function(){
        setTimeout(function(){
            console.log(`Hello ${this.name}!`);
        }.bind(this), 1000);  // if not using bind(this), this will refer to the global window object
    },
    addNumbers: function(a,b,c,d){
        return `${this.name} just calculated ${a+b+c+d}!`;
    }
};


var elie = {
    name: 'Elie',
};

var elieCalc = colt.addNumbers.bind(elie,1,2,3,4);

var elieCalc2 = colt.addNumbers.bind(elie,1,2);

function Person(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
};



// OBJECTS

// function House - traditionally with capital letter to let people know its a constructor
function House(bedrooms, bathrooms, numSqft){
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.numSqft = numSqft;
}

// Dog constructor, name, age + function bark
function Dog(name, age){
    this.name = name,
    this.age = age,
    this.bark = function(){
        console.log(`${this.name} just barked!`);
    };
}


// making constructors for motorcycle and car
function Car(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 4; // This is a preset value!
}

function Motorcycle(make, model, year){
    // using call can use again keyword 'this'
    Car.call(this, make, model, year); // Calling function Car inside avoids duplication in code!
    // Because it is another function used in Motorcycle object, it needs .call(this, , , )
    this.numWheels = 2;
}

// Alternative method for making Motorcycle using apply
function MotorcycleApply(make, model, year){
    // using call can use again keyword 'this'
    Car.apply(this, [make, model, year]); // When using apply, need to use an array
    this.numWheels = 2;
}

// The shortest method, with apply
function MotorcycleArguments(make, model, year){
    Car.apply(this, arguments);
    this.numWheels = 2;
}


// practice create Vehicle and functions turnOn, turnOff and honk
function Vehicle(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
}

Vehicle.prototype.turnOn = function(){
    if (!this.isRunning){
        this.isRunning = true;
        console.log(`The ${this.make} ${this.model} is now running!`);
    } else {
       console.log(`The ${this.make} ${this.model} is already running!`); 
    }
};

Vehicle.prototype.turnOff = function(){
    if (this.isRunning){
        this.isRunning = false;
        console.log(`The ${this.make} ${this.model} is turned off!`);
    } else {
       console.log(`The ${this.make} ${this.model} is already off!`); 
    }
};

Vehicle.prototype.honk = function(){
        if (this.isRunning){
            return 'beep';
        }
};

var ford = new Vehicle('Ford', 'Orion', '1987');


// closures

function outerFn(){
    var data = 'Data from the outer';
    return function innerFn(){
        return data + ' - and the data from the inner';
    };
}

function counter(){
    var count = 0;
    return function(){
        return ++count;
    };
}

var counter1 = counter();
var counter2 = counter();