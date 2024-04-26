/*
    Homework 4
    Deadline: 26 April
    Task 1: Object Property Manipulation
    Create an object called person with the following properties and values:

    firstName: "John"
    lastName: "Doe"
    age: 30
    email: "john.doe@example.com"

    Use property descriptors to make all properties of the person object read-only and non-writable, so their values cannot be changed directly.
    Implement a method called updateInfo on the person object that takes a new info object as an argument. The info object should contain updated values for any of the properties (e.g., { firstName: "Jane", age: 32 }). Ensure that this method adheres to the read-only property descriptor set earlier.
    Create a new property called address on the person object with an initial value of an empty object. Make this property non-enumerable and non-configurable.
*/
let person = {}
Object.defineProperties(person, {
    firstName: {
        value: "John",
        writable: false,
        configurable: true,
    },
    lastName: {
        value: "Doe",
        writable: false,
        configurable: true,
    },
    age: {
        value: 30,
        writable: false,
        configurable: true,
    },
    email: {
        value: "john.doe@example.com",
        writable: false,
        configurable: true,
    },
})

console.log("Person firstName:", person.firstName)
person.firstName = "New name"
console.log("Person first name should remain equal after try to change it:", person.firstName)

person.updateInfo = function (info) {
    Object.keys(info).forEach(prop => {
        if (this.hasOwnProperty(prop)) {
            Object.defineProperty(this, prop, {
                value: info[prop],
                writable: false,
                configurable: true
            });
        }
    })
}

console.log("Change person with updateInfo function:")
person.updateInfo({ firstName: "Rick", age: 100 })
console.log("Person first name should be updated:", person.firstName)
console.log("Person age should be updated:", person.age)

Object.defineProperty(person, 'address', {
    value: {},
    enumerable: false,
    configurable: false
})

/*
    Task 2: Object Property Enumeration and Deletion
    Create a new object called product with the following properties and values:

    name: "Laptop"
    price: 1000
    quantity: 5

    Use property descriptors to make the price and quantity properties non-enumerable and non-writable.
    Implement a function called getTotalPrice that takes the product object as an argument and returns the total price (calculated as price * quantity). Ensure that the function accesses the non-enumerable properties directly using the Object.getOwnPropertyDescriptor method.
    Implement a function called deleteNonConfigurable that takes an object and a property name as arguments. The function should delete the specified property from the object if it exists. If the property is non-configurable, throw an error with an appropriate message.
*/
let product = {}
Object.defineProperties(product, {
    name: {
        value: "Laptop",
    },
    price: {
        value: 1000,
        writable: false,
        enumerable: false,
    },
    quantity: {
        value: 5,
        writable: false,
        enumerable: false,
    },
})

function getTotalPrice(product) {
    return Object.getOwnPropertyDescriptor(product, "price").value * Object.getOwnPropertyDescriptor(product, "quantity").value
}

console.log("Get total price:", getTotalPrice(product))

function deleteNonConfigurable(product, propertyName) {
    if (product.hasOwnProperty(propertyName)) {
        if (Object.getOwnPropertyDescriptor(product, propertyName).configurable) {
            delete product.propertyName
        } else {
            throw Error("Error: The property is not configurable")
        }
    }
}

console.log("Get product name:", product.name)
console.log("Try to delete product name...")
try {
    deleteNonConfigurable(product, "name")
} catch (error) {
    console.error(error.message)
}

/*
    Task 3: Object Property Getters and Setters
    Create an object called bankAccount with the following properties and values:
    balance: 1000 (default value)
    Use a getter to define a property called formattedBalance, which returns the balance with a currency symbol (e.g., "$1000").
    Use a setter to define a property called balance, which updates the account balance and automatically updates the corresponding formattedBalance value.
    Implement a method called transfer on the bankAccount object that takes two bankAccount objects and an amount as arguments. The method should transfer the specified amount from the current account to the target account. Ensure that the balance and formattedBalance properties of both accounts are updated correctly.
*/
let bankAccount = {
    _balance: 1000,
    get formattedBalance() {
        return `$${this._balance}`
    },
    set balance(value) {
        this._balance = value
    },
};
console.log("Formatted balance:", bankAccount.formattedBalance)
bankAccount.balance = 4000
console.log("Formatted balance after set it to 4000:", bankAccount.formattedBalance)

