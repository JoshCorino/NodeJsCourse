/*
    Homework 2
    Deadline: 15 April
    Task:
    Create a JavaScript library that provides advanced data transformation functions. The library should include the following features:
    addValues: Accepts two arguments of any type and performs the appropriate addition operation based on the types of the arguments. The function should return the result of the addition. If the addition is not possible, it should throw an error.
    stringifyValue: Accepts a single argument of any type and converts it to a string representation. For objects and arrays, use JSON.stringify() for serialization. For other types, use the appropriate built-in methods or operations to convert them to strings.
    invertBoolean: Accepts a single boolean argument and returns its inverted value. If the argument is not a boolean, it should throw an error.
    convertToNumber: Accepts a single argument of any type and attempts to convert it to a number. For strings, use parseFloat() or parseInt() for conversion. For other types, use appropriate operations or functions to perform the conversion. If the conversion is not possible, it should throw an error.
    coerceToType: Accepts two arguments: value and type. It attempts to convert the value to the specified type using type coercion. The function should return the coerced value if successful. If the coercion is not possible, it should throw an error.
    (Optional) Implement additional functions of your choice that demonstrate advanced type conversion scenarios or cater to specific use cases related to primitive types. You are encouraged to explore complex scenarios and push the limits of type conversion.
*/
function addValues(val1, val2) {
    if (typeof val1 == typeof val2) {
        if (typeof val1 == 'boolean') {
            return val1 || val2
        } else {
            return val1 + val2
        }
    } else {
        throw new Error(`Error: Values cannot be added because they are of different types`)
    }
}

function stringifyValue(value) {
    switch (typeof value) {
        case 'undefined':
            return 'Undefined';
        case 'object':
            return JSON.stringify(value);
        default:
            return value.toString();
    }
}

function invertBoolean(value) {
    if (typeof value != "boolean") {
        throw new Error(`Error: the value is not a boolean - ${typeof value}`)
    }
    return !value
}

function convertToNumber(value) {
    switch (typeof value) {
        case 'number':
            return value;
        case 'boolean':
            return Number(value);
        case 'bigint':
            return Number(value);
        case 'string':
            return parseFloat(value);
        case 'symbol':
            return parseFloat(value.description);
        default:
            throw new Error(`Error: can not convert the value of type '${typeof value}' to number`);
    }
}

function coerceToType(value, type) {
    switch (type) {
        case 'string':
            return stringifyValue(value);
        case 'number':
            return convertToNumber(value);
        case 'bigint':
            return BigInt(value);
        case 'symbol':
            return Symbol(value);
        case 'boolean':
            return Boolean(value);
        default:
            throw new Error(`Unsupported type '${type}'`);
    }
}

//addValues uses
console.log("addValues usage:")
try {
    console.log("Add a boolean with number values (Error):", addValues("demo", 2))
} catch (error) {
    console.error(error.message)
}
console.log("Add number values:", addValues(1, 2))
console.log("Add boolean values:", addValues(true, false))
console.log("Add boolean values:", addValues(false, false))
console.log("Add string values:", addValues("hel", "lo"), "\n")

//invertBoolean uses
console.log("invertBoolean usage:")
try {
    console.log("Invert a non boolean value (Error):", invertBoolean("demo"))
} catch (error) {
    console.error(error.message)
}
try {
    console.log("Invert a non boolean value (Error):", invertBoolean(1))
} catch (error) {
    console.error(error.message)
}
console.log("Invert a boolean value true:", invertBoolean(true))
console.log("Invert a boolean value false:", invertBoolean(false), "\n")

//stringifyValue uses
console.log("stringifyValue usage:")
console.log("Stringify boolean value:", stringifyValue(true))
console.log("Stringify number value:", stringifyValue(10))
console.log("Stringify bigint value:", stringifyValue(BigInt(9007199254740991)))
console.log("Stringify string value:", stringifyValue("Test"))
console.log("Stringify symbol value:", stringifyValue(Symbol("foo")))
console.log("Stringify function value:", stringifyValue(function createFunction2() {
    const x = 20;
    function f() {
        return x;
    }
    return f;
}))
console.log("Stringify object value:", stringifyValue({ alice: 18, bob: 27 }))
console.log("Stringify array value:", stringifyValue(['0', '1', '2', '5']))
var x;
console.log("Stringify array value:", stringifyValue(x), "\n")

//convertToNumber uses
console.log("convertToNumber usage:")
console.log("Convert number to number:", convertToNumber(1))
console.log("Convert boolean to number:", convertToNumber(true))
console.log("Convert bigint to number:", convertToNumber(BigInt(9007199254740991)))
console.log("Convert string to number:", convertToNumber("12.3"))
console.log("Convert symbol to number:", convertToNumber(Symbol("1234.2")))
try {
    console.log("Convert object to number (Error):", convertToNumber({ alice: 18, bob: 27 }))
} catch (error) {
    console.error(error.message)
}
try {
    console.log("Convert function to number (Error):", convertToNumber(function createFunction2() {
        const x = 20;
        function f() {
            return x;
        }
        return f;
    }))
} catch (error) {
    console.error(error.message, "\n")
}

//coerceToType uses
console.log("coerceToType usage:")
console.log("Coerce number to number:", coerceToType(1, "number"))
console.log("Coerce number to boolean:", coerceToType(1, "boolean"))
console.log("Coerce number to symbol:", coerceToType(1, "symbol"))
console.log("Coerce number to string:", coerceToType(1, "string"))
console.log("Coerce number to bigint:", coerceToType(14234234234232, "bigint"))
console.log("Coerce string to number:", coerceToType("1", "number"))
console.log("Coerce string to boolean:", coerceToType("true", "boolean"))
console.log("Coerce string to symbol:", coerceToType("foo", "symbol"))
console.log("Coerce string to string:", coerceToType("test", "string"))
console.log("Coerce string to bigint:", coerceToType("14234234234232", "bigint"))
console.log("Coerce boolean to number:", coerceToType(true, "number"))
console.log("Coerce boolean to string:", coerceToType(true, "string"))
console.log("Coerce boolean to symbol:", coerceToType(true, "symbol"))
console.log("Coerce boolean to boolean:", coerceToType(true, "boolean"))
console.log("Coerce bigint to number:", coerceToType(BigInt(9007199254740991), "number"))
console.log("Coerce bigint to string:", coerceToType(BigInt(9007199254740991), "string"))
console.log("Coerce bigint to symbol:", coerceToType(BigInt(9007199254740991), "symbol"))
console.log("Coerce bigint to bigint:", coerceToType(BigInt(9007199254740991), "bigint"))