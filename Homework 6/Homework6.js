/*
    Task 1: Quasi-Tagged Templates

    You are working on a localization library that uses tagged templates to handle multiple languages. 
    Implement a function called `localize` that acts as a quasi-tagged template. 
    The function should take a template string and an object containing language-specific translations. 
    It should replace placeholders in the template string with the corresponding translations from the provided object.
*/
console.log("Task 1:")
const translations = {
    en: {
        greet: "Hello",
        intro: "Welcome to our website"
    },
    fr: {
        greet: "Bonjour",
        intro: "Bienvenue sur notre site web"
    }
};

function localize(strings, text) {
    return translations[language][text]
}

var language = "fr"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

var localizedGreeting = localize`${greeting}`;
var localizedIntroduction = localize`${introduction}`;

console.log("In french:");
console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")
console.log("Now in english:");
language = "en";
localizedGreeting = localize`${greeting}`;
localizedIntroduction = localize`${introduction}`;
console.log(localizedGreeting); // Expected: "Hello" (for language "en")
console.log(localizedIntroduction); // Expected: "Welcome to our website" (for language "en")

/*
    Task 2: Advanced Tagged Template**

    Create a function called `highlightKeywords` that acts as a tagged template. The function should take a template string and an array of keywords. 
    It should highlight each occurrence of a keyword in the template by wrapping it in a `<span>` element with a specific CSS class. 
    Use template literals and string manipulation to achieve this.
*/
console.log("Task 2:")
function highlightKeywords(template, keywords) {
    return template.replace(/\${(\d)}/g, (_, index) => {
        const keyword = keywords[index]
        return `<span class='highlight'>${keyword}</span>`
    })
}

const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";

const highlighted = highlightKeywords(template, keywords);

console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."

/*
    Task 3: Multiline Tagged Template**
    Implement a multiline tagged template function called `multiline` that takes a template string and returns a string with line numbers added at the beginning of each line. 
    The line numbers should start from 1 and increase for each line. Preserve the original indentation of each line.
*/
function multiline(text) {
    let line = 1
    let result = ''
    text[0].split("\n").forEach(element => {
        result += `${line} ${element} \n`
        line++
    });
    return result
}
const code = multiline`function add(a, b) {
   return a + b;
}`;

console.log(code);
// Expected:
// "1 function add(a, b) {
//  2    return a + b;
//  3 }"

/*
    Task 4: Implementing Debounce Function

    Your task is to implement a debounce function that takes a function and a delay time as arguments. 
    The goal of the debounce function is to ensure that the provided function is only executed after the user stops invoking it for the specified delay time.

    Instructions

    1. Implement a function called `debounce` that takes two arguments:
    - `func`: The function to be debounced.
    - `delay`: The delay time (in milliseconds) before the function is executed.
    1. The `debounce` function should return a new function that wraps the provided function.
    2. When the new function is invoked, it should:
    - Clear any existing timeout.
    - Set a new timeout to execute the provided function after the specified delay time.
    1. Test your `debounce` function by using it to debounce an input event listener. Ensure that the provided function is only called once after the user stops typing for the specified delay time.
*/

function debounce(func, delay) {
    let timeoutID;

    return function () {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            func()
        }, delay)
    }
}

function debouncedSearch(query) {
    // Perform search operation with the query
    console.log("Searching for:", query);
}

// const debouncedSearchHandler = debounce(debouncedSearch, 300);

// const inputElement = document.getElementById("search-input");
// inputElement.addEventListener("input", event => {
// 	debouncedSearchHandler(event.target.value);
// });

/*
    Task 5: Implementing Throttle Function

    Your task is to implement a throttle function that takes a function and a time interval as arguments.
    The throttle function should ensure that the provided function is executed at most once within the specified time interval.

    Instructions

    1. Implement a function called `throttle` that takes two arguments:
    - `func`: The function to be throttled.
    - `interval`: The time interval (in milliseconds) within which the function can be executed.
    1. The `throttle` function should return a new function that wraps the provided function.
    2. When the new function is invoked, it should:
    - Check if the specified time interval has elapsed since the last execution of the provided function.
    - If the interval has not elapsed, ignore the invocation.
    - If the interval has elapsed, execute the provided function and update the last execution timestamp.
    1. Test your `throttle` function by using it to throttle a scroll event listener. Ensure that the provided function is executed at most once within the specified time interval during rapid scrolling.
*/
function throttle(func, interval) {
    let lastExecutionTime = 0;

    return function () {
        const currentTime = Date.now();
        if (currentTime - lastExecutionTime > interval) {
            func();
            lastExecutionTime = currentTime;
        }
    }
}

// function onScroll(event) {
// 	// Handle scroll event
// 	console.log("Scroll event:", event);
// }

// const throttledScrollHandler = throttle(onScroll, 1000);

// window.addEventListener("scroll", throttledScrollHandler);

/*
    Task 6: Currying Function Implementation

    Your task is to implement a currying function that converts a given function into a curried version. 
    Currying is a technique in which a function that takes multiple arguments is transformed into a sequence of functions, each taking a single argument.

    Instructions

    1. Implement a function called `curry` that takes two arguments:
    - `func`: The function to be curried.
    - `arity`: The number of arguments the original function takes.
    1. The `curry` function should return a new curried function.
    2. The curried function should keep accepting arguments until it has received the specified number of arguments (`arity`). Once all arguments are received, the original function should be executed with the collected arguments.
    3. If the curried function is invoked with fewer arguments than `arity`, it should return a new curried function that waits for the remaining arguments.
*/
function curry(func, arity) {
    return function curried(...args) {
        if (args.length >= arity) {
            return func(...args)
        } else {
            return function (...nextArgs) {
                return curried(...args, ...nextArgs)
            }
        }
    };
}

function multiply(a, b, c) {
    return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

console.log("Result:", result); // Expected: 24