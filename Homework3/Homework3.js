/*
    Homework 3
    Deadline: 22 April

    Task 1: Immutability and Pure Functions
    Implement a pure function called calculateDiscountedPrice that takes an array of products and a discount percentage as arguments. The function should return a new array of products with discounted prices based on the given percentage, without modifying the original products.
    Create a pure function called calculateTotalPrice that takes an array of products as an argument. The function should return the total price of all products, without modifying the original array or its items.
*/

function calculateDiscountedPrice(products, discount) {
    let result = []
    products.forEach((value) =>
        result.push(value - value * discount / 100)
    )
    return result
}

function calculateTotalPrice(products) {
    let result = 0
    products.forEach((value) =>
        result += value
    )
    return result
}

console.log("calculateDiscountedPrice() uses:")
console.log("Apply 20% of discount to [1000, 100, 20, 25, 645, 21412]", calculateDiscountedPrice([1000, 100, 20, 25, 645, 21412], 20))
console.log("Apply 20% of discount to []", calculateDiscountedPrice([], 20))
console.log("Apply 100% of discount to [1023100, 100234, 22340, 6425, 643255, 452412]", calculateDiscountedPrice([1023100, 100234, 22340, 6425, 643255, 452412], 100))

console.log("calculateTotalPrice() uses:")
console.log("Calculate total price of [1000, 100, 20, 25, 645, 21412]", calculateTotalPrice([1000, 100, 20, 25, 645, 21412]))
console.log("Calculate total price of []", calculateTotalPrice([]))
console.log("Calculate total price of [1023100, 100234, 22340, 6425, 643255, 452412]", calculateTotalPrice([1023100, 100234, 22340, 6425, 643255, 452412]))

/*

    Task 2: Function Composition and Point-Free Style
    Implement a function called getFullName that takes a person object with firstName and lastName properties. The function should return the person's full name in the format "FirstName LastName".
    Create a function called filterUniqueWords that takes a string of text and returns an array of unique words, sorted in alphabetical order, without using explicit loops. Use function composition and point-free style.
    Implement a function called getAverageGrade that takes an array of student objects, each containing a name and grades property. The function should return the average grade of all students, without modifying the original array or its items. Use function composition and point-free style.
*/

function getFullName(person) {
    return person.firstName.charAt(0).toUpperCase() + person.firstName.slice(1) + " " + person.lastName.charAt(0).toUpperCase() + person.lastName.slice(1)
}

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const toLowerCaseAndSplit = (word) => word.toLowerCase().match(/\w+/g)
const filterUnique = (words) => words.filter((word, index, array) => array.indexOf(word) === index)
const sortWords = (words) => words.sort()

const filterUniqueWords = compose(
  sortWords,
  filterUnique,
  toLowerCaseAndSplit
)

const getAverageGrade = (students) => parseFloat(students.reduce((acc, n) => acc + n.grade, 0)/students.length)

console.log("getFullName() uses:")
console.log("Full name with values in lowercase", getFullName({ firstName: "michael", lastName: "mars" }))
console.log("Full name happy path", getFullName({ firstName: "Rico", lastName: "Mamoa" }))
console.log("Full name without last name", getFullName({ firstName: "Rick", lastName: "" }))

console.log("filterUniqueWords() uses:")
console.log(filterUniqueWords("Hi, this is a text that I created to test the filterUniqueWords function function this text that hi created"))
console.log(filterUniqueWords("Hi hi hi ih ih ih hi hi hi hi hi hi hi hi hi hi hi hi hi ih"))

console.log("getAverageGrade() uses:")
console.log("Average of 6 students", getAverageGrade([{ name: "Rick", grade: 10 }, { name: "Phoebee", grade: 7 }, { name: "Janice", grade: 8 }, { name: "Ross", grade: 4 }, { name: "Joey", grade: 1 }, { name: "Rachel", grade: 8 }]))
console.log("Average of 1 student", getAverageGrade([{ name: "Rick", grade: 10 }]))
console.log("Average of 0 students", getAverageGrade([]))

// /*
//     Task 3: Closures and Higher-Order Function
//     Create a function called createCounter that returns a closure. The closure should be a counter function that increments the count on each call and returns the updated count. Each closure should have its own independent count.
//     Implement a higher-order function called repeatFunction that takes a function and a number as arguments. The function should return a new function that invokes the original function multiple times based on the provided number. If the number is negative, the new function should invoke the original function indefinitely until stopped.
// */

// const createCounter = function () {
//     var count = 0
//     return function () {
//         count++
//         console.log(count)
//         return count
//     }
// }
// function repeatFunction(func, times) {
//     if (times > 0) {
//         return function () {
//             for (let index = 0; index < times; index++) {
//                 func()
//             }
//         }
//     } else {
//         if (times < 0) {
//             return function () {
//                 while (true) {
//                     func()
//                 }
//             }
//         }
//     }
// }

// console.log("createCounter() uses:")
// const counter1 = createCounter()
// console.log("Call counter 1")
// counter1()
// console.log("Call counter 1 (second time)")
// counter1()
// console.log("Call counter 1 (third time)")
// counter1()
// const counter2 = createCounter()
// console.log("Call counter 2")
// counter2()
// console.log("Call counter 1 (fourth time)")
// counter1()

// console.log("repeatFunction() uses:")
// console.log("Repeat create counter 10 times")
// const repeat = repeatFunction(createCounter(), 10)
// repeat()
// // console.log("Repeat create counter infinitely")
// // const repeat2 = repeatFunction(createCounter(),-10)
// // repeat2()

// /*
//     Task 4: Recursion and Tail Call Optimization
//     Implement a recursive function called calculateFactorial that calculates the factorial of a given number. Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.
//     Create a recursive function called power that takes a base and an exponent as arguments. The function should calculate the power of the base to the exponent using recursion.
// */
// function calculateFactorial(n, total = 1) {
//     if (n === 0) {
//         return total;
//     }
//     return calculateFactorial(n - 1, n * total);
// }

// function power(base, exponent, result = 1) {
//     if (exponent === 0) {
//         return result;
//     }

//     if (exponent > 0) {
//         return power(base, exponent - 1, result * base);
//     }
//     else {
//         return power(base, exponent + 1, result / base);
//     }
// }

// console.log("calculateFactorial() uses:")
// console.log("0!", calculateFactorial(0))
// console.log("1!", calculateFactorial(1))
// console.log("120!", calculateFactorial(120))

// console.log("power() uses:")
// console.log("2^0", power(2, 0))
// console.log("2^2", power(2, 2))
// console.log("3^1000", power(3, 1000))
// console.log("3^-10", power(3, -10))

// /*
//     Task 5: Lazy Evaluation and Generators (*do not use yield)
//     Implement a lazy evaluation function called lazyMap that takes an array and a mapping function. The function should return a lazy generator that applies the mapping function to each element of the array one at a time.
//     Create a lazy generator function called fibonacciGenerator that generates Fibonacci numbers one at a time using lazy evaluation.
// */
// function lazyMap(array, mappingFunction) {
//     let index = 0

//     return function () {
//         if (index < array.length) {
//             const mappedValue = mappingFunction(array[index])
//             index++
//             return mappedValue
//         } else {
//             return undefined
//         }
//     }
// }

// function fibonacciGenerator() {
//     let prev = 0
//     let curr = 1

//     return function () {
//         const nextFib = curr
//         curr = prev + curr
//         prev = nextFib
//         return nextFib
//     }
// }

// console.log("lazyMap() uses:")
// const numbers = [1, 2, 3, 4, 5];
// const lazyMapper = lazyMap(numbers, x => x * 2);
// console.log("Lazy evaluation with mapped values:");
// let result = lazyMapper();
// while (result !== undefined) {
//     console.log(result);
//     result = lazyMapper();
// }

// console.log("fibonacciGenerator() uses:")
// const lazyFibonacci = fibonacciGenerator();
// console.log("First 10 Fibonacci numbers using lazy evaluation:");
// for (let i = 0; i < 10; i++) {
//     console.log(lazyFibonacci());
// }