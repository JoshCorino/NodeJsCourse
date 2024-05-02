/*
    Homework 5
    Deadline: 2 May

    Task 1: Advanced Array Filtering
    Create a function called customFilterUnique that takes an array and a callback function as arguments. The customFilterUnique function should filter the array using the callback function to determine uniqueness. The resulting array should contain only unique elements based on the callback's logic.
    Use the customFilterUnique function to filter an array of objects based on a specific property and return only unique objects.
*/
function uniqueName(value, index, array) {
    if (array.filter((element) => element.name == value.name).length == 1) {
        return value
    }
}

function customFilterUnique(array, callback) {
    return array.filter(callback)
}

const testArray = [{ name: "Mary" }, { name: "Jon" }, { name: "Richard" }, { name: "Richard" }]
console.log("testArray with unique filter:", customFilterUnique(testArray, uniqueName))
/*
    Task 2: Array Chunking
    Create a function called chunkArray that takes an array and a chunk size as arguments. The chunkArray function should divide the array into smaller arrays, each containing elements of the specified chunk size. The function should return an array of arrays.
    Optimize the chunkArray function to minimize memory usage while chunking the array.
*/
function chunkArray(array, chunkSize) {
    if (chunkSize > array.length) {
        throw Error("Specified chunk size is bigger than the array")
    }
    let result = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}
const arrayToChunk = [1, 2, 3, 4, 5, 6, 7, 8]
console.log("Chunk array in 3:", chunkArray(arrayToChunk, 3))
console.log("Chunk array in 8:", chunkArray(arrayToChunk, 8))
console.log("Try to chunk array in 10:")
try {
    chunkArray(arrayToChunk, 10)
} catch (error) {
    console.error(error.message)
}
/*
    Task 3: Array Shuffling
    Create a function called customShuffle that takes an array as an argument and returns a new array with its elements randomly shuffled.
    Implement the customShuffle function using an efficient shuffling algorithm to achieve uniform randomness.
*/
function customShuffle(array) {
    let arrayCopy = [...array]
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = arrayCopy[i]
        arrayCopy[i] = arrayCopy[j]
        arrayCopy[j] = temp
    }
    return arrayCopy
}
let array = [1, 2, 3, 4]
console.log(`Shuffle array ${array}`)
for (let i = 0; i < 10; i++) {
    console.log(customShuffle(array))
}
/*
    Task 4: Array Intersection and Union
    Create a function called getArrayIntersection that takes two arrays as arguments and returns a new array containing the common elements between the two arrays.
    Create a function called getArrayUnion that takes two arrays as arguments and returns a new array containing all unique elements from both arrays, without any duplicates.
*/
function getArrayIntersection(array1, array2) {
    let result = []
    array1.length < array2.length ? [smallest, bigger] = [array1, array2] : [smallest, bigger] = [array2, array1]
    smallest.forEach(element => {
        if (bigger.includes(element)) {
            result.push(element)
        }
    })
    return result
}
const array1 = [1, 2, 3, 4, 9, 17]
const array2 = [1, 2, 3, 4, 5, 6, 7, 23, 56, 72, 123, 563, 12234, 90]
const array3 = [1, 2, 2]
const array4 = [2, 3, 3]
console.log("Intersect array 1 and array 2:", getArrayIntersection(array1, array2))

function getArrayUnion(array1, array2) {
    let result = new Set([ ...array1, ...array2 ])
    return Array.from(result)
}

console.log("array 1 union array 2:", getArrayUnion(array1, array2))
console.log("array 1 union array 1:", getArrayUnion(array1, array1))
console.log("array 3 union array 4:", getArrayUnion(array3, array4))
/*
    Task 5: Array Performance Analysis
    Implement a function called measureArrayPerformance that takes a function and an array as arguments. The measureArrayPerformance function should execute the provided function with the given array as input and measure the execution time.
    Use the measureArrayPerformance function to compare the performance of built-in array methods (map, filter, reduce, etc.) against your custom array manipulation functions.
*/
function measureArrayPerformance(func, array) {
    let startTime = performance.now()
    func(array)
    let endTime = performance.now()
    return endTime - startTime;
}
const finalArray = [1, 2, 3, 4, 5, 6, 7, 23, 56, 72, 123, 563, 12234, 90, 41241, 12436, 3411, 53, 213, 568, 90098, 43225, 562343]
console.log("customShuffle time:", measureArrayPerformance(customShuffle, finalArray))