/*
    Task 4: Advanced Property Descriptors
    Implement a function called createImmutableObject that takes an object as an argument and returns a new object with all its properties made read-only and non-writable using property descriptors. The function should handle nested objects and arrays recursively.
    Use the createImmutableObject function to create an immutable version of the person object from Task 1.
*/
function createImmutableObject(obj) {
    const newObj = Array.isArray(obj) ? [] : {}

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                newObj[key] = createImmutableObject(obj[key])
            } else {
                newObj[key] = obj[key]
            }
        }
    }

    Object.keys(newObj).forEach(prop => {
        Object.defineProperty(newObj, prop, {
            value: newObj[prop],
            writable: false,
            enumerable: true,
            configurable: false
        })
    })

    return newObj
}
const testObject = { object1: { nestedObject: { name: "Jessica" } }, object2: { age: 12, height: 180 }, string: "Hello" }
console.log("Test object", testObject)
const objectImmutable = createImmutableObject(testObject)
console.log("Copy of test object", objectImmutable)
objectImmutable.string = "changed"
objectImmutable.object1 = {}
console.log("Copy of test object after try to update", objectImmutable)

/*
    Task 5: Object Observation
    Implement a function called observeObject that takes an object and a callback function as arguments. The function should return a proxy object that wraps the original object and invokes the callback function whenever any property of the object is accessed or modified.
    Use the observeObject function to create a proxy for the person object from Task 1. The callback function should log the property name and the action (get or set) performed on the object.
*/
function observeObject(obj, callback) {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            callback(prop, 'get')
            return Reflect.get(target, prop, receiver)
        },
        set(target, prop, value, receiver) {
            callback(prop, 'set')
            return Reflect.set(target, prop, value, receiver)
        }
    })
}
const objProxy = observeObject(testObject, (prop, action) => {
    console.log(`Property "${prop}" was ${action} on the object.`)
})

console.log(objProxy.string)
objProxy.string = "World"
console.log(objProxy.string)

/*
    Task 6: Object Deep Cloning
    Implement a function called deepCloneObject that takes an object as an argument and returns a deep copy of the object. The function should handle circular references and complex nested structures. Do not use JSON methods.
*/
function deepCloneObject(obj, cloned = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    if (cloned.has(obj)) {
        return cloned.get(obj)
    }

    const newObj = Array.isArray(obj) ? [] : {}
    cloned.set(obj, newObj)

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = deepCloneObject(obj[key], cloned)
        }
    }

    return newObj
}
const objectToClone = {
    a: 1,
    b: [2, 3, { c: 4, x: "Rar" }],
    d: { e: { f: 5, u: "Supa" } }
}
console.log("Object to clone:", objectToClone)
const clonedObject = deepCloneObject(objectToClone)
console.log("Cloned object:", clonedObject)

/*
    Task 7: Object Property Validation
    Implement a function called validateObject that takes an object and a validation schema as arguments. The schema should define the required properties, their types, and any additional validation rules. The function should return true if the object matches the schema, and false otherwise. You can choose any schema you want.
*/
function validateObject(obj, schema) {
    for (const prop in schema) {
        if (!obj.hasOwnProperty(prop)) {
            return false
        }

        if (typeof obj[prop] !== schema[prop]) {
            return false
        }
    }

    return true;
}

const sampleValidObject = {
    name: "John",
    age: 30,
    email: "john30@example.com"
}

const sampleInvalidObject = {
    name: 47,
    age: "hi",
}

const sampleSchema = {
    name: "string",
    age: "number",
    email: "string"
}

console.log("Validate valid object:", validateObject(sampleValidObject, sampleSchema))
console.log("Validate invalid object:", validateObject(sampleInvalidObject, sampleSchema